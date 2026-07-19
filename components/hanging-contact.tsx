"use client"

import { useEffect } from "react"
import Link from "next/link"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  An interactive "Contact Us" hang-tag that dangles from twine.      */
/*  Styled as a vintage luggage / shipping tag for the light hero:     */
/*  aged cream paper, stitched edging, brass grommet, ink barcode,     */
/*  postmark stamp, perforated stub — lime reserved for the CTA and    */
/*  the "Open" seal dot.                                               */
/*  - drops in from the top on mount (spring bounce)                   */
/*  - grab + drag it; the twine bends to follow                        */
/*  - release -> springs back with a natural pendulum swing            */
/* ------------------------------------------------------------------ */

const W = 220 // container width
const H = 340 // container height
const AX = W / 2 // cord anchor (peg) x
const AY = 12 // cord anchor (peg) y
const CARD_W = 154
const CARD_H = 226
const REST_CX = W / 2 // card center x at rest
const REST_CY = 196 // card center y at rest
const TOP_CONN_Y = REST_CY - CARD_H / 2 // where the cord meets the card top

// deterministic barcode pattern (SSR-safe — no random)
const BARS = [2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 2, 1, 3, 1]

/* --- die-cut luggage-tag silhouette (angled top shoulders) --------- */
const SHOULDER_Y = 26 // px below the top where the shoulders meet full width
const HEAD_INSET = 30 // px in from each side where the narrow head begins

const TAG_CLIP = `polygon(${HEAD_INSET}px 0, ${CARD_W - HEAD_INSET}px 0, 100% ${SHOULDER_Y}px, 100% 100%, 0 100%, 0 ${SHOULDER_Y}px)`

// stitched edging: the tag outline inset by 7px, drawn as a dashed seam
const STITCH_D = [
  `M ${HEAD_INSET + 3} 7`,
  `L ${CARD_W - HEAD_INSET - 3} 7`,
  `L ${CARD_W - 7} ${SHOULDER_Y + 4}`,
  `L ${CARD_W - 7} ${CARD_H - 7}`,
  `L 7 ${CARD_H - 7}`,
  `L 7 ${SHOULDER_Y + 4}`,
  "Z",
].join(" ")

// aged cream paper: light bloom up top, foxed vignette below,
// fine laid-paper ridges, warm base wash — all cheap gradients
const PAPER_BG = [
  "radial-gradient(120% 90% at 50% 0%, rgba(255,252,242,0.85), rgba(255,252,242,0) 55%)",
  "radial-gradient(90% 70% at 50% 110%, rgba(139,108,64,0.14), rgba(139,108,64,0) 60%)",
  "repeating-linear-gradient(0deg, rgba(120,95,60,0.035) 0px, rgba(120,95,60,0.035) 1px, transparent 1px, transparent 3px)",
  "linear-gradient(165deg, #f9f2e1 0%, #f3e9d2 55%, #ebdec0 100%)",
].join(", ")

// foxing — faint age spots scattered over the paper
const FOXING_BG = [
  "radial-gradient(18px 14px at 82% 16%, rgba(150,110,50,0.10), transparent 70%)",
  "radial-gradient(12px 10px at 10% 74%, rgba(150,110,50,0.08), transparent 70%)",
  "radial-gradient(24px 20px at 68% 92%, rgba(150,110,50,0.07), transparent 70%)",
].join(", ")

export default function HangingContact() {
  // drag offsets (also animated on mount for the "drop" effect)
  const x = useMotionValue(0)
  const y = useMotionValue(-300)

  // drop in from the top once, with a springy settle
  useEffect(() => {
    const controls = animate(y, 0, {
      type: "spring",
      stiffness: 130,
      damping: 9,
      delay: 0.35,
    })
    return () => controls.stop()
  }, [y])

  // cord path: quadratic bezier from peg -> card top, sagging with the pull
  const d = useTransform([x, y], ([lx, ly]: number[]) => {
    const ex = REST_CX + lx
    const ey = TOP_CONN_Y + ly
    const cx = AX + lx * 0.5
    const cy = (AY + ey) / 2 + Math.abs(lx) * 0.22 + 16
    return `M ${AX} ${AY} Q ${cx} ${cy} ${ex} ${ey}`
  })

  // tilt the card toward the pull direction (pendulum feel)
  const rotate = useTransform(x, [-150, 150], [18, -18])

  return (
    <div
      className="pointer-events-none absolute left-[5%] top-0 z-30 hidden xl:block"
      style={{ width: W, height: H }}
    >
      {/* gentle idle sway, pivoting at the peg so cord + card move together */}
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: `${AX}px ${AY}px` }}
        animate={{ rotate: [-1.6, 1.6, -1.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* the twine cord */}
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 overflow-visible"
        >
          <defs>
            <linearGradient id="twineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a58a54" />
              <stop offset="100%" stopColor="#7d6844" />
            </linearGradient>
          </defs>
          {/* ceiling mount — a small brass tack on a shadowed batten */}
          <rect x={AX - 16} y={AY - 7} width={32} height={7} rx={3.5} fill="rgba(58,50,38,0.16)" />
          <circle cx={AX} cy={AY} r={4} fill="#b9974f" stroke="rgba(90,68,26,0.5)" strokeWidth={1} />
          <circle cx={AX - 1.2} cy={AY - 1.2} r={1.2} fill="rgba(255,246,214,0.8)" />
          {/* rope body */}
          <motion.path
            d={d}
            stroke="url(#twineGrad)"
            strokeWidth={4}
            strokeLinecap="round"
            fill="none"
            opacity={0.95}
          />
          {/* light dashed overlay suggests the twist of the twine */}
          <motion.path
            d={d}
            stroke="#dcc48f"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="6 5"
            fill="none"
            opacity={0.9}
          />
        </svg>

        {/* the draggable hang-tag */}
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0.55}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 11 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 1.05 }}
          style={{
            x,
            y,
            rotate,
            width: CARD_W,
            height: CARD_H,
            left: REST_CX - CARD_W / 2,
            top: REST_CY - CARD_H / 2,
            transformOrigin: "50% 0%",
          }}
          className="pointer-events-auto absolute cursor-grab touch-none select-none active:cursor-grabbing"
        >
          {/* brass grommet where the twine threads through the paper */}
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-[#6b5426]/40"
              style={{
                background:
                  "conic-gradient(from 210deg, #dcc078, #a8863e, #ead598, #8a6a2e, #dcc078)",
                boxShadow:
                  "0 2px 4px rgba(80,60,20,0.35), inset 0 1px 1px rgba(255,250,225,0.6)",
              }}
            >
              {/* punched hole — shows the hero background through the tag */}
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  background: "var(--background)",
                  boxShadow: "inset 0 1px 2px rgba(80,60,20,0.45)",
                }}
              />
            </div>
          </div>

          {/* die-cut paper body — drop-shadow follows the clipped silhouette */}
          <div
            className="relative h-full w-full"
            style={{
              filter:
                "drop-shadow(0 12px 18px rgba(72,56,26,0.22)) drop-shadow(0 3px 6px rgba(72,56,26,0.16))",
            }}
          >
            <Link
              href="/contact"
              draggable={false}
              className="relative flex h-full w-full flex-col justify-between overflow-hidden p-4 pt-8"
              style={{
                clipPath: TAG_CLIP,
                background: PAPER_BG,
                boxShadow:
                  "inset 0 0 22px rgba(120,92,50,0.16), inset 0 1px 0 rgba(255,253,244,0.7)",
              }}
            >
              {/* stitched edging that traces the die-cut outline */}
              <svg
                aria-hidden
                width="100%"
                height="100%"
                viewBox={`0 0 ${CARD_W} ${CARD_H}`}
                className="pointer-events-none absolute inset-0"
              >
                <path
                  d={STITCH_D}
                  fill="none"
                  stroke="#8a6f4d"
                  strokeWidth={1}
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  opacity={0.55}
                />
              </svg>

              {/* foxing age-spots over the paper */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{ background: FOXING_BG }}
              />

              {/* postmark — circular cancellation stamp running off the right edge */}
              <svg
                aria-hidden
                width={104}
                height={60}
                viewBox="0 0 104 60"
                className="pointer-events-none absolute -right-1 top-[78px] z-0 opacity-60"
                style={{ transform: "rotate(-7deg)" }}
              >
                <g stroke="#6d5a3a" fill="none" strokeWidth={1}>
                  <circle cx={76} cy={30} r={22} strokeDasharray="3 2.5" opacity={0.55} />
                  <circle cx={76} cy={30} r={16.5} opacity={0.45} />
                  <path d="M2 22 q 8 -4 16 0 t 16 0 t 16 0" opacity={0.4} />
                  <path d="M2 30 q 8 -4 16 0 t 16 0 t 16 0" opacity={0.4} />
                  <path d="M2 38 q 8 -4 16 0 t 16 0 t 16 0" opacity={0.4} />
                </g>
                <text x={76} y={28} textAnchor="middle" fontSize={6.5} letterSpacing={1} fill="#6d5a3a" opacity={0.85} className="font-mono">
                  EST.
                </text>
                <text x={76} y={37} textAnchor="middle" fontSize={7} letterSpacing={1} fill="#6d5a3a" opacity={0.85} className="font-mono">
                  2026
                </text>
              </svg>

              {/* top brand row + ornamental rule */}
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#3a3226]">
                      Vision Tech
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    {/* lime wax-seal dot: the availability signal */}
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-[#c8ff00]"
                      style={{ boxShadow: "0 0 0 2px rgba(138,165,0,0.45)" }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                    <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-[#6b5a3e]">
                      Open
                    </span>
                  </span>
                </div>
                {/* ornamental line-dot-diamond-dot-line divider */}
                <svg width="100%" height={9} viewBox="0 0 122 9" aria-hidden className="mt-2">
                  <line x1={1} y1={4.5} x2={48} y2={4.5} stroke="rgba(58,50,38,0.4)" strokeWidth={0.75} />
                  <circle cx={53} cy={4.5} r={1} fill="rgba(58,50,38,0.4)" />
                  <path d="M61 1.2 L64.3 4.5 L61 7.8 L57.7 4.5 Z" fill="rgba(58,50,38,0.55)" />
                  <circle cx={69} cy={4.5} r={1} fill="rgba(58,50,38,0.4)" />
                  <line x1={74} y1={4.5} x2={121} y2={4.5} stroke="rgba(58,50,38,0.4)" strokeWidth={0.75} />
                </svg>
              </div>

              {/* heading */}
              <div className="relative z-10">
                <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#6b5a3e]">
                  Let&apos;s build
                </p>
                <h3
                  className="mt-1 font-serif text-[27px] leading-[1.04] text-[#241f16]"
                  style={{ textShadow: "0 1px 0 rgba(255,255,255,0.55)" }}
                >
                  Contact
                  <br />
                  <span className="italic">Us</span>
                </h3>
              </div>

              {/* CTA + perforated stub with ink barcode */}
              <div className="relative z-10 space-y-2.5">
                <span
                  className="flex items-center justify-center gap-1.5 rounded-full bg-[#c8ff00] px-3 py-2 text-[11px] font-medium text-[#0a0a0f]"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.45), 0 1px 0 rgba(110,130,0,0.4), 0 6px 12px -6px rgba(120,150,0,0.5)",
                  }}
                >
                  Get in touch <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
                {/* perforation — dashed tear line with punched side notches */}
                <div className="relative -mx-4">
                  <div
                    className="border-t border-dashed"
                    style={{ borderColor: "rgba(58,50,38,0.35)" }}
                  />
                  <span
                    aria-hidden
                    className="absolute -left-[6px] top-0 h-3 w-3 -translate-y-1/2 rounded-full"
                    style={{
                      backgroundColor: "var(--background)",
                      boxShadow: "inset -1px 0 2px rgba(58,50,38,0.25)",
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute -right-[6px] top-0 h-3 w-3 -translate-y-1/2 rounded-full"
                    style={{
                      backgroundColor: "var(--background)",
                      boxShadow: "inset 1px 0 2px rgba(58,50,38,0.25)",
                    }}
                  />
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex h-4 items-stretch gap-[2px]">
                    {BARS.map((bw, i) => (
                      <span
                        key={i}
                        className="h-4 rounded-[0.5px] bg-[#241f16]/80"
                        style={{ width: bw }}
                      />
                    ))}
                  </div>
                  <span className="whitespace-nowrap font-mono text-[8px] tracking-[0.14em] text-[#6b5a3e]">
                    N&ordm; VT-2026
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* subtle hint */}
      <span className="absolute left-1/2 top-[318px] -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.25em] text-[#6b5a3e]/80">
        pull me &#10022;
      </span>
    </div>
  )
}
