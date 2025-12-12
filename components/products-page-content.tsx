"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ShoppingCart, Building2, Wrench, CheckCircle2, ArrowRight, Sparkles, GraduationCap } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { RunningStrip, LargeTextMarquee } from "./marquee-section"

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
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Product Info */}
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={index % 2 === 1 ? "lg:order-2" : ""}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6"
        >
          <product.icon className="w-5 h-5 text-foreground" />
          <span className="text-sm font-medium text-foreground">{product.tagline}</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">{product.name}</h2>

        <p className="text-muted-foreground mb-8 leading-relaxed text-lg">{product.description}</p>

        <ul className="space-y-3 mb-8">
          {product.features.slice(0, 4).map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-foreground shrink-0" />
              <span className="text-foreground">{feature}</span>
            </motion.li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-all"
        >
          Request Demo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Product Image */}
      <motion.div style={{ y }} className={index % 2 === 1 ? "lg:order-1" : ""}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="relative rounded-2xl overflow-hidden border border-border shadow-2xl"
        >
          <div className="aspect-[4/3] bg-secondary">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function ProductsPageContent() {
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Our Products
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal mt-4 mb-6 text-foreground">
              Powerful <span className="italic">SaaS</span>
              <br />
              Solutions
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Scalable, enterprise-grade products designed to transform your business operations and drive growth.
            </p>
          </motion.div>
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
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">Built for Scale</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "99.9%",
                label: "Uptime",
                description: "Enterprise-grade reliability",
              },
              {
                number: "4.8K",
                label: "Users",
                description: "Scalable architecture",
              },
              {
                number: "24/7",
                label: "Support",
                description: "Always available help",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center p-10 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className="text-6xl font-serif text-foreground mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-lg font-medium text-foreground mb-1">{stat.label}</div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Running Strip - Reverse */}
      <RunningStrip text="VISION TECH • YOUR TECHNOLOGY PARTNER" reverse speed={20} dark />

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center p-16 rounded-3xl bg-foreground text-background relative overflow-hidden"
          >
            {/* Animated background elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute top-0 right-0 w-96 h-96 border border-white/10 rounded-full -translate-y-1/2 translate-x-1/2"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute bottom-0 left-0 w-64 h-64 border border-white/10 rounded-full translate-y-1/2 -translate-x-1/2"
            />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif mb-6">Ready to Transform Your Business?</h2>
              <p className="text-background/70 mb-10 max-w-xl mx-auto text-lg">
                Get a personalized demo and see how our products can streamline your operations.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-background text-foreground font-medium hover:bg-background/90 transition-all text-lg"
              >
                Schedule Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
