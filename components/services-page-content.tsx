"use client"

import { motion } from "framer-motion"
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
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { RunningStrip, LargeTextMarquee } from "./marquee-section"

const services = [
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Intelligent automation and machine learning solutions for smarter business operations.",
    features: ["Custom AI Models", "Machine Learning", "Natural Language Processing", "Predictive Analytics"],
  },
  {
    icon: Cloud,
    title: "SaaS Development",
    description: "Scalable cloud-based software applications built for growth and performance.",
    features: ["Multi-tenant Architecture", "API-First Design", "Auto-scaling", "Usage Analytics"],
  },
  {
    icon: Database,
    title: "ERP/CRM Systems",
    description: "Enterprise resource planning and customer management systems tailored to your workflow.",
    features: ["Custom Workflows", "Real-time Reports", "Multi-department Integration", "Data Migration"],
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end web application development with modern technologies and best practices.",
    features: ["React/Next.js", "Node.js/Python", "Database Design", "API Development"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile solutions for iOS and Android platforms.",
    features: ["React Native", "Flutter", "iOS/Android Native", "App Store Optimization"],
  },
  {
    icon: Settings,
    title: "Cloud & DevOps",
    description: "Infrastructure automation, CI/CD pipelines, and cloud deployment solutions.",
    features: ["AWS/GCP/Azure", "Docker/Kubernetes", "CI/CD Pipelines", "Infrastructure as Code"],
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Advanced security solutions, audits, and compliance implementations.",
    features: ["Security Audits", "Penetration Testing", "Compliance (SOC2, GDPR)", "Zero-Trust Architecture"],
  },
  {
    icon: Layers,
    title: "Custom Software",
    description: "Tailored software solutions designed specifically for your unique business needs.",
    features: ["Requirements Analysis", "Custom Architecture", "Scalable Solutions", "Ongoing Support"],
  },
  {
    icon: Plug,
    title: "API Integrations",
    description: "Seamless third-party integrations and custom API development.",
    features: ["REST/GraphQL APIs", "Payment Gateways", "CRM Integrations", "Data Sync"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centric design and experiences that drive engagement and conversions.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Modern, responsive web solutions optimized for performance and SEO.",
    features: ["Responsive Design", "SEO Optimization", "Performance Tuning", "CMS Integration"],
  },
  {
    icon: Headphones,
    title: "IT Support & Maintenance",
    description: "24/7 technical support, monitoring, and maintenance services.",
    features: ["24/7 Monitoring", "Bug Fixes", "Performance Optimization", "Security Updates"],
  },
]

export default function ServicesPageContent() {
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
              Our Services
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal mt-4 mb-6 text-foreground">
              Comprehensive <span className="italic">IT</span>
              <br />
              Solutions
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              We deliver end-to-end technology solutions tailored to every business need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Running Strip */}
      <RunningStrip text="AI • SAAS • ERP • MOBILE • WEB • CLOUD" speed={25} />

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-6"
                >
                  <service.icon className="w-7 h-7 text-background" />
                </motion.div>
                <h3 className="text-xl font-medium mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-foreground shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Large Text Marquee */}
      <LargeTextMarquee text="YOUR TECHNOLOGY PARTNER" speed={35} />

      {/* Process Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">How We Work</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", description: "Understanding your business needs and goals" },
              { step: "02", title: "Strategy", description: "Creating a comprehensive project roadmap" },
              { step: "03", title: "Development", description: "Building with agile methodology and best practices" },
              { step: "04", title: "Delivery", description: "Deploying, testing, and providing ongoing support" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className="text-6xl font-serif text-foreground/10 mb-4"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-xl font-medium mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Running Strip - Dark */}
      <RunningStrip text="VISION TECH • EXCELLENCE • INNOVATION" reverse speed={20} dark />

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
              <h2 className="text-3xl md:text-5xl font-serif mb-6 text-background">Ready to Get Started?</h2>
              <p className="text-background/70 mb-10 max-w-xl mx-auto text-lg">
                {"Let's discuss how our services can help transform your business."}
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-background text-foreground font-medium hover:bg-background/90 transition-all text-lg"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
