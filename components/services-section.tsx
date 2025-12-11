"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import {
  Brain,
  Cloud,
  Code2,
  Database,
  Smartphone,
  Shield,
  Layers,
  Plug,
  Palette,
  Globe,
  Headphones,
  Settings,
} from "lucide-react"
import dynamic from "next/dynamic"

const Scroll3DElement = dynamic(() => import("@/components/scroll-3d-element"), {
  ssr: false,
  loading: () => null,
})

const services = [
  { icon: Brain, title: "AI Solutions", description: "Intelligent automation and machine learning solutions" },
  { icon: Cloud, title: "SaaS Development", description: "Scalable cloud-based software applications" },
  { icon: Database, title: "ERP/CRM Systems", description: "Enterprise resource planning and customer management" },
  { icon: Code2, title: "Full-Stack Development", description: "End-to-end web application development" },
  { icon: Smartphone, title: "Mobile Apps", description: "Native and cross-platform mobile solutions" },
  { icon: Settings, title: "Cloud & DevOps", description: "Infrastructure automation and deployment" },
  { icon: Shield, title: "Cybersecurity", description: "Advanced security solutions and audits" },
  { icon: Layers, title: "Custom Software", description: "Tailored software solutions for your needs" },
  { icon: Plug, title: "API Integrations", description: "Seamless third-party integrations" },
  { icon: Palette, title: "UI/UX Design", description: "User-centric design and experiences" },
  { icon: Globe, title: "Website Development", description: "Modern, responsive web solutions" },
  { icon: Headphones, title: "IT Support", description: "24/7 technical support and maintenance" },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-20 -left-20 opacity-20">
        <Scroll3DElement shape="torus" size={300} parallaxStrength={80} color="#333333" />
      </div>
      <div className="absolute bottom-20 -right-20 opacity-20">
        <Scroll3DElement shape="octahedron" size={250} parallaxStrength={60} color="#444444" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-sm text-muted-foreground uppercase tracking-widest">Our Services</span>
          <h2 className="font-serif text-4xl md:text-6xl font-normal mt-4">End-to-End IT Solutions</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group p-6 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all"
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-4"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <service.icon className="w-5 h-5 text-background" />
              </motion.div>
              <h3 className="text-lg font-medium mb-2 text-foreground">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
