import type { ElementType } from 'react'

interface SplitTextProps {
  text: string
  as?: ElementType
  className?: string
  /** 'words' rises per word, 'letters' rises per letter (used for the hero name). */
  mode?: 'words' | 'letters'
  /** Delay before the first unit, in ms. */
  base?: number
}

/**
 * Splits text into units that rise + unblur with a stagger once an ancestor
 * gains the `.is-visible` class (added by the IntersectionObserver in hooks.ts).
 */
export default function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  mode = 'words',
  base = 80,
}: SplitTextProps) {
  const words = text.split(' ')

  return (
    <Tag className={`split ${className}`} aria-label={text}>
      {words.map((word, wi) => (
        <span className="split__word" key={`${word}-${wi}`} aria-hidden="true">
          {mode === 'letters'
            ? Array.from(word).map((ch, ci) => (
                <span
                  className="split__char"
                  key={ci}
                  style={{ transitionDelay: `${base * wi + 34 * ci}ms` }}
                >
                  {ch}
                </span>
              ))
            : (
                <span className="split__char" style={{ transitionDelay: `${base * wi}ms` }}>
                  {word}
                </span>
              )}
        </span>
      ))}
    </Tag>
  )
}
