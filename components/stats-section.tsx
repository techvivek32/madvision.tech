"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { useRef, type RefObject } from "react"
import {
  ACCENT,
  ACCENTS,
  AmbientShape,
  AnimatedDivider,
  CountUp,
  GlowOrb,
  GradientText,
  Reveal,
  SpotlightCard,
  Stagger,
  StaggerItem,
  useParallax,
} from "@/components/motion"

const stats = [
  { value: 14, suffix: "+", label: "Team Members" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 104, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Dependency-safe ambient depth — swaps the r3f-based scroll-3d-element
  // (flaky on React 18.3.1) for AmbientShape/GlowOrb parallax layers.
  const parallaxRef = sectionRef as RefObject<HTMLElement>
  const slowY = useParallax(parallaxRef, { to: -110 })
  const fastY = useParallax(parallaxRef, { to: -56 })

  // Subtle scroll-scrub zoom on the cluster (transform-only, reduced-motion safe).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const rawScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1])
  const scale = reduce ? 1 : rawScale

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      {/* faint architectural grid (light-section variant) */}
      <div aria-hidden className="grid-texture-dark absolute inset-0 opacity-[0.5] pointer-events-none" />

      {/* ambient depth — lime stays the signature, violet a quiet accent */}
      <GlowOrb
        color={ACCENT}
        size={560}
        opacity={0.1}
        parallax={slowY}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <AmbientShape
        variant="ring"
        color={ACCENT}
        size={620}
        opacity={0.08}
        parallax={slowY}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <AmbientShape
        variant="blob"
        color={ACCENTS[3]}
        size={240}
        opacity={0.12}
        parallax={fastY}
        className="-bottom-16 -right-20"
      />

      <motion.div className="container mx-auto px-6 relative z-10" style={{ scale }}>
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <Reveal
            as="span"
            y={16}
            className="block text-sm text-muted-foreground uppercase tracking-widest"
          >
            By the Numbers
          </Reveal>
          <Reveal as="h2" delay={0.08} className="font-serif text-4xl md:text-6xl font-normal mt-4">
            Proven <GradientText animate>Impact</GradientText>
          </Reveal>
          <AnimatedDivider className="text-foreground mt-8 mx-auto max-w-xs" />
        </div>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <SpotlightCard
                tone="light"
                className="h-full px-4 py-10 rounded-3xl bg-secondary/40 text-center flex flex-col items-center justify-center"
              >
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="relative z-10 block text-5xl md:text-8xl font-serif font-normal text-foreground"
                />
                <p className="relative z-10 text-muted-foreground mt-4 text-xs md:text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </motion.div>
    </section>
  )
}
