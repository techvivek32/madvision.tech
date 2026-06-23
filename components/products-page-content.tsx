"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ShoppingCart, Building2, CheckCircle2, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRef, type RefObject } from "react"
import { RunningStrip, LargeTextMarquee } from "./marquee-section"
import {
  ACCENT,
  DUR,
  EASE_OUT,
  CountUp,
  GlowOrb,
  GradientText,
  MagneticButton,
  Reveal,
  RevealText,
  ShineOverlay,
  SpotlightCard,
  Stagger,
  StaggerItem,
  TiltCard,
  useParallax,
} from "@/components/motion"

const products = [
  {
    icon: ShoppingCart,
    name: "Retailians POS",
    tagline: "Modern Point of Sale for Retail",
    description:
      "Empowering thousands of retail business owners across India to embrace technology and streamline operations.Oneplatform, infinite possibilities!",
    features: [
      "Lightning-fast billing system",
      "Real-time inventory tracking",
      "GST-compliant reports",
      "Customer loyalty programs",
      "Offline mode support",
    ],
    image: "/modern-pos-system-dashboard.jpg",
  },
  {
    icon: Building2,
    name: "911 Wrap ERP",
    tagline: "Complete Enterprise Resource Planning",
    description:
      "9-Eleven Wrap ERP delivers cutting-edge ERP solutions for automobile dealerships and custom wrap studios. From order management to profit analytics - everything you need to dominate the automotive market.",
    features: [
      "Operations management",
      "Inventory control",
      "Accounts & billing",
      "Workflow automation",
      "Secure cloud access",
      "Multi-user roles",
    ],
    image: "/enterprise-erp-software-interface.jpg",
  },
]

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  // Parallax drift on the image column; frozen under reduced-motion.
  const rawY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y = reduce ? 0 : rawY
  // One-way scroll-scrubbed entrance — stays fully visible once revealed
  // (no fade-out tail, so the CTA/title never disappear on scroll).
  const rawOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1])
  const opacity = reduce ? 1 : rawOpacity

  const accent = ACCENT
  const Icon = product.icon

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Product Info */}
      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
        <Reveal y={28} className="inline-block">
          <motion.div
            whileHover={reduce ? undefined : { scale: 1.04 }}
            transition={{ duration: DUR.fast, ease: EASE_OUT }}
            className="group relative inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6 overflow-hidden"
          >
            <ShineOverlay trigger="hover" tone="light" className="rounded-full" />
            <Icon className="relative z-10 w-5 h-5 text-foreground" />
            <span className="relative z-10 text-sm font-medium text-foreground">{product.tagline}</span>
          </motion.div>
        </Reveal>

        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
          <RevealText as="span" by="word" text={product.name} className="block" />
        </h2>

        <Reveal as="p" y={16} delay={0.1} className="text-muted-foreground mb-8 leading-relaxed text-lg">
          {product.description}
        </Reveal>

        <Stagger as="ul" className="space-y-3 mb-8">
          {product.features.slice(0, 4).map((feature) => (
            <StaggerItem as="li" key={feature} y={16} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-foreground shrink-0" />
              <span className="text-foreground">{feature}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="inline-block">
          <MagneticButton
            as={Link}
            href={product.name === "Retailians POS" ? "https://retailians.com/" : "https://911wraperp.space/"}
            accent={accent}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium overflow-hidden"
          >
            <ShineOverlay trigger="hover" tone="dark" className="rounded-full" />
            <span className="relative z-10">Request Demo</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
        </Reveal>
      </div>

      {/* Product Image */}
      <motion.div style={{ y }} className={index % 2 === 1 ? "lg:order-1" : ""}>
        <Reveal y={0} duration={DUR.slow}>
          <TiltCard max={7} scale={1.02} className="rounded-2xl overflow-hidden border border-border shadow-2xl">
            <div className="relative">
              <div className="aspect-[4/3] bg-secondary">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              {/* Lime accent edge glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 0 1px ${accent}55, 0 0 40px ${accent}22` }}
              />
              {/* Periodic sheen sweep across the showcase */}
              <ShineOverlay tone="dark" repeatDelay={6} className="rounded-2xl" />
            </div>
          </TiltCard>
        </Reveal>
      </motion.div>
    </motion.div>
  )
}

export default function ProductsPageContent() {
  const heroRef = useRef<HTMLElement>(null)
  const heroOrbY = useParallax(heroRef as RefObject<HTMLElement>, { to: -120 })

  const statsRef = useRef<HTMLElement>(null)
  const statsOrbY = useParallax(statsRef as RefObject<HTMLElement>, { to: -90 })

  const stats = [
    { value: 99.9, decimals: 1, suffix: "%", label: "Uptime", description: "Enterprise-grade reliability" },
    { value: 4.8, decimals: 1, suffix: "K", label: "Users", description: "Scalable architecture" },
    { display: "24/7", label: "Support", description: "Always available help" },
  ] as const

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 relative overflow-hidden bg-background">
        {/* decorative layers — behind content, pointer-events-none */}
        <div aria-hidden className="absolute inset-0 grid-texture-dark opacity-60" />
        <GlowOrb color={ACCENT} size={520} opacity={0.14} parallax={heroOrbY} className="-top-32 -left-24" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <Reveal y={16} className="inline-flex items-center gap-2 mb-4">
              <FloatingSparkle />
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Our Products</span>
            </Reveal>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal mt-4 mb-6 text-foreground">
              Powerful{" "}
              <GradientText animate as="span" className="italic">
                SaaS
              </GradientText>
              <br />
              Solutions
            </h1>

            <Reveal as="p" y={16} delay={0.15} className="text-lg text-muted-foreground max-w-xl">
              Scalable, enterprise-grade products designed to transform your business operations and drive growth.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Running Strip */}
      <RunningStrip text="RETAILIANS POS • 911 WRAP ERP • ENTERPRISE SOLUTIONS" speed={25} />

      {/* Products Section */}
      <section className="bg-background">
        <div className="container mx-auto px-6">
          {products.map((product, index) => (
            <div key={product.name}>
              <ProductCard product={product} index={index} />
              {index < products.length - 1 && <div className="border-t border-border" />}
            </div>
          ))}
        </div>
      </section>

      {/* Large Text Marquee */}
      <LargeTextMarquee text="ENTERPRISE GRADE • SCALABLE • SECURE" speed={35} />

      {/* Why Choose Section */}
      <section ref={statsRef} className="py-24 bg-background relative overflow-hidden">
        <GlowOrb color={ACCENT} size={460} opacity={0.1} parallax={statsOrbY} className="top-1/3 -right-24" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Reveal as="span" y={12} className="block text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Why Choose Us
            </Reveal>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">
              <RevealText as="span" by="word" text="Built for Scale" className="block" />
            </h2>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} y={30}>
                <SpotlightCard
                  tone="light"
                  accent={ACCENT}
                  lift={-10}
                  className="text-center p-10 rounded-2xl bg-card border border-border"
                >
                  <div className="relative z-10 text-6xl font-serif text-foreground mb-2">
                    {"display" in stat ? (
                      stat.display
                    ) : (
                      <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="relative z-10 text-lg font-medium text-foreground mb-1">{stat.label}</div>
                  <p className="relative z-10 text-sm text-muted-foreground">{stat.description}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Running Strip - Reverse */}
      <RunningStrip text="VISION TECH • YOUR TECHNOLOGY PARTNER" reverse speed={20} dark />

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <Reveal y={0} duration={DUR.slow}>
            <motion.div
              initial={{ scale: 0.97 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DUR.slow, ease: EASE_OUT }}
              className="text-center p-16 rounded-3xl bg-foreground text-background relative overflow-hidden"
            >
              {/* Animated background rings */}
              <RotatingRing className="top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2" duration={50} dir={1} />
              <RotatingRing
                className="bottom-0 left-0 w-64 h-64 translate-y-1/2 -translate-x-1/2"
                duration={40}
                dir={-1}
              />
              {/* Lime depth glow */}
              <GlowOrb color={ACCENT} size={480} opacity={0.2} className="-bottom-40 left-1/2 -translate-x-1/2" />
              {/* Periodic sheen across the panel */}
              <ShineOverlay tone="dark" repeatDelay={5} className="rounded-3xl" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-serif mb-6">
                  Ready to <GradientText tone="dark" as="span">Transform Your Business</GradientText>?
                </h2>
                <p className="text-background/70 mb-10 max-w-xl mx-auto text-lg">
                  Get a personalized demo and see how our products can streamline your operations.
                </p>
                <MagneticButton
                  as={Link}
                  href="/contact"
                  accent={ACCENT}
                  className="group relative inline-flex items-center gap-2 px-10 py-5 rounded-full bg-background text-foreground font-medium text-lg overflow-hidden"
                >
                  <ShineOverlay trigger="hover" tone="light" className="rounded-full" />
                  <span className="relative z-10">Schedule Demo</span>
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/* Reduced-motion-aware gentle float for the hero Sparkles accent. */
function FloatingSparkle() {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden
      animate={reduce ? undefined : { y: [0, -3, 0], rotate: [0, 8, 0] }}
      transition={reduce ? undefined : { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      className="inline-flex"
    >
      <Sparkles className="w-4 h-4 text-foreground" />
    </motion.span>
  )
}

/* Decorative rotating ring — reuses the CTA's original look, but the spin
   is disabled under reduced-motion for accessibility. */
function RotatingRing({ className, duration, dir }: { className: string; duration: number; dir: 1 | -1 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      animate={reduce ? undefined : { rotate: 360 * dir }}
      transition={reduce ? undefined : { duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      className={`pointer-events-none absolute border border-white/10 rounded-full ${className}`}
    />
  )
}
