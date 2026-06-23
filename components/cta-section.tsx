"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef, type RefObject } from "react"
import {
  ACCENT,
  ACCENTS,
  AmbientShape,
  AnimatedDivider,
  DUR,
  EASE_OUT,
  GlowOrb,
  GradientText,
  MagneticButton,
  Reveal,
  ShineOverlay,
  useParallax,
} from "@/components/motion"

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Dependency-safe ambient depth (parallax layers, transform-only).
  const parallaxRef = sectionRef as RefObject<HTMLElement>
  const slowY = useParallax(parallaxRef, { to: -110 })
  const fastY = useParallax(parallaxRef, { to: -56 })

  // Subtle scroll-scrub zoom on the cluster — transform-only, reduced-motion safe.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const rawScale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1])
  const scale = reduce ? 1 : rawScale

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      {/* faint architectural grid (light-section variant) */}
      <div aria-hidden className="grid-texture-dark absolute inset-0 opacity-[0.5] pointer-events-none" />

      {/* ambient depth — lime stays the signature, violet a quiet accent */}
      <GlowOrb
        color={ACCENT}
        size={620}
        opacity={0.12}
        parallax={slowY}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <AmbientShape
        variant="ring"
        color={ACCENT}
        size={640}
        opacity={0.08}
        parallax={slowY}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <AmbientShape
        variant="blob"
        color={ACCENTS[3]}
        size={260}
        opacity={0.1}
        parallax={fastY}
        className="-top-16 -left-24"
      />
      <AmbientShape
        variant="blob"
        color={ACCENTS[1]}
        size={220}
        opacity={0.1}
        parallax={fastY}
        className="-bottom-20 -right-20"
      />

      <motion.div className="container mx-auto px-6 relative z-10" style={{ scale }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal as="h2" className="font-serif text-4xl md:text-6xl font-normal mb-6 text-foreground">
            Ready to <GradientText animate>Transform</GradientText> Your Business?
          </Reveal>

          <AnimatedDivider className="text-foreground mb-8 mx-auto max-w-[8rem]" />

          <Reveal as="p" y={16} delay={0.12} className="text-lg text-muted-foreground mb-10">
            {
              "Let's build something extraordinary together. Contact us today and take the first step towards digital excellence."
            }
          </Reveal>

          <Reveal y={18} delay={0.22}>
            <div className="flex flex-wrap justify-center gap-3">
              <MagneticButton
                as={Link}
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-full btn-lime font-medium"
              >
                <ShineOverlay trigger="hover" tone="dark" />
                <span className="relative z-10">Start Your Project</span>
              </MagneticButton>

              <MagneticButton
                as={Link}
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center w-14 h-14 rounded-full btn-lime"
              >
                <ShineOverlay trigger="hover" tone="dark" />
                <motion.span
                  className="relative z-10 inline-flex"
                  whileHover={reduce ? undefined : { x: 3 }}
                  transition={{ duration: DUR.fast, ease: EASE_OUT }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  )
}
