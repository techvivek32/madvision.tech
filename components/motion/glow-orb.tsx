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
      className={cn("pointer-events-none absolute rounded-full blur-[120px]", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity,
        // parallax binds to translateY; frozen MotionValue(0) under reduce.
        y: parallax ?? undefined,
        ...style,
      }}
      // Pulse scaled by the caller's base opacity. The CSS animate-pulse-glow
      // class can't be used here: its keyframes (0.5 -> 1) override the inline
      // opacity prop entirely and blow the halo out to near-solid color.
      animate={doPulse ? { opacity: [opacity * 0.6, opacity, opacity * 0.6] } : undefined}
      transition={doPulse ? { duration: 3, ease: "easeInOut", repeat: Infinity } : undefined}
    />
  )
}
