import type { Metadata } from "next"
import AdminPageContent from "@/components/admin-page-content"

export const metadata: Metadata = {
  title: "Mission Control | Vision Tech",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminPageContent />
}
