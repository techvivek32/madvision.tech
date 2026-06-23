"use client"

import { useMemo, useRef, type ReactNode } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ACCENT } from "./tokens"

/* ------------------------------------------------------------------ */
/*  MagneticButton — wraps every primary CTA / round arrow button. The  */
/*  element drifts toward the cursor and glows. Essential because the   */
/*  cursor:none global hides the pointer.                               */
/* ------------------------------------------------------------------ */

export interface MagneticButtonProps {
  children: ReactNode
  as?: "button" | "a" | typeof Link
  href?: string
  type?: "button" | "submit"
  disabled?: boolean
  strength?: number
  radius?: number
  glow?: boolean
  accent?: string
  onClick?: () => void
  className?: string
}

export function MagneticButton({
  children,
  as = "button",
  href,
  type,
  disabled,
  strength = 0.4,
  radius = 80,
  glow = true,
  accent = ACCENT,
  onClick,
  className,
}: MagneticButtonProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const Component = (as ?? "button") as React.ElementType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionComponent = useMemo(() => motion.create(Component as any), [Component]) as any

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || disabled) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist < radius) {
      x.set(dx * strength)
      y.set(dy * strength)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Forward the right native props depending on the rendered element.
  const isButton = as === "button"

  return (
    <MotionComponent
      ref={ref as never}
      href={href as never}
      type={(isButton ? type ?? "button" : undefined) as never}
      disabled={(isButton ? disabled : undefined) as never}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduce ? undefined : { x: sx, y: sy }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      whileHover={
        reduce || !glow
          ? undefined
          : { boxShadow: `0 0 28px ${accent}66, 0 0 8px ${accent}99` }
      }
      whileFocus={
        reduce || !glow
          ? undefined
          : { boxShadow: `0 0 28px ${accent}66, 0 0 8px ${accent}99` }
      }
      className={cn(
        "inline-flex items-center justify-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
    >
      {children}
    </MotionComponent>
  )
}
