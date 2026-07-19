"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRef, type RefObject } from "react"
import { RunningStrip, LargeTextMarquee } from "./marquee-section"
import {
  ACCENT,
  DUR,
  EASE_OUT,
  SPRING_POP,
  VIEWPORT,
  CountUp,
  GlowOrb,
  GradientText,
  MagneticButton,
  Reveal,
  RevealText,
  ShineOverlay,
  Stagger,
  StaggerItem,
  TiltCard,
  useParallax,
} from "@/components/motion"

/* ------------------------------------------------------------------ */
/*  The Shipping Ledger — every shipped product is a numbered entry    */
/*  in a living archive. Serials, index rows, numerals and the         */
/*  reserved next line all derive from entries[] order; adding a new   */
/*  success is appending one object.                                   */
/* ------------------------------------------------------------------ */

type Entry = {
  name: string
  category: string
  status: "live" | "prep"
  statusLine: string
  description: string
  quote?: string
  features: string[]
  image: string
  href: string
  cta: string
  external: boolean
}

const entries: Entry[] = [
  {
    name: "Retailians POS",
    category: "Retail POS",
    status: "live",
    statusLine: "In service",
    description:
      "Empowering thousands of retail business owners across India to embrace technology and streamline operations — from the first bill of the day to the last stock count.",
    quote: "One platform, infinite possibilities.",
    features: [
      "Lightning-fast billing system",
      "Real-time inventory tracking",
      "GST-compliant reports",
      "Customer loyalty programs",
      "Offline mode support",
    ],
    image: "/modern-pos-system-dashboard.jpg",
    href: "https://retailians.com/",
    cta: "Visit retailians.com",
    external: true,
  },
  {
    name: "911 Wrap ERP",
    category: "Automotive ERP",
    status: "live",
    statusLine: "In service",
    description:
      "Cutting-edge ERP for automobile dealerships and custom wrap studios. From order management to profit analytics — everything needed to run the floor and the books in one place.",
    features: [
      "Operations management",
      "Inventory control",
      "Accounts & billing",
      "Workflow automation",
      "Secure cloud access",
      "Multi-user roles",
    ],
    image: "/enterprise-erp-software-interface.jpg",
    href: "https://911wraperp.space/",
    cta: "Visit 911wraperp.space",
    external: true,
  },
  {
    name: "DSAT Guru",
    category: "EdTech · SAT Prep",
    status: "prep",
    statusLine: "In preparation",
    description:
      "A smart SAT preparation platform in the Vision Tech product family — currently being readied for its own line in the ledger.",
    features: ["Adaptive practice", "Performance analytics", "Structured study plans"],
    image: "/custom-software-development-code-editor-interface.jpg",
    href: "/contact",
    cta: "Enquire about DSAT Guru",
    external: false,
  },
]

const pad3 = (n: number) => String(n).padStart(3, "0")
const serialOf = (i: number) => `VT-${pad3(i + 1)}`
const RESERVED_SERIAL = serialOf(entries.length)
const RESERVED_NUMERAL = pad3(entries.length + 1)

/* Stroke-only numeral, site convention (same trick as the marquees). */
function StrokeNumeral({
  text,
  className,
  stroke = "rgba(0,0,0,0.12)",
}: {
  text: string
  className?: string
  stroke?: string
}) {
  return (
    <span
      aria-hidden
      className={`font-serif leading-none text-transparent select-none ${className ?? ""}`}
      style={{ WebkitTextStroke: `1px ${stroke}` }}
    >
      {text}
    </span>
  )
}

/* ---------------- rubber stamp — the proof-of-life mark ------------ */

function RubberStamp({
  label,
  arcText,
  ink,
  ghost = false,
}: {
  label: string
  arcText: string
  ink: string
  ghost?: boolean
}) {
  const reduce = useReducedMotion()
  const arcId = `stamp-arc-${label.replace(/\s+/g, "-").toLowerCase()}`
  return (
    <motion.svg
      width={120}
      height={120}
      viewBox="0 0 120 120"
      className="pointer-events-none select-none"
      style={{ rotate: -8, mixBlendMode: ghost ? undefined : "multiply" }}
      initial={reduce || ghost ? undefined : { scale: 1.6, opacity: 0 }}
      whileInView={reduce || ghost ? undefined : { scale: 1, opacity: 0.9 }}
      viewport={VIEWPORT}
      transition={SPRING_POP}
      aria-label={`${label} — ${arcText}`}
    >
      <defs>
        <path id={arcId} d="M 24 60 A 36 36 0 0 1 96 60" fill="none" />
      </defs>
      <circle cx={60} cy={60} r={54} fill="none" stroke={ink} strokeWidth={2.5} />
      <circle cx={60} cy={60} r={44} fill="none" stroke={ink} strokeWidth={1} strokeDasharray="4 3" />
      {!ghost && (
        <>
          <text
            x={60}
            y={68}
            textAnchor="middle"
            fontSize={22}
            fontWeight="bold"
            letterSpacing={4}
            fill={ink}
            className="font-mono uppercase"
          >
            {label}
          </text>
          <text fontSize={8.5} letterSpacing={2.5} fill={ink} className="font-mono uppercase">
            <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
              {arcText}
            </textPath>
          </text>
        </>
      )}
    </motion.svg>
  )
}

/* ---------------- perforation — same die-cut as the hang-tag ------- */

function PerforationDivider() {
  return (
    <div aria-hidden className="relative">
      <div className="border-t border-dashed border-border" />
      <span
        className="absolute -left-[7px] top-0 h-3.5 w-3.5 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: "var(--background)", boxShadow: "inset -1px 0 2px rgba(0,0,0,0.12)" }}
      />
      <span
        className="absolute -right-[7px] top-0 h-3.5 w-3.5 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: "var(--background)", boxShadow: "inset 1px 0 2px rgba(0,0,0,0.12)" }}
      />
    </div>
  )
}

/* ---------------- one ledger spread per entry ---------------------- */

function LedgerEntry({ entry, index }: { entry: Entry; index: number }) {
  const reduce = useReducedMotion()
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] })
  const rawY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const imgY = reduce ? 0 : rawY

  const isLive = entry.status === "live"
  const inkColor = isLive ? ACCENT : "rgba(10,10,15,0.45)"

  return (
    <article id={`vt-${pad3(index + 1)}`} className="scroll-mt-24 py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-12">
        {/* left rail — numeral, serial block, stamp */}
        <div className="lg:sticky lg:top-24 self-start">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Entry {pad3(index + 1)} / {pad3(entries.length)}
          </p>

          {/* stacked stroke numerals — gray at rest, lime cross-fades in */}
          <div className="relative inline-block">
            <StrokeNumeral text={pad3(index + 1)} className="text-7xl lg:text-[9rem]" />
            <motion.span
              aria-hidden
              className="absolute inset-0"
              initial={reduce ? undefined : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.2 }}
            >
              <StrokeNumeral
                text={pad3(index + 1)}
                className="text-7xl lg:text-[9rem]"
                stroke="rgba(200,255,0,0.35)"
              />
            </motion.span>
          </div>

          {/* mono serial block on ruled lines */}
          <div className="mt-6 border-t border-b border-border py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground space-y-1.5">
            <p>N&ordm; {serialOf(index)}</p>
            <p>Cat: {entry.category}</p>
            <p>Status: {entry.statusLine}</p>
          </div>

          <div className="mt-6 hidden lg:block">
            <RubberStamp label={isLive ? "LIVE" : "IN PREP"} arcText={entry.statusLine} ink={inkColor} />
          </div>
        </div>

        {/* right column — the entry itself */}
        <div>
          <h3 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            <RevealText as="span" by="word" text={entry.name} className="inline" />
          </h3>

          <Reveal as="p" y={16} delay={0.08} className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
            {entry.description}
          </Reveal>

          {entry.quote && (
            <Reveal y={16} delay={0.12} className="mb-8">
              <blockquote className="relative max-w-xl pl-8">
                <span
                  aria-hidden
                  className="absolute left-0 -top-3 font-serif text-6xl leading-none"
                  style={{ color: ACCENT }}
                >
                  &ldquo;
                </span>
                <p className="font-serif text-2xl italic text-foreground">{entry.quote}</p>
              </blockquote>
            </Reveal>
          )}

          {/* cargo list — dotted manifest leaders */}
          <Stagger as="ul" className="max-w-xl space-y-3 mb-10">
            {entry.features.map((feature) => (
              <StaggerItem as="li" key={feature} y={12} className="flex items-end gap-3">
                <span className="min-w-0 text-foreground">{feature}</span>
                <span aria-hidden className="flex-1 border-b border-dotted border-border mb-1.5" />
                <CheckCircle2 className="w-4 h-4 shrink-0 mb-0.5 text-foreground" />
              </StaggerItem>
            ))}
          </Stagger>

          {/* screenshot plate */}
          <motion.div ref={imgRef} style={{ y: imgY }} className="mb-10 max-w-3xl">
            <TiltCard max={7} scale={1.02} className="rounded-2xl overflow-hidden border border-border shadow-xl">
              <div className="relative">
                <div className="aspect-[16/10] bg-secondary">
                  <img
                    src={entry.image}
                    alt={`${entry.name} interface`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 to-transparent" />
                <ShineOverlay tone="dark" repeatDelay={6} className="rounded-2xl" />
              </div>
            </TiltCard>
          </motion.div>

          <Reveal y={14} className="inline-block">
            <MagneticButton
              as={Link}
              href={entry.href}
              accent={ACCENT}
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium overflow-hidden"
            >
              <ShineOverlay trigger="hover" tone="dark" className="rounded-full" />
              <span className="relative z-10">{entry.cta}</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */

export default function PortfolioPageContent() {
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const heroOrbY = useParallax(heroRef as RefObject<HTMLElement>, { to: -120 })

  const manifestRows = [
    { label: "Kept by", value: "Vision Tech" },
    { label: "Offices", value: "Rajkot · Ahmedabad · Kelowna" },
    { label: "Entries to date", value: pad3(entries.length) },
  ]

  const totals = [
    { label: "Projects delivered", value: 104, suffix: "+" },
    { label: "Team members", value: 14, suffix: "+" },
    { label: "Years shipping", value: 5, suffix: "+" },
    { label: "Client satisfaction", value: 100, suffix: "%" },
  ]

  return (
    <>
      {/* ---------- manifest hero ---------- */}
      <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden bg-background">
        <div aria-hidden className="grid-texture-dark absolute inset-0 opacity-[0.5] pointer-events-none" />
        <GlowOrb color={ACCENT} size={520} opacity={0.12} parallax={heroOrbY} className="-top-40 -left-32" />
        <span
          aria-hidden
          className="text-stroke-lime pointer-events-none select-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-[18vw] leading-none font-bold text-transparent opacity-40"
        >
          SHIPPED
        </span>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <Reveal y={14} className="flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ backgroundColor: ACCENT }} />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Shipping manifest — Vision Tech archive
              </span>
            </Reveal>

            <h1 className="font-serif font-normal text-4xl md:text-6xl lg:text-7xl text-foreground mb-10">
              <RevealText as="span" by="word" text="The work that" delay={0.05} className="inline" />{" "}
              <GradientText animate as="span" className="italic">
                shipped.
              </GradientText>
            </h1>

            {/* manifest header — ruled rows */}
            <Stagger className="max-w-xl">
              {manifestRows.map((row) => (
                <StaggerItem
                  key={row.label}
                  y={10}
                  className="flex items-baseline justify-between gap-4 py-3 border-b border-border"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {row.label}
                  </span>
                  <span className="font-serif text-lg text-foreground text-right">{row.value}</span>
                </StaggerItem>
              ))}
              <StaggerItem
                y={10}
                className="flex items-baseline justify-between gap-4 py-3 border-b border-border"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Projects delivered
                </span>
                <CountUp value={104} suffix="+" className="font-serif text-lg text-foreground" />
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>

      <RunningStrip text="RETAILIANS POS • 911 WRAP ERP • DSAT GURU" speed={25} />

      {/* ---------- index of entries ---------- */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <Reveal as="span" y={12} className="block font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Index
          </Reveal>
          <Reveal as="h2" delay={0.06} className="font-serif text-3xl md:text-4xl text-foreground mt-3 mb-10">
            Registry of shipped work
          </Reveal>

          <Stagger>
            {entries.map((entry, i) => (
              <StaggerItem key={entry.name} y={14}>
                <Link
                  href={`#vt-${pad3(i + 1)}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8 py-5 border-b border-border"
                >
                  <span
                    className="font-serif text-4xl md:text-5xl leading-none text-transparent transition-all duration-300 group-hover:[-webkit-text-stroke:1px_rgba(200,255,0,0.6)]"
                    style={{ WebkitTextStroke: "1px rgba(0,0,0,0.15)" }}
                  >
                    {pad3(i + 1)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-xl md:text-2xl text-foreground">{entry.name}</span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                      {entry.category}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="hidden sm:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {entry.status === "live" ? (
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                          style={{ backgroundColor: ACCENT }}
                        />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full border border-border" />
                      )}
                      {entry.status === "live" ? "Live" : "In prep"}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
            {/* ghost row — the line waiting to be earned */}
            <StaggerItem y={14}>
              <Link
                href="#next-entry"
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8 py-5 border-b border-dashed border-border opacity-40 hover:opacity-70 transition-opacity"
              >
                <span
                  className="font-serif text-4xl md:text-5xl leading-none text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(0,0,0,0.15)" }}
                >
                  {RESERVED_NUMERAL}
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-xl md:text-2xl text-foreground">&mdash;</span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    N&ordm; {RESERVED_SERIAL} &middot; Reserved
                  </span>
                </span>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ---------- ledger entries ---------- */}
      <section className="bg-background">
        <div className="container mx-auto px-6">
          {entries.map((entry, i) => (
            <div key={entry.name}>
              <LedgerEntry entry={entry} index={i} />
              {i < entries.length - 1 && <PerforationDivider />}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- dark typographic passage ---------- */}
      <LargeTextMarquee text="SHIPPED ★ LIVE ★ IN SERVICE" speed={35} />

      <section className="py-24 dark-section relative overflow-hidden">
        <div aria-hidden className="grid-texture absolute inset-0 pointer-events-none" />
        <GlowOrb color={ACCENT} size={460} opacity={0.1} className="top-1/4 -right-24" />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal as="span" y={12} className="block font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-10">
            Balance carried forward
          </Reveal>

          <Stagger className="max-w-3xl">
            {totals.map((t) => (
              <StaggerItem
                key={t.label}
                y={12}
                className="flex items-end justify-between gap-4 py-5 border-b border-white/10"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 mb-2">{t.label}</span>
                <span aria-hidden className="flex-1 border-b border-dotted border-white/10 mb-3" />
                <CountUp
                  value={t.value}
                  suffix={t.suffix}
                  className="font-serif text-5xl md:text-6xl text-white leading-none"
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <RunningStrip text="VISION TECH • PROOF OF WORK" reverse speed={20} dark />

      {/* ---------- the reserved line ---------- */}
      <section id="next-entry" className="py-24 bg-background scroll-mt-24">
        <div className="container mx-auto px-6">
          <Reveal y={0} duration={DUR.slow}>
            <motion.div
              initial={reduce ? undefined : { scale: 0.97 }}
              whileInView={reduce ? undefined : { scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.slow, ease: EASE_OUT }}
              className="relative overflow-hidden rounded-2xl border-2 border-dashed border-border p-10 md:p-16 text-center"
            >
              {/* giant reserved numeral parked behind */}
              <StrokeNumeral
                text={RESERVED_NUMERAL}
                className="absolute -right-6 -bottom-10 text-[12rem] md:text-[18rem] opacity-[0.15] pointer-events-none"
              />
              {/* un-inked ghost stamp — waiting to be earned */}
              <div className="absolute left-8 top-8 hidden lg:block opacity-30">
                <RubberStamp label="" arcText="" ink="rgba(10,10,15,0.35)" ghost />
              </div>
              {/* corner postmark — the hang-tag's cancellation mark */}
              <svg
                aria-hidden
                width={104}
                height={60}
                viewBox="0 0 104 60"
                className="pointer-events-none absolute right-4 top-6 opacity-30 hidden md:block"
                style={{ transform: "rotate(-7deg)" }}
              >
                <g stroke="rgba(10,10,15,0.5)" fill="none" strokeWidth={1}>
                  <circle cx={76} cy={30} r={22} strokeDasharray="3 2.5" opacity={0.55} />
                  <circle cx={76} cy={30} r={16.5} opacity={0.45} />
                  <path d="M2 22 q 8 -4 16 0 t 16 0 t 16 0" opacity={0.4} />
                  <path d="M2 30 q 8 -4 16 0 t 16 0 t 16 0" opacity={0.4} />
                  <path d="M2 38 q 8 -4 16 0 t 16 0 t 16 0" opacity={0.4} />
                </g>
                <text x={76} y={28} textAnchor="middle" fontSize={6.5} letterSpacing={1} fill="rgba(10,10,15,0.6)" className="font-mono">
                  EST.
                </text>
                <text x={76} y={37} textAnchor="middle" fontSize={7} letterSpacing={1} fill="rgba(10,10,15,0.6)" className="font-mono">
                  2026
                </text>
              </svg>

              <div className="relative z-10 max-w-2xl mx-auto">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
                  N&ordm; VT-{RESERVED_NUMERAL} &mdash; this line reserved
                </p>
                <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
                  The next entry could be{" "}
                  <GradientText animate as="span" className="italic">
                    yours.
                  </GradientText>
                </h2>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-10">
                  This space is earned, not filled.
                </p>
                <MagneticButton
                  as={Link}
                  href="/contact"
                  className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-full btn-lime font-medium text-sm"
                >
                  <ShineOverlay trigger="hover" tone="dark" />
                  <span className="relative z-10">Start Your Project</span>
                  <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </MagneticButton>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
