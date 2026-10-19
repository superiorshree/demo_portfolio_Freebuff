import type { Portfolio } from '../types'
import SplitText from './SplitText'

function SectionHead({ index, kicker, title, blurb }: { index: string; kicker: string; title: string; blurb?: string }) {
  return (
    <header className="section__head" data-reveal>
      <span className="section__index">{index}</span>
      <span className="section__kicker">{kicker}</span>
      <h2 className="section__title">
        <SplitText text={title} mode="words" />
      </h2>
      {blurb && <p className="section__blurb">{blurb}</p>}
    </header>
  )
}

/* ------------------------------- About ---------------------------------- */

export function About({ data }: { data: Portfolio }) {
  return (
    <section className="section" id="about">
      <SectionHead index="01" kicker="Who I am" title="About me" />
      <div className="about">
        <div className="about__text">
          {data.profile.about.map((p, i) => (
            <p key={i} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
              {p}
            </p>
          ))}
        </div>
        <aside className="about__side" data-reveal="right">
          <h3 className="about__side-title">// soft skills</h3>
          <ul className="soft-skills">
            {data.profile.softSkills.map((s) => (
              <li key={s.name} className="soft-skill">
                <span className="soft-skill__name">{s.name}</span>
                <span className="soft-skill__note">{s.note}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

/* ------------------------------- Skills --------------------------------- */

export function Skills({ data }: { data: Portfolio }) {
  return (
    <section className="section section--alt" id="skills">
      <SectionHead
        index="02"
        kicker="Toolbox"
        title="Technical skills"
        blurb="Organised by what I actually build with — the technologies I've used in projects, internships and hackathons."
      />
      <div className="skills">
        {data.skillGroups.map((group, i) => (
          <div className="skill-card" key={group.id} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
            <div className="skill-card__head">
              <span className="skill-card__dot" />
              <h3>{group.title}</h3>
              <span className="skill-card__count">{group.items.length}</span>
            </div>
            <div className="chips">
              {group.items.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------ Projects -------------------------------- */

export function Projects({ data }: { data: Portfolio }) {
  return (
    <section className="section" id="work">
      <SectionHead
        index="03"
        kicker="Selected work"
        title="Featured projects"
        blurb="Computer vision, AI-assisted tooling and full-stack products — built in class, in internships and under hackathon deadlines."
      />
      <div className="projects">
        {data.projects.map((p) => (
          <div className="project-wrap" key={p.id} data-reveal="scale" style={{ transitionDelay: `${60}ms` }}>
            <article
              className="project"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                const px = (e.clientX - r.left) / r.width - 0.5
                const py = (e.clientY - r.top) / r.height - 0.5
                e.currentTarget.style.setProperty('--ry', `${(px * 5).toFixed(2)}deg`)
                e.currentTarget.style.setProperty('--rx', `${(-py * 4).toFixed(2)}deg`)
                e.currentTarget.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`)
                e.currentTarget.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`)
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.setProperty('--ry', '0deg')
                el.style.setProperty('--rx', '0deg')
                el.style.setProperty('--gx', '50%')
                el.style.setProperty('--gy', '50%')
              }}
            >
              <span className="project__shine" aria-hidden="true" />
            <div className="project__index" aria-hidden="true">
              {p.index}
            </div>
            <div className="project__body">
              <div className="project__top">
                <div>
                  <span className={`badge badge--${p.statusTone}`}>{p.status}</span>
                  <h3 className="project__title">{p.title}</h3>
                  <p className="project__subtitle">{p.subtitle}</p>
                </div>
                <div className="project__tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <p className="project__desc">{p.description}</p>
              <p className="project__contrib">
                <span>My contribution:</span> {p.contribution}
              </p>

              <div className="chips chips--tech">
                {p.tech.map((t) => (
                  <span className="chip chip--mono" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="project__links">
                {p.links.github && (
                  <a href={p.links.github} target="_blank" rel="noreferrer noopener">
                    GitHub ↗
                  </a>
                )}
                {p.links.demo && (
                  <a href={p.links.demo} target="_blank" rel="noreferrer noopener">
                    Live demo ↗
                  </a>
                )}
                {!p.links.github && !p.links.demo && <span className="project__nolink">Repo link coming soon</span>}
              </div>
            </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------- Experience -------------------------------- */

export function Experience({ data }: { data: Portfolio }) {
  return (
    <section className="section section--alt" id="experience">
      <SectionHead index="04" kicker="Where I've worked" title="Professional experience" />
      <div className="timeline" data-reveal="draw">
        {data.experience.map((job, i) => (
          <div className="timeline__item" key={job.id} data-reveal="left" style={{ transitionDelay: `${i * 120}ms` }}>
            <div className="timeline__marker" aria-hidden="true" />
            <div className="timeline__card">
              <div className="timeline__top">
                <div>
                  <h3>{job.role}</h3>
                  <p className="timeline__org">
                    {job.org}
                    {job.location ? ` · ${job.location}` : ''}
                  </p>
                </div>
                <div className="timeline__meta">
                  {job.period && <span className="timeline__period">{job.period}</span>}
                  {job.mentor && <span className="timeline__mentor">Mentor: {job.mentor}</span>}
                </div>
              </div>
              <p className="timeline__summary">{job.summary}</p>
              <div className="chips">
                {job.areas.map((a) => (
                  <span className="chip chip--mono" key={a}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------- Achievements ------------------------------- */

export function Achievements({ data }: { data: Portfolio }) {
  return (
    <section className="section" id="achievements">
      <SectionHead
        index="05"
        kicker="Proof of work"
        title="Achievements & recognition"
        blurb="Wins, responsibilities and campus roles — the things I'm asked about in interviews."
      />
      <div className="achievements">
        {data.achievements.map((a, i) => (
          <article className="achievement" key={a.title} data-reveal="scale" style={{ transitionDelay: `${i * 90}ms` }}>
            <span className="achievement__icon">{a.icon}</span>
            <h3>{a.title}</h3>
            <p className="achievement__org">{a.org}</p>
            <p className="achievement__note">{a.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* --------------------- Leadership + Education ---------------------------- */

export function LeadershipEducation({ data }: { data: Portfolio }) {
  return (
    <section className="section section--alt" id="education">
      <div className="split">
        <div className="split__col">
          <SectionHead index="06" kicker="Beyond code" title="Leadership & activities" />
          <div className="leadership">
            {data.leadership.map((l, i) => (
              <article className="lead-card" key={l.title} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <h3>{l.title}</h3>
                <p>{l.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="split__col">
          <SectionHead index="07" kicker="Academics" title="Education" />
          <div className="education">
            {data.education.map((e, i) => (
              <article className="edu-card" key={e.degree} data-reveal="left" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="edu-card__top">
                  <h3>{e.degree}</h3>
                  {e.note && <span className="edu-card__note">{e.note}</span>}
                </div>
                <p className="edu-card__school">{e.school}</p>
                {e.period && <p className="edu-card__period">{e.period}</p>}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
