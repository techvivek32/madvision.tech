"use client"

import { useRef, type RefObject } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import {
  ACCENT,
  DUR,
  EASE_OUT,
  Reveal,
  Stagger,
  StaggerItem,
  GradientText,
  ShineOverlay,
  GlowOrb,
  MagneticButton,
  useParallax,
} from "@/components/motion"

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "Retailians POS", href: "/products" },
    { label: "911 Wrap ERP", href: "/products" },
    { label: "DSAT Guru – Smart SAT", href: "/products" },
  ],
}

export default function Footer() {
  const bannerRef = useRef<HTMLDivElement>(null)
  const orbY = useParallax(bannerRef as RefObject<HTMLElement>, { to: -80 })

  return (
    <footer className="bg-foreground text-background overflow-hidden">
      {/* Large animated text banner */}
      <div ref={bannerRef} className="relative py-16 border-b border-white/10 overflow-hidden">
        {/* Decorative depth layers — behind content, never interactive */}
        <div aria-hidden className="absolute inset-0 grid-texture pointer-events-none" />
        <GlowOrb color={ACCENT} size={520} opacity={0.16} parallax={orbY} className="-top-40 -right-24" />

        <Reveal className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <Reveal as="p" y={12} className="text-white/40 text-sm uppercase tracking-widest mb-4">
                Ready to start?
              </Reveal>
              <Reveal
                as="h2"
                y={20}
                delay={0.08}
                duration={DUR.slow}
                className="relative text-4xl md:text-6xl font-serif text-white"
              >
                <ShineOverlay tone="dark" delay={0.6} repeatDelay={6} />
                <span className="relative z-10">
                  {"Let's build"}
                  <br />
                  <GradientText tone="dark" as="span" className="italic">
                    something great.
                  </GradientText>
                </span>
              </Reveal>
            </div>
            <Reveal delay={0.18} y={16}>
              <MagneticButton
                as={Link}
                href="/contact"
                accent="#ffffff"
                className="group relative overflow-hidden gap-3 px-8 py-4 rounded-full bg-white text-foreground font-medium"
              >
                <ShineOverlay trigger="hover" tone="light" />
                <span className="relative z-10">Get in Touch</span>
                <ArrowUpRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </MagneticButton>
            </Reveal>
          </div>
        </Reveal>
      </div>

      {/* Running strip */}
      <div className="py-4 overflow-hidden border-b border-white/10 mask-fade-x">
        <motion.div className="flex whitespace-nowrap animate-marquee" style={{ animationDuration: "30s" }}>
          {Array(20)
            .fill("VISION TECH")
            .map((item, i) => (
              <span key={i} className="text-sm font-bold uppercase tracking-[0.3em] mx-8 text-white/30">
                {item} <span className="text-[#c8ff00]/50">★</span>
              </span>
            ))}
        </motion.div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <Reveal className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <span className="relative text-3xl font-bold text-white">
                Vision Tech
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#c8ff00] transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>
            <p className="text-white/50 mb-8 max-w-sm leading-relaxed">
              Turning Vision Into Innovation. Advanced AI-powered SaaS products and enterprise-grade solutions for
              modern businesses.
            </p>
            <Stagger as="div" className="space-y-4">
              <StaggerItem as="div" y={12}>
                <motion.a
                  whileHover={{ x: 5 }}
                  transition={{ duration: DUR.fast, ease: EASE_OUT }}
                  href="mailto:madevisionstudios@gmail.com"
                  className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 transition-colors group-hover:text-[#c8ff00]" />
                  <span>madevisionstudios@gmail.com</span>
                </motion.a>
              </StaggerItem>
              <StaggerItem as="div" y={12}>
                <motion.a
                  whileHover={{ x: 5 }}
                  transition={{ duration: DUR.fast, ease: EASE_OUT }}
                  href="tel:+919601176051"
                  className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 transition-colors group-hover:text-[#c8ff00]" />
                  <span>+91 96011 76051</span>
                </motion.a>
              </StaggerItem>
              <StaggerItem as="div" y={12}>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: DUR.fast, ease: EASE_OUT }}
                  className="group flex items-center gap-3 text-white/50"
                >
                  <MapPin className="w-5 h-5 transition-colors group-hover:text-[#c8ff00]" />
                  <span>Rajkot, Gujarat, India</span>
                </motion.div>
              </StaggerItem>
            </Stagger>
          </Reveal>

          {/* Links */}
          <Reveal delay={0.1}>
            <h4 className="font-medium text-white mb-6 text-lg">Company</h4>
            <Stagger as="ul" className="space-y-4">
              {footerLinks.company.map((link) => (
                <StaggerItem as="li" y={12} key={link.label}>
                  <motion.span
                    whileHover={{ x: 5 }}
                    transition={{ duration: DUR.fast, ease: EASE_OUT }}
                    className="inline-flex"
                  >
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
                    >
                      <span className="h-px w-0 bg-[#c8ff00] transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </motion.span>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <Reveal delay={0.2}>
            <h4 className="font-medium text-white mb-6 text-lg">Products</h4>
            <Stagger as="ul" className="space-y-4">
              {footerLinks.products.map((link) => (
                <StaggerItem as="li" y={12} key={link.label}>
                  <motion.span
                    whileHover={{ x: 5 }}
                    transition={{ duration: DUR.fast, ease: EASE_OUT }}
                    className="inline-flex"
                  >
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
                    >
                      <span className="h-px w-0 bg-[#c8ff00] transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </motion.span>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Reveal as="p" y={8} className="text-white/30 text-sm">
            © {new Date().getFullYear()} Vision Tech. All rights reserved.
          </Reveal>
          <Reveal delay={0.08} y={8} className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-white/30 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/30 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </Reveal>
        </div>
      </div>
    </footer>
  )
}
