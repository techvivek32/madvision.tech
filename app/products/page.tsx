import { redirect } from "next/navigation"

// The products page has been replaced by the portfolio.
export default function ProductsPage() {
  redirect("/portfolio")
}
