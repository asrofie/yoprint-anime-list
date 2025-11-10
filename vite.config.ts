import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import Anthropic from '@anthropic-ai/sdk'

// https://vite.dev/config/
const translateProxy = (): Plugin => ({
  name: 'translate-proxy',
  configureServer(server) {
    server.middlewares.use('/api/translate', async (req, res) => {
      if (req.method !== 'POST') { res.statusCode = 405; res.end('Method Not Allowed'); return }
      try {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const body = JSON.parse(Buffer.concat(chunks).toString('utf-8') || '{}') as { text?: string; targetLang?: 'en' | 'malay' }
        const text = body.text ?? ''
        const targetLang = body.targetLang === 'malay' ? 'malay' : 'en'
        const key = process.env.ANTHROPIC_API_KEY
        if (!key) { res.statusCode = 500; res.setHeader('Content-Type','application/json'); res.end(JSON.stringify({ error: 'Missing ANTHROPIC_API_KEY' })); return }

        const client = new Anthropic({ apiKey: key })
        const targetName = targetLang === 'malay' ? 'Malay' : 'English'
        const msg = await client.messages.create({
          model: 'claude-3-haiku-20240307',
          max_tokens: 512,
          system: `You are a precise translation engine. Translate the user content into ${targetName}. Preserve line breaks and formatting. Return only the translated text without quotes.`,
          messages: [{ role: 'user', content: text }],
        }) as any
        const out = Array.isArray(msg?.content) ? msg.content.find((c: any) => c.type === 'text')?.text : undefined
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify({ text: out || text }))
      } catch (e) {
        res.statusCode = 500
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify({ error: 'Translate failed' }))
      }
    })
  },
  configurePreviewServer(server) {
    // enable in `vite preview` as well
    server.middlewares.use('/api/translate', async (req, res) => {
      if (req.method !== 'POST') { res.statusCode = 405; res.end('Method Not Allowed'); return }
      try {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const body = JSON.parse(Buffer.concat(chunks).toString('utf-8') || '{}') as { text?: string; targetLang?: 'en' | 'malay' }
        const text = body.text ?? ''
        const targetLang = body.targetLang === 'malay' ? 'malay' : 'en'
        const key = process.env.ANTHROPIC_API_KEY
        if (!key) { res.statusCode = 500; res.setHeader('Content-Type','application/json'); res.end(JSON.stringify({ error: 'Missing ANTHROPIC_API_KEY' })); return }

        const client = new Anthropic({ apiKey: key })
        const targetName = targetLang === 'malay' ? 'Malay' : 'English'
        const msg = await client.messages.create({
          model: 'claude-3-haiku-20240307',
          max_tokens: 512,
          system: `You are a precise translation engine. Translate the user content into ${targetName}. Preserve line breaks and formatting. Return only the translated text without quotes.`,
          messages: [{ role: 'user', content: text }],
        }) as any
        const out = Array.isArray(msg?.content) ? msg.content.find((c: any) => c.type === 'text')?.text : undefined
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify({ text: out || text }))
      } catch (e) {
        res.statusCode = 500
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify({ error: 'Translate failed' }))
      }
    })
  }
})

export default defineConfig({
  plugins: [react(), translateProxy()],
  server: {
    host: '0.0.0.0', // Sangat penting agar Vite dapat diakses dari host
    port: 4000,
    watch: {
      usePolling: true, // Tambahkan baris ini
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router-dom')) {
              return 'vendor-router';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
