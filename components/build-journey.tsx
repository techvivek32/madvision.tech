"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion"
import { Search, Code2, Bug, Rocket, ArrowRight, ArrowDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import HangingContact from "@/components/hanging-contact"

/* ------------------------------------------------------------------ */
/*  3D scene (client-only, ssr:false — allowed here since this is a    */
/*  client component). Dark placeholder keeps the white nav readable.  */
/* ------------------------------------------------------------------ */

const JourneyScene = dynamic(() => import("@/components/3d/journey-scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a0a0f]" />,
})

/* ------------------------------------------------------------------ */
/*  Stage data                                                        */
/* ------------------------------------------------------------------ */

type Stage = {
  id: string
  num: string
  short: string
  title: string
  desc: string
  accent: string
  Icon: LucideIcon
}

const STAGES: Stage[] = [
  {
    id: "rnd",
    num: "01",
    short: "R&D",
    title: "Research & Development",
    desc: "We dig into your goals, users and market — sketching ideas, mapping flows and validating concepts before a single line of code is written.",
    accent: "#f59e0b",
    Icon: Search,
  },
  {
    id: "dev",
    num: "02",
    short: "Development",
    title: "Development",
    desc: "Approved designs turn into clean, scalable code. Modular architecture, real data and pixel-perfect interfaces — built to last.",
    accent: "#38bdf8",
    Icon: Code2,
  },
  {
    id: "qa",
    num: "03",
    short: "QA",
    title: "Quality Assurance",
    desc: "Every flow is tested across devices and edge cases. Bugs get squashed, performance is tuned and accessibility is verified.",
    accent: "#34d399",
    Icon: Bug,
  },
  {
    id: "prod",
    num: "04",
    short: "Production",
    title: "Production Handover",
    desc: "We ship to production, monitor the launch and hand over the keys — documentation, access and a product that's live and growing.",
    accent: "#a78bfa",
    Icon: Rocket,
  },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function BuildJourney() {
  const ref = useRef<HTMLElement>(null)
  // Continuous scroll progress 0..1 — written every change, read by the RAF
  // loop inside JourneyScene. NO per-frame React state.
  const progressRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // continuous value for the 3D scene (ref, not state)
    progressRef.current = v
    // discrete value for the overlay (changes at most 4 times)
    const i = Math.min(STAGES.length - 1, Math.max(0, Math.floor(v * STAGES.length)))
    if (i !== active) setActive(i)
  })

  // continuous scrubbed motion for the overlay chrome
  const fill = useTransform(scrollYProgress, [0.02, 0.98], ["0%", "100%"])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0])

  const accent = STAGES[active].accent

  return (
    <section ref={ref} className="relative h-[450vh] bg-[#0a0a0f]">
      {/* pinned stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* live 3D scene — full-bleed background, behind the overlay.
            pointer-events-none so the custom cursor + CTA stay hoverable. */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <JourneyScene progress={progressRef} active={active} />
        </div>

        {/* background grid — subtle additive texture over the canvas */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* soft accent halo — extra depth, cross-blends with the active stage */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          animate={{ backgroundColor: accent, opacity: 0.1 }}
          transition={{ duration: 0.8 }}
        />

        {/* legibility scrim — darkens left/top/bottom edges so the overlay text
            stays readable, while the center-right 3D core stays bright. */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to right, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.55) 26%, rgba(10,10,15,0) 50%), linear-gradient(to top, rgba(10,10,15,0.88) 0%, rgba(10,10,15,0) 20%), linear-gradient(to bottom, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0) 14%)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6">
          {/* eyebrow */}
          <div className="flex shrink-0 items-center justify-between pt-24 lg:pt-28">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/70 [text-shadow:_0_1px_10px_rgba(0,0,0,0.7)]">
              How we build
            </span>
            <motion.span
              style={{ opacity: hintOpacity }}
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 sm:flex"
            >
              Scroll to explore <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </motion.span>
          </div>

          {/* main area — left info column; right cell left empty so the 3D
              gem shows through behind it. */}
          <div className="grid flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* left — stage info */}
            <StageInfo active={active} />
            {/* right — intentionally empty; the 3D scene fills this space */}
            <div aria-hidden className="hidden lg:block" />
          </div>

          {/* bottom stepper */}
          <div className="shrink-0 pb-10">
            <div className="relative">
              {/* track */}
              <div className="absolute left-0 right-0 top-[11px] h-px bg-white/10" />
              {/* fill */}
              <motion.div
                className="absolute left-0 top-[11px] h-px"
                style={{ width: fill, backgroundColor: accent }}
              />
              <div className="relative flex justify-between">
                {STAGES.map((s, i) => {
                  const done = i <= active
                  return (
                    <div key={s.id} className="flex flex-1 flex-col items-center first:items-start last:items-end">
                      <motion.span
                        className="h-6 w-6 rounded-full border-2 bg-[#0a0a0f]"
                        animate={{
                          borderColor: done ? s.accent : "rgba(255,255,255,0.2)",
                          backgroundColor: i === active ? s.accent : "#0a0a0f",
                          scale: i === active ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <span
                        className="mt-3 text-[10px] font-medium uppercase tracking-[0.15em] transition-colors sm:text-xs"
                        style={{ color: done ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}
                      >
                        <span className="font-mono">{s.num}</span>
                        <span className="ml-1.5 hidden sm:inline">{s.short}</span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* draggable "Contact Us" tag hanging on a cord */}
        <HangingContact />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Left info panel                                                   */
/* ------------------------------------------------------------------ */

function StageInfo({ active }: { active: number }) {
  const s = STAGES[active]
  return (
    <div className="relative">
      <div className="mb-6 flex items-baseline gap-3">
        <motion.span
          key={s.num}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-6xl font-bold leading-none lg:text-8xl [text-shadow:_0_4px_24px_rgba(0,0,0,0.55)]"
          style={{ color: s.accent }}
        >
          {s.num}
        </motion.span>
        <span className="font-mono text-lg text-white/30">/ 04</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${s.accent}1a`, color: s.accent }}
            >
              <s.Icon className="h-5 w-5" />
            </span>
            <h2 className="font-sans text-3xl font-bold text-white lg:text-4xl [text-shadow:_0_2px_16px_rgba(0,0,0,0.75)]">
              {s.title}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/75 [text-shadow:_0_1px_12px_rgba(0,0,0,0.7)]">
            {s.desc}
          </p>

          {active === STAGES.length - 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                Start your project <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
