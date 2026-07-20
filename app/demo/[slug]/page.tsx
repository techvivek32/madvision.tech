import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { DEMOS, demoBySlug } from "@/data/demos"
import { profileBySlug } from "@/data/site-profiles"
import { SiteTemplate } from "@/components/demo/site-template"

/* Slugs that have their own bespoke, hand-built route (app/demo/<slug>/page.tsx).
   Those win at request time; exclude them here so the build doesn't see a path conflict. */
const BESPOKE_SLUGS = new Set(["blades-of-norwich", "drive-automatic"])

export function generateStaticParams() {
  return DEMOS.filter((d) => !BESPOKE_SLUGS.has(d.slug)).map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const name = profileBySlug(slug)?.name ?? demoBySlug(slug)?.name
  return {
    title: name ? `${name} — Preview by Vision Tech` : "Demo | Vision Tech",
    robots: { index: false, follow: false },
  }
}

/* Per-lead personalized preview of the $299 one-page booking site.
   Honesty: real public info only (name/city/phone from their own site);
   sample prices are labeled; reviews are placeholders, never invented. */

export default async function LeadDemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  /* Generator engine: if a rich SiteProfile exists, render the full data-driven
     site. Otherwise fall back to the older lightweight config preview. */
  const profile = profileBySlug(slug)
  if (profile) return <SiteTemplate profile={profile} />

  const demo = demoBySlug(slug)
  if (!demo) notFound()

  const telHref = `tel:${demo.phone.replace(/[^+\d]/g, "")}`

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      <div className="bg-slate-900 text-white text-center text-xs sm:text-sm px-4 py-2.5">
        <span className="font-semibold" style={{ color: "#c8ff00" }}>
          PREVIEW
        </span>{" "}
        — built by Vision Tech for {demo.name}. Your real prices &amp; reviews go here. Live in 48h, $299 one-time.{" "}
        <Link href="/contact" className="underline underline-offset-2 font-medium">
          Make it real →
        </Link>
      </div>

      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-5 py-12 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-3">{demo.city}</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">{demo.name}</h1>
          <p className="text-slate-600 text-lg mb-4">{demo.tagline}</p>
          <p className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-8">
            <span aria-hidden className="text-amber-400">
              ★★★★★
            </span>
            <span className="text-slate-500">Your Google rating &amp; review count, front and center</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={telHref}
              className="px-8 py-4 rounded-full text-white font-semibold shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: demo.accent }}
            >
              Book Now — takes 10 seconds
            </a>
            <a
              href={telHref}
              className="px-8 py-4 rounded-full border border-slate-300 font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Call {demo.phone}
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            Book Now can open your booking tool, SMS, WhatsApp or the phone — your choice.
          </p>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-bold mb-1">Services &amp; Prices</h2>
        <p className="text-slate-500 text-sm mb-6">
          {demo.samplePrices
            ? `Sample prices in ${demo.currencyNote} — we'll swap in your real menu.`
            : `Prices from your current site — the rest are samples we'll replace with yours.`}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {demo.services.map((s) => (
            <a
              key={s.name}
              href={telHref}
              className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-4 hover:shadow-md transition-all"
            >
              <span>
                <span className="block font-semibold">{s.name}</span>
                <span className="block text-xs text-slate-500 mt-0.5">
                  {s.time}
                  {s.real ? " · from your site" : demo.samplePrices ? "" : " · sample"}
                </span>
              </span>
              <span className="text-lg font-bold" style={{ color: demo.accent }}>
                {s.price}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-5 py-12">
          <h2 className="text-2xl font-bold mb-6">What customers say</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <figure key={i} className="bg-slate-50 rounded-2xl p-5 border border-dashed border-slate-300">
                <span aria-hidden className="text-amber-400">
                  ★★★★★
                </span>
                <blockquote className="text-sm text-slate-400 leading-relaxed mt-2 mb-3 italic">
                  Your real customer review #{i} appears here — pulled from Google, shown with pride.
                </blockquote>
                <figcaption className="text-xs font-semibold text-slate-400">A happy customer</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <footer className="max-w-3xl mx-auto px-5 py-12 text-center">
        <div className="rounded-2xl border-2 border-dashed border-slate-300 p-6">
          <p className="text-sm text-slate-600 mb-3">
            This preview took us under an hour. The real thing — your prices, your reviews, your booking flow — is{" "}
            <strong>live in 48 hours, $299 one-time</strong>, no monthly fees. Reply to our email or tap below.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-full font-semibold text-sm text-black"
            style={{ backgroundColor: "#c8ff00" }}
          >
            Yes — make this real for {demo.name}
          </Link>
        </div>
      </footer>

      <div className="fixed bottom-0 inset-x-0 sm:hidden bg-white border-t border-slate-200 p-3">
        <a
          href={telHref}
          className="block w-full text-center py-3.5 rounded-full text-white font-semibold"
          style={{ backgroundColor: demo.accent }}
        >
          Book Now — takes 10 seconds
        </a>
      </div>
    </main>
  )
}
