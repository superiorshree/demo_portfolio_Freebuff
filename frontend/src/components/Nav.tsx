import { useEffect, useState } from 'react'
import { useScrolled, useScrollSpy } from '../hooks'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const active = useScrollSpy(NAV_ITEMS.map((i) => i.id))
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`nav ${scrolled || open ? 'nav--solid' : ''}`}>
      <div className="nav__inner">
        <button className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          SM<span className="nav__logo-dot">.</span>
        </button>

        <nav className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav__link ${active === item.id ? 'nav__link--active' : ''}`}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
          <a
            className="btn btn--small nav__cta"
            href="https://www.linkedin.com/in/shreeyansh-mahamuni"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn ↗
          </a>
        </nav>

        <button
          className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
