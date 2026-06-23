"use client"

import { Children, useMemo, type CSSProperties, type ElementType, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { DUR, EASE_OUT, STAGGER } from "./tokens"

/* ------------------------------------------------------------------ */
/*  Stagger + StaggerItem — one cascade rhythm for every card grid /    */
/*  feature list. Replaces ad-hoc index*0.1 delays everywhere.          */
/* ------------------------------------------------------------------ */

export interface StaggerProps {
  children: ReactNode
  as?: ElementType
  stagger?: number
  delayChildren?: number
  once?: boolean
  margin?: string
  className?: string
  style?: CSSProperties
}

export function Stagger({
  children,
  as = "div",
  stagger = STAGGER,
  delayChildren = 0,
  once = true,
  margin = "-80px",
  className,
  style,
}: StaggerProps) {
  const reduce = useReducedMotion()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = useMemo(() => motion.create(as as any), [as]) as any

  if (reduce) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    )
  }

  // Cap the cascade so long grids never feel sluggish (~0.6s total).
  const count = Children.count(children) || 1
  const effective = Math.min(stagger, 0.6 / count)

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: margin as `${number}px` }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: effective, delayChildren } },
      }}
    >
      {children}
    </MotionTag>
  )
}

export interface StaggerItemProps {
  children: ReactNode
  as?: ElementType
  y?: number
  className?: string
  style?: CSSProperties
}

export function StaggerItem({
  children,
  as = "div",
  y = 28,
  className,
  style,
}: StaggerItemProps) {
  const reduce = useReducedMotion()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = useMemo(() => motion.create(as as any), [as]) as any

  if (reduce) {
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
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DUR.base, ease: EASE_OUT },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}
