"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { EASE_OUT } from "@/components/motion"

/* ------------------------------------------------------------------ *
 *  Light / dark toggle.                                                *
 *                                                                      *
 *  One shape does the whole job: a filled disc with a mask. Slide the   *
 *  masking circle over the disc and the sun becomes a crescent moon;    *
 *  slide it away and the crescent fills back into a sun. The rays       *
 *  retract into the body as it turns. No icon swap, no cross-fade —     *
 *  it is a single object changing state, which is what a toggle is.     *
 * ------------------------------------------------------------------ */

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315]

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const maskId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  /* next-themes cannot know the theme until it reads localStorage in the
     browser, so the first server render would disagree with the client.
     Hold the icon still until mounted rather than shipping a hydration error. */
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  /* The new theme is clipped in as a circle growing from this button. The
     coordinates are handed to CSS so the reveal starts exactly where the
     pointer was. Browsers without startViewTransition swap instantly, which
     is a perfectly good outcome rather than a broken one. */
  const toggle = useCallback(() => {
    const next = isDark ? "light" : "dark"
    const root = document.documentElement

    const start = document.startViewTransition?.bind(document)
    if (!start || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(next)
      return
    }

    const box = buttonRef.current?.getBoundingClientRect()
    if (box) {
      root.style.setProperty("--theme-x", `${box.left + box.width / 2}px`)
      root.style.setProperty("--theme-y", `${box.top + box.height / 2}px`)
    }

    root.classList.add("theme-sweep")
    const transition = start(() => {
      setTheme(next)
    })
    transition.finished.finally(() => root.classList.remove("theme-sweep"))
  }, [isDark, setTheme])

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={`group relative grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${className}`}
    >
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        /* the whole mark turns as it changes state */
        animate={{ rotate: isDark ? -70 : 0 }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      >
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="white" />
          {/* this circle bites the crescent out of the disc */}
          <motion.circle
            cx="12"
            cy="4"
            r="9"
            fill="black"
            animate={{ cx: isDark ? 18 : 12, cy: isDark ? 6 : 4 }}
            transition={{ duration: 0.95, ease: EASE_OUT }}
          />
        </mask>

        {/* the body — sun disc, or moon once the mask slides over it */}
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          animate={{ r: isDark ? 9 : 5.2 }}
          transition={{ duration: 0.95, ease: EASE_OUT }}
        />

        {/* rays — they retract into the body when the moon comes out */}
        <motion.g
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.4 : 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          style={{ transformOrigin: "12px 12px" }}
        >
          {RAYS.map((angle) => (
            <line
              key={angle}
              x1="12"
              y1="1.6"
              x2="12"
              y2="4.2"
              transform={`rotate(${angle} 12 12)`}
            />
          ))}
        </motion.g>
      </motion.svg>
    </button>
  )
}
