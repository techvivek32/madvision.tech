"use client"

import { motion } from "framer-motion"

export default function MarqueeSection() {
  const words = ["FULL STACK DEVELOPER", "UI & UX", "AI SOLUTIONS", "SAAS PLATFORMS", "ERP SYSTEMS", "MOBILE APPS"]

  return (
    <section className="py-4 bg-background overflow-hidden border-y border-border">
      <div className="relative">
        <motion.div className="flex whitespace-nowrap animate-marquee" initial={{ x: 0 }}>
          {[...words, ...words, ...words, ...words].map((word, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl font-serif font-normal mx-8 text-foreground/10"
              style={{ WebkitTextStroke: "1px rgba(0,0,0,0.1)" }}
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
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
  const items = Array(30).fill(text)

  return (
    <div
      className={`py-4 overflow-hidden ${dark ? "bg-foreground" : "bg-background"} border-y ${dark ? "border-white/10" : "border-border"} ${tilted ? "-rotate-1 scale-105" : ""}`}
    >
      <motion.div
        className={`flex whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`text-sm font-bold uppercase tracking-[0.3em] mx-8 ${dark ? "text-white/60" : "text-foreground/60"}`}
          >
            {item} ★
          </span>
        ))}
      </motion.div>
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
  const items = Array(10).fill(text)

  return (
    <div className="py-8 overflow-hidden bg-foreground">
      <motion.div
        className={`flex whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-6xl md:text-8xl font-serif font-bold mx-12 text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
