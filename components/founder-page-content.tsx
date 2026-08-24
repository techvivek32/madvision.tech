"use client"

import { useRef, type RefObject } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Code2, Cloud, Brain, Shield, Layers, Mail, Award, Briefcase, GraduationCap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { RunningStrip, LargeTextMarquee } from "./marquee-section"
import {
  ACCENT,
  ACCENTS,
  DUR,
  EASE_OUT,
  SPRING_POP,
  Reveal,
  RevealText,
  Stagger,
  StaggerItem,
  GradientText,
  ShineOverlay,
  SpotlightCard,
  MagneticButton,
  GlowOrb,
  AmbientShape,
  AnimatedDivider,
  useParallax,
} from "@/components/motion"

const skills = [
  "Distributed Systems",
  "CRDTs",
  "Raft Consensus",
  "Event-Driven Architecture",
  "CQRS",
  "Rust & Go",
  "gRPC Microservices",
  "Kafka/Flink Streaming",
  "Multi-region Cloud",
  "Kubernetes Operators",
  "Service Mesh",
  "High-performance APIs",
  "LLM Fine-tuning",
  "RAG 2.0",
  "AI Agents",
  "Vector DB Internals",
  "GPU Inference",
  "WebGPU/WebAssembly",
  "Multi-tenant SaaS",
  "Zero-Trust Security",
]

const expertise = [
  {
    icon: Layers,
    title: "Enterprise Architecture",
    items: [
      "Monorepo Architecture (Nx/Turborepo)",
      "Multi-tenant SaaS with row-level isolation",
      "Event Sourcing + CQRS",
      "Bounded Context Mapping",
    ],
  },
  {
    icon: Cloud,
    title: "Infrastructure & Scale",
    items: [
      "API Gateway Design (Envoy, Kong)",
      "High-traffic system design (10M+ users)",
      "Multi-region cloud deployment",
      "Kubernetes Operators",
    ],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    items: ["LLM Fine-tuning", "RAG 2.0 Architecture", "AI Agents Development", "GPU Inference Pipelines"],
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    items: [
      "Zero-Trust Architecture",
      "Observability Engineering",
      "Subscription + Billing Infrastructure",
      "Enterprise Security",
    ],
  },
]

export default function FounderPageContent() {
  const reduce = useReducedMotion()

  const heroRef = useRef<HTMLElement>(null)
  const heroBgY = useParallax(heroRef as RefObject<HTMLElement>, { to: -120 })

  const expertiseRef = useRef<HTMLElement>(null)
  const expertiseBgY = useParallax(expertiseRef as RefObject<HTMLElement>, { to: -90 })

  const achievementRef = useRef<HTMLElement>(null)
  const achievementBgY = useParallax(achievementRef as RefObject<HTMLElement>, { to: -80 })

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden bg-background">
        {/* decorative depth — behind content, pointer-events-none */}
        <div aria-hidden className="grid-texture-dark pointer-events-none absolute inset-0" />
        <GlowOrb color={ACCENT} size={520} opacity={0.16} parallax={heroBgY} className="-top-32 -left-24" />
        <GlowOrb color={ACCENTS[3]} size={420} opacity={0.12} parallax={heroBgY} className="top-10 -right-28" />
        <AmbientShape
          variant="ring"
          color={ACCENT}
          size={560}
          opacity={0.08}
          parallax={heroBgY}
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Info */}
            <div>
              <Reveal
                as="span"
                y={12}
                className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block"
              >
                Founder &amp; CEO
              </Reveal>

              <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-4 text-foreground">
                <RevealText as="span" by="word" text="Vivek Vora" delay={0.1} className="inline-block" />
              </h1>

              <Reveal as="p" y={16} delay={0.25} className="text-xl text-muted-foreground mb-6">
                Full-Stack Developer &amp; Tech Entrepreneur
              </Reveal>

              <Reveal
                as="p"
                y={16}
                delay={0.35}
                className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto"
              >
                Empowering businesses with custom-built apps and high-performance solutions. I help businesses transform
                their operations by creating custom apps, high-performance systems, and modern technology workflows.
              </Reveal>

              <Stagger delayChildren={0.45} className="flex flex-wrap justify-center gap-4 mb-8">
                <StaggerItem y={16}>
                  <motion.div
                    whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
                    transition={{ duration: DUR.fast, ease: EASE_OUT }}
                    className="group relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
                  >
                    <ShineOverlay trigger="hover" tone="light" className="rounded-full" />
                    <Briefcase className="relative z-10 w-4 h-4 text-foreground" />
                    <span className="relative z-10 text-sm text-foreground">Founder, Vision Tech</span>
                  </motion.div>
                </StaggerItem>
                <StaggerItem y={16}>
                  <motion.div
                    whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
                    transition={{ duration: DUR.fast, ease: EASE_OUT }}
                    className="group relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
                  >
                    <ShineOverlay trigger="hover" tone="light" className="rounded-full" />
                    <Code2 className="relative z-10 w-4 h-4 text-foreground" />
                    <span className="relative z-10 text-sm text-foreground">Full-Stack Expert</span>
                  </motion.div>
                </StaggerItem>
              </Stagger>

              <Reveal y={16} delay={0.6}>
                <MagneticButton
                  as={Link}
                  href="mailto:madevisionstudios@gmail.com"
                  accent={ACCENT}
                  className="group relative overflow-hidden gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium"
                >
                  <ShineOverlay trigger="hover" tone="dark" className="rounded-full" />
                  <Mail className="relative z-10 w-4 h-4" />
                  <span className="relative z-10">Get in Touch</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Running Strip */}
      <RunningStrip text="FULL-STACK • AI • SAAS • ENTERPRISE" speed={25} />

      {/* Bio Section */}
      <section className="py-20 relative bg-background">
        <div className="container mx-auto px-6">
          <Reveal className="max-w-4xl mx-auto">
            <SpotlightCard tone="light" lift={-6} className="p-10 rounded-3xl bg-card border border-border">
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center"
                >
                  <GraduationCap className="w-6 h-6 text-background" />
                </motion.div>
                <h2 className="text-2xl font-serif text-foreground">About Me</h2>
              </div>
              <p className="relative z-10 text-lg text-muted-foreground leading-relaxed">
                {`I'm Vivek Vora, a Full-Stack Developer and Founder of Vision Tech, specializing in building smart,
                scalable digital solutions. I help businesses transform their operations by creating custom apps,
                high-performance systems, and modern technology workflows. With a deep focus on quality, automation, and
                user-centric design, I turn ideas into powerful products that drive real growth.`}
              </p>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* Large Text Marquee */}
      <LargeTextMarquee text="INNOVATION • EXCELLENCE • GROWTH" speed={35} />

      {/* Expertise Section */}
      <section ref={expertiseRef} className="py-24 relative overflow-hidden bg-background">
        <GlowOrb color={ACCENT} size={460} opacity={0.1} parallax={expertiseBgY} className="top-24 -right-32" />
        <AmbientShape
          variant="blob"
          color={ACCENTS[2]}
          size={520}
          opacity={0.06}
          parallax={expertiseBgY}
          className="-bottom-40 -left-32"
        />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal className="mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">
              Strong <GradientText animate>Expertise</GradientText> Areas
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertise.map((area, index) => (
              <StaggerItem key={area.title}>
                <SpotlightCard
                  tone="light"
                  accent={ACCENTS[index % ACCENTS.length]}
                  lift={-10}
                  className="h-full p-8 rounded-3xl bg-card border border-border"
                >
                  <div className="relative z-10 flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={reduce ? undefined : { rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                      className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center"
                    >
                      <area.icon className="w-7 h-7 text-background" />
                    </motion.div>
                    <h3 className="text-xl font-medium text-foreground">{area.title}</h3>
                  </div>
                  <ul className="relative z-10 space-y-3">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: ACCENTS[index % ACCENTS.length] }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Running Strip - Dark */}
      <RunningStrip text="VISION TECH • VIVEK VORA" reverse speed={20} dark />

      {/* Skills Cloud */}
      <section className="py-24 relative bg-background">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Technical Skills</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">
              Tech <GradientText animate>Stack</GradientText>
            </h2>
          </Reveal>

          <Stagger className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skills.map((skill) => (
              <StaggerItem key={skill} y={16}>
                <motion.span
                  whileHover={reduce ? undefined : { scale: 1.1, y: -5 }}
                  transition={{ type: SPRING_POP.type, stiffness: SPRING_POP.stiffness, damping: SPRING_POP.damping }}
                  className="group relative inline-flex overflow-hidden px-4 py-2 rounded-full bg-card border border-border text-sm hover:border-[#c8ff00]/50 transition-colors cursor-default text-foreground"
                >
                  <ShineOverlay trigger="hover" tone="light" className="rounded-full" />
                  <span className="relative z-10">{skill}</span>
                </motion.span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Achievement Section */}
      <section ref={achievementRef} className="py-24 relative overflow-hidden bg-secondary/30">
        <GlowOrb color={ACCENT} size={420} opacity={0.12} parallax={achievementBgY} className="-top-24 left-1/4" />
        <AmbientShape
          variant="ring"
          color={ACCENTS[0]}
          size={480}
          opacity={0.07}
          parallax={achievementBgY}
          className="-bottom-32 -right-24"
        />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal className="max-w-3xl mx-auto">
            <SpotlightCard
              tone="light"
              lift={-6}
              className="text-center p-10 rounded-3xl bg-card border border-border"
            >
              <motion.div
                whileHover={reduce ? undefined : { rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="relative z-10 w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-6"
              >
                <Award className="w-8 h-8 text-background" />
              </motion.div>
              <h2 className="relative z-10 text-3xl font-serif mb-6 text-foreground">Key Achievement</h2>
              <p className="relative z-10 text-lg text-muted-foreground leading-relaxed">
                Founded Vision Tech and delivered scalable digital solutions across multiple industries including retail,
                services, and SMBs. Leading a team of 14+ professionals to build enterprise-grade products that serve
                thousands of users daily.
              </p>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center p-16 rounded-3xl bg-foreground relative overflow-hidden">
              {/* slow orbital rings — transform-only, reduced-motion gated */}
              {!reduce && (
                <>
                  <motion.div
                    aria-hidden
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="pointer-events-none absolute top-0 right-0 w-80 h-80 border border-white/10 rounded-full -translate-y-1/2 translate-x-1/2"
                  />
                  <motion.div
                    aria-hidden
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 border border-white/10 rounded-full translate-y-1/2 -translate-x-1/2"
                  />
                </>
              )}
              {/* subtle lime glow + grid texture on the dark surface */}
              <GlowOrb color={ACCENT} size={520} opacity={0.16} pulse className="-bottom-40 left-1/2 -translate-x-1/2" />
              <div aria-hidden className="grid-texture pointer-events-none absolute inset-0 opacity-[0.04]" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-serif mb-6 text-background">
                  {"Let's Build Something "}
                  <GradientText tone="dark" animate as="span">
                    Great
                  </GradientText>
                  {" Together"}
                </h2>
                <p className="text-background/70 mb-6 max-w-xl mx-auto text-lg">
                  Have a project in mind? I would love to hear about it and explore how we can work together.
                </p>

                <AnimatedDivider accent={ACCENT} className="text-white/80 mx-auto mb-10 max-w-xs" />

                <div className="flex flex-wrap justify-center gap-4">
                  <MagneticButton
                    as={Link}
                    href="/contact"
                    accent={ACCENT}
                    className="group relative overflow-hidden gap-2 px-10 py-5 rounded-full bg-background text-foreground font-medium text-lg"
                  >
                    <ShineOverlay trigger="hover" tone="light" className="rounded-full" />
                    <span className="relative z-10">Start a Project</span>
                    <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </MagneticButton>
                  <MagneticButton
                    as={Link}
                    href="mailto:madevisionstudios@gmail.com"
                    glow={false}
                    className="group relative overflow-hidden gap-2 px-10 py-5 rounded-full border border-white/20 text-background text-lg hover:bg-white/10 transition-colors"
                  >
                    <ShineOverlay trigger="hover" tone="dark" className="rounded-full" />
                    <Mail className="relative z-10 w-5 h-5" />
                    <span className="relative z-10">Email Directly</span>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
