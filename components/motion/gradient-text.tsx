"use client"

import { useMemo, type ElementType, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ACCENT, EASE_INOUT } from "./tokens"

/* ------------------------------------------------------------------ */
/*  GradientText — gradient-clipped emphasis words. Theme-aware.        */
/*  tone='dark' => white->white/55 (hero badge).                        */
/*  tone='light' => foreground with a lime-leaning sheen.               */
/* ------------------------------------------------------------------ */

export interface GradientTextProps {
  children: ReactNode
  as?: ElementType
  tone?: "light" | "dark"
  animate?: boolean
  from?: string
  via?: string
  to?: string
  className?: string
}

export function GradientText({
  children,
  as = "span",
  tone = "light",
  animate = false,
  from,
  via,
  to,
  className,
}: GradientTextProps) {
  const reduce = useReducedMotion()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = useMemo(() => motion.create(as as any), [as]) as any

  // Resolve the gradient stops per tone (caller overrides win).
  const f = from ?? (tone === "dark" ? "#ffffff" : "#1a1a1a")
  const v = via ?? (tone === "dark" ? "rgba(255,255,255,0.78)" : "#4d6b00")
  const t = to ?? (tone === "dark" ? "rgba(255,255,255,0.55)" : ACCENT)

  const doAnimate = animate && !reduce

  const baseStyle = {
    backgroundImage: `linear-gradient(110deg, ${f}, ${v}, ${t}, ${v}, ${f})`,
    backgroundSize: doAnimate ? "200% 100%" : "100% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
  } as const

  if (!doAnimate) {
    return (
      <Tag className={cn("bg-clip-text text-transparent", className)} style={baseStyle}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={cn("bg-clip-text text-transparent", className)}
      style={baseStyle}
      animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
      transition={{ duration: 8, ease: EASE_INOUT, repeat: Infinity }}
    >
      {children}
    </MotionTag>
  )
}
