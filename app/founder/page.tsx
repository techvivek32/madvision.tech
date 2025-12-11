import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import FounderPageContent from "@/components/founder-page-content"

export const metadata: Metadata = {
  title: "Vivek Vora - Founder | Vision Tech",
  description:
    "Meet Vivek Vora, the Founder & CEO of Vision Tech. A Full-Stack Developer specializing in building smart, scalable digital solutions.",
}

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <FounderPageContent />
      <Footer />
    </main>
  )
}
