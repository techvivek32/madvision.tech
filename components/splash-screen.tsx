"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ACCENT, EASE_OUT } from "@/components/motion"
import { LogoMark } from "@/components/logo"

/* ------------------------------------------------------------------ *
 *  SPLASH — the first thing anyone sees, on first visit and on every  *
 *  refresh. It is a full-page overlay, not a route, so it never       *
 *  interrupts client-side navigation between pages.                   *
 *                                                                     *
 *  The mark builds, the name rises word by word, the house tagline    *
 *  snaps in — then the whole screen dissolves pixel by pixel, in a    *
 *  wave that sweeps from the top-left corner, exactly the way the     *
 *  logo itself is built. The splash leaves how the mark arrives.      *
 * ------------------------------------------------------------------ */

/** How long the panel stays before it starts dissolving (seconds). */
const HOLD = 2.9
/** Speed of the mark's build relative to its default pace. */
const MARK_SPEED = 0.6

/* ---- the dissolve ----
   The cell SIZE is fixed and the grid count is derived from the viewport, so
   the pixels look the same on a phone and on a 4K monitor. Smaller number =
   finer pixels = more cells. */
const CELL_PX = 26
/** how long the leading edge takes to cross the screen */
const SWEEP = 1.15
/** how long one cell takes to vanish */
const CELL_FADE = 0.45
/** ceiling on cell count, so a huge display cannot spawn a runaway grid */
const MAX_CELLS = 3600

/** 32-bit integer hash — deterministic jitter, no RNG. */
function hash(n: number) {
  let x = Math.imul(n + 1, 2654435761) >>> 0
  x ^= x >>> 15
  x = Math.imul(x, 2246822519) >>> 0
  x ^= x >>> 13
  return x >>> 0
}

/** The name, split so each word can rise on its own beat. */
const WORDS = [
  { text: "Mad", italic: false },
  { text: "Vision", italic: false },
  { text: "Tech", italic: true },
]

type Grid = { cols: number; rows: number }

export default function SplashScreen() {
  const reduce = useReducedMotion()
  const [grid, setGrid] = useState<Grid | null>(null) // non-null once dissolving
  const [gone, setGone] = useState(false)

  /* Hold, then measure the viewport and build the pixel grid. The grid is
     created ONLY at this moment — while the splash is just sitting there the
     background is a single solid div, so the server-rendered HTML stays small
     instead of shipping thousands of empty tiles. */
  useEffect(() => {
    if (reduce) {
      setGone(true)
      return
    }
    const timer = setTimeout(() => {
      let cols = Math.ceil(window.innerWidth / CELL_PX)
      let rows = Math.ceil(window.innerHeight / CELL_PX)
      while (cols * rows > MAX_CELLS) {
        cols = Math.ceil(cols * 0.9)
        rows = Math.ceil(rows * 0.9)
      }
      setGrid({ cols, rows })
    }, HOLD * 1000)
    return () => clearTimeout(timer)
  }, [reduce])

  /* Unmount once the last cell has gone. */
  useEffect(() => {
    if (!grid) return
    const timer = setTimeout(() => setGone(true), (SWEEP + CELL_FADE + 0.15) * 1000)
    return () => clearTimeout(timer)
  }, [grid])

  /* Hold the page still underneath so nothing scrolls behind the panel. */
  useEffect(() => {
    if (gone) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [gone])

  if (gone) return null

  const dissolving = grid !== null
  const span = grid ? grid.cols + grid.rows - 2 : 1

  return (
    <div data-splash aria-hidden className="fixed inset-0 z-[9999]">
      {/* ---------------- THE GROUND ----------------
          While the splash is showing this is one solid div. The instant the
          dissolve starts it becomes a grid of small cells of the same colour —
          the swap is invisible, and the site is revealed straight through the
          gaps as they go. */}
      {!dissolving ? (
        <div className="absolute inset-0 bg-[#0a0a0f]" />
      ) : (
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
            gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          }}
        >
          {Array.from({ length: grid.cols * grid.rows }, (_, i) => {
            const col = i % grid.cols
            const row = Math.floor(i / grid.cols)
            /* the wave sweeps diagonally from the top-left corner; the jitter
               keeps its leading edge broken rather than a ruled line */
            const progress = (col + row) / span
            const jitter = (hash(i) % 100) / 100
            const delay = progress * SWEEP + jitter * 0.14
            return (
              <div
                key={i}
                className="splash-cell splash-cell--out"
                style={
                  {
                    animationDelay: `${delay.toFixed(3)}s`,
                    ["--splash-cell-fade" as string]: `${CELL_FADE}s`,
                  } as React.CSSProperties
                }
              />
            )
          })}
        </div>
      )}

      {/* ---------------- WHAT SITS ON THE GROUND ----------------
          Content clears first so the pixels dissolve against a clean dark
          field instead of shredding the wordmark. */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
        animate={{ opacity: dissolving ? 0 : 1 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
      >
        {/* the architectural grid the mark is built on, barely there */}
        <div aria-hidden className="grid-texture absolute inset-0" />

        {/* a single lime glow, low and wide */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: ACCENT, opacity: 0.08 }}
        />

        <div className="relative flex w-full flex-col items-center px-6 text-center">
          <LogoMark
            size={168}
            ink="#f2f2ec"
            accent={ACCENT}
            animate={!reduce}
            timeScale={MARK_SPEED}
            className="h-[104px] w-[104px] sm:h-[144px] sm:w-[144px] lg:h-[168px] lg:w-[168px]"
          />

          {/* the name, big — each word rises on its own beat */}
          <h1 className="mt-8 flex flex-wrap items-baseline justify-center gap-x-[0.28em] font-serif text-[2.5rem] leading-[1.02] tracking-[-0.02em] text-[#f2f2ec] sm:mt-10 sm:text-[4.4rem] lg:text-[5.4rem]">
            {WORDS.map((word, i) => (
              <motion.span
                key={word.text}
                className={word.italic ? "italic" : undefined}
                initial={reduce ? false : { opacity: 0, y: "0.5em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.95,
                  ease: EASE_OUT,
                  delay: reduce ? 0 : 1.05 + i * 0.13,
                }}
              >
                {word.text}
              </motion.span>
            ))}
          </h1>

          {/* the house tagline, set exactly as in the email signature */}
          <motion.div
            className="mt-8 sm:mt-9"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: reduce ? 0 : 1.9 }}
          >
            <span
              className="inline-block px-3 py-1.5 font-mono text-[8.5px] font-bold uppercase tracking-[0.25em] text-[#0a0a0f] sm:px-4 sm:py-2 sm:text-[10px]"
              style={{ backgroundColor: ACCENT }}
            >
              Turning Vision Into Innovation &nbsp;★&nbsp; AI · SaaS · ERP · Cloud
            </span>
          </motion.div>

          {/* the loading line — its width IS the remaining wait, honestly */}
          <div className="mt-12 h-px w-[160px] overflow-hidden bg-[#f2f2ec]/15 sm:mt-14 sm:w-[200px]">
            <motion.div
              className="h-full"
              style={{ backgroundColor: ACCENT }}
              initial={reduce ? false : { width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: HOLD - 0.3, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
