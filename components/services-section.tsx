"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useRef, type RefObject } from "react"
import {
  Brain,
  Cloud,
  Code2,
  Database,
  Smartphone,
  Shield,
  Layers,
  Plug,
  Palette,
  Globe,
  Headphones,
  Settings,
} from "lucide-react"
import {
  ACCENT,
  ACCENTS,
  AmbientShape,
  AnimatedDivider,
  GlowOrb,
  GradientText,
  Reveal,
  SpotlightCard,
  Stagger,
  StaggerItem,
  SPRING_POP,
  useParallax,
} from "@/components/motion"

const services = [
  { icon: Brain, title: "AI Solutions", description: "Intelligent automation and machine learning solutions" },
  { icon: Cloud, title: "SaaS Development", description: "Scalable cloud-based software applications" },
  { icon: Database, title: "ERP/CRM Systems", description: "Enterprise resource planning and customer management" },
  { icon: Code2, title: "Full-Stack Development", description: "End-to-end web application development" },
  { icon: Smartphone, title: "Mobile Apps", description: "Native and cross-platform mobile solutions" },
  { icon: Settings, title: "Cloud & DevOps", description: "Infrastructure automation and deployment" },
  { icon: Shield, title: "Cybersecurity", description: "Advanced security solutions and audits" },
  { icon: Layers, title: "Custom Software", description: "Tailored software solutions for your needs" },
  { icon: Plug, title: "API Integrations", description: "Seamless third-party integrations" },
  { icon: Palette, title: "UI/UX Design", description: "User-centric design and experiences" },
  { icon: Globe, title: "Website Development", description: "Modern, responsive web solutions" },
  { icon: Headphones, title: "IT Support", description: "24/7 technical support and maintenance" },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Layered parallax for the decorative background — dependency-safe,
  // replaces the vanilla scroll-3d-element shapes with AmbientShape.
  const parallaxRef = sectionRef as RefObject<HTMLElement>
  const slowY = useParallax(parallaxRef, { to: -120 })
  const fastY = useParallax(parallaxRef, { to: -64 })

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      {/* faint architectural grid (light-section variant) */}
      <div aria-hidden className="grid-texture-dark absolute inset-0 opacity-[0.5] pointer-events-none" />

      {/* ambient depth — lime stays the signature, sky used as a subtle accent */}
      <GlowOrb
        color={ACCENT}
        size={520}
        opacity={0.1}
        parallax={slowY}
        className="-top-40 -left-32"
      />
      <AmbientShape
        variant="ring"
        color={ACCENT}
        size={300}
        opacity={0.18}
        parallax={slowY}
        className="top-16 -left-24"
      />
      <AmbientShape
        variant="blob"
        color={ACCENTS[1]}
        size={260}
        opacity={0.14}
        parallax={fastY}
        className="bottom-16 -right-24"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <Reveal
            as="span"
            y={16}
            className="block text-sm text-muted-foreground uppercase tracking-widest"
          >
            Our Services
          </Reveal>
          <Reveal as="h2" delay={0.08} className="font-serif text-4xl md:text-6xl font-normal mt-4">
            End-to-End <GradientText animate>IT Solutions</GradientText>
          </Reveal>
          <AnimatedDivider className="text-foreground mt-8 max-w-xs" />
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <SpotlightCard
                tone="light"
                className="h-full p-6 rounded-2xl bg-secondary/50"
              >
                <motion.div
                  className="relative z-10 w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-4"
                  whileHover={reduce ? undefined : { scale: 1.15, rotate: 5 }}
                  transition={SPRING_POP}
                >
                  <service.icon className="w-5 h-5 text-background" />
                </motion.div>
                <h3 className="relative z-10 text-lg font-medium mb-2 text-foreground">{service.title}</h3>
                <p className="relative z-10 text-sm text-muted-foreground">{service.description}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
