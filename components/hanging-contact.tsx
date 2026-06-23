"use client"

import { useEffect } from "react"
import Link from "next/link"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  An interactive "Contact Us" access-badge that hangs from a cord.   */
/*  - drops in from the top on mount (spring bounce)                   */
/*  - grab + drag it; the cord bends to follow                         */
/*  - release -> springs back with a natural pendulum swing            */
/* ------------------------------------------------------------------ */

const W = 220 // container width
const H = 340 // container height
const AX = W / 2 // cord anchor (peg) x
const AY = 12 // cord anchor (peg) y
const CARD_W = 154
const CARD_H = 202
const REST_CX = W / 2 // card center x at rest
const REST_CY = 196 // card center y at rest
const TOP_CONN_Y = REST_CY - CARD_H / 2 // where the cord meets the card top

// deterministic barcode pattern (SSR-safe — no random)
const BARS = [2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 2, 1, 3, 1]

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
      className="pointer-events-none absolute left-[4%] top-0 z-30 hidden md:block lg:left-[6%]"
      style={{ width: W, height: H }}
    >
      {/* gentle idle sway, pivoting at the peg so cord + card move together */}
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: `${AX}px ${AY}px` }}
        animate={{ rotate: [-1.6, 1.6, -1.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* the cord */}
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 overflow-visible"
        >
          <defs>
            <linearGradient id="cordGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="55%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          {/* ceiling mount */}
          <rect x={AX - 16} y={AY - 7} width={32} height={7} rx={3.5} fill="rgba(255,255,255,0.22)" />
          <circle cx={AX} cy={AY} r={4} fill="rgba(255,255,255,0.65)" />
          <motion.path
            d={d}
            stroke="url(#cordGrad)"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
            opacity={0.7}
          />
        </svg>

        {/* the draggable badge */}
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
          {/* metallic grommet where the cord threads through */}
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-600 shadow-md shadow-black/50 ring-1 ring-black/20">
              <div className="h-3 w-3 rounded-full bg-[#0a0a0f] shadow-inner" />
            </div>
          </div>

          {/* holographic animated border */}
          <div
            className="relative h-full w-full overflow-hidden rounded-[20px] p-[1.5px] shadow-2xl"
            style={{ boxShadow: "0 18px 50px -12px rgba(167,139,250,0.45)" }}
          >
            <motion.div
              className="absolute inset-[-60%]"
              style={{
                background:
                  "conic-gradient(from 0deg, #f59e0b, #38bdf8, #34d399, #a78bfa, #f59e0b)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* inner glass card */}
            <Link
              href="/contact"
              draggable={false}
              className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-[18px] bg-[#0b0b12]/95 p-4 backdrop-blur-xl"
            >
              {/* shine sweep */}
              <motion.span
                className="pointer-events-none absolute -left-1/2 bottom-0 top-0 z-20 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                animate={{ x: ["0%", "420%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
              />

              {/* top brand row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-md bg-gradient-to-br from-amber-400 via-sky-400 to-violet-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/85">
                    Vision Tech
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  <span className="text-[7px] font-semibold uppercase tracking-wider text-emerald-300/80">
                    Open
                  </span>
                </span>
              </div>

              {/* heading */}
              <div className="relative z-10">
                <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/40">
                  Let&apos;s build
                </p>
                <h3 className="bg-gradient-to-br from-white to-white/55 bg-clip-text font-sans text-[26px] font-bold leading-[1.05] text-transparent">
                  Contact
                  <br />
                  Us
                </h3>
              </div>

              {/* CTA + barcode */}
              <div className="relative z-10 space-y-2.5">
                <span className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-sky-400 to-violet-500 px-3 py-2 text-[11px] font-semibold text-black shadow-lg">
                  Get in touch <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
                <div className="flex items-end justify-between">
                  <div className="flex h-4 items-stretch gap-[2px]">
                    {BARS.map((bw, i) => (
                      <span
                        key={i}
                        className="h-4 rounded-[1px] bg-white/35"
                        style={{ width: bw }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[8px] tracking-wider text-white/30">
                    VT-2026
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* subtle hint */}
      <span className="absolute left-1/2 top-[312px] -translate-x-1/2 whitespace-nowrap text-[9px] uppercase tracking-[0.25em] text-white/25">
        pull me ✦
      </span>
    </div>
  )
}
