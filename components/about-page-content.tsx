"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Target, Eye, Heart, Users, Award, Rocket, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { RunningStrip, LargeTextMarquee } from "./marquee-section"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block"
            >
              About Us
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal mt-4 mb-6 text-foreground">
              Building the <span className="italic">Future</span>
              <br />
              of Technology
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Vision Tech delivers advanced AI-powered SaaS products and enterprise-grade ERP systems designed for
              modern businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Running Strip */}
      <RunningStrip text="INNOVATION • QUALITY • EXCELLENCE • GROWTH" speed={25} />

      {/* Mission & Vision */}
      <section className="py-24 bg-background" ref={containerRef}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-3xl bg-secondary/50 border border-border"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-6"
              >
                <Rocket className="w-7 h-7 text-background" />
              </motion.div>
              <h2 className="text-3xl font-serif mb-4 text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To empower businesses of all sizes with intelligent, scalable technology solutions that drive growth,
                efficiency, and innovation. We strive to make enterprise-grade technology accessible and affordable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-3xl bg-secondary/50 border border-border"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-6"
              >
                <Eye className="w-7 h-7 text-background" />
              </motion.div>
              <h2 className="text-3xl font-serif mb-4 text-foreground">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To become the leading technology partner for businesses worldwide, known for our innovative solutions,
                exceptional quality, and unwavering commitment to client success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Large Text Marquee */}
      <LargeTextMarquee text="VISION TECH • SINCE 2019" speed={30} />

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">What Drives Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-6"
                >
                  <value.icon className="w-7 h-7 text-background" />
                </motion.div>
                <h3 className="text-xl font-medium mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Running Strip - Reverse */}
      <RunningStrip text="INNOVATION • TECHNOLOGY • EXCELLENCE" reverse speed={20} dark />

      {/* Timeline Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">Milestones</h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div
                    className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="inline-block p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all"
                    >
                      <span className="text-4xl font-serif text-foreground">{milestone.year}</span>
                      <h3 className="text-xl font-medium mt-2 text-foreground">{milestone.title}</h3>
                      <p className="text-muted-foreground mt-2">{milestone.description}</p>
                    </motion.div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-foreground md:-translate-x-1/2 border-4 border-background"
                  />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center p-10 rounded-3xl bg-card border border-border"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-6"
              >
                <Users className="w-8 h-8 text-background" />
              </motion.div>
              <div className="text-5xl font-serif text-foreground mb-2">14+</div>
              <p className="text-muted-foreground text-lg">Team Members</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center p-10 rounded-3xl bg-card border border-border"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-6"
              >
                <Award className="w-8 h-8 text-background" />
              </motion.div>
              <div className="text-5xl font-serif text-foreground mb-2">5+</div>
              <p className="text-muted-foreground text-lg">Years Experience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center p-10 rounded-3xl bg-card border border-border"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-6"
              >
                <MapPin className="w-8 h-8 text-background" />
              </motion.div>
              <div className="text-2xl font-medium text-foreground mb-2">Rajkot, India</div>
              <p className="text-muted-foreground text-lg">Headquarters</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center p-16 rounded-3xl bg-foreground relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute top-0 right-0 w-80 h-80 border border-white/10 rounded-full -translate-y-1/2 translate-x-1/2"
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif mb-6 text-background">Meet Our Founder</h2>
              <p className="text-background/70 mb-10 max-w-xl mx-auto text-lg">
                Learn more about the visionary behind Vision Tech and his journey in technology.
              </p>
              <Link
                href="/founder"
                className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-background text-foreground font-medium hover:bg-background/90 transition-all text-lg"
              >
                View Founder Profile
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
