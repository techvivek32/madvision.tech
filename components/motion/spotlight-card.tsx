"use client"

import {
  useMemo,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ACCENT, DUR, EASE_OUT } from "./tokens"
import { ShineOverlay } from "./shine-overlay"

/* ------------------------------------------------------------------ */
/*  SpotlightCard — THE standard surface for every card. A cursor-      */
/*  following radial spotlight + hover lift + animated hairline ring +  */
/*  shine. Carries the hover affordance the cursor:none global hides.   */
/* ------------------------------------------------------------------ */

export interface SpotlightCardProps {
  children: ReactNode
  as?: ElementType
  accent?: string
  tone?: "light" | "dark"
  lift?: number
  spotlight?: boolean
  shine?: boolean
  ring?: boolean
  className?: string
  href?: string
  style?: CSSProperties
}

export function SpotlightCard({
  children,
  as,
  accent = ACCENT,
  tone = "light",
  lift = -8,
  spotlight = true,
  shine = true,
  ring = true,
  className,
  href,
  style,
}: SpotlightCardProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  // Pick the rendered element: explicit `as`, else Link when href, else div.
  const Component = (as ?? (href ? Link : "div")) as ElementType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionComponent = useMemo(() => motion.create(Component as any), [Component]) as any

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !spotlight) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  const ringColor = tone === "dark" ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.08)"

  return (
    <MotionComponent
      ref={ref as never}
      href={href as never}
      onMouseMove={handleMove}
      className={cn(
        "group relative overflow-hidden",
        href && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00] focus-visible:ring-offset-2",
        className,
      )}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          ...style,
        } as CSSProperties
      }
      whileHover={reduce ? undefined : { y: lift }}
      transition={{ duration: DUR.fast, ease: EASE_OUT }}
    >
      {/* animated hairline ring on hover */}
      {ring && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${reduce ? ringColor : `${accent}66`}`,
          }}
        />
      )}

      {/* cursor-following radial spotlight */}
      {spotlight && !reduce && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at var(--mx) var(--my), ${accent}24, transparent 40%)`,
          }}
        />
      )}

      {/* diagonal sheen on hover */}
      {shine && <ShineOverlay trigger="hover" tone={tone} className="rounded-[inherit]" />}

      {/* content. Decorative layers above are absolute+pointer-events-none,
          so children flow normally inside the card's own padding/layout
          and simply need to sit on a raised z-index. */}
      {children}
    </MotionComponent>
  )
}
