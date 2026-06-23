"use client"

import { useEffect, useRef } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion"
import { EASE_OUT } from "./tokens"

/* ------------------------------------------------------------------ */
/*  CountUp — replaces every numeric stat's setInterval with a single   */
/*  framer animate() driven on first in-view. Identical site-wide.      */
/* ------------------------------------------------------------------ */

export interface CountUpProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  once?: boolean
  className?: string
}

export function CountUp({
  value,
  duration = 1.6,
  suffix = "",
  prefix = "",
  decimals = 0,
  once = true,
  className,
}: CountUpProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once })

  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`)

  useEffect(() => {
    if (reduce) {
      mv.set(value)
      return
    }
    if (inView) {
      const controls = animate(mv, value, { duration, ease: EASE_OUT })
      return () => controls.stop()
    }
  }, [inView, value, duration, reduce, mv])

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  )
}
