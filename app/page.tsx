import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import MarqueeSection from "@/components/marquee-section"
import ServicesSection from "@/components/services-section"
import ProductsSection from "@/components/products-section"
import StatsSection from "@/components/stats-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import { RunningStrip } from "@/components/marquee-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <RunningStrip text="VISION TECH • INNOVATION • EXCELLENCE" reverse speed={25} />
      <ProductsSection />
      <StatsSection />
      <RunningStrip text="SAAS • ERP • AI • CLOUD • MOBILE" speed={30} />
      <CTASection />
      <Footer />
    </main>
  )
}
