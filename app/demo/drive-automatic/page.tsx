import type { Metadata } from "next"
import Link from "next/link"

/* ------------------------------------------------------------------ *
 *  FLAGSHIP DEMO — Drive Automatic (L-006)                            *
 *  Full driving-instructor site built ONLY from real public data      *
 *  pulled from drive-automatic.uk:                                    *
 *    instructor Yuri Kuris, DVSA approved, automatic BMW (dual         *
 *    controls, insured), areas Brighton/Hove/Portslade/Southwick,     *
 *    packages (6h intro £220, 2h £88, 10h £430, 20h £840), FB page.    *
 *  NOTHING invented — no fake reviews, no fake pass-rate.             *
 * ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Drive Automatic — Automatic Driving Lessons in Brighton | Preview by Vision Tech",
  robots: { index: false, follow: false },
}

const INK = "#7c3aed"
const PHONE = "07721 760868"
const TEL = "tel:+447721760868"
const EMAIL = "lessons@drive-automatic.uk"
const FB = "https://www.facebook.com/Drive-Automatic-108002038098737/"

const packages = [
  { name: "Introductory offer", price: "£220", unit: "6 hours", note: "First purchase only — the easiest way to start.", featured: true },
  { name: "Single booking", price: "£88", unit: "per 2 hours", note: "Minimum 2-hour lessons so real progress sticks." },
  { name: "10-hour block", price: "£430", unit: "10 hours", note: "Build momentum and save per hour." },
  { name: "20-hour block", price: "£840", unit: "20 hours", note: "From first lesson to test-ready." },
]

const areas = ["Brighton", "Hove", "Portslade", "Southwick"]

export default function DriveAutomaticDemo() {
  return (
    <main className="min-h-screen bg-white text-[#12131a] antialiased">
      {/* Honest preview ribbon */}
      <div className="bg-[#12131a] text-white text-center text-[11px] sm:text-xs px-4 py-2.5">
        <span className="font-bold tracking-wide" style={{ color: "#c8ff00" }}>
          PREVIEW
        </span>{" "}
        <span className="text-white/75">
          — built by Vision Tech for Drive Automatic. Every detail here is real, from your own listings. Like it?
          It&apos;s yours, live in 48h.
        </span>{" "}
        <Link href="/contact" className="underline underline-offset-2 font-medium text-white hover:opacity-80">
          Make it real →
        </Link>
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
              style={{ backgroundColor: INK }}
            >
              DA
            </span>
            <span className="font-extrabold tracking-tight">Drive Automatic</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-slate-500">
            <a href="#why" className="hover:text-slate-900 transition-colors">
              Why us
            </a>
            <a href="#prices" className="hover:text-slate-900 transition-colors">
              Packages
            </a>
            <a href="#areas" className="hover:text-slate-900 transition-colors">
              Areas
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={TEL} className="hidden sm:inline text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2">
              {PHONE}
            </a>
            <a
              href="#prices"
              className="px-4 sm:px-5 py-2.5 rounded-full text-white font-bold text-sm shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: INK }}
            >
              Book a lesson
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ backgroundColor: "#ddd6fe" }} />
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-20 text-center">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: "rgba(124,58,237,0.1)", color: INK }}
          >
            DVSA-approved · Brighton &amp; Hove
          </span>
          <h1 className="text-4xl sm:text-6xl font-black leading-[1.02] tracking-tight mb-6">
            Pass in an automatic —{" "}
            <span style={{ color: INK }}>calm, clear, confident.</span>
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto mb-9 leading-relaxed">
            Structured automatic driving lessons with Yuri Kuris in a fully automatic, dual-control BMW. Clear
            objectives every lesson, patient teaching, and a confidence-first approach that gets learners test-ready.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#prices"
              className="px-8 py-4 rounded-full font-bold text-white shadow-xl transition-transform hover:scale-105"
              style={{ backgroundColor: INK }}
            >
              Start with 6 hrs for £220
            </a>
            <a
              href={TEL}
              className="px-8 py-4 rounded-full border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Call {PHONE}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span>✓ Fully automatic BMW</span>
            <span>✓ Dual controls &amp; fully insured</span>
            <span>✓ Structured, objective-led lessons</span>
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-xs uppercase tracking-[0.25em] mb-2 font-semibold" style={{ color: INK }}>
            Why learn with Yuri
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-10">Built around your confidence</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { h: "DVSA approved", p: "A fully qualified, DVSA-approved automatic driving instructor." },
              { h: "The right car", p: "A fully automatic BMW with dual controls and comprehensive insurance." },
              { h: "Structured lessons", p: "Every session has clear objectives, so progress is real and visible." },
              { h: "Confidence first", p: "Patient teaching focused on safety and calm, steady improvement." },
            ].map((f) => (
              <div key={f.h} className="rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(124,58,237,0.1)" }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: INK }} />
                </div>
                <div className="font-bold mb-1.5">{f.h}</div>
                <div className="text-slate-500 text-sm leading-relaxed">{f.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="prices" className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] mb-2 font-semibold" style={{ color: INK }}>
              Lessons &amp; packages
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Simple, honest pricing</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((p) => (
              <div
                key={p.name}
                className="relative rounded-2xl bg-white border p-6 flex flex-col"
                style={{ borderColor: p.featured ? INK : "#e2e8f0", boxShadow: p.featured ? "0 10px 40px -12px rgba(124,58,237,0.4)" : "none" }}
              >
                {p.featured && (
                  <span
                    className="absolute -top-3 left-6 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: INK }}
                  >
                    Best to start
                  </span>
                )}
                <div className="text-3xl font-black mb-1" style={{ color: INK }}>
                  {p.price}
                </div>
                <div className="text-slate-400 text-sm mb-3">{p.unit}</div>
                <div className="font-bold">{p.name}</div>
                <div className="text-slate-500 text-sm mt-1.5 leading-relaxed flex-1">{p.note}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-6 text-center">
            Gift vouchers and bespoke packages available on request — just ask.
          </p>
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.25em] mb-2 font-semibold" style={{ color: INK }}>
            Where we teach
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-8">Covering Brighton &amp; around</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {areas.map((a) => (
              <span
                key={a}
                className="px-6 py-3 rounded-full border border-slate-200 font-semibold text-slate-700 bg-slate-50"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews — honest: link to their real page, no invented quotes */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Many learners, many passes
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Yuri has helped many students build their confidence and pass their test. See updates and learner news
            straight from the Drive Automatic page.
          </p>
          <a
            href={FB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3.5 rounded-full border border-slate-300 font-semibold text-slate-700 hover:bg-white transition-colors"
          >
            Visit us on Facebook →
          </a>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Ready for your first lesson?</h2>
          <p className="text-slate-600 mb-8">Book the 6-hour introductory offer and get moving this week.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={TEL}
              className="px-8 py-4 rounded-full font-bold text-white shadow-xl transition-transform hover:scale-105"
              style={{ backgroundColor: INK }}
            >
              Call {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="px-8 py-4 rounded-full border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Email to book
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: INK }}>
                DA
              </span>
              <div>
                <div className="font-extrabold">Drive Automatic</div>
                <div className="text-slate-500 text-sm">Automatic driving lessons · Brighton &amp; Hove</div>
              </div>
            </div>
            <div className="text-slate-500 text-sm sm:text-right">
              <div>{PHONE} · {EMAIL}</div>
              <div>Instructor: Yuri Kuris · DVSA approved</div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <span>
              This preview was built by{" "}
              <a href="https://madvision.tech" className="text-slate-600 hover:text-slate-900 underline underline-offset-2">
                Vision Tech
              </a>{" "}
              from Drive Automatic&apos;s own public info — no data invented.
            </span>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: INK }}
            >
              Make this yours — live in 48h, £199 one-time
            </Link>
          </div>
        </div>
      </footer>

      {/* Sticky mobile book bar */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-white/95 backdrop-blur border-t border-slate-200 p-3 flex gap-2 z-40">
        <a href={TEL} className="flex-1 text-center py-3.5 rounded-full border border-slate-300 font-semibold text-slate-700">
          Call
        </a>
        <a href="#prices" className="flex-1 text-center py-3.5 rounded-full font-bold text-white" style={{ backgroundColor: INK }}>
          Book a lesson
        </a>
      </div>
    </main>
  )
}
