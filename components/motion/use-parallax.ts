"use client"

import type { RefObject } from "react"
import {
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion"

/* ------------------------------------------------------------------ */
/*  useParallax — wraps useScroll + useTransform. Wires up the dead     */
/*  bgY / y transforms instead of discarding them. Returns a frozen     */
/*  MotionValue(0) under reduced-motion.                                */
/* ------------------------------------------------------------------ */

export interface UseParallaxOptions {
  from?: number
  to?: number
  axis?: "y" | "x"
  offset?: [string, string]
  clamp?: boolean
}

export function useParallax(
  ref: RefObject<HTMLElement>,
  opts: UseParallaxOptions = {},
): MotionValue<number> {
  const { from = 0, to = -100, offset = ["start end", "end start"], clamp = true } =
    opts

  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    // framer types offset loosely; cast keeps strict TS happy.
    offset: offset as never,
  })

  // Always call the hook (rules of hooks); zero-out the range under reduce.
  const value = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [from, to],
    { clamp },
  )

  return value
}
