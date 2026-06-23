"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ACCENT } from "./tokens"

/* ------------------------------------------------------------------ */
/*  AnimatedDivider — a track + scroll-scrubbed fill, echoing the hero   */
/*  stepper. Animates transform (scaleX/scaleY) only.                   */
/* ------------------------------------------------------------------ */

export interface AnimatedDividerProps {
  orientation?: "h" | "v"
  accent?: string
  thickness?: number
  className?: string
  trackOpacity?: number
}

export function AnimatedDivider({
  orientation = "h",
  accent = ACCENT,
  thickness = 1,
  className,
  trackOpacity = 0.12,
}: AnimatedDividerProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const fill = useTransform(scrollYProgress, [0, 0.85], [0, 1])

  const isH = orientation === "h"

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", isH ? "w-full" : "h-full", className)}
      style={isH ? { height: thickness } : { width: thickness }}
    >
      {/* base track */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "currentColor", opacity: trackOpacity }}
      />
      {/* scrubbed fill */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: accent,
          transformOrigin: isH ? "left center" : "center top",
          scaleX: isH ? (reduce ? 1 : fill) : 1,
          scaleY: isH ? 1 : reduce ? 1 : fill,
        }}
      />
    </div>
  )
}
