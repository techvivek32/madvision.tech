"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"

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
  return (
    <footer className="bg-foreground text-background overflow-hidden">
      {/* Large animated text banner */}
      <div className="py-16 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-white/40 text-sm uppercase tracking-widest mb-4"
              >
                Ready to start?
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-serif text-white"
              >
                {"Let's build"}
                <br />
                <span className="italic text-white/60">something great.</span>
              </motion.h2>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-foreground font-medium hover:bg-white/90 transition-all"
              >
                Get in Touch
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Running strip */}
      <div className="py-4 overflow-hidden border-b border-white/10">
        <motion.div className="flex whitespace-nowrap animate-marquee" style={{ animationDuration: "30s" }}>
          {Array(20)
            .fill("VISION TECH")
            .map((item, i) => (
              <span key={i} className="text-sm font-bold uppercase tracking-[0.3em] mx-8 text-white/30">
                {item} ★
              </span>
            ))}
        </motion.div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold text-white">Vision Tech</span>
            </Link>
            <p className="text-white/50 mb-8 max-w-sm leading-relaxed">
              Turning Vision Into Innovation. Advanced AI-powered SaaS products and enterprise-grade solutions for
              modern businesses.
            </p>
            <div className="space-y-4">
              <motion.a
                whileHover={{ x: 5 }}
                href="mailto:madevisionstudios@gmail.com"
                className="flex items-center gap-3 text-white/50 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>madevisionstudios@gmail.com</span>
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="tel:+919601176051"
                className="flex items-center gap-3 text-white/50 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+91 96011 76051</span>
              </motion.a>
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-white/50">
                <MapPin className="w-5 h-5" />
                <span>Rajkot, Gujarat, India</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-medium text-white mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, i) => (
                <motion.li key={link.label} whileHover={{ x: 5 }}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-medium text-white mb-6 text-lg">Products</h4>
            <ul className="space-y-4">
              {footerLinks.products.map((link) => (
                <motion.li key={link.label} whileHover={{ x: 5 }}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/30 text-sm"
          >
            © {new Date().getFullYear()} Vision Tech. All rights reserved.
          </motion.p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-white/30 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/30 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
