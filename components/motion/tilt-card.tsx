"use client"

import { useRef, type ReactNode } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  TiltCard — 3D pointer-tilt with optional moving glare. Reserved for */
/*  hero-grade showcases (product screenshots, founder monogram).       */
/*  Don't use on dense grids — use SpotlightCard there.                 */
/* ------------------------------------------------------------------ */

export interface TiltCardProps {
  children: ReactNode
  max?: number
  scale?: number
  glare?: boolean
  perspective?: number
  className?: string
}

export function TiltCard({
  children,
  max = 8,
  scale = 1.02,
  glare = true,
  perspective = 900,
  className,
}: TiltCardProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  // Normalised pointer position (-0.5..0.5), springed for smoothness.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 150, damping: 18 })
  const sy = useSpring(py, { stiffness: 150, damping: 18 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max])

  // Glare follows the pointer across the surface.
  const glareX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"])
  const glareY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"])
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.22), transparent 55%)`,
  )

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  const handleLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("group relative [transform-style:preserve-3d]", className)}
      style={{
        rotateX,
        rotateY,
        transformPerspective: perspective,
      }}
      whileHover={{ scale }}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [transform:translateZ(1px)]"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}
