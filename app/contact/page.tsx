import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContactPageContent from "@/components/contact-page-content"

export const metadata: Metadata = {
  title: "Contact | Vision Tech",
  description:
    "Get in touch with Vision Tech. We are here to help you build your next big project. Contact us today for a free consultation.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ContactPageContent />
      <Footer />
    </main>
  )
}
