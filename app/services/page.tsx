import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ServicesPageContent from "@/components/services-page-content"

export const metadata: Metadata = {
  title: "Services | Vision Tech",
  description:
    "Explore our comprehensive IT services including AI Solutions, SaaS Development, ERP Systems, Mobile Apps, Cloud DevOps, and more.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ServicesPageContent />
      <Footer />
    </main>
  )
}
