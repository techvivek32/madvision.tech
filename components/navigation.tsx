"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/founder", label: "Founder" },
  { href: "/contact", label: "Contact" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isSidePanelOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isSidePanelOpen])

  return (
    <>
      {/* STATE 1: Default Navbar - visible when not scrolled */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
          >
            <div className="mx-auto max-w-7xl flex items-center justify-between">
              {/* Logo - top left */}
              <Link href="/" className="relative z-10">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground tracking-tight">Vision Tech</span>
                </motion.div>
              </Link>

              {/* Navigation Links - top right */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="relative py-2 text-sm font-medium transition-colors group"
                    >
                      <span
                        className={cn(
                          "transition-colors duration-200",
                          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </span>
                      {/* Underline animation */}
                      <motion.span
                        className="absolute bottom-0 left-0 h-px bg-foreground"
                        initial={{ width: isActive ? "100%" : "0%" }}
                        animate={{
                          width: isActive || hoveredLink === link.href ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile menu button for default state */}
              <button onClick={() => setIsSidePanelOpen(true)} className="md:hidden p-2" aria-label="Open menu">
                <div className="flex flex-col gap-1.5">
                  <span className="w-6 h-0.5 bg-foreground" />
                  <span className="w-6 h-0.5 bg-foreground" />
                  <span className="w-4 h-0.5 bg-foreground" />
                </div>
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* STATE 2: Floating Circular Menu Button - visible when scrolled */}
      <AnimatePresence>
        {isScrolled && !isSidePanelOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            onClick={() => setIsSidePanelOpen(true)}
            className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-foreground/90 backdrop-blur-xl shadow-2xl flex items-center justify-center group hover:bg-foreground transition-all duration-300"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
            }}
            aria-label="Open menu"
          >
            {/* Animated hamburger icon */}
            <div className="flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 group-hover:scale-110">
              <motion.span
                className="w-5 h-0.5 bg-background rounded-full origin-center"
                animate={{ width: 20 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-3.5 h-0.5 bg-background rounded-full origin-center"
                animate={{ width: 14 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-background rounded-full origin-center"
                animate={{ width: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </div>
            {/* Glow ring on hover */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-foreground/20"
              whileHover={{ scale: 1.15, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* STATE 3: Side Panel Menu */}
      <AnimatePresence>
        {isSidePanelOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-md"
              onClick={() => setIsSidePanelOpen(false)}
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-foreground/95 backdrop-blur-xl"
              style={{
                boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Panel content */}
              <div className="h-full flex flex-col p-8">
                {/* Close button */}
                <div className="flex justify-end mb-12">
                  <motion.button
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    onClick={() => setIsSidePanelOpen(false)}
                    className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center group hover:bg-background/20 transition-colors"
                    aria-label="Close menu"
                  >
                    <div className="relative w-6 h-6">
                      <motion.span
                        className="absolute top-1/2 left-0 w-6 h-0.5 bg-background rounded-full"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 45, y: "-50%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        className="absolute top-1/2 left-0 w-6 h-0.5 bg-background rounded-full"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: -45, y: "-50%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.button>
                </div>

                {/* Navigation links with stagger and glitch effect */}
                <nav className="flex-1 flex flex-col justify-center gap-2">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{
                          delay: 0.1 + i * 0.05,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsSidePanelOpen(false)}
                          className="group relative block py-3 overflow-hidden"
                        >
                          {/* Main text */}
                          <span
                            className={cn(
                              "relative z-10 text-4xl md:text-5xl font-bold tracking-tight transition-all duration-300",
                              isActive ? "text-background" : "text-background/60 group-hover:text-background",
                            )}
                          >
                            {link.label}
                          </span>

                          {/* Glitch layers on hover */}
                          <span
                            className="absolute top-0 left-0 text-4xl md:text-5xl font-bold tracking-tight text-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
                            style={{
                              transform: "translate(-2px, -2px)",
                              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                            }}
                            aria-hidden="true"
                          >
                            {link.label}
                          </span>
                          <span
                            className="absolute top-0 left-0 text-4xl md:text-5xl font-bold tracking-tight text-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
                            style={{
                              transform: "translate(2px, 2px)",
                              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                            }}
                            aria-hidden="true"
                          >
                            {link.label}
                          </span>

                          {/* Animated underline */}
                          <motion.span
                            className="absolute bottom-2 left-0 h-0.5 bg-background/40"
                            initial={{ width: isActive ? "100%" : "0%" }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />

                          {/* Number indicator */}
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-mono text-background/30 opacity-0 group-hover:opacity-100 transition-opacity">
                            0{i + 1}
                          </span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>

                {/* Bottom info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="pt-8 border-t border-background/10"
                >
                  <p className="text-sm text-background/40 mb-2">Get in touch</p>
                  <a
                    href="mailto:hello@visiontech.com"
                    className="text-background/80 hover:text-background transition-colors text-lg"
                  >
                    hello@visiontech.com
                  </a>
                </motion.div>
              </div>

              {/* Decorative gradient line */}
              <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-background/20 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
