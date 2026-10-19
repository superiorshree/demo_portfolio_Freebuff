import type { Portfolio } from '../types'

/** Infinite marquee of headline achievements, shown just under the hero. */
export default function Ticker({ data }: { data: Portfolio }) {
  const items = data.achievements
  const loop = [...items, ...items]

  return (
    <div className="ticker" aria-label="Highlights">
      <div className="ticker__track">
        {loop.map((a, i) => (
          <span className="ticker__item" key={`${a.title}-${i}`}>
            <span className="ticker__star">✦</span>
            <strong>{a.title}</strong>
            <span className="ticker__org">{a.org}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
