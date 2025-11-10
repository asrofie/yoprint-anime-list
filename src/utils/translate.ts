export type TranslateOptions = { signal?: AbortSignal }

// Uses Anthropic SDK on the server (SSR/Node) and falls back to
// calling the local middleware `/api/translate` in the browser.
export async function translateText(
  text: string,
  targetLang: 'en' | 'malay',
  opts: TranslateOptions = {}
) {
  if (!text.trim()) return text

  const isServer = typeof window === 'undefined' || (import.meta as any)?.env?.SSR
  if (isServer) {
    const key = (globalThis as any)?.process?.env?.ANTHROPIC_API_KEY || (globalThis as any)?.ANTHROPIC_API_KEY
    if (!key) return text
    const { default: Anthropic } = await import('@anthropic-ai/sdk')
    const client = new Anthropic({ apiKey: key })
    const targetName = targetLang === 'malay' ? 'Malay' : 'English'
    const msg = await client.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 512,
      system: `You are a precise translation engine. Translate the user content into ${targetName}. Preserve line breaks and formatting. Return only the translated text without quotes.`,
      messages: [{ role: 'user', content: text }],
    }) as any
    const out = Array.isArray(msg?.content)
      ? msg.content.find((c: any) => c.type === 'text')?.text?.trim()
      : undefined
    return out && out.length > 0 ? out : text
  }

  // Browser path: call same-origin middleware to avoid CORS and protect key
  const res = await fetch('/api/translate', {
    method: 'POST',
    signal: opts.signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, targetLang }),
  })
  if (!res.ok) throw new Error(`Translate failed: ${res.status}`)
  const data = (await res.json()) as { text?: string }
  return data.text ?? text
}
