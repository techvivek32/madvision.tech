"use client"

import { motion, useReducedMotion, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"
import { ACCENT } from "./tokens"

/* ------------------------------------------------------------------ */
/*  AmbientShape — pure CSS/framer decorative shape (conic + radial     */
/*  gradients). Dependency-safe drop-in replacement for the r3f-based   */
/*  scroll-3d-element. Same callsite ergonomics, zero 3D-dep risk.      */
/* ------------------------------------------------------------------ */

export interface AmbientShapeProps {
  variant?: "ring" | "blob" | "mesh"
  color?: string
  size?: number
  opacity?: number
  parallax?: MotionValue<number> | null
  spin?: boolean
  className?: string
}

export function AmbientShape({
  variant = "ring",
  color = ACCENT,
  size = 480,
  opacity = 0.25,
  parallax = null,
  spin = true,
  className,
}: AmbientShapeProps) {
  const reduce = useReducedMotion()
  const doSpin = spin && !reduce

  // Per-variant background composition (transform/gradient only).
  const background =
    variant === "ring"
      ? `conic-gradient(from 0deg, ${color}00, ${color}, ${color}00 60%)`
      : variant === "mesh"
        ? `radial-gradient(40% 40% at 30% 30%, ${color}, transparent 70%), radial-gradient(45% 45% at 70% 65%, ${color}88, transparent 70%)`
        : `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`

  const mask =
    variant === "ring"
      ? {
          WebkitMask: "radial-gradient(circle, transparent 54%, #000 56%)",
          mask: "radial-gradient(circle, transparent 54%, #000 56%)",
        }
      : {}

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full",
        variant === "blob" && "blur-[60px]",
        className,
      )}
      style={{
        width: size,
        height: size,
        background,
        opacity,
        y: parallax ?? undefined,
        ...mask,
      }}
      animate={doSpin ? { rotate: 360 } : undefined}
      transition={
        doSpin
          ? { duration: variant === "ring" ? 48 : 60, ease: "linear", repeat: Infinity }
          : undefined
      }
    />
  )
}
