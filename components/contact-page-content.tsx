"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Users, ArrowRight } from "lucide-react"
import { RunningStrip } from "./marquee-section"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "madevisionstudios@gmail.com",
    href: "mailto:madevisionstudios@gmail.com",
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
    value: "Rajkot, Gujarat, India",
    href: "#",
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
              Contact Us
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal mt-4 mb-6 text-foreground">
              {"Let's Build Something"}
              <br />
              <span className="italic">Amazing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Have a project in mind? We would love to hear from you. Send us a message and we will respond as soon as
              possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Running Strip */}
      <RunningStrip text="GET IN TOUCH • START YOUR PROJECT • LET'S TALK" speed={25} />

      {/* Contact Cards */}
      <section className="py-16 relative bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-4"
                >
                  <info.icon className="w-7 h-7 text-background" />
                </motion.div>
                <h3 className="font-medium mb-2 text-foreground text-lg">{info.title}</h3>
                <p className="text-muted-foreground">{info.value}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 relative bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-card border border-border"
            >
              <h2 className="text-2xl font-serif mb-8 text-foreground">Send us a Message</h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-background" />
                  </motion.div>
                  <h3 className="text-xl font-medium mb-2 text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground text-center">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors text-foreground"
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
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors text-foreground"
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
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors text-foreground"
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
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors text-foreground"
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
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-colors resize-none text-foreground"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-serif mb-6 text-foreground">Why Work With Us?</h2>
              <p className="text-muted-foreground mb-10 text-lg">
                We are passionate about delivering exceptional technology solutions that drive real business results.
                Here is what sets us apart:
              </p>

              <div className="space-y-6">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center shrink-0"
                    >
                      <reason.icon className="w-6 h-6 text-background" />
                    </motion.div>
                    <div>
                      <h3 className="font-medium mb-1 text-foreground text-lg">{reason.title}</h3>
                      <p className="text-muted-foreground">{reason.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.02 }} className="mt-10 p-6 rounded-2xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-2">Prefer to email directly?</p>
                <a
                  href="mailto:madevisionstudios@gmail.com"
                  className="text-foreground font-medium flex items-center gap-2 hover:gap-3 transition-all"
                >
                  madevisionstudios@gmail.com
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Running Strip - Dark */}
      <RunningStrip text="VISION TECH • LET'S BUILD TOGETHER" reverse speed={20} dark />

      {/* Map/Location Section */}
      <section className="py-20 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif mb-4 text-foreground">Our Location</h2>
            <p className="text-muted-foreground">Based in Rajkot, serving clients worldwide</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-border"
          >
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
          </motion.div>
        </div>
      </section>
    </>
  )
}
