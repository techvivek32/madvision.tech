import Link from "next/link"
import type { SiteProfile } from "@/data/site-profiles"

/* ------------------------------------------------------------------ *
 *  GENERATOR ENGINE — render layer.                                   *
 *  Turns a SiteProfile into a full, finished, clean light business    *
 *  site. Every section is conditional, so one template serves many     *
 *  industries (salon, driving school, detailer, groomer, …) from data  *
 *  alone. Bespoke pages (e.g. the dark barbershop) live as their own   *
 *  routes; this is the scalable default that makes 50 sites/day real.  *
 * ------------------------------------------------------------------ */

export function SiteTemplate({ profile: p }: { profile: SiteProfile }) {
  const accent = p.accent
  const accent2 = p.accent2 ?? p.accent
  const bookHref = p.book?.href ?? p.contact.tel
  const bookLabel = p.book?.label ?? "Book now"
  const mapSrc = p.contact.mapQuery
    ? `https://maps.google.com/maps?q=${encodeURIComponent(p.contact.mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`
    : null

  return (
    <main className="min-h-screen bg-white text-[#12131a] antialiased">
      {/* Honest preview ribbon */}
      <div className="bg-[#12131a] text-white text-center text-[11px] sm:text-xs px-4 py-2.5">
        <span className="font-bold tracking-wide" style={{ color: "#c8ff00" }}>
          PREVIEW
        </span>{" "}
        <span className="text-white/75">
          — built by Vision Tech for {p.name}. Every detail here is real, from your own listings. Like it? It&apos;s
          yours, live in 48h.
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
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs"
              style={{ backgroundColor: accent }}
            >
              {initials(p.name)}
            </span>
            <span className="font-extrabold tracking-tight">{p.name}</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-slate-500">
            {p.services && (
              <a href="#services" className="hover:text-slate-900 transition-colors">
                {p.services.items.some((s) => s.price) ? "Prices" : "Services"}
              </a>
            )}
            {p.team && (
              <a href="#team" className="hover:text-slate-900 transition-colors">
                Team
              </a>
            )}
            {(p.contact.address || p.hours) && (
              <a href="#visit" className="hover:text-slate-900 transition-colors">
                Visit
              </a>
            )}
          </nav>
          <div className="flex items-center gap-2">
            <a href={p.contact.tel} className="hidden sm:inline text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2">
              {p.contact.phone}
            </a>
            <a
              href={bookHref}
              className="px-4 sm:px-5 py-2.5 rounded-full text-white font-bold text-sm shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: accent }}
            >
              {bookLabel}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-25" style={{ backgroundColor: accent }} />
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-20 text-center">
          {p.hero.overline && (
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6"
              style={{ backgroundColor: hexA(accent, 0.1), color: accent }}
            >
              {p.hero.overline}
            </span>
          )}
          <h1 className="text-4xl sm:text-6xl font-black leading-[1.03] tracking-tight mb-6">
            {p.hero.headline}
            {p.hero.headlineAccent && (
              <>
                {" "}
                <span style={{ color: accent }}>{p.hero.headlineAccent}</span>
              </>
            )}
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto mb-9 leading-relaxed">{p.hero.sub}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={bookHref}
              className="px-8 py-4 rounded-full font-bold text-white shadow-xl transition-transform hover:scale-105"
              style={{ backgroundColor: accent }}
            >
              {bookLabel}
            </a>
            <a
              href={p.contact.tel}
              className="px-8 py-4 rounded-full border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Call {p.contact.phone}
            </a>
          </div>
          {p.hero.bullets && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
              {p.hero.bullets.map((b) => (
                <span key={b}>✓ {b}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features / why */}
      {p.features && (
        <section id="why" className="border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-6 py-20">
            {p.features.title && (
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-10">{p.features.title}</h2>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {p.features.items.map((f) => (
                <div key={f.h} className="rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: hexA(accent, 0.1) }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                  </div>
                  <div className="font-bold mb-1.5">{f.h}</div>
                  <div className="text-slate-500 text-sm leading-relaxed">{f.p}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      {p.services && (
        <section id="services" className="border-t border-slate-100 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="mb-10">
              {p.services.subtitle && (
                <p className="text-xs uppercase tracking-[0.25em] mb-2 font-semibold" style={{ color: accent2 }}>
                  {p.services.title ?? "Services"}
                </p>
              )}
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                {p.services.subtitle ?? p.services.title ?? "Services"}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {p.services.items.map((s) => (
                <div
                  key={s.name}
                  className="relative rounded-2xl bg-white border p-6 flex flex-col"
                  style={{
                    borderColor: s.featured ? accent : "#e2e8f0",
                    boxShadow: s.featured ? `0 10px 40px -12px ${hexA(accent, 0.4)}` : "none",
                  }}
                >
                  {s.featured && (
                    <span
                      className="absolute -top-3 left-6 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: accent }}
                    >
                      Most popular
                    </span>
                  )}
                  {s.price && (
                    <div className="text-3xl font-black mb-1" style={{ color: accent }}>
                      {s.price}
                    </div>
                  )}
                  {s.unit && <div className="text-slate-400 text-sm mb-3">{s.unit}</div>}
                  <div className="font-bold">{s.name}</div>
                  {s.note && <div className="text-slate-500 text-sm mt-1.5 leading-relaxed flex-1">{s.note}</div>}
                </div>
              ))}
            </div>
            {p.services.note && <p className="text-slate-500 text-sm mt-6">{p.services.note}</p>}
          </div>
        </section>
      )}

      {/* Team */}
      {p.team && (
        <section id="team" className="border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-6 py-20 text-center">
            {p.team.title && (
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">{p.team.title}</h2>
            )}
            {p.team.subtitle && <p className="text-slate-500 max-w-lg mx-auto mb-12">{p.team.subtitle}</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {p.team.members.map((m) => (
                <div key={m.name} className="rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div
                    className="w-14 h-14 mx-auto rounded-full flex items-center justify-center text-xl font-black mb-3"
                    style={{ backgroundColor: hexA(accent, 0.12), color: accent }}
                  >
                    {m.name[0]}
                  </div>
                  <div className="font-bold">{m.name}</div>
                  {m.role && <div className="text-slate-400 text-sm">{m.role}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Areas */}
      {p.areas && (
        <section className="border-t border-slate-100 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-8">{p.areas.title ?? "Areas we cover"}</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {p.areas.items.map((a) => (
                <span key={a} className="px-6 py-3 rounded-full border border-slate-200 font-semibold text-slate-700 bg-white">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews — honest links, no invented quotes */}
      {p.reviews && (
        <section className="border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <div className="text-2xl tracking-[0.3em] mb-3" style={{ color: accent2 }}>
              ★★★★★
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">{p.reviews.headline}</h2>
            {p.reviews.body && <p className="text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">{p.reviews.body}</p>}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {p.reviews.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
            {p.badges && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                {p.badges.map((b) => (
                  <span key={b} className="text-xs font-semibold text-slate-500 border border-slate-200 rounded-full px-3 py-1.5">
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Visit — hours + map */}
      {(p.contact.address || p.hours) && (
        <section id="visit" className="border-t border-slate-100 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-8">Visit us</h2>

              {p.hours && (
                <div className="rounded-2xl bg-white border border-slate-200 divide-y divide-slate-100 mb-8">
                  {p.hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between px-6 py-4">
                      <span className="text-slate-600">{h.day}</span>
                      <span className={h.closed ? "text-slate-400" : "font-semibold"} style={h.closed ? {} : { color: accent }}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {p.contact.address && (
                <div className="space-y-1.5 text-slate-600 mb-8">
                  {p.contact.address.map((line, i) => (
                    <p key={line} className={i === 0 ? "font-semibold text-slate-900" : ""}>
                      {line}
                    </p>
                  ))}
                  <p>
                    <a href={p.contact.tel} className="hover:underline" style={{ color: accent }}>
                      {p.contact.phone}
                    </a>
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <a
                  href={bookHref}
                  className="px-7 py-3.5 rounded-full font-bold text-white shadow-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: accent }}
                >
                  {bookLabel}
                </a>
                {p.contact.mapQuery && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(p.contact.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 rounded-full border border-slate-300 font-semibold text-slate-700 hover:bg-white transition-colors"
                  >
                    Get directions
                  </a>
                )}
              </div>
            </div>

            {mapSrc && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-[380px] lg:h-full min-h-[380px]">
                <iframe
                  title={`${p.name} location`}
                  src={mapSrc}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs" style={{ backgroundColor: accent }}>
                {initials(p.name)}
              </span>
              <div>
                <div className="font-extrabold">{p.name}</div>
                {p.locality && (
                  <div className="text-slate-500 text-sm">
                    {p.locality}
                    {p.established ? ` · est. ${p.established}` : ""}
                  </div>
                )}
              </div>
            </div>
            <div className="text-slate-500 text-sm sm:text-right">
              <div>
                {p.contact.phone}
                {p.contact.email ? ` · ${p.contact.email}` : ""}
              </div>
              {p.contact.socials && (
                <div className="flex gap-3 sm:justify-end mt-1">
                  {p.contact.socials.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <span>
              This preview was built by{" "}
              <a href="https://madvision.tech" className="text-slate-600 hover:text-slate-900 underline underline-offset-2">
                Vision Tech
              </a>{" "}
              from {p.name}&apos;s own public info — no data invented.
            </span>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: accent }}
            >
              Make this yours{p.footerCtaPrice ? ` — live in 48h, ${p.footerCtaPrice}` : ""}
            </Link>
          </div>
        </div>
      </footer>

      {/* Sticky mobile book bar */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-white/95 backdrop-blur border-t border-slate-200 p-3 flex gap-2 z-40">
        <a href={p.contact.tel} className="flex-1 text-center py-3.5 rounded-full border border-slate-300 font-semibold text-slate-700">
          Call
        </a>
        <a href={bookHref} className="flex-1 text-center py-3.5 rounded-full font-bold text-white" style={{ backgroundColor: accent }}>
          {bookLabel}
        </a>
      </div>
    </main>
  )
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

/** hex + alpha → rgba() string, for tint backgrounds from a single accent hex */
function hexA(hex: string, alpha: number) {
  const h = hex.replace("#", "")
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
