"use client"

import { useRef, type RefObject } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowRight } from "lucide-react"
import HangingContact from "@/components/hanging-contact"
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
  RevealText,
  ShineOverlay,
  useParallax,
} from "@/components/motion"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const parallaxRef = sectionRef as RefObject<HTMLElement>
  const slowY = useParallax(parallaxRef, { to: -120 })
  const fastY = useParallax(parallaxRef, { to: -64 })

  // Content gently rises + fades as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const rawOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const contentY = reduce ? 0 : rawY
  const contentOpacity = reduce ? 1 : rawOpacity

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-background overflow-hidden"
    >
      {/* faint architectural grid (light-section variant) */}
      <div aria-hidden className="grid-texture-dark absolute inset-0 opacity-[0.5] pointer-events-none" />

      {/* ambient depth — lime signature, sky + violet as quiet accents */}
      <GlowOrb
        color={ACCENT}
        size={640}
        opacity={0.12}
        parallax={slowY}
        className="-top-48 -left-40"
      />
      <GlowOrb
        color={ACCENT}
        size={420}
        opacity={0.08}
        parallax={fastY}
        className="bottom-0 right-[-8rem]"
      />
      <AmbientShape
        variant="ring"
        color={ACCENT}
        size={520}
        opacity={0.14}
        parallax={slowY}
        className="top-24 right-[-10rem]"
      />
      <AmbientShape
        variant="blob"
        color={ACCENTS[3]}
        size={260}
        opacity={0.1}
        parallax={fastY}
        className="-bottom-20 -left-24"
      />
      <AmbientShape
        variant="blob"
        color={ACCENTS[1]}
        size={200}
        opacity={0.1}
        parallax={slowY}
        className="top-40 left-[12%]"
      />

      {/* draggable antique "Contact Us" hang-tag */}
      <HangingContact />

      {/* giant stroked watermark — ties the hero to the marquee typography */}
      <motion.span
        aria-hidden
        style={reduce ? undefined : { y: fastY }}
        className="text-stroke-lime absolute -bottom-12 left-1/2 -translate-x-1/2 select-none pointer-events-none whitespace-nowrap font-serif text-[20vw] leading-none font-bold text-transparent opacity-40"
      >
        VISION
      </motion.span>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container mx-auto px-6 relative z-10 pt-32 pb-40"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* eyebrow badge */}
          <Reveal y={16}>
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border bg-card/70 backdrop-blur-sm text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                style={{ backgroundColor: ACCENT }}
              />
              Digital Innovation Studio
            </span>
          </Reveal>

          {/* headline */}
          <h1 className="font-serif font-normal text-5xl md:text-7xl lg:text-8xl leading-[1.05] mt-8 mb-8 text-foreground">
            <RevealText as="span" by="word" text="We build digital" delay={0.1} className="block" />
            <span className="block">
              <RevealText as="span" by="word" text="products that" delay={0.25} className="inline" />{" "}
              <GradientText animate as="span" className="italic">
                drive growth.
              </GradientText>
            </span>
          </h1>

          <AnimatedDivider className="text-foreground mx-auto max-w-[8rem] mb-8" />

          <Reveal as="p" y={16} delay={0.45} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Vision Tech crafts intelligent SaaS platforms, AI-driven products, and
            enterprise solutions using cutting-edge technologies.
          </Reveal>

          {/* CTAs — same vocabulary as the closing CTA section */}
          <Reveal y={18} delay={0.6}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                as={Link}
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-full btn-lime font-medium text-sm"
              >
                <ShineOverlay trigger="hover" tone="dark" />
                <span className="relative z-10">Start Your Project</span>
                <motion.span
                  className="relative z-10 inline-flex"
                  whileHover={reduce ? undefined : { x: 3 }}
                  transition={{ duration: DUR.fast, ease: EASE_OUT }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </MagneticButton>

              <MagneticButton
                as={Link}
                href="/services"
                glow={false}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border bg-card/70 backdrop-blur-sm text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Explore Services
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </motion.div>

      {/* bottom scroll cue — positioning lives on a plain wrapper so the
          Reveal's transform animation can't override the centering */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        {/* margin 0px — the default -80px viewport inset would keep an element
            this close to the fold permanently "out of view" */}
        <Reveal y={12} delay={1} margin="0px">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ArrowDown className="w-4 h-4 animate-bounce" />
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
