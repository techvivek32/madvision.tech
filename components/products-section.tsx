"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, ShoppingCart, Building2, Wrench, Sparkles } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const Scroll3DElement = dynamic(() => import("@/components/scroll-3d-element"), {
  ssr: false,
  loading: () => null,
})

const products = [
  {
    icon: ShoppingCart,
    title: "Retailians POS",
    description:
      "A modern cloud-based POS and inventory management SaaS with fast billing, stock control, multi-store support, GST reports, and loyalty programs.",
    number: "01",
  },
  {
    icon: Building2,
    title: "911 Wrap ERP",
    description:
      "A full ERP system for managing operations, inventory, accounts, billing, workflow automation, and secure cloud access.",
    number: "02",
  },
  {
    icon: Wrench,
    title: "Datar Technologies",
    description:
      "Custom-developed IT solutions including websites, automation tools, and business apps with scalable architecture.",
    number: "03",
  },
  {
    icon: Sparkles,
    title: "AI Chatbot Solutions",
    description:
      "Intelligent conversational AI systems for customer support, lead generation, and business automation with natural language processing.",
    number: "04",
  },
]

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section ref={sectionRef} className="py-32 dark-section relative overflow-hidden">
      <div className="absolute top-1/4 -right-32 opacity-30">
        <Scroll3DElement shape="icosahedron" size={400} parallaxStrength={100} color="#666666" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-sm text-white/50 uppercase tracking-widest">Our Products</span>
          <h2 className="font-serif text-4xl md:text-6xl font-normal mt-4 text-white">SaaS & Enterprise Solutions</h2>
        </motion.div>

        <div className="space-y-0">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group border-t border-white/10 py-10"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <motion.span
                  className="text-sm text-white/30 font-mono lg:w-16"
                  whileHover={{ scale: 1.2, color: "#c8ff00" }}
                >
                  {product.number}
                </motion.span>
                <div className="flex-1">
                  <motion.h3
                    className="text-2xl md:text-4xl font-serif text-white mb-4 group-hover:text-[#c8ff00] transition-colors duration-500"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {product.title}
                  </motion.h3>
                  <p className="text-white/60 max-w-2xl text-lg">{product.description}</p>
                </div>
                <motion.div whileHover={{ scale: 1.1, rotate: 45 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/20 text-white hover:bg-[#c8ff00] hover:border-[#c8ff00] hover:text-black transition-all duration-300"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
