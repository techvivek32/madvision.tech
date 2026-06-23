"use client"

import { useMemo, type ElementType } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { EASE_OUT, DUR } from "./tokens"

/* ------------------------------------------------------------------ */
/*  RevealText — premium per-word (or per-line) headline reveal. Each   */
/*  token rides up out of an overflow-hidden mask, staggered.           */
/* ------------------------------------------------------------------ */

export interface RevealTextProps {
  text: string
  by?: "word" | "line"
  stagger?: number
  y?: number
  delay?: number
  as?: ElementType
  className?: string
  /** If a token === highlight it receives highlightClassName. */
  highlight?: string
  highlightClassName?: string
}

export function RevealText({
  text,
  by = "word",
  stagger = 0.06,
  y = 18,
  delay = 0,
  as = "div",
  className,
  highlight,
  highlightClassName,
}: RevealTextProps) {
  const reduce = useReducedMotion()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = useMemo(() => motion.create(as as any), [as]) as any

  // Normalise highlight for comparison (strip surrounding punctuation-free).
  const tokens = by === "line" ? text.split("\n") : text.split(" ")

  if (reduce) {
    // Plain string, but still honour highlight styling for visual parity.
    if (!highlight) {
      return <Tag className={className}>{text}</Tag>
    }
    return (
      <Tag className={className}>
        {tokens.map((tok, i) => {
          const isHi = tok === highlight
          return (
            <span key={i} className={cn(isHi && highlightClassName)}>
              {tok}
              {i < tokens.length - 1 ? (by === "line" ? <br /> : " ") : null}
            </span>
          )
        })}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" as `${number}px` }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {tokens.map((tok, i) => {
        const isHi = highlight !== undefined && tok === highlight
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block overflow-hidden align-bottom"
            style={{ verticalAlign: "bottom" }}
          >
            <motion.span
              className={cn("inline-block", isHi && highlightClassName)}
              variants={{
                hidden: { y: y + 4, opacity: 0 },
                show: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: DUR.base, ease: EASE_OUT },
                },
              }}
            >
              {tok}
            </motion.span>
            {i < tokens.length - 1 ? (by === "line" ? <br /> : " ") : null}
          </span>
        )
      })}
    </MotionTag>
  )
}
