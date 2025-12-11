import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AboutPageContent from "@/components/about-page-content"

export const metadata: Metadata = {
  title: "About | Vision Tech",
  description:
    "Learn about Vision Tech - delivering advanced AI-powered SaaS products and enterprise-grade solutions since 2019.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <AboutPageContent />
      <Footer />
    </main>
  )
}
