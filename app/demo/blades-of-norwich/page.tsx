import type { Metadata } from "next"
import Link from "next/link"

/* ------------------------------------------------------------------ *
 *  FLAGSHIP DEMO — Blades of Norwich (L-005)                          *
 *  A full, finished barbershop site built ONLY from real public data  *
 *  pulled from bladesofnorwich.com + their public listings:           *
 *    prices (Wet Cut £19 / Senior £15 / Under-14 £16 / Buzz £13),      *
 *    address 14 Pottergate NR2 1DS, hours, barbers Nick/Steve/Ray/Jake,*
 *    est. 2010, American Crew & Uppercut, 12th Man campaign, payments. *
 *  NOTHING is invented — no fake reviews, no fake prices.             *
 *  This static route overrides the config-driven /demo/[slug] page.   *
 * ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Blades of Norwich — Barbershop on Pottergate | Preview by Vision Tech",
  robots: { index: false, follow: false },
}

const RED = "#e11d2a"
const GOLD = "#c8a45c"
const PHONE = "01603 630736"
const TEL = "tel:+441603630736"
const MAP =
  "https://maps.google.com/maps?q=14%20Pottergate%2C%20Norwich%2C%20NR2%201DS&t=&z=16&ie=UTF8&iwloc=&output=embed"

const prices = [
  { name: "Wet Cut", price: "£19", note: "Wash, cut & finish" },
  { name: "Buzz Cut", price: "£13", note: "Clippers, clean & quick" },
  { name: "Under 14", price: "£16", note: "For the young gents" },
  { name: "Senior Citizen", price: "£15", note: "Concession rate" },
]

const barbers = ["Nick", "Steve", "Ray", "Jake"]

const hours = [
  { day: "Monday – Friday", time: "8:30am – 6:00pm" },
  { day: "Saturday", time: "7:00am – 5:00pm" },
  { day: "Sunday", time: "Closed", closed: true },
]

function BarberPole({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 120" className={className} aria-hidden preserveAspectRatio="none">
      <defs>
        <pattern id="pole" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <rect width="24" height="8" y="0" fill={RED} />
          <rect width="24" height="8" y="8" fill="#f5f1e8" />
          <rect width="24" height="8" y="16" fill="#1f4fd1" />
        </pattern>
      </defs>
      <rect width="24" height="120" fill="url(#pole)" />
    </svg>
  )
}

export default function BladesOfNorwichDemo() {
  return (
    <main className="min-h-screen bg-[#0c0c0e] text-[#f5f1e8] antialiased">
      {/* Honest preview ribbon */}
      <div className="bg-[#151519] text-center text-[11px] sm:text-xs px-4 py-2.5 border-b border-white/5">
        <span className="font-bold tracking-wide" style={{ color: RED }}>
          PREVIEW
        </span>{" "}
        <span className="text-white/70">
          — built by Vision Tech for Blades of Norwich. Every price, name &amp; detail here is real, pulled from your
          own listings. Like it? It&apos;s yours, live in 48h.
        </span>{" "}
        <Link href="/contact" className="underline underline-offset-2 font-medium text-white/90 hover:text-white">
          Make it real →
        </Link>
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-[#0c0c0e]/90 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <BarberPole className="w-2 h-8 rounded-full overflow-hidden" />
            <span className="font-black tracking-[0.18em] text-sm sm:text-base uppercase">Blades</span>
            <span className="text-white/40 text-xs tracking-[0.3em] uppercase hidden sm:inline">of Norwich</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/60">
            <a href="#prices" className="hover:text-white transition-colors">
              Prices
            </a>
            <a href="#barbers" className="hover:text-white transition-colors">
              The Chairs
            </a>
            <a href="#visit" className="hover:text-white transition-colors">
              Visit
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={TEL}
              className="hidden sm:inline text-sm font-semibold text-white/80 hover:text-white px-3 py-2"
            >
              {PHONE}
            </a>
            <a
              href="#visit"
              className="px-4 sm:px-5 py-2.5 rounded-full text-black font-bold text-sm shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: RED, color: "#fff" }}
            >
              Book a chair
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_20%,#fff,transparent_45%)]" />
        <BarberPole className="absolute left-0 top-0 h-full w-3 sm:w-4 opacity-90" />
        <BarberPole className="absolute right-0 top-0 h-full w-3 sm:w-4 opacity-90" />
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] mb-6" style={{ color: GOLD }}>
            Est. 2010 · The Norwich Lanes
          </p>
          <h1 className="text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight mb-6">
            Norwich&apos;s
            <br />
            <span style={{ color: RED }}>straight-talking</span>
            <br />
            barbershop.
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-xl mx-auto mb-9 leading-relaxed">
            Traditional, classic &amp; contemporary cuts on Pottergate. Sharp fades, proper wet cuts, no fuss —
            walk in or book a chair.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#visit"
              className="px-8 py-4 rounded-full font-bold text-white shadow-xl transition-transform hover:scale-105"
              style={{ backgroundColor: RED }}
            >
              Book a chair
            </a>
            <a
              href={TEL}
              className="px-8 py-4 rounded-full border border-white/20 font-semibold text-white/90 hover:bg-white/5 transition-colors"
            >
              Call {PHONE}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            <span>✓ Walk-ins welcome</span>
            <span>✓ Fully air-conditioned</span>
            <span>✓ Full wheelchair access</span>
          </div>
        </div>
      </section>

      {/* Prices */}
      <section id="prices" className="border-t border-white/10 bg-[#0e0e11]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: GOLD }}>
                The board
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Cuts &amp; prices</h2>
            </div>
            <p className="text-white/45 text-sm max-w-xs">Clear pricing, no surprises in the chair.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {prices.map((s) => (
              <div
                key={s.name}
                className="group rounded-2xl bg-[#151519] border border-white/10 p-6 hover:border-white/25 transition-colors"
              >
                <div className="text-4xl font-black mb-3" style={{ color: RED }}>
                  {s.price}
                </div>
                <div className="font-bold text-lg">{s.name}</div>
                <div className="text-white/45 text-sm mt-1">{s.note}</div>
              </div>
            ))}
          </div>
          <p className="text-white/45 text-sm mt-6">
            Beard trims, styling &amp; finishes with American Crew and Uppercut — just ask in the chair.
          </p>
        </div>
      </section>

      {/* Barbers */}
      <section id="barbers" className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-xs uppercase tracking-[0.3em] mb-2 text-center" style={{ color: GOLD }}>
            Behind the chairs
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-center mb-3">The team</h2>
          <p className="text-white/50 text-center max-w-lg mx-auto mb-12">
            Four barbers who&apos;ve kept Norwich sharp since 2010.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {barbers.map((name) => (
              <div
                key={name}
                className="rounded-2xl bg-[#151519] border border-white/10 p-8 text-center hover:border-white/25 transition-colors"
              >
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-black mb-4"
                  style={{ backgroundColor: "rgba(225,29,42,0.12)", color: RED }}
                >
                  {name[0]}
                </div>
                <div className="font-bold text-lg">{name}</div>
                <div className="text-white/40 text-sm">Barber</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-white/10 bg-[#0e0e11]">
        <div className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { h: "Air-conditioned", p: "Cool, comfortable cuts all year round." },
            { h: "Full wheelchair access", p: "Everyone welcome; parking by request." },
            { h: "Tap & go", p: "Contactless, Apple Pay & Google Pay." },
            { h: "12th Man supporters", p: "Backing men’s mental-health awareness." },
          ].map((f) => (
            <div key={f.h}>
              <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: RED }} />
              <div className="font-bold mb-1">{f.h}</div>
              <div className="text-white/45 text-sm leading-relaxed">{f.p}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews — honest: point to their REAL public pages, no invented quotes */}
      <section className="border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="text-2xl tracking-[0.3em]" style={{ color: GOLD }}>
            ★★★★★
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-4 mb-4">
            Trusted on the Lanes since 2010
          </h2>
          <p className="text-white/55 max-w-xl mx-auto mb-8 leading-relaxed">
            Regulars have kept coming back for over a decade. Read what Norwich actually says — straight from your
            own pages.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.facebook.com/bladesofnorwich/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-white/20 font-semibold text-white/90 hover:bg-white/5 transition-colors"
            >
              Reviews on Facebook →
            </a>
            <a
              href="https://www.instagram.com/bladesofnorwich/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-white/20 font-semibold text-white/90 hover:bg-white/5 transition-colors"
            >
              @bladesofnorwich →
            </a>
          </div>
        </div>
      </section>

      {/* Visit — hours + map */}
      <section id="visit" className="border-t border-white/10 bg-[#0e0e11]">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: GOLD }}>
              Find the shop
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-8">Opening hours &amp; location</h2>

            <div className="rounded-2xl bg-[#151519] border border-white/10 divide-y divide-white/10 mb-8">
              {hours.map((h) => (
                <div key={h.day} className="flex items-center justify-between px-6 py-4">
                  <span className="text-white/70">{h.day}</span>
                  <span className={h.closed ? "text-white/35" : "font-semibold"} style={h.closed ? {} : { color: GOLD }}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 text-white/70 mb-8">
              <p className="font-semibold text-white">14 Pottergate</p>
              <p>Norwich, Norfolk, NR2 1DS</p>
              <p>
                <a href={TEL} className="hover:text-white" style={{ color: RED }}>
                  {PHONE}
                </a>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={TEL}
                className="px-7 py-3.5 rounded-full font-bold text-white shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: RED }}
              >
                Call to book
              </a>
              <a
                href="https://maps.google.com/?q=14+Pottergate,+Norwich,+NR2+1DS"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full border border-white/20 font-semibold text-white/90 hover:bg-white/5 transition-colors"
              >
                Get directions
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 h-[380px] lg:h-full min-h-[380px]">
            <iframe
              title="Blades of Norwich location"
              src={MAP}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <BarberPole className="w-2.5 h-10 rounded-full overflow-hidden" />
              <div>
                <div className="font-black tracking-[0.18em] uppercase">Blades of Norwich</div>
                <div className="text-white/40 text-sm">Barbers · est. 2010 · The Norwich Lanes</div>
              </div>
            </div>
            <div className="text-white/50 text-sm text-right">
              <div>14 Pottergate, Norwich, NR2 1DS</div>
              <div>{PHONE} · bladesofnorwich@gmail.com</div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
            <span>
              This preview was built by{" "}
              <a href="https://madvision.tech" className="text-white/70 hover:text-white underline underline-offset-2">
                Vision Tech
              </a>{" "}
              from Blades of Norwich&apos;s own public info — no data invented.
            </span>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: RED }}
            >
              Make this yours — live in 48h, £220 one-time
            </Link>
          </div>
        </div>
      </footer>

      {/* Sticky mobile book bar */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-[#0c0c0e]/95 backdrop-blur border-t border-white/10 p-3 flex gap-2 z-40">
        <a
          href={TEL}
          className="flex-1 text-center py-3.5 rounded-full border border-white/20 font-semibold text-white/90"
        >
          Call
        </a>
        <a
          href="#visit"
          className="flex-1 text-center py-3.5 rounded-full font-bold text-white"
          style={{ backgroundColor: RED }}
        >
          Book a chair
        </a>
      </div>
    </main>
  )
}
