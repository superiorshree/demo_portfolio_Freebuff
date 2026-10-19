import { FALLBACK } from './fallback'
import type { Portfolio } from './types'

export interface PortfolioResult {
  data: Portfolio
  live: boolean
}

/** Fetch portfolio data from the FastAPI backend, falling back to bundled data. */
export async function fetchPortfolio(): Promise<PortfolioResult> {
  try {
    const res = await fetch('/api/portfolio', { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`API responded ${res.status}`)
    const data = (await res.json()) as Portfolio
    if (!data?.profile?.name) throw new Error('Malformed payload')
    return { data, live: true }
  } catch {
    return { data: FALLBACK, live: false }
  }
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export async function sendContact(payload: ContactPayload): Promise<string> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const body = (await res.json().catch(() => ({}))) as {
    thanks?: string
    detail?: unknown
  }
  if (!res.ok) {
    const detail = body.detail
    const text =
      typeof detail === 'string'
        ? detail
        : Array.isArray(detail)
          ? detail.map((d) => (typeof d === 'object' && d !== null && 'msg' in d ? String(d.msg) : '')).filter(Boolean).join('; ')
          : 'Something went wrong. Please try again.'
    throw new Error(text)
  }
  return body.thanks ?? 'Thanks! Your message has been recorded.'
}
