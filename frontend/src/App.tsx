import { useEffect, useState } from 'react'
import { fetchPortfolio } from './api'
import type { Portfolio } from './types'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import {
  About,
  Achievements,
  Experience,
  LeadershipEducation,
  Projects,
  Skills,
} from './components/Sections'
import Contact from './components/Contact'
import { useScrollReveal, useScrollProgress } from './hooks'
import './styles.css'

export default function App() {
  const [data, setData] = useState<Portfolio | null>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchPortfolio().then((res) => {
      if (!cancelled) {
        setData(res.data)
        setLive(res.live)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  useScrollReveal(data)
  const progress = useScrollProgress()

  if (!data) {
    return (
      <div className="loader" role="status">
        <span className="loader__mark">SM</span>
        <span className="loader__bar" />
        loading portfolio…
      </div>
    )
  }

  return (
    <div className="app">
      <div className="progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
      <Nav />
      {!live && import.meta.env.DEV && (
        <div className="offline-note" role="status">
          Backend offline — showing bundled content. Start the FastAPI server to enable the contact form.
        </div>
      )}
      <main>
        <Hero data={data} />
        <Ticker data={data} />
        <About data={data} />
        <Skills data={data} />
        <Projects data={data} />
        <Experience data={data} />
        <Achievements data={data} />
        <LeadershipEducation data={data} />
        <Contact data={data} />
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__logo">
            SM<span className="nav__logo-dot">.</span>
          </span>
          <p>Designed & built by {data.profile.name} — React + FastAPI.</p>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  )
}
