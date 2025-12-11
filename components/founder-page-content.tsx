"use client"

import { motion } from "framer-motion"
import { Code2, Cloud, Brain, Shield, Layers, Mail, Award, Briefcase, GraduationCap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { RunningStrip, LargeTextMarquee } from "./marquee-section"

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
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block"
              >
                Founder & CEO
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl font-serif mt-4 mb-4 text-foreground"
              >
                Vivek Vora
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-muted-foreground mb-6"
              >
                Full-Stack Developer & Tech Entrepreneur
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto"
              >
                Empowering businesses with custom-built apps and high-performance solutions. I help businesses transform
                their operations by creating custom apps, high-performance systems, and modern technology workflows.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-4 mb-8"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
                >
                  <Briefcase className="w-4 h-4 text-foreground" />
                  <span className="text-sm text-foreground">Founder, Vision Tech</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
                >
                  <Code2 className="w-4 h-4 text-foreground" />
                  <span className="text-sm text-foreground">Full-Stack Expert</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <Link
                  href="mailto:madevisionstudios@gmail.com"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Running Strip */}
      <RunningStrip text="FULL-STACK • AI • SAAS • ENTERPRISE" speed={25} />

      {/* Bio Section */}
      <section className="py-20 relative bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div whileHover={{ scale: 1.01 }} className="p-10 rounded-3xl bg-card border border-border">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center"
                >
                  <GraduationCap className="w-6 h-6 text-background" />
                </motion.div>
                <h2 className="text-2xl font-serif text-foreground">About Me</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {`I'm Vivek Vora, a Full-Stack Developer and Founder of Vision Tech, specializing in building smart,
                scalable digital solutions. I help businesses transform their operations by creating custom apps,
                high-performance systems, and modern technology workflows. With a deep focus on quality, automation, and
                user-centric design, I turn ideas into powerful products that drive real growth.`}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Large Text Marquee */}
      <LargeTextMarquee text="INNOVATION • EXCELLENCE • GROWTH" speed={35} />

      {/* Expertise Section */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">Strong Expertise Areas</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertise.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-card border border-border hover:border-foreground/20 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center"
                  >
                    <area.icon className="w-7 h-7 text-background" />
                  </motion.div>
                  <h3 className="text-xl font-medium text-foreground">{area.title}</h3>
                </div>
                <ul className="space-y-3">
                  {area.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Running Strip - Dark */}
      <RunningStrip text="VISION TECH • VIVEK VORA" reverse speed={20} dark />

      {/* Skills Cloud */}
      <section className="py-24 relative bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Technical Skills</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">Tech Stack</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm hover:border-foreground/30 transition-all cursor-default text-foreground"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="py-24 relative overflow-hidden bg-secondary/30">
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-10 rounded-3xl bg-card border border-border"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-6"
            >
              <Award className="w-8 h-8 text-background" />
            </motion.div>
            <h2 className="text-3xl font-serif mb-6 text-foreground">Key Achievement</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded Vision Tech and delivered scalable digital solutions across multiple industries including retail,
              services, and SMBs. Leading a team of 14+ professionals to build enterprise-grade products that serve
              thousands of users daily.
            </p>
          </motion.div>
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
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute bottom-0 left-0 w-64 h-64 border border-white/10 rounded-full translate-y-1/2 -translate-x-1/2"
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif mb-6 text-background">
                {"Let's Build Something Great Together"}
              </h2>
              <p className="text-background/70 mb-10 max-w-xl mx-auto text-lg">
                Have a project in mind? I would love to hear about it and explore how we can work together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-background text-foreground font-medium hover:bg-background/90 transition-all text-lg"
                >
                  Start a Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="mailto:madevisionstudios@gmail.com"
                  className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-background text-lg"
                >
                  <Mail className="w-5 h-5" />
                  Email Directly
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
