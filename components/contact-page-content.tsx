"use client"

import type React from "react"
import type { RefObject } from "react"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Users, ArrowRight, type LucideIcon } from "lucide-react"
import { RunningStrip } from "./marquee-section"
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
  SpotlightCard,
  TiltCard,
  MagneticButton,
  GlowOrb,
  AmbientShape,
  AnimatedDivider,
  useParallax,
} from "@/components/motion"

type ContactInfo = {
  icon: LucideIcon
  title: string
  href: string
  value?: string
  locations?: { label: string; lines: string[] }[]
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@madvision.tech",
    href: "mailto:info@madvision.tech",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 96011 76051",
    href: "tel:+919601176051",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    href: "#",
    locations: [
      { label: "Head Office", lines: ["R.K. Empire", "Rajkot, Gujarat"] },
      {
        label: "Ahmedabad Branch",
        lines: ["E-1106, Titanium City Center Business Park", "Ahmedabad, Gujarat 380015"],
      },
    ],
  },
]

const reasons = [
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock technical support for all our clients",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "14+ skilled professionals ready to tackle any challenge",
  },
  {
    icon: CheckCircle2,
    title: "Proven Track Record",
    description: "104+ successful projects delivered across industries",
  },
]

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const heroBgY = useParallax(heroRef as RefObject<HTMLElement>, { to: -110 })
  const mapRef = useRef<HTMLElement>(null)
  const mapBgY = useParallax(mapRef as RefObject<HTMLElement>, { to: -90 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: "", email: "", company: "", service: "", message: "" })
        }, 3000)
      } else {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        throw new Error(errorData.error || 'Failed to send email')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors text-foreground"

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 relative overflow-hidden bg-background">
        {/* decorative layers — pointer-events-none, behind content */}
        <div aria-hidden className="absolute inset-0 grid-texture-dark pointer-events-none" />
        <GlowOrb color={ACCENT} size={520} opacity={0.16} parallax={heroBgY} className="-top-32 -left-24" />
        <GlowOrb color={ACCENTS[1]} size={360} opacity={0.1} parallax={heroBgY} className="top-10 right-0" />
        <AmbientShape
          variant="ring"
          color={ACCENT}
          size={560}
          opacity={0.08}
          parallax={heroBgY}
          className="-top-40 right-[-10%]"
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <Reveal
              as="span"
              y={12}
              delay={0.05}
              className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block"
            >
              Contact Us
            </Reveal>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal mt-4 mb-6 text-foreground">
              <RevealText as="span" by="word" text="Let's Build Something" className="block" />
              <Reveal as="span" y={18} delay={0.3} className="block">
                <GradientText animate as="span" className="italic">
                  Amazing
                </GradientText>
              </Reveal>
            </h1>
            <Reveal as="p" y={16} delay={0.35} className="text-lg text-muted-foreground max-w-xl">
              Have a project in mind? We would love to hear from you. Send us a message and we will respond as soon as
              possible.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Running Strip */}
      <RunningStrip text="GET IN TOUCH • START YOUR PROJECT • LET'S TALK" speed={25} />

      {/* Contact Cards */}
      <section className="py-16 relative bg-background">
        <div className="container mx-auto px-6">
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((info) => (
              <StaggerItem key={info.title}>
                <SpotlightCard
                  href={info.href}
                  tone="light"
                  className="block p-8 rounded-2xl bg-card border border-border text-center h-full"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    className="relative z-10 w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-4"
                  >
                    <info.icon className="w-7 h-7 text-background" />
                  </motion.div>
                  <h3 className="relative z-10 font-medium mb-2 text-foreground text-lg">{info.title}</h3>
                  {info.locations ? (
                    <div className="relative z-10 mt-4 space-y-4">
                      {info.locations.map((loc, i) => (
                        <div key={loc.label}>
                          {i > 0 && <div className="mx-auto mb-4 h-px w-10 bg-border" />}
                          <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                            {loc.label}
                          </span>
                          {loc.lines.map((line) => (
                            <p key={line} className="text-sm leading-relaxed text-muted-foreground">
                              {line}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="relative z-10 text-muted-foreground">{info.value}</p>
                  )}
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 relative overflow-hidden bg-background">
        <GlowOrb color={ACCENT} size={420} opacity={0.08} className="top-1/3 -left-32" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <Reveal y={0} className="h-full">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: DUR.base, ease: EASE_OUT }}
              >
                <SpotlightCard tone="light" spotlight={false} shine={false} className="p-10 rounded-3xl bg-card border border-border">
                  <h2 className="relative z-10 text-2xl font-serif mb-8 text-foreground">Send us a Message</h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: DUR.base, ease: EASE_OUT }}
                      className="relative z-10 flex flex-col items-center justify-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.12, 1] }}
                        transition={{ duration: 0.6, ease: EASE_OUT }}
                        className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center mb-6"
                      >
                        <motion.svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-10 h-10 text-background"
                          aria-hidden
                        >
                          <motion.path
                            d="M4 12.5l5 5 11-11"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 }}
                          />
                        </motion.svg>
                      </motion.div>
                      <h3 className="text-xl font-medium mb-2 text-foreground">Message Sent!</h3>
                      <p className="text-muted-foreground text-center">
                        Thank you for reaching out. We will get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium mb-2 text-foreground">
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Your Company"
                          />
                        </div>
                        <div>
                          <label htmlFor="service" className="block text-sm font-medium mb-2 text-foreground">
                            Service Interested In
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={inputClass}
                          >
                            <option value="">Select a service</option>
                            <option value="ai">AI Solutions</option>
                            <option value="saas">SaaS Development</option>
                            <option value="erp">ERP/CRM Systems</option>
                            <option value="web">Web Development</option>
                            <option value="mobile">Mobile App Development</option>
                            <option value="cloud">Cloud & DevOps</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className={`${inputClass} resize-none`}
                          placeholder="Tell us about your project..."
                        />
                      </div>

                      <MagneticButton
                        type="submit"
                        disabled={isSubmitting}
                        accent={ACCENT}
                        className="w-full gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </MagneticButton>
                    </form>
                  )}
                </SpotlightCard>
              </motion.div>
            </Reveal>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DUR.base, ease: EASE_OUT }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-serif mb-6 text-foreground">
                Why Work <GradientText animate>With Us?</GradientText>
              </h2>
              <p className="text-muted-foreground mb-10 text-lg">
                We are passionate about delivering exceptional technology solutions that drive real business results.
                Here is what sets us apart:
              </p>

              <Stagger className="space-y-6">
                {reasons.map((reason) => (
                  <StaggerItem key={reason.title}>
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ duration: DUR.fast, ease: EASE_OUT }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                        className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center shrink-0"
                      >
                        <reason.icon className="w-6 h-6 text-background" />
                      </motion.div>
                      <div>
                        <h3 className="font-medium mb-1 text-foreground text-lg">{reason.title}</h3>
                        <p className="text-muted-foreground">{reason.description}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>

              <AnimatedDivider className="text-foreground my-8" />

              <SpotlightCard tone="light" className="mt-2 p-6 rounded-2xl bg-card border border-border">
                <p className="relative z-10 text-sm text-muted-foreground mb-2">Prefer to email directly?</p>
                <a
                  href="mailto:info@madvision.tech"
                  className="relative z-10 text-foreground font-medium flex items-center gap-2 hover:gap-3 transition-all"
                >
                  info@madvision.tech
                  <ArrowRight className="w-4 h-4" />
                </a>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Running Strip - Dark */}
      <RunningStrip text="VISION TECH • LET'S BUILD TOGETHER" reverse speed={20} dark />

      {/* Map/Location Section */}
      <section ref={mapRef} className="py-20 relative overflow-hidden bg-background">
        <GlowOrb color={ACCENT} size={460} opacity={0.1} parallax={mapBgY} className="bottom-0 -right-24" />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4 text-foreground">
              Our <GradientText animate>Locations</GradientText>
            </h2>
            <p className="text-muted-foreground">Head office in Rajkot, branch in Ahmedabad — serving clients worldwide</p>
          </Reveal>

          <Reveal y={32} className="max-w-4xl mx-auto">
            <TiltCard max={6} scale={1.015} className="rounded-3xl overflow-hidden border border-border">
              <div className="aspect-video bg-card relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.87289519677!2d70.72946027812503!3d22.273466100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3a!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1702000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vision Tech Location"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </TiltCard>
          </Reveal>

          {/* office addresses */}
          <Reveal y={24} delay={0.1} className="max-w-4xl mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Head Office
                </span>
                <p className="text-foreground font-medium">R.K. Empire</p>
                <p className="text-muted-foreground text-sm mt-1">Rajkot, Gujarat, India</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Ahmedabad Branch
                </span>
                <p className="text-foreground font-medium">E-1106, Titanium City Center Business Park</p>
                <p className="text-muted-foreground text-sm mt-1">Ahmedabad, Gujarat 380015</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
