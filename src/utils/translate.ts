export type TranslateOptions = { signal?: AbortSignal }

// In production (e.g., Vercel), call Anthropic REST directly.
// In local dev, fall back to the Vite middleware `/api/translate`.
export async function translateText(
  text: string,
  targetLang: 'en' | 'malay',
  opts: TranslateOptions = {}
) {
  if (!text.trim()) return text

  const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '::1'
  )

  if (isLocalhost) {
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

  const key = (import.meta as any)?.env?.VITE_ANTHROPIC_API_KEY || (globalThis as any)?.ANTHROPIC_API_KEY
  if (!key) {
    // No key available at runtime; return original text gracefully
    return text
  }

  const targetName = targetLang === 'malay' ? 'Malay' : 'English'
  const body = {
    model: 'claude-3-haiku-20240307',
    max_tokens: 512,
    system: `You are a precise translation engine. Translate the user content into ${targetName}. Preserve line breaks and formatting. Return only the translated text without quotes.`,
    messages: [ { role: 'user', content: text } ],
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    signal: opts.signal,
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Translate failed: ${res.status}`)
  const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> }
  const out = data.content?.find((c) => c.type === 'text')?.text?.trim()
  return out && out.length > 0 ? out : text
}
