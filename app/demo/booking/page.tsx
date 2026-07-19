import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Northside Auto Spa — Demo Booking Site | Vision Tech",
  description:
    "Live demo of a Vision Tech one-page booking micro-site: services, prices, reviews and one-tap booking — live in 48 hours for $299.",
  robots: { index: false, follow: false },
}

/* ------------------------------------------------------------------ */
/*  DEMO: the $299 one-page booking micro-site we pitch to Western     */
/*  local service businesses. Fictional client: Northside Auto Spa.    */
/*  Everything is config-driven — for a real client we swap this data. */
/* ------------------------------------------------------------------ */

const BIZ = {
  name: "Northside Auto Spa",
  tagline: "Detailing done right — since 2011",
  city: "Kelowna, BC",
  phone: "+1 (250) 555-0148",
  rating: "4.9",
  reviewCount: 132,
  hours: [
    ["Mon – Fri", "8:00 am – 6:00 pm"],
    ["Saturday", "9:00 am – 4:00 pm"],
    ["Sunday", "Closed"],
  ],
  services: [
    { name: "Express Wash & Wax", price: "$49", time: "45 min" },
    { name: "Full Interior Detail", price: "$149", time: "2.5 hrs" },
    { name: "Exterior Paint Correction", price: "$299", time: "4 hrs" },
    { name: "Ceramic Coating (2yr)", price: "$699", time: "1 day" },
    { name: "Complete Showroom Package", price: "$399", time: "5 hrs" },
    { name: "Engine Bay Detail", price: "$79", time: "1 hr" },
  ],
  reviews: [
    { name: "Mike R.", text: "Truck came back looking better than the day I bought it. Booked online in ten seconds." },
    { name: "Sarah K.", text: "The ceramic coating is unreal — water just rolls off. Fair prices, zero upsell pressure." },
    { name: "Devon P.", text: "Second time here. They text you when it's ready. Easiest car appointment I've ever made." },
  ],
}

const ACCENT_BLUE = "#1d4ed8"

function Stars() {
  return (
    <span aria-hidden className="text-amber-400 tracking-tight">
      ★★★★★
    </span>
  )
}

export default function DemoBookingPage() {
  const bookHref = `sms:${BIZ.phone.replace(/[^+\d]/g, "")}?body=${encodeURIComponent("Hi! I'd like to book a detail. What's your next opening?")}`

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* demo banner */}
      <div className="bg-slate-900 text-white text-center text-xs sm:text-sm px-4 py-2.5">
        <span className="font-semibold" style={{ color: "#c8ff00" }}>
          LIVE DEMO
        </span>{" "}
        — a Vision Tech one-page booking site. Yours: live in 48 hours, $299 one-time.{" "}
        <Link href="/contact" className="underline underline-offset-2 font-medium">
          Get yours →
        </Link>
      </div>

      {/* hero */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-5 py-12 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-3">{BIZ.city}</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">{BIZ.name}</h1>
          <p className="text-slate-600 text-lg mb-4">{BIZ.tagline}</p>
          <p className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-8">
            <Stars />
            <span className="font-semibold text-slate-900">{BIZ.rating}</span> · {BIZ.reviewCount} Google reviews
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={bookHref}
              className="px-8 py-4 rounded-full text-white font-semibold shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: ACCENT_BLUE }}
            >
              Book Now — takes 10 seconds
            </a>
            <a
              href={`tel:${BIZ.phone.replace(/[^+\d]/g, "")}`}
              className="px-8 py-4 rounded-full border border-slate-300 font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Call {BIZ.phone}
            </a>
          </div>
        </div>
      </header>

      {/* services + prices */}
      <section className="max-w-3xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-bold mb-1">Services & Prices</h2>
        <p className="text-slate-500 text-sm mb-6">No hidden fees. What you see is what you pay.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {BIZ.services.map((s) => (
            <a
              key={s.name}
              href={bookHref}
              className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-4 hover:border-blue-600 hover:shadow-md transition-all"
            >
              <span>
                <span className="block font-semibold">{s.name}</span>
                <span className="block text-xs text-slate-500 mt-0.5">{s.time}</span>
              </span>
              <span className="text-lg font-bold" style={{ color: ACCENT_BLUE }}>
                {s.price}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* reviews */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-5 py-12">
          <h2 className="text-2xl font-bold mb-6">What customers say</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {BIZ.reviews.map((r) => (
              <figure key={r.name} className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <Stars />
                <blockquote className="text-sm text-slate-700 leading-relaxed mt-2 mb-3">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="text-xs font-semibold text-slate-500">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* hours */}
      <section className="max-w-3xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-bold mb-6">Hours & Location</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          {BIZ.hours.map(([d, h]) => (
            <div key={d} className="flex justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
              <span className="font-medium">{d}</span>
              <span className={h === "Closed" ? "text-slate-400" : "text-slate-700"}>{h}</span>
            </div>
          ))}
          <p className="text-sm text-slate-500 mt-4">📍 1480 Northside Rd, {BIZ.city}</p>
        </div>
      </section>

      {/* vision tech footer */}
      <footer className="max-w-3xl mx-auto px-5 pb-12 text-center">
        <div className="rounded-2xl border-2 border-dashed border-slate-300 p-6">
          <p className="text-sm text-slate-600 mb-3">
            This entire page is a <strong>demo</strong> — imagine it with <em>your</em> services, prices and reviews.
            Built by <strong>Vision Tech</strong> (Kelowna BC · Rajkot IN) — live in 48 hours, <strong>$299 one-time</strong>, no monthly fees.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-full font-semibold text-sm text-black"
            style={{ backgroundColor: "#c8ff00" }}
          >
            I want this for my business
          </Link>
        </div>
      </footer>

      {/* sticky mobile book bar */}
      <div className="fixed bottom-0 inset-x-0 sm:hidden bg-white border-t border-slate-200 p-3">
        <a
          href={bookHref}
          className="block w-full text-center py-3.5 rounded-full text-white font-semibold"
          style={{ backgroundColor: ACCENT_BLUE }}
        >
          Book Now — takes 10 seconds
        </a>
      </div>
    </main>
  )
}
