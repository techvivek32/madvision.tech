"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Raw pointer position as motion values — updated directly in the listener
  // so there is NO React re-render per mouse move.
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Two spring "weights": a snappy dot and a trailing ring.
  const dotSX = useSpring(x, { stiffness: 500, damping: 28, mass: 0.5 })
  const dotSY = useSpring(y, { stiffness: 500, damping: 28, mass: 0.5 })
  const ringSX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.8 })
  const ringSY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.8 })

  // centering offsets (dot 12px -> -6, ring 40px -> -20)
  const dotX = useTransform(dotSX, (v) => v - 6)
  const dotY = useTransform(dotSY, (v) => v - 6)
  const ringX = useTransform(ringSX, (v) => v - 20)
  const ringY = useTransform(ringSY, (v) => v - 20)

  useEffect(() => {
    let rafPending = false
    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      x.set(e.clientX)
      y.set(e.clientY)
      setIsVisible(true)
      // rAF-gate the (expensive) hover hit-test so it runs at most once/frame
      if (!rafPending) {
        rafPending = true
        requestAnimationFrame(() => {
          rafPending = false
          const el = document.elementFromPoint(lastX, lastY)
          if (!el) return
          const clickable =
            el.tagName === "A" ||
            el.tagName === "BUTTON" ||
            !!el.closest("a") ||
            !!el.closest("button") ||
            window.getComputedStyle(el).cursor === "pointer"
          setIsHovering(clickable)
        })
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
    // run ONCE — the listener reads/writes refs + motion values, not state
  }, [x, y])

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="w-3 h-3 bg-white rounded-full"
          animate={{ scale: isHovering ? 1.5 : 1, opacity: isVisible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="w-10 h-10 border border-foreground/30 rounded-full"
          animate={{ scale: isHovering ? 1.5 : 1, opacity: isVisible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.8 }}
        />
      </motion.div>
    </>
  )
}
