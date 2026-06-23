"use client"

import { useRef, type RefObject } from "react"
import { motion, useReducedMotion } from "framer-motion"
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
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { RunningStrip, LargeTextMarquee } from "./marquee-section"
import {
  ACCENT,
  DUR,
  EASE_OUT,
  SPRING_POP,
  Reveal,
  RevealText,
  Stagger,
  StaggerItem,
  GradientText,
  SpotlightCard,
  MagneticButton,
  ShineOverlay,
  GlowOrb,
  AmbientShape,
  AnimatedDivider,
  useParallax,
} from "@/components/motion"

const services = [
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Intelligent automation and machine learning solutions for smarter business operations.",
    features: ["Custom AI Models", "Machine Learning", "Natural Language Processing", "Predictive Analytics"],
  },
  {
    icon: Cloud,
    title: "SaaS Development",
    description: "Scalable cloud-based software applications built for growth and performance.",
    features: ["Multi-tenant Architecture", "API-First Design", "Auto-scaling", "Usage Analytics"],
  },
  {
    icon: Database,
    title: "ERP/CRM Systems",
    description: "Enterprise resource planning and customer management systems tailored to your workflow.",
    features: ["Custom Workflows", "Real-time Reports", "Multi-department Integration", "Data Migration"],
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end web application development with modern technologies and best practices.",
    features: ["React/Next.js", "Node.js/Python", "Database Design", "API Development"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile solutions for iOS and Android platforms.",
    features: ["React Native", "Flutter", "iOS/Android Native", "App Store Optimization"],
  },
  {
    icon: Settings,
    title: "Cloud & DevOps",
    description: "Infrastructure automation, CI/CD pipelines, and cloud deployment solutions.",
    features: ["AWS/GCP/Azure", "Docker/Kubernetes", "CI/CD Pipelines", "Infrastructure as Code"],
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Advanced security solutions, audits, and compliance implementations.",
    features: ["Security Audits", "Penetration Testing", "Compliance (SOC2, GDPR)", "Zero-Trust Architecture"],
  },
  {
    icon: Layers,
    title: "Custom Software",
    description: "Tailored software solutions designed specifically for your unique business needs.",
    features: ["Requirements Analysis", "Custom Architecture", "Scalable Solutions", "Ongoing Support"],
  },
  {
    icon: Plug,
    title: "API Integrations",
    description: "Seamless third-party integrations and custom API development.",
    features: ["REST/GraphQL APIs", "Payment Gateways", "CRM Integrations", "Data Sync"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centric design and experiences that drive engagement and conversions.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Modern, responsive web solutions optimized for performance and SEO.",
    features: ["Responsive Design", "SEO Optimization", "Performance Tuning", "CMS Integration"],
  },
  {
    icon: Headphones,
    title: "IT Support & Maintenance",
    description: "24/7 technical support, monitoring, and maintenance services.",
    features: ["24/7 Monitoring", "Bug Fixes", "Performance Optimization", "Security Updates"],
  },
]

const processSteps = [
  { step: "01", title: "Discovery", description: "Understanding your business needs and goals" },
  { step: "02", title: "Strategy", description: "Creating a comprehensive project roadmap" },
  { step: "03", title: "Development", description: "Building with agile methodology and best practices" },
  { step: "04", title: "Delivery", description: "Deploying, testing, and providing ongoing support" },
]

export default function ServicesPageContent() {
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)

  const heroOrbY = useParallax(heroRef as RefObject<HTMLElement>, { to: -120 })
  const processOrbY = useParallax(processRef as RefObject<HTMLElement>, { to: -90 })

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 relative overflow-hidden bg-background">
        {/* decorative layers — pointer-events-none, behind z-10 */}
        <div aria-hidden className="grid-texture-dark absolute inset-0" />
        <GlowOrb color={ACCENT} size={520} opacity={0.1} parallax={heroOrbY} className="-top-32 -left-24" />
        <GlowOrb color={ACCENT} size={360} opacity={0.07} parallax={heroOrbY} className="top-10 right-[-6rem]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <Reveal
              as="span"
              y={12}
              className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block"
            >
              Our Services
            </Reveal>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal mt-4 mb-6 text-foreground">
              <RevealText as="span" by="word" text="Comprehensive" delay={0.05} className="inline" />{" "}
              <GradientText animate as="span" className="italic">
                IT
              </GradientText>
              <br />
              <RevealText as="span" by="word" text="Solutions" delay={0.18} className="inline" />
            </h1>
            <Reveal as="p" y={16} delay={0.3} className="text-lg text-muted-foreground max-w-xl">
              We deliver end-to-end technology solutions tailored to every business need.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Running Strip */}
      <RunningStrip text="AI • SAAS • ERP • MOBILE • WEB • CLOUD" speed={25} />

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <SpotlightCard
                  tone="light"
                  accent={ACCENT}
                  className="group/card h-full p-8 rounded-2xl bg-card border border-border"
                >
                  <motion.div
                    whileHover={reduce ? undefined : { rotate: 360, scale: 1.1 }}
                    transition={{ duration: DUR.slow, ease: EASE_OUT }}
                    className="relative z-10 w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-6"
                  >
                    <service.icon className="w-7 h-7 text-background" />
                  </motion.div>
                  <h3 className="relative z-10 text-xl font-medium mb-3 text-foreground">{service.title}</h3>
                  <p className="relative z-10 text-muted-foreground mb-6 text-sm">{service.description}</p>
                  <ul className="relative z-10 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-foreground shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Large Text Marquee */}
      <LargeTextMarquee text="YOUR TECHNOLOGY PARTNER" speed={35} />

      {/* Process Section */}
      <section ref={processRef} className="py-24 relative overflow-hidden bg-background">
        <GlowOrb color={ACCENT} size={420} opacity={0.07} parallax={processOrbY} className="top-1/3 right-[-8rem]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-16">
            <Reveal as="span" y={12} className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Our Process
            </Reveal>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">
              <RevealText as="span" by="word" text="How We" delay={0.05} className="inline" />{" "}
              <GradientText animate as="span">
                Work
              </GradientText>
            </h2>
            <AnimatedDivider accent={ACCENT} className="text-foreground mt-8 max-w-xs" />
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((item) => (
              <StaggerItem key={item.step}>
                <SpotlightCard
                  tone="light"
                  accent={ACCENT}
                  className="h-full text-center p-8 rounded-2xl bg-card border border-border"
                >
                  <motion.div
                    initial={reduce ? false : { scale: 0, opacity: 0 }}
                    whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={SPRING_POP}
                    className="relative z-10 text-6xl font-serif text-foreground/10 mb-4"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="relative z-10 text-xl font-medium mb-2 text-foreground">{item.title}</h3>
                  <p className="relative z-10 text-sm text-muted-foreground">{item.description}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Running Strip - Dark */}
      <RunningStrip text="VISION TECH • EXCELLENCE • INNOVATION" reverse speed={20} dark />

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DUR.base, ease: EASE_OUT }}
            className="dark-section text-center p-16 rounded-3xl bg-foreground relative overflow-hidden"
          >
            {/* decorative — pointer-events-none, behind content */}
            <div aria-hidden className="grid-texture absolute inset-0 opacity-50" />
            <GlowOrb color={ACCENT} size={420} opacity={0.16} className="-top-24 right-[-4rem]" />
            <AmbientShape
              variant="ring"
              color="#ffffff"
              size={320}
              opacity={0.1}
              className="top-0 right-0 -translate-y-1/2 translate-x-1/2"
            />
            <AmbientShape
              variant="ring"
              color={ACCENT}
              size={256}
              opacity={0.12}
              className="bottom-0 left-0 translate-y-1/2 -translate-x-1/2"
            />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif mb-6 text-background">
                Ready to <GradientText tone="dark" animate as="span">Get Started?</GradientText>
              </h2>
              <Reveal as="p" y={16} delay={0.1} className="text-background/70 mb-10 max-w-xl mx-auto text-lg">
                {"Let's discuss how our services can help transform your business."}
              </Reveal>
              <MagneticButton
                as={Link}
                href="/contact"
                accent={ACCENT}
                className="group relative overflow-hidden gap-2 px-10 py-5 rounded-full bg-background text-foreground font-medium text-lg"
              >
                <ShineOverlay trigger="hover" tone="light" className="rounded-full" />
                <span className="relative z-10 inline-flex items-center gap-2">
                  Contact Us
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
