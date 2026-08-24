"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ACCENT, EASE_OUT } from "@/components/motion"

/* ------------------------------------------------------------------ *
 *  THE SYSTEM — the Mad Vision Tech mark.                             *
 *  An M built on a 5x5 grid, with the V of "Vision" lit inside it.    *
 *  Every unit sits on grid, so it stays crisp down to 16px.           *
 *                                                                     *
 *  Light theme only for now: ink on a light ground. The dark-section  *
 *  variant is one prop away (ink="#ffffff") when we're ready for it.  *
 * ------------------------------------------------------------------ */


const PITCH = 18 // cell + gutter
const CELL = 16
const OFFSET = 4

/** columns 0 and 4, all five rows — the two stems of the M */
const STEM_CELLS: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
  [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
]

/** the V of Vision, nested inside the M — the only cells that carry the accent */
const LIT_CELLS: [number, number][] = [[1, 1], [3, 1], [2, 2]]

/** the full 5x5 field, drawn faintly so the grid the mark is built on stays visible */
const FIELD_CELLS: [number, number][] = Array.from({ length: 25 }, (_, i) => [i % 5, Math.floor(i / 5)])

const at = (col: number, row: number) => ({ x: OFFSET + col * PITCH, y: OFFSET + row * PITCH })

/* ---- build-in timing (seconds) ------------------------------------ *
 *  Deliberately unhurried: the mark assembles cell by cell rather than
 *  popping in. Raise timeScale on the component to slow it further.   */
const STEM_STAGGER = 0.11
const STEM_DURATION = 0.9
const LIT_START = 1.5
const LIT_STAGGER = 0.14
const LIT_DURATION = 1.1

export type LogoMarkProps = {
  /** rendered size in px (the mark is square) */
  size?: number
  /** ink colour — pass a light value to place the mark on a dark section */
  ink?: string
  /** accent colour for the nested V — the signature lime #c8ff00 */
  accent?: string
  /** draw the faint 5x5 field behind the mark. Turn OFF below ~40px: it becomes noise. */
  field?: boolean
  /** play the build-in animation once on mount */
  animate?: boolean
  /** stretch the animation: 1 = as designed, 1.5 = 50% slower, 0.7 = faster */
  timeScale?: number
  className?: string
  title?: string
}

export function LogoMark({
  size = 40,
  ink = "#0a0a0f",
  accent = ACCENT,
  field = true,
  animate = false,
  timeScale = 1,
  className,
  title = "Mad Vision Tech",
}: LogoMarkProps) {
  const reduce = useReducedMotion()
  const moves = animate && !reduce

  const t = (seconds: number) => seconds * timeScale
  /* stems build downward — left column first, then right, then the V lights up */
  const stemDelay = (i: number) => t((i < 5 ? i : i - 5 + 2) * STEM_STAGGER)
  const litDelay = (i: number) => t(LIT_START + i * LIT_STAGGER)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label={title}
      className={className}
    >
      {field && (
        <g fill={ink} opacity={0.13}>
          {FIELD_CELLS.map(([c, r]) => (
            <rect key={`f-${c}-${r}`} {...at(c, r)} width={CELL} height={CELL} />
          ))}
        </g>
      )}

      <g fill={ink}>
        {STEM_CELLS.map(([c, r], i) =>
          moves ? (
            <motion.rect
              key={`s-${c}-${r}`}
              {...at(c, r)}
              width={CELL}
              height={CELL}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: t(STEM_DURATION), ease: EASE_OUT, delay: stemDelay(i) }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ) : (
            <rect key={`s-${c}-${r}`} {...at(c, r)} width={CELL} height={CELL} />
          ),
        )}
      </g>

      <g fill={accent}>
        {LIT_CELLS.map(([c, r], i) =>
          moves ? (
            <motion.rect
              key={`l-${c}-${r}`}
              {...at(c, r)}
              width={CELL}
              height={CELL}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.2, 1.22, 1], opacity: 1 }}
              transition={{ duration: t(LIT_DURATION), ease: EASE_OUT, delay: litDelay(i) }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ) : (
            <rect key={`l-${c}-${r}`} {...at(c, r)} width={CELL} height={CELL} />
          ),
        )}
      </g>
    </svg>
  )
}

export type LogoProps = LogoMarkProps & {
  /** hide the wordmark and show the mark alone */
  markOnly?: boolean
}

/** Mark + wordmark lockup. MAD in mono caps, VISION TECH as the tracked sub-line. */
export function Logo({ size = 40, ink = "#0a0a0f", markOnly = false, ...rest }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} ink={ink} {...rest} />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span
            className="font-mono font-bold tracking-[0.1em]"
            style={{ color: ink, fontSize: size * 0.42 }}
          >
            MAD
          </span>
          <span
            className="font-mono uppercase tracking-[0.26em] mt-1 opacity-60"
            style={{ color: ink, fontSize: size * 0.19 }}
          >
            Vision Tech
          </span>
        </span>
      )}
    </span>
  )
}
