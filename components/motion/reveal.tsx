"use client"

import { useMemo, type CSSProperties, type ElementType, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { DUR, EASE_OUT } from "./tokens"

/* ------------------------------------------------------------------ */
/*  Reveal — the atomic fade + slide-up scroll reveal. Replaces every  */
/*  bespoke initial/whileInView/viewport block site-wide.              */
/* ------------------------------------------------------------------ */

export interface RevealProps {
  children: ReactNode
  as?: ElementType
  y?: number
  delay?: number
  duration?: number
  once?: boolean
  margin?: string
  className?: string
  style?: CSSProperties
}

export function Reveal({
  children,
  as = "div",
  y = 24,
  delay = 0,
  duration = DUR.base,
  once = true,
  margin = "-80px",
  className,
  style,
}: RevealProps) {
  const reduce = useReducedMotion()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = useMemo(() => motion.create(as as any), [as]) as any

  if (reduce) {
    // Render final state, no transition.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Tag = as as any
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </MotionTag>
  )
}
