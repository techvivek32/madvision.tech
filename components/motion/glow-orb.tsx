"use client"

import type { CSSProperties } from "react"
import { motion, useReducedMotion, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"
import { ACCENT } from "./tokens"

/* ------------------------------------------------------------------ */
/*  GlowOrb — the hero's blurred accent halo. Drop behind flat sections */
/*  and bind to a useParallax value to revive dead transforms.          */
/* ------------------------------------------------------------------ */

export interface GlowOrbProps {
  color?: string
  size?: number
  opacity?: number
  pulse?: boolean
  parallax?: MotionValue<number> | null
  className?: string
  style?: CSSProperties
}

export function GlowOrb({
  color = ACCENT,
  size = 480,
  opacity = 0.18,
  pulse = true,
  parallax = null,
  className,
  style,
}: GlowOrbProps) {
  const reduce = useReducedMotion()
  const doPulse = pulse && !reduce

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[120px]",
        doPulse && "animate-pulse-glow",
        className,
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity,
        // parallax binds to translateY; frozen MotionValue(0) under reduce.
        y: parallax ?? undefined,
        ...style,
      }}
    />
  )
}
