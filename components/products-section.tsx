"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useRef, type RefObject } from "react"
import { ArrowUpRight, ShoppingCart, Building2 } from "lucide-react"
import Link from "next/link"
import {
  ACCENT,
  ACCENTS,
  AmbientShape,
  AnimatedDivider,
  GlowOrb,
  GradientText,
  Reveal,
  ShineOverlay,
  SpotlightCard,
  Stagger,
  StaggerItem,
  SPRING_POP,
  useParallax,
} from "@/components/motion"

const products = [
  {
    icon: ShoppingCart,
    title: "Retailians POS",
    description:
      "Empowering thousands of retail business owners across India to embrace technology and streamline operations.One platform, infinite possibilities!",
    number: "01",
  },
  {
    icon: Building2,
    title: "911 Wrap ERP",
    description:
      "9-Eleven Wrap ERP delivers cutting-edge ERP solutions for automobile dealerships and custom wrap studios. From order management to profit analytics - everything you need to dominate the automotive market.",
    number: "02",
  },
]

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Layered parallax for the decorative background — dependency-safe,
  // replaces the vanilla scroll-3d-element with AmbientShape/GlowOrb.
  const parallaxRef = sectionRef as RefObject<HTMLElement>
  const slowY = useParallax(parallaxRef, { to: -120 })
  const fastY = useParallax(parallaxRef, { to: -64 })
  const watermarkY = useParallax(parallaxRef, { from: 40, to: -40 })

  return (
    <section ref={sectionRef} className="py-32 dark-section relative overflow-hidden">
      {/* faint architectural grid (dark-section variant) */}
      <div aria-hidden className="grid-texture absolute inset-0 pointer-events-none" />

      {/* ambient depth — lime stays the signature, violet a subtle accent */}
      <GlowOrb color={ACCENT} size={520} opacity={0.14} parallax={slowY} className="-top-40 right-0" />
      <AmbientShape
        variant="mesh"
        color="#ffffff"
        size={400}
        opacity={0.08}
        parallax={slowY}
        className="top-1/4 -right-32 hidden md:block"
      />
      <AmbientShape
        variant="blob"
        color={ACCENTS[3]}
        size={280}
        opacity={0.12}
        parallax={fastY}
        className="bottom-10 -left-24"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <Reveal
            as="span"
            y={16}
            className="block text-sm text-white/50 uppercase tracking-widest"
          >
            Our Products
          </Reveal>
          <Reveal as="h2" delay={0.08} className="font-serif text-4xl md:text-6xl font-normal mt-4 text-white">
            SaaS & <GradientText tone="dark" animate>Enterprise Solutions</GradientText>
          </Reveal>
          <AnimatedDivider className="text-white mt-8 max-w-xs" />
        </div>

        <Stagger className="space-y-0">
          {products.map((product) => (
            <StaggerItem key={product.title}>
              <SpotlightCard
                href="/products"
                tone="dark"
                lift={-4}
                className="group block border-t border-white/10 py-10 px-2 -mx-2 rounded-xl"
              >
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* giant ghost watermark number — bespoke parallax depth */}
                  <motion.span
                    aria-hidden
                    style={reduce ? undefined : { y: watermarkY }}
                    className="pointer-events-none absolute -top-6 right-0 lg:right-20 font-serif text-7xl md:text-9xl leading-none text-white/[0.04] select-none"
                  >
                    {product.number}
                  </motion.span>

                  <motion.span
                    className="text-sm text-white/40 font-mono lg:w-16 transition-colors duration-300 group-hover:text-[#c8ff00]"
                    whileHover={reduce ? undefined : { scale: 1.2 }}
                    transition={SPRING_POP}
                  >
                    {product.number}
                  </motion.span>

                  <div className="flex-1">
                    <h3 className="relative inline-flex items-center text-2xl md:text-4xl font-serif text-white mb-4 transition-colors duration-500 group-hover:text-[#c8ff00]">
                      <motion.span
                        className="inline-flex items-center gap-3"
                        whileHover={reduce ? undefined : { x: 10 }}
                        transition={SPRING_POP}
                      >
                        <product.icon className="w-6 h-6 md:w-7 md:h-7 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                        {product.title}
                      </motion.span>
                    </h3>
                    <p className="text-white/60 max-w-2xl text-lg">{product.description}</p>
                  </div>

                  {/* The whole row is the Link (SpotlightCard) — this round
                      arrow is a decorative affordance whose hover state is
                      carried by the parent `group` (no nested anchor). */}
                  <span className="shrink-0 relative inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/20 text-white overflow-hidden transition-colors duration-300 group-hover:bg-[#c8ff00] group-hover:border-[#c8ff00] group-hover:text-black">
                    <ShineOverlay trigger="hover" tone="dark" className="rounded-full" />
                    <ArrowUpRight className="relative z-10 w-5 h-5 transition-transform duration-300 ease-out group-hover:rotate-45" />
                  </span>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
