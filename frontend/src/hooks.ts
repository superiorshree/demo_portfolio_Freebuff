import { useEffect, useRef, useState, type RefObject } from 'react'

/**
 * Adds `.is-visible` to [data-reveal] elements as they scroll into view.
 * Pass the rendered data as `deps` so the observer re-attaches after load.
 */
export function useScrollReveal(deps: unknown = null) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window) || nodes.length === 0) {
      nodes.forEach((n) => n.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      // threshold 0 keeps very tall elements (long lists) revealable
      { threshold: [0, 0.15], rootMargin: '0px 0px -60px 0px' },
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [deps])
}

/** Returns the id of the section currently in view. */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.6] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])
  return active
}

/** Types, pauses, deletes and cycles through a list of words. */
export function useTypewriter(words: string[], speed = 55, pause = 1600): string {
  const [text, setText] = useState('')
  const state = useRef({ word: 0, char: 0, deleting: false })

  useEffect(() => {
    if (words.length === 0) return
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const s = state.current
      const current = words[s.word % words.length]
      if (!s.deleting) {
        s.char += 1
        setText(current.slice(0, s.char))
        if (s.char >= current.length) {
          s.deleting = true
          timer = setTimeout(tick, pause)
          return
        }
        timer = setTimeout(tick, speed)
      } else {
        s.char -= 1
        setText(current.slice(0, s.char))
        if (s.char <= 0) {
          s.deleting = false
          s.word += 1
          timer = setTimeout(tick, 350)
          return
        }
        timer = setTimeout(tick, speed / 2)
      }
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [words, speed, pause])

  return text
}

/** Returns 0 → 1 page scroll progress (for the top progress bar). */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return progress
}

/** Observes an element and reports whether it has entered the viewport. */
export function useInView<T extends HTMLElement>(threshold = 0.35): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      // deferred so the effect doesn't setState synchronously
      const raf = requestAnimationFrame(() => setInView(true))
      return () => cancelAnimationFrame(raf)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

/** Animates a number from 0 → target once `active` becomes true. */
export function useCountUp(target: number, active: boolean, duration = 1100): number {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = 0
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      raf = requestAnimationFrame(() => setValue(target))
      return () => cancelAnimationFrame(raf)
    }
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])
  return value
}

/** Tracks whether the page has been scrolled past `offset` px. */
export function useScrolled(offset = 24): boolean {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}
