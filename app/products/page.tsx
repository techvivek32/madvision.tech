import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProductsPageContent from "@/components/products-page-content"

export const metadata: Metadata = {
  title: "Products | Vision Tech",
  description:
    "Discover our powerful SaaS products including Retailians POS, 911 Wrap ERP, and custom enterprise solutions.",
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProductsPageContent />
      <Footer />
    </main>
  )
}
