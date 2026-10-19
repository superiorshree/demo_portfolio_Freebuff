import { useRef, type PointerEvent } from 'react'
import type { Portfolio } from '../types'
import { useCountUp, useInView, useTypewriter } from '../hooks'
import SplitText from './SplitText'

/** One hero stat; numeric prefixes count up when scrolled into view. */
function Stat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.5)
  const match = value.match(/^(\d+)(\D.*)?$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? (match[2] ?? '') : ''
  const counted = useCountUp(target, inView)
  const display = match ? `${counted}${suffix}` : value

  return (
    <div className="stat" ref={ref} style={{ transitionDelay: `${delay}ms` }} data-reveal>
      <div className="stat__value">{display}</div>
      <div className="stat__label">{label}</div>
    </div>
  )
}

export default function Hero({ data }: { data: Portfolio }) {
  const { profile, stats } = data
  const typed = useTypewriter(profile.rotatingWords)
  const heroRef = useRef<HTMLElement | null>(null)

  // Spotlight + grid parallax follow the pointer.
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = heroRef.current
    if (!el) return
    const x = (e.clientX / window.innerWidth) * 100
    const y = (e.clientY / window.innerHeight) * 100
    el.style.setProperty('--mx', `${x.toFixed(1)}%`)
    el.style.setProperty('--my', `${y.toFixed(1)}%`)
    el.style.setProperty('--gx', `${((x - 50) * 0.12).toFixed(2)}px`)
    el.style.setProperty('--gy', `${((y - 50) * 0.12).toFixed(2)}px`)
  }

  return (
    <section className="hero" id="top" ref={heroRef} onPointerMove={onPointerMove}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--one" />
        <div className="hero__glow hero__glow--two" />
        <div className="hero__spotlight" />
        <div className="hero__scan" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow" data-reveal>
          <span className="pulse" /> {profile.location} · {profile.status}
        </p>

        <h1 className="hero__title" data-reveal>
          <span className="hero__intro">{profile.intro}</span>
          <span className="hero__name">
            <SplitText text={profile.name} mode="letters" base={110} />
          </span>
        </h1>

        <p className="hero__rotator" data-reveal style={{ transitionDelay: '450ms' }}>
          I&apos;m <span className="hero__typed">{typed}</span>
          <span className="caret" aria-hidden="true" />
        </p>

        <p className="hero__headline" data-reveal style={{ transitionDelay: '600ms' }}>
          {profile.headline}
        </p>

        <div className="hero__actions" data-reveal style={{ transitionDelay: '750ms' }}>
          <button
            className="btn btn--primary btn--magnetic"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View my work
          </button>
          <a className="btn btn--ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn ↗
          </a>
        </div>

        <div className="hero__stats">
          {stats.map((s, i) => (
            <Stat key={s.label} value={s.value} label={s.label} delay={850 + i * 110} />
          ))}
        </div>
      </div>

      <button
        className="hero__scroll"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to about section"
      >
        <span className="hero__scroll-line" />
        scroll
      </button>
    </section>
  )
}
