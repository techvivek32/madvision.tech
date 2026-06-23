"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Reveal, ShineOverlay, ACCENT } from "@/components/motion"

/* ------------------------------------------------------------------ */
/*  Marquee surfaces — kinetic typographic strips.                     */
/*  Enhancement pass: edge-fade masks, hover-reactive speed, lime      */
/*  stroke accents, a scroll-scrubbed reveal and a shine sweep on      */
/*  dark strips. Every public prop signature + light/dark theme        */
/*  preserved; CSS marquee keyframes (translateX -50%) reused as-is.   */
/* ------------------------------------------------------------------ */

export default function MarqueeSection() {
  const words = ["FULL STACK DEVELOPER", "UI & UX", "AI SOLUTIONS", "SAAS PLATFORMS", "ERP SYSTEMS", "MOBILE APPS"]
  const reduce = useReducedMotion()

  // Two identical halves => the CSS marquee (translateX -50%) loops seamlessly.
  const half = [...words, ...words]

  return (
    <Reveal as="section" y={0} className="relative py-4 bg-background overflow-hidden border-y border-border">
      {/* subtle light-section grid texture behind the words */}
      <div className="grid-texture-dark pointer-events-none absolute inset-0" aria-hidden />

      <div className="group relative mask-fade-x">
        <motion.div
          className={`flex whitespace-nowrap ${reduce ? "" : "animate-marquee"} transition-[animation-duration] duration-500 group-hover:[animation-duration:50s]`}
        >
          {[...half, ...half].map((word, i) => (
            <motion.span
              key={i}
              className="relative mx-8 select-none font-serif text-6xl md:text-8xl font-normal text-foreground/10 transition-[color,-webkit-text-stroke] duration-500 hover:text-foreground/25 hover:[-webkit-text-stroke:1px_rgba(200,255,0,0.4)]"
              style={{ WebkitTextStroke: "1px rgba(0,0,0,0.1)" }}
              whileHover={reduce ? undefined : { scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </Reveal>
  )
}

export function RunningStrip({
  text = "VISION TECH",
  reverse = false,
  dark = false,
  speed = 20,
  tilted = false,
}: {
  text?: string
  reverse?: boolean
  dark?: boolean
  speed?: number
  tilted?: boolean
}) {
  const reduce = useReducedMotion()
  const items = Array(30).fill(text)

  return (
    <div
      className={`relative overflow-hidden py-4 ${dark ? "bg-foreground" : "bg-background"} border-y ${dark ? "border-white/10" : "border-border"} ${tilted ? "-rotate-1 scale-105" : ""}`}
    >
      {/* shine sweep — only on dark strips, only when motion is allowed */}
      {dark && <ShineOverlay tone="dark" duration={1.4} repeatDelay={5} />}

      <div className="group mask-fade-x">
        <motion.div
          className={`flex whitespace-nowrap ${reduce ? "" : reverse ? "animate-marquee-reverse" : "animate-marquee"} transition-[animation-duration] duration-500`}
          style={{ animationDuration: reduce ? undefined : `${speed}s` }}
        >
          {items.map((item, i) => (
            <span
              key={i}
              className={`group/word mx-8 select-none text-sm font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${
                dark ? "text-white/60 hover:text-white" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {item}{" "}
              <span
                className="inline-block transition-transform duration-500 group-hover/word:rotate-[180deg]"
                style={{ color: ACCENT }}
              >
                ★
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export function LargeTextMarquee({
  text = "VISION TECH",
  reverse = false,
  speed = 40,
}: {
  text?: string
  reverse?: boolean
  speed?: number
}) {
  const reduce = useReducedMotion()
  const items = Array(10).fill(text)

  return (
    <div className="relative overflow-hidden bg-foreground py-8">
      {/* faint white grid + a slow shine pass for depth on the dark band */}
      <div className="grid-texture pointer-events-none absolute inset-0" aria-hidden />
      <ShineOverlay tone="dark" duration={1.6} repeatDelay={6} />

      <div className="group relative mask-fade-x">
        <motion.div
          className={`flex whitespace-nowrap ${reduce ? "" : reverse ? "animate-marquee-reverse" : "animate-marquee"} transition-[animation-duration] duration-500 group-hover:[animation-duration:120s]`}
          style={{ animationDuration: reduce ? undefined : `${speed}s` }}
        >
          {items.map((item, i) => (
            <motion.span
              key={i}
              className="mx-12 select-none font-serif text-6xl md:text-8xl font-bold text-transparent transition-[-webkit-text-stroke] duration-500 hover:[-webkit-text-stroke:1px_rgba(200,255,0,0.8)]"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
              whileHover={reduce ? undefined : { scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
