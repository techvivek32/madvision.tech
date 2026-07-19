import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import PortfolioPageContent from "@/components/portfolio-page-content"

export const metadata: Metadata = {
  title: "Portfolio | Vision Tech",
  description:
    "The Vision Tech shipping ledger — a numbered archive of successful, live products including Retailians POS and 911 Wrap ERP.",
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <PortfolioPageContent />
      <Footer />
    </main>
  )
}
