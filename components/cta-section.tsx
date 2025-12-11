"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-normal mb-6 text-foreground">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            {
              "Let's build something extraordinary together. Contact us today and take the first step towards digital excellence."
            }
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-lime font-medium"
            >
              Start Your Project
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center w-14 h-14 rounded-full btn-lime">
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
