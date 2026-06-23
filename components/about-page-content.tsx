"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Target, Eye, Heart, Users, Award, Rocket, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef, type RefObject } from "react"
import { RunningStrip, LargeTextMarquee } from "./marquee-section"
import {
  ACCENT,
  ACCENTS,
  DUR,
  EASE_OUT,
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
  CountUp,
  useParallax,
} from "@/components/motion"

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description: "We constantly push boundaries to deliver cutting-edge solutions that keep our clients ahead.",
  },
  {
    icon: Eye,
    title: "Quality Focus",
    description: "Every line of code is crafted with precision, ensuring robust and scalable applications.",
  },
  {
    icon: Heart,
    title: "Client Success",
    description: "Your success is our success. We partner with you to achieve your business goals.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in transparent communication and working together as an extension of your team.",
  },
]

const milestones = [
  { year: "2019", title: "Founded", description: "Vision Tech was born with a mission to democratize technology" },
  { year: "2020", title: "First Product", description: "Launched Retailians POS, our flagship product" },
  { year: "2021", title: "Team Growth", description: "Expanded to a team of 10+ talented professionals" },
  { year: "2022", title: "Enterprise", description: "Released 911 Wrap ERP for enterprise clients" },
  { year: "2023", title: "AI Integration", description: "Integrated AI capabilities across all products" },
  { year: "2024", title: "Expansion", description: "Serving clients across multiple industries and regions" },
]

export default function AboutPageContent() {
  const reduceMotion = useReducedMotion()

  const heroRef = useRef<HTMLElement>(null)
  const heroParallaxRef = heroRef as RefObject<HTMLElement>
  const heroOrbY = useParallax(heroParallaxRef, { to: -120 })
  const heroShapeY = useParallax(heroParallaxRef, { to: 80 })

  const mvRef = useRef<HTMLElement>(null)
  const mvOrbY = useParallax(mvRef as RefObject<HTMLElement>, { to: -90 })

  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineFillY = useParallax(timelineRef as RefObject<HTMLElement>, {
    from: 0,
    to: 1,
    offset: ["start center", "end center"],
  })

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 relative overflow-hidden bg-background">
        {/* Decorative layers (pointer-events-none, behind z-10 content) */}
        <div className="grid-texture-dark absolute inset-0 pointer-events-none" aria-hidden />
        <GlowOrb color={ACCENT} size={520} opacity={0.16} parallax={heroOrbY} className="-top-32 -left-24" />
        <AmbientShape
          variant="ring"
          color={ACCENT}
          size={560}
          opacity={0.08}
          parallax={heroShapeY}
          className="-top-20 -right-32"
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <Reveal as="span" y={12} className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              About Us
            </Reveal>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal mt-4 mb-6 text-foreground">
              <RevealText
                as="span"
                by="word"
                text="Building the"
                className="inline"
              />{" "}
              <GradientText tone="light" animate className="italic">
                Future
              </GradientText>
              <br />
              <RevealText as="span" by="word" delay={0.18} text="of Technology" className="inline" />
            </h1>
            <Reveal as="p" y={16} delay={0.3} className="text-lg text-muted-foreground max-w-xl">
              Vision Tech delivers advanced AI-powered SaaS products and enterprise-grade ERP systems designed for
              modern businesses.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Running Strip */}
      <RunningStrip text="INNOVATION • QUALITY • EXCELLENCE • GROWTH" speed={25} />

      {/* Mission & Vision */}
      <section ref={mvRef} className="py-24 bg-background relative overflow-hidden">
        <GlowOrb color={ACCENT} size={460} opacity={0.1} parallax={mvOrbY} className="top-1/3 -right-40" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal y={32}>
              <SpotlightCard tone="light" className="h-full p-10 rounded-3xl bg-secondary/50 border border-border">
                <motion.div
                  whileHover={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: DUR.slow, ease: EASE_OUT }}
                  className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-6"
                >
                  <Rocket className="w-7 h-7 text-background" />
                </motion.div>
                <h2 className="text-3xl font-serif mb-4 text-foreground">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To empower businesses of all sizes with intelligent, scalable technology solutions that drive growth,
                  efficiency, and innovation. We strive to make enterprise-grade technology accessible and affordable.
                </p>
              </SpotlightCard>
            </Reveal>

            <Reveal y={32} delay={0.1}>
              <SpotlightCard
                tone="light"
                accent={ACCENTS[1]}
                className="h-full p-10 rounded-3xl bg-secondary/50 border border-border"
              >
                <motion.div
                  whileHover={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: DUR.slow, ease: EASE_OUT }}
                  className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-6"
                >
                  <Eye className="w-7 h-7 text-background" />
                </motion.div>
                <h2 className="text-3xl font-serif mb-4 text-foreground">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To become the leading technology partner for businesses worldwide, known for our innovative solutions,
                  exceptional quality, and unwavering commitment to client success.
                </p>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Large Text Marquee */}
      <LargeTextMarquee text="VISION TECH • SINCE 2019" speed={30} />

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <Reveal as="span" y={12} className="text-sm uppercase tracking-[0.3em] text-muted-foreground block">
              Our Values
            </Reveal>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">
              What <GradientText tone="light">Drives Us</GradientText>
            </h2>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <SpotlightCard
                  tone="light"
                  className="h-full p-8 rounded-2xl bg-card border border-border hover:border-foreground/20"
                >
                  <motion.div
                    whileHover={reduceMotion ? undefined : { rotate: 360, scale: 1.1 }}
                    transition={{ duration: DUR.slow, ease: EASE_OUT }}
                    className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-6"
                  >
                    <value.icon className="w-7 h-7 text-background" />
                  </motion.div>
                  <h3 className="text-xl font-medium mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Running Strip - Reverse */}
      <RunningStrip text="INNOVATION • TECHNOLOGY • EXCELLENCE" reverse speed={20} dark />

      {/* Timeline Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <Reveal as="span" y={12} className="text-sm uppercase tracking-[0.3em] text-muted-foreground block">
              Our Journey
            </Reveal>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">Milestones</h2>
          </div>

          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* Timeline line — base track */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
            {/* Timeline line — scroll-scrubbed lime fill (scaleY, transform-only, origin top) */}
            <motion.div
              aria-hidden
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 origin-top"
              style={{
                scaleY: reduceMotion ? 1 : timelineFillY,
                background: `linear-gradient(to bottom, ${ACCENT}, transparent)`,
              }}
            />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: DUR.base, ease: EASE_OUT }}
                  className={`relative flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div
                    className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}
                  >
                    <SpotlightCard
                      tone="light"
                      className="inline-block p-6 rounded-2xl bg-card border border-border hover:border-foreground/20"
                    >
                      <span className="text-4xl font-serif text-foreground">{milestone.year}</span>
                      <h3 className="text-xl font-medium mt-2 text-foreground">{milestone.title}</h3>
                      <p className="text-muted-foreground mt-2">{milestone.description}</p>
                    </SpotlightCard>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                    whileHover={reduceMotion ? undefined : { scale: 1.5 }}
                    className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-foreground md:-translate-x-1/2 border-4 border-background"
                  >
                    {!reduceMotion && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full"
                        style={{ background: ACCENT }}
                        animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
                      />
                    )}
                  </motion.div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <SpotlightCard tone="light" className="h-full text-center p-10 rounded-3xl bg-card border border-border">
                <motion.div
                  whileHover={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: DUR.slow, ease: EASE_OUT }}
                  className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-6"
                >
                  <Users className="w-8 h-8 text-background" />
                </motion.div>
                <CountUp value={14} suffix="+" className="block text-5xl font-serif text-foreground mb-2" />
                <p className="text-muted-foreground text-lg">Team Members</p>
              </SpotlightCard>
            </StaggerItem>

            <StaggerItem>
              <SpotlightCard tone="light" className="h-full text-center p-10 rounded-3xl bg-card border border-border">
                <motion.div
                  whileHover={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: DUR.slow, ease: EASE_OUT }}
                  className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-6"
                >
                  <Award className="w-8 h-8 text-background" />
                </motion.div>
                <CountUp value={5} suffix="+" className="block text-5xl font-serif text-foreground mb-2" />
                <p className="text-muted-foreground text-lg">Years Experience</p>
              </SpotlightCard>
            </StaggerItem>

            <StaggerItem>
              <SpotlightCard tone="light" className="h-full text-center p-10 rounded-3xl bg-card border border-border">
                <motion.div
                  whileHover={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: DUR.slow, ease: EASE_OUT }}
                  className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-6"
                >
                  <MapPin className="w-8 h-8 text-background" />
                </motion.div>
                <div className="text-2xl font-medium text-foreground mb-2">Rajkot, India</div>
                <p className="text-muted-foreground text-lg">Headquarters</p>
              </SpotlightCard>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DUR.base, ease: EASE_OUT }}
            className="dark-section text-center p-16 rounded-3xl bg-foreground relative overflow-hidden"
          >
            {/* Decorative layers (pointer-events-none, behind z-10 content) */}
            <div className="grid-texture absolute inset-0 pointer-events-none" aria-hidden />
            <GlowOrb color={ACCENT} size={420} opacity={0.22} className="-bottom-32 -left-24" />
            {!reduceMotion && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute top-0 right-0 w-80 h-80 border border-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
                aria-hidden
              />
            )}
            <ShineOverlay tone="dark" repeatDelay={5} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif mb-6 text-background">
                Meet Our <GradientText tone="dark">Founder</GradientText>
              </h2>
              <p className="text-background/70 mb-10 max-w-xl mx-auto text-lg">
                Learn more about the visionary behind Vision Tech and his journey in technology.
              </p>
              <MagneticButton
                as={Link}
                href="/founder"
                accent={ACCENT}
                glow={false}
                className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-background text-foreground font-medium hover:bg-background/90 text-lg"
              >
                View Founder Profile
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
