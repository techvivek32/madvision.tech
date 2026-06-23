import type { Variants } from "framer-motion"

/* ------------------------------------------------------------------ */
/*  Motion tokens — the single source of truth for the whole site.    */
/*  Every transition imports EASE_OUT / DUR from here. Never hand-type */
/*  a cubic-bezier or duration in a section file.                     */
/* ------------------------------------------------------------------ */

/** Primary entrance/exit/state easing (lifted from the premium hero). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

/** Symmetric in/out easing — used by looping gradient shimmer etc. */
export const EASE_INOUT = [0.65, 0, 0.35, 1] as const

/** One timing scale. fast=hovers/state swaps, base=reveals/cards, slow=large headings. */
export const DUR = { fast: 0.3, base: 0.6, slow: 0.8 } as const

/** One stagger rhythm everywhere. */
export const STAGGER = 0.06

/** Signature brand accent — lime. Always wins ties. */
export const ACCENT = "#c8ff00"

/** The ONLY sanctioned complementary palette (amber / sky / emerald / violet). */
export const ACCENTS = ["#f59e0b", "#38bdf8", "#34d399", "#a78bfa"] as const

/** Reserved spring for physical / playful pops (badges, mounts). */
export const SPRING_POP = { type: "spring", stiffness: 400, damping: 20 } as const

/** Standard scroll-reveal viewport — animate on first entry only. */
export const VIEWPORT = { once: true, margin: "-80px" } as const

/** Atomic fade + slide-up variant. */
export const fadeUp = (y = 24): Variants => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT },
  },
})

/** Parent variant that cascades its children. */
export const staggerParent = (stagger = STAGGER, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
})
