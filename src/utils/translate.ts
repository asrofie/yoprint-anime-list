export type TranslateOptions = {
  signal?: AbortSignal
}

// Simple translation helper using LibreTranslate-compatible API
// Note: In production, consider proxying via your backend and handling API keys/rate limits.
export async function translateText(text: string, targetLang: 'en' | 'malay', opts: TranslateOptions = {}) {
  if (!text.trim()) return text
  // Map i18n code to ISO code expected by public translators
  const target = targetLang === 'malay' ? 'ms' : 'en'

  // LibreTranslate public endpoint (no key) — may be rate-limited
  const url = 'https://libretranslate.com/translate'
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: opts.signal,
    body: JSON.stringify({ q: text, source: 'auto', target, format: 'text' }),
  })
  if (!res.ok) throw new Error(`Translate failed: ${res.status}`)
  const data = (await res.json()) as { translatedText?: string }
  return data.translatedText ?? text
}

