import { useState, type FormEvent } from 'react'
import { sendContact } from '../api'
import type { Portfolio } from '../types'

type State = {
  status: 'idle' | 'sending' | 'sent' | 'error'
  message: string
  link?: { href: string; label: string }
}

export default function Contact({ data }: { data: Portfolio }) {
  const [state, setState] = useState<State>({ status: 'idle', message: '' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setState({ status: 'sending', message: '' })
    try {
      const thanks = await sendContact(form)
      setState({ status: 'sent', message: thanks })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      const isNetwork =
        err instanceof TypeError ||
        (err instanceof Error && /failed to fetch|networkerror|load failed/i.test(err.message))
      if (isNetwork) {
        setState({
          status: 'error',
          message: 'The message server is unreachable right now — the quickest way to reach me is LinkedIn.',
          link: { href: data.profile.links.linkedin, label: `${data.profile.links.linkedinLabel} ↗` },
        })
      } else {
        setState({
          status: 'error',
          message: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        })
      }
    }
  }

  const field = (key: 'name' | 'email' | 'message') => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  })

  return (
    <section className="section" id="contact">
      <header className="section__head" data-reveal>
        <span className="section__index">08</span>
        <span className="section__kicker">Say hello</span>
        <h2 className="section__title">Let&apos;s build something</h2>
        <p className="section__blurb">
          Open to internships, hackathon teams and collaborations. Send a message here or reach me on
          LinkedIn — I read everything.
        </p>
      </header>

      <div className="contact">
        <form className="contact__form" onSubmit={onSubmit} data-reveal noValidate={false}>
          <label className="field">
            <span>Name</span>
            <input type="text" required minLength={2} maxLength={120} placeholder="Your name" {...field('name')} />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" required placeholder="you@example.com" {...field('email')} />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea required minLength={10} rows={5} placeholder="Tell me about the role, project or idea…" {...field('message')} />
          </label>

          <button className="btn btn--primary" type="submit" disabled={state.status === 'sending'}>
            {state.status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {state.message && (
            <p className={`form-status form-status--${state.status}`} role="status">
              {state.message}{' '}
              {state.link && (
                <a href={state.link.href} target="_blank" rel="noreferrer noopener">
                  {state.link.label}
                </a>
              )}
            </p>
          )}
        </form>

        <aside className="contact__aside" data-reveal>
          <div className="contact__card">
            <span className="contact__label">Location</span>
            <p>{data.profile.location}</p>
          </div>
          <div className="contact__card">
            <span className="contact__label">LinkedIn</span>
            <p>
              <a href={data.profile.links.linkedin} target="_blank" rel="noreferrer noopener">
                {data.profile.links.linkedinLabel} ↗
              </a>
            </p>
          </div>
          <div className="contact__card">
            <span className="contact__label">Status</span>
            <p>
              <span className="pulse" /> {data.profile.status}
            </p>
          </div>
          <div className="contact__card contact__card--mono">
            <span className="contact__label">Powered by</span>
            <p>React + FastAPI · this form posts to /api/contact</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
