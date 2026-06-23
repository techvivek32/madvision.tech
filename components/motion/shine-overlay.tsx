"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { EASE_INOUT } from "./tokens"

/* ------------------------------------------------------------------ */
/*  ShineOverlay — diagonal sheen bar. Drop inside any relative card /  */
/*  button. trigger='hover' requires the parent to be a `group`.        */
/* ------------------------------------------------------------------ */

export interface ShineOverlayProps {
  delay?: number
  duration?: number
  repeatDelay?: number
  tone?: "light" | "dark"
  trigger?: "loop" | "hover"
  className?: string
}

export function ShineOverlay({
  delay = 0,
  duration = 1.1,
  repeatDelay = 4,
  tone = "dark",
  trigger = "loop",
  className,
}: ShineOverlayProps) {
  const reduce = useReducedMotion()
  if (reduce) return null

  const via = tone === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"
  const barStyle = {
    background: `linear-gradient(90deg, transparent, ${via}, transparent)`,
  } as const

  if (trigger === "hover") {
    // CSS-driven; lights up only on parent :hover (no JS loop running idle).
    return (
      <span
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
        aria-hidden
      >
        <span
          className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 -translate-x-[160%] transition-transform duration-700 ease-out group-hover:translate-x-[460%]"
          style={barStyle}
        />
      </span>
    )
  }

  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <motion.span
        className="absolute inset-y-0 left-0 w-1/3 -skew-x-12"
        style={barStyle}
        initial={{ x: "-120%" }}
        animate={{ x: ["-120%", "220%"] }}
        transition={{
          duration,
          ease: EASE_INOUT,
          repeat: Infinity,
          repeatDelay,
          delay,
        }}
      />
    </span>
  )
}
