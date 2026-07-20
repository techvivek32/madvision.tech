"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  BrainCircuit,
  DollarSign,
  GraduationCap,
  Lightbulb,
  Lock,
  Mail,
  MessageCircle,
  Mic,
  Radar,
  Send,
  Target,
  Wrench,
} from "lucide-react"
import { ACCENT } from "@/components/motion"

/* ------------------------------------------------------------------ */
/*  Mission Control — the agency admin. Reads data/agency.json via the */
/*  passcode-protected API; outreach emails send one-by-one on Approve */
/*  (human-in-the-loop); WhatsApp opens prefilled via wa.me deep link. */
/*  FRIDAY: click-to-talk voice assistant (Web Speech API, no external */
/*  AI calls) that answers from the loaded agency data.                */
/* ------------------------------------------------------------------ */

type Agency = {
  updatedAt: string
  targets: { dailyPipelineUSD: number; dailyRevenueGoalUSD: number; earnedToDateUSD: number; note?: string }
  todayIdea: {
    date: string
    title: string
    pitch: string
    priceRangeUSD: string
    buildPlan: string
    targetNiche: string
    status: string
  }
  agents: { id: string; name: string; role: string; status: string; lastRun: string | null; note: string }[]
  leads: {
    id: string
    business: string
    country?: string
    email?: string
    whatsapp?: string
    source?: string
    demoUrl?: string
    status: string
    pitchEmailSubject?: string
    pitchEmailBody?: string
    pitchWhatsApp?: string
    notes?: string
    tz?: string
    sendFrom?: number
    sendTo?: number
  }[]
  reports: { date: string; agent: string; summary: string }[]
  resourcesNeeded?: { item: string; status: string }[]
  brain?: {
    identity: string
    boss?: { name: string; role?: string }
    lastReflection?: string
    focus?: string
    playbook?: string[]
    learnings?: { date: string; insight: string; evidence?: string }[]
  }
  strategy?: { pricingByCountry?: Record<string, string> }
}

const AGENT_ICONS: Record<string, typeof Radar> = { scout: Radar, builder: Wrench, pitcher: Send }

/* A lead's outreach window: we only enable "Approve & send" during the
   business's OWN local hours, so every pitch lands in their business hours. */
type LeadWin = { hasWindow: boolean; open: boolean; localTime?: string; from?: number; to?: number }
function fmtHour(h: number) {
  const am = h < 12
  const hh = h % 12 === 0 ? 12 : h % 12
  return `${hh}${am ? "am" : "pm"}`
}
function sendWindow(lead: { tz?: string; sendFrom?: number; sendTo?: number }): LeadWin {
  if (!lead.tz || lead.sendFrom == null || lead.sendTo == null) return { hasWindow: false, open: true }
  try {
    const now = new Date()
    const h = parseInt(new Intl.DateTimeFormat("en-US", { timeZone: lead.tz, hour: "numeric", hour12: false }).format(now), 10) % 24
    const clock = new Intl.DateTimeFormat("en-US", { timeZone: lead.tz, hour: "numeric", minute: "2-digit" }).format(now)
    const city = lead.tz.split("/").pop()?.replace(/_/g, " ")
    return { hasWindow: true, open: h >= lead.sendFrom && h < lead.sendTo, localTime: `${clock} in ${city}`, from: lead.sendFrom, to: lead.sendTo }
  } catch {
    return { hasWindow: false, open: true }
  }
}

export default function AdminPageContent() {
  const [pass, setPass] = useState("")
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState<Agency | null>(null)
  const [sending, setSending] = useState<string | null>(null)
  const [sent, setSent] = useState<Record<string, boolean>>({})
  const [, setTick] = useState(0) // ticks so per-lead send windows re-evaluate live

  const load = useCallback(async (p: string) => {
    const res = await fetch("/api/agency", { headers: { "x-admin-pass": p } })
    if (!res.ok) throw new Error("unauthorized")
    setData(await res.json())
  }, [])

  useEffect(() => {
    const saved = sessionStorage.getItem("vt-admin-pass")
    if (saved) {
      load(saved)
        .then(() => {
          setPass(saved)
          setAuthed(true)
        })
        .catch(() => sessionStorage.removeItem("vt-admin-pass"))
    }
    setSent(JSON.parse(localStorage.getItem("vt-outreach-sent") || "{}"))
  }, [load])

  /* 24/7 live feel: once authed, quietly re-pull the store so Mission Control
     (and Friday, which reads this data) always reflects the latest cycle. */
  useEffect(() => {
    if (!authed || !pass) return
    const id = setInterval(() => {
      load(pass).catch(() => {})
    }, 60_000)
    return () => clearInterval(id)
  }, [authed, pass, load])

  /* Re-render every 30s so per-lead send-window buttons enable/disable on time. */
  useEffect(() => {
    if (!authed) return
    const id = setInterval(() => setTick((t) => t + 1), 30_000)
    return () => clearInterval(id)
  }, [authed])

  /* Reply watch: best-effort IMAP auto-detect + desktop alert. Fails soft;
     the per-lead "Mark replied" button is the guaranteed fallback. */
  const notifiedRef = useRef<Set<string>>(new Set())
  useEffect(() => {
    if (!authed || !pass) return
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {})
    }
    let fails = 0
    let stopped = false
    const check = async () => {
      if (stopped) return
      try {
        const res = await fetch("/api/agency/replies", { headers: { "x-admin-pass": pass } })
        const j = await res.json()
        if (j?.ok) {
          fails = 0
          if (Array.isArray(j.replies) && j.replies.length) {
            for (const r of j.replies as { leadId: string; business: string; subject?: string }[]) {
              if (!notifiedRef.current.has(r.leadId)) {
                notifiedRef.current.add(r.leadId)
                if ("Notification" in window && Notification.permission === "granted") {
                  new Notification(`Reply from ${r.business}`, { body: r.subject || "New reply to your pitch — open Mission Control." })
                }
              }
            }
            load(pass).catch(() => {})
          }
        } else if (fails++ >= 3) {
          stopped = true // IMAP not reachable here — rely on manual "Mark replied"
        }
      } catch {
        if (fails++ >= 3) stopped = true
      }
    }
    check()
    const id = setInterval(check, 90_000)
    return () => {
      stopped = true
      clearInterval(id)
    }
  }, [authed, pass, load])

  const login = async () => {
    setError("")
    try {
      await load(pass)
      sessionStorage.setItem("vt-admin-pass", pass)
      setAuthed(true)
    } catch {
      setError("Khoto passcode che bhai.")
    }
  }

  const approveSend = async (leadId: string) => {
    setSending(leadId)
    try {
      const res = await fetch("/api/agency/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-pass": pass },
        body: JSON.stringify({ leadId }),
      })
      if (res.ok) {
        const next = { ...sent, [leadId]: true }
        setSent(next)
        localStorage.setItem("vt-outreach-sent", JSON.stringify(next))
        load(pass).catch(() => {}) // refresh pipeline state from the store
      } else {
        alert("Send fail thayu: " + ((await res.json()).error || res.status))
      }
    } finally {
      setSending(null)
    }
  }

  const markReplied = async (leadId: string) => {
    try {
      await fetch("/api/agency/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-pass": pass },
        body: JSON.stringify({ leadId }),
      })
      load(pass).catch(() => {})
    } catch {
      /* ignore */
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm p-8 rounded-2xl bg-card border border-border text-center">
          <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-background" />
          </div>
          <h1 className="font-serif text-2xl text-foreground mb-1">Mission Control</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
            Vision Tech · Restricted
          </p>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Passcode"
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-center outline-none focus:border-foreground mb-3"
          />
          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
          <button
            onClick={login}
            className="w-full py-3 rounded-xl btn-lime font-medium text-sm"
          >
            Enter
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const pipelineToday = data.leads.filter((l) => l.status !== "lost").length
  const won = data.leads.filter((l) => l.status === "won").length
  const repliedLeads = data.leads.filter((l) => l.status === "replied")

  const stats = [
    { icon: Target, label: "Pipeline target / day", value: `$${data.targets.dailyPipelineUSD}` },
    { icon: DollarSign, label: "Revenue goal / day", value: `$${data.targets.dailyRevenueGoalUSD}+` },
    { icon: Activity, label: "Earned to date", value: `$${data.targets.earnedToDateUSD}` },
    { icon: Radar, label: "Leads in pipeline", value: `${pipelineToday} (${won} won)` },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Vision Tech · Agency OS
            </p>
            <h1 className="font-serif text-3xl text-foreground">Mission Control</h1>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ backgroundColor: ACCENT }} />
            Updated {new Date(data.updatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 space-y-10 pb-40">
        {/* reply alert — the moment a lead writes back */}
        {repliedLeads.length > 0 && (
          <div className="p-5 rounded-2xl border-2 flex items-start gap-3" style={{ borderColor: ACCENT, backgroundColor: "rgba(200,255,0,0.06)" }}>
            <Bell className="w-5 h-5 mt-0.5 animate-pulse-glow" style={{ color: ACCENT }} />
            <div>
              <p className="font-serif text-lg text-foreground">
                {repliedLeads.length} lead{repliedLeads.length > 1 ? "s" : ""} replied — go win {repliedLeads.length > 1 ? "them" : "it"}, Boss.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {repliedLeads.map((l) => l.business).join(", ")} — open your info@madvision.tech inbox and reply personally.
              </p>
            </div>
          </div>
        )}

        {/* stat tiles */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="p-5 rounded-2xl bg-card border border-border">
              <s.icon className="w-4 h-4 text-muted-foreground mb-3" />
              <p className="font-serif text-3xl text-foreground leading-none">{s.value}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-2">{s.label}</p>
            </div>
          ))}
        </section>

        {/* analytics — live pipeline read */}
        <AnalyticsPanel data={data} />

        {/* the brain — self-aware + self-learning */}
        {data.brain && <BrainPanel data={data} />}

        {/* today's idea */}
        <section className="p-6 md:p-8 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4" style={{ color: ACCENT }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Today&apos;s idea · {data.todayIdea.date} · {data.todayIdea.status}
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">{data.todayIdea.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-3xl">{data.todayIdea.pitch}</p>
          <div className="grid md:grid-cols-3 gap-4 font-mono text-xs text-muted-foreground">
            <div className="p-3 rounded-xl bg-secondary/60">
              <span className="block uppercase tracking-[0.15em] text-[10px] mb-1 text-foreground">Price</span>
              {data.todayIdea.priceRangeUSD}
            </div>
            <div className="p-3 rounded-xl bg-secondary/60">
              <span className="block uppercase tracking-[0.15em] text-[10px] mb-1 text-foreground">Niche</span>
              {data.todayIdea.targetNiche}
            </div>
            <div className="p-3 rounded-xl bg-secondary/60">
              <span className="block uppercase tracking-[0.15em] text-[10px] mb-1 text-foreground">Build</span>
              {data.todayIdea.buildPlan}
            </div>
          </div>
        </section>

        {/* agents */}
        <section>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">The firm</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {data.agents.map((a) => {
              const Icon = AGENT_ICONS[a.id] ?? Bot
              const running = a.status === "running"
              return (
                <div key={a.id} className="p-5 rounded-2xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
                      <Icon className="w-5 h-5 text-background" />
                    </div>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${
                        running ? "text-black" : "text-muted-foreground border border-border"
                      }`}
                      style={running ? { backgroundColor: ACCENT } : undefined}
                    >
                      {a.status}
                    </span>
                  </div>
                  <p className="font-serif text-xl text-foreground">{a.name}</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">{a.role}</p>
                  <p className="font-mono text-[11px] text-muted-foreground border-t border-border pt-3">
                    {a.lastRun ? `Last run ${a.lastRun} — ` : ""}
                    {a.note}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* outreach queue */}
        <section>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Outreach queue · human-in-the-loop
          </h3>
          {data.leads.length === 0 ? (
            <div className="p-8 rounded-2xl border-2 border-dashed border-border text-center">
              <p className="font-serif text-xl text-foreground mb-1">Koi lead queue ma nathi</p>
              <p className="text-sm text-muted-foreground">
                Scout no daily cycle chale tyare leads ahi aavse — email pitch &quot;Approve &amp; Send&quot; thi jase,
                WhatsApp pitch ek click par prefilled khulse.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.leads.map((lead) => {
                const win = sendWindow(lead)
                return (
                <div key={lead.id} className="p-5 rounded-2xl bg-card border border-border">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {lead.id} · {lead.country ?? ""} · {lead.status}
                      </span>
                      <p className="font-serif text-xl text-foreground">{lead.business}</p>
                      {win.hasWindow && lead.email && lead.pitchEmailBody && (
                        <p className="font-mono text-[10px] mt-1" style={{ color: win.open ? ACCENT : undefined }}>
                          <span className={win.open ? "" : "text-muted-foreground"}>
                            {win.localTime}
                            {" · "}
                            {win.open
                              ? `in window — sends until ${fmtHour(win.to!)}`
                              : `window ${fmtHour(win.from!)}–${fmtHour(win.to!)} their time`}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {lead.demoUrl && (
                        <a
                          href={lead.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium text-foreground hover:bg-secondary"
                          style={{ borderColor: ACCENT }}
                        >
                          <Lightbulb className="w-4 h-4" style={{ color: ACCENT }} />
                          View demo
                        </a>
                      )}
                      {lead.email && lead.pitchEmailBody && (
                        <button
                          onClick={() => approveSend(lead.id)}
                          disabled={sending === lead.id || sent[lead.id] || (win.hasWindow && !win.open)}
                          title={win.hasWindow && !win.open ? `Opens at ${fmtHour(win.from!)} the lead's local time` : undefined}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                            sent[lead.id]
                              ? "bg-secondary text-muted-foreground"
                              : win.hasWindow && !win.open
                                ? "border border-border text-muted-foreground cursor-not-allowed"
                                : "btn-lime"
                          }`}
                        >
                          <Mail className="w-4 h-4" />
                          {sent[lead.id]
                            ? "Email sent"
                            : sending === lead.id
                              ? "Sending…"
                              : win.hasWindow && !win.open
                                ? `Opens ${fmtHour(win.from!)} their time`
                                : "Approve & send email"}
                        </button>
                      )}
                      {lead.whatsapp && lead.pitchWhatsApp && (
                        <a
                          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(lead.pitchWhatsApp)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Open WhatsApp
                        </a>
                      )}
                      {lead.status === "replied" ? (
                        <span
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-black"
                          style={{ backgroundColor: ACCENT }}
                        >
                          <Bell className="w-4 h-4" />
                          Replied — go win it
                        </span>
                      ) : (
                        (sent[lead.id] || lead.status === "pitched") &&
                        lead.email && (
                          <button
                            onClick={() => markReplied(lead.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary"
                          >
                            <Bell className="w-4 h-4" />
                            Mark replied
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  {lead.pitchEmailSubject && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Subject:</span> {lead.pitchEmailSubject}
                    </p>
                  )}
                  {lead.notes && <p className="font-mono text-[11px] text-muted-foreground mt-2">{lead.notes}</p>}
                </div>
                )
              })}
            </div>
          )}
        </section>

        {/* resources needed */}
        {data.resourcesNeeded && data.resourcesNeeded.length > 0 && (
          <section>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Needed from you
            </h3>
            <ul className="space-y-2">
              {data.resourcesNeeded.map((r) => (
                <li
                  key={r.item}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border text-sm"
                >
                  <span className="text-foreground">{r.item}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {r.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* reports feed */}
        <section>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">Reports</h3>
          <div className="space-y-3">
            {data.reports.map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  {r.date} · {r.agent}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{r.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Friday data={data} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  ANALYTICS — a live, honest read of the whole pipeline.             */
/* ------------------------------------------------------------------ */

const FX: Record<string, number> = { US: 1, CA: 0.73, UK: 1.27, AU: 0.66, EU: 1.08 }
const COUNTRY_COLOR: Record<string, string> = {
  US: "#3b82f6",
  CA: "#ef4444",
  UK: "#8b5cf6",
  AU: "#22c55e",
  EU: "#f59e0b",
}
function priceNum(s?: string) {
  const n = s ? parseInt(s.replace(/[^\d]/g, ""), 10) : NaN
  return Number.isFinite(n) ? n : 0
}

function computeAnalytics(data: Agency) {
  const leads = data.leads
  const reachable = leads.filter((l) => ((l.email && l.email.trim()) || (l.whatsapp && l.whatsapp.trim())) && l.status !== "deprioritized")
  const pricing = data.strategy?.pricingByCountry || {}

  const funnel = [
    { label: "Leads found", count: leads.length },
    { label: "Reachable", count: reachable.length },
    { label: "Sites built", count: reachable.filter((l) => l.demoUrl).length },
    { label: "Pitch drafted", count: reachable.filter((l) => l.pitchEmailBody || l.pitchWhatsApp).length },
    { label: "Sent", count: leads.filter((l) => l.status === "pitched" || l.status === "replied" || l.status === "won").length },
    { label: "Replied", count: leads.filter((l) => l.status === "replied" || l.status === "won").length },
    { label: "Won", count: leads.filter((l) => l.status === "won").length },
  ]

  const byCountryMap: Record<string, { count: number; usd: number }> = {}
  let pipelineUSD = 0
  for (const l of reachable) {
    const c = (l.country || "US").toUpperCase()
    const usd = priceNum(pricing[c]) * (FX[c] ?? 1)
    byCountryMap[c] = byCountryMap[c] || { count: 0, usd: 0 }
    byCountryMap[c].count++
    byCountryMap[c].usd += usd
    pipelineUSD += usd
  }
  const byCountry = Object.entries(byCountryMap)
    .map(([code, v]) => ({ code, ...v, price: pricing[code] || "$299" }))
    .sort((a, b) => b.count - a.count)

  const inWindowNow = reachable.filter((l) => l.email && l.pitchEmailBody && sendWindow(l).open).length
  const replied = leads.filter((l) => l.status === "replied")

  return { funnel, byCountry, pipelineUSD, inWindowNow, reachable: reachable.length, replied }
}

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(pct, 3)}%`, backgroundColor: color }} />
    </div>
  )
}

function AnalyticsPanel({ data }: { data: Agency }) {
  const a = computeAnalytics(data)
  const maxFunnel = Math.max(...a.funnel.map((f) => f.count), 1)
  const pipeK = a.pipelineUSD >= 1000 ? `$${(a.pipelineUSD / 1000).toFixed(1)}k` : `$${Math.round(a.pipelineUSD)}`

  return (
    <section className="p-6 md:p-8 rounded-2xl bg-card border border-border">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-4 h-4" style={{ color: ACCENT }} />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Analytics · live pipeline</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Reachable leads", value: `${a.reachable}` },
          { label: "Pipeline (USD-eq)", value: pipeK },
          { label: "Ready to send now", value: `${a.inWindowNow}`, hot: a.inWindowNow > 0 },
          { label: "Replies", value: `${a.replied.length}`, hot: a.replied.length > 0 },
        ].map((t) => (
          <div key={t.label} className="p-4 rounded-xl bg-secondary/60">
            <p className="font-serif text-2xl leading-none" style={t.hot ? { color: ACCENT } : undefined}>
              {t.value}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1.5">{t.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* funnel */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Pipeline funnel</p>
          <div className="space-y-3">
            {a.funnel.map((f) => (
              <div key={f.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{f.label}</span>
                  <span className="font-mono text-muted-foreground">{f.count}</span>
                </div>
                <Bar pct={(f.count / maxFunnel) * 100} color={ACCENT} />
              </div>
            ))}
          </div>
        </div>

        {/* by country */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Reachable by market</p>
          <div className="space-y-3">
            {a.byCountry.map((c) => (
              <div key={c.code}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COUNTRY_COLOR[c.code] || "#64748b" }} />
                    {c.code} · {c.price}
                  </span>
                  <span className="font-mono text-muted-foreground">{c.count}</span>
                </div>
                <Bar pct={(c.count / a.reachable) * 100} color={COUNTRY_COLOR[c.code] || "#64748b"} />
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-muted-foreground mt-4">
            Pipeline value blends each market&apos;s local price into USD (rough FX).
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  THE BRAIN — the agency's self-awareness + self-learning surface.   */
/*  Metrics are derived LIVE from the data so awareness always reflects */
/*  reality; playbook + learnings are the accumulated intelligence.    */
/* ------------------------------------------------------------------ */

export function liveMetrics(data: Agency) {
  const leads = data.leads
  const reachable = leads.filter((l) => (l.email && l.email.trim()) || (l.whatsapp && l.whatsapp.trim()))
  const drafted = leads.filter((l) => l.pitchEmailBody || l.pitchWhatsApp)
  const withSite = leads.filter((l) => l.demoUrl)
  const won = leads.filter((l) => l.status === "won")
  const deprioritized = leads.filter((l) => l.status === "deprioritized")
  return {
    leadsTotal: leads.length,
    reachable: reachable.length,
    deprioritized: deprioritized.length,
    sitesBuilt: withSite.length,
    pitchesDrafted: drafted.length,
    won: won.length,
    pipelineUSD: reachable.length * 299,
  }
}

function BrainPanel({ data }: { data: Agency }) {
  const b = data.brain!
  const m = liveMetrics(data)
  const tiles = [
    { label: "Reachable leads", value: `${m.reachable}/${m.leadsTotal}` },
    { label: "Real-data sites", value: `${m.sitesBuilt}` },
    { label: "Pitches drafted", value: `${m.pitchesDrafted}` },
    { label: "Deals won", value: `${m.won}` },
  ]
  return (
    <section className="p-6 md:p-8 rounded-2xl bg-card border border-border">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4" style={{ color: ACCENT }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            The Brain · self-aware &amp; self-learning
          </span>
        </div>
        {b.lastReflection && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Reflected {new Date(b.lastReflection).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
          </span>
        )}
      </div>

      <p className="text-muted-foreground leading-relaxed mb-5 max-w-3xl">{b.identity}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {tiles.map((t) => (
          <div key={t.label} className="p-4 rounded-xl bg-secondary/60">
            <p className="font-serif text-2xl text-foreground leading-none">{t.value}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1.5">{t.label}</p>
          </div>
        ))}
      </div>

      {b.focus && (
        <div className="mb-6 p-4 rounded-xl border border-dashed border-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Current focus</p>
          <p className="text-sm text-foreground leading-relaxed">{b.focus}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {b.playbook && b.playbook.length > 0 && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Playbook · rules I follow
            </p>
            <ul className="space-y-2">
              {b.playbook.map((p, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-foreground leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
        {b.learnings && b.learnings.length > 0 && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> What I&apos;ve learned
            </p>
            <div className="space-y-3">
              {b.learnings.slice(0, 6).map((l, i) => (
                <div key={i} className="p-3 rounded-xl bg-secondary/40">
                  <p className="text-sm text-foreground leading-relaxed">{l.insight}</p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-1.5">
                    {l.date}
                    {l.evidence ? ` — ${l.evidence}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  FRIDAY — click-to-talk voice assistant. Web Speech API only.       */
/* ------------------------------------------------------------------ */

const FRIDAY_LANGS = [
  { code: "en-IN", label: "EN" },
  { code: "hi-IN", label: "HI" },
  { code: "gu-IN", label: "GU" },
]

function Friday({ data }: { data: Agency }) {
  const [open, setOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [lang, setLang] = useState("en-IN")
  const [log, setLog] = useState<{ who: "you" | "friday"; text: string }[]>([])
  const [supported, setSupported] = useState(true)
  const [input, setInput] = useState("")
  const recRef = useRef<{ stop: () => void } | null>(null)
  const logEndRef = useRef<HTMLDivElement>(null)
  const greeted = useRef(false)

  useEffect(() => {
    const w = window as unknown as Record<string, unknown>
    if (!w.SpeechRecognition && !w.webkitSpeechRecognition) setSupported(false)
  }, [])

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [log])

  const speak = useCallback(
    (text: string) => {
      setLog((l) => [...l, { who: "friday", text }])
      try {
        window.speechSynthesis.cancel()
        const u = new SpeechSynthesisUtterance(text)
        u.lang = lang
        u.rate = 1.04
        // prefer a natural female voice — FRIDAY vibes
        const voices = window.speechSynthesis.getVoices()
        const pick =
          voices.find((v) => v.lang === lang && /female|zira|natural/i.test(v.name)) ||
          voices.find((v) => /Google (UK English Female|US English)/i.test(v.name)) ||
          voices.find((v) => v.lang === lang) ||
          voices.find((v) => v.lang.startsWith("en"))
        if (pick) u.voice = pick
        window.speechSynthesis.speak(u)
      } catch {
        /* silent — text stays in the log */
      }
    },
    [lang],
  )

  const briefing = useCallback(() => {
    const m = liveMetrics(data)
    const won = data.leads.filter((l) => l.status === "won")
    const replied = data.leads.filter((l) => l.status === "replied")
    const latest = data.reports[0]
    speak(
      `Boss, here's your briefing. ${replied.length ? `Alert first — ${replied.length} lead${replied.length > 1 ? "s have" : " has"} replied: ${replied.map((l) => l.business).join(", ")}. Go answer them. ` : ""}${latest ? latest.summary + " " : ""}Idea of the day: ${data.todayIdea.title}. Pipeline: ${m.reachable} reachable leads, ${m.sitesBuilt} real-data sites built, ${m.pitchesDrafted} pitches drafted, ${won.length} won, roughly ${m.pipelineUSD} dollars of pipeline. ${data.brain?.focus ? "Right now I'm focused on: " + data.brain.focus : ""}`,
    )
  }, [data, speak])

  /* Proactive: the first time Friday is opened, she briefs you unprompted. */
  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true
      briefing()
    }
  }, [open, briefing])

  const answer = useCallback(
    (q: string) => {
      const t = q.toLowerCase()
      const liveLeads = data.leads.filter((l) => l.status !== "lost" && l.status !== "deprioritized")
      const won = data.leads.filter((l) => l.status === "won")
      const strategy = (data as unknown as Record<string, { primaryMarkets?: string[]; pricingUSD?: string; positioning?: string }>).strategy

      if (/^(hi|hello|hey|namaste|kem cho|good (morning|evening|afternoon)|wake up)/.test(t)) {
        const boss = data.brain?.boss
        speak(
          `At your service${boss ? ", " + boss.name.split(" ")[0] : ", Boss"}. Ask me for updates, leads, pricing, money status, what I've learned, strategy, or say help.`,
        )
      } else if (/help|su puchu|shu puchi|what can/.test(t)) {
        speak(
          "You can ask me: updates or full briefing. Today's idea. Leads — or leads by country, like leads in Canada. Money, targets and earnings. What I've learned and my current focus. Agents and their status. Strategy and target markets. Contact details. Resources you still owe me. Or report history.",
        )
      } else if (/who are you|tu kon|tame kon|kaun ho/.test(t)) {
        speak(
          "I am Friday — Vision Tech's operations AI. I watch the agency pipeline, the agents, and the money, and I report only the truth to you, Boss.",
        )
      } else if (/my name|what.*name|maru naam|mara naam|naam su|naam khabar|naam khbar|who am i|hu kon|hu kaun/.test(t)) {
        const boss = data.brain?.boss
        speak(
          boss
            ? `You're ${boss.name}, Boss${boss.role ? " — " + boss.role + " of Vision Tech" : ""}. Of course I know who I work for.`
            : "You're the boss — the founder of Vision Tech.",
        )
      } else if (/pric|rate|charge|how much|cost|kimat|bhav|kitla|ketla/.test(t)) {
        const pc = data.strategy?.pricingByCountry
        speak(
          pc
            ? `Pricing is localized per market, Boss — United States ${pc.US}, Canada ${pc.CA}, U K ${pc.UK}, Australia ${pc.AU}. All one-time, no monthly fees, and the site is live in 48 hours.`
            : "Our offer is a full site, live in 48 hours, one-time, priced per market.",
        )
      } else if (/idea|आइडिया|વિચાર/.test(t)) {
        speak(
          `Today's idea: ${data.todayIdea.title}. ${data.todayIdea.pitch} Price range ${data.todayIdea.priceRangeUSD}. Status: ${data.todayIdea.status}.`,
        )
      } else if (/lead|pipeline|लीड|લીડ/.test(t)) {
        const countries: Record<string, string> = { canada: "CA", india: "IN", usa: "US", america: "US", uk: "UK", australia: "AU" }
        const found = Object.keys(countries).find((c) => t.includes(c))
        const pool = found ? liveLeads.filter((l) => (l.country || "").toUpperCase().startsWith(countries[found])) : liveLeads
        if (pool.length === 0) {
          speak(
            found
              ? `No ${found} leads in the pipeline yet, Boss. The next cycle hunts there.`
              : "Pipeline is empty right now. The next research cycle will bring fresh leads — check back after the morning run.",
          )
        } else {
          speak(
            `${pool.length} ${found ? found + " " : ""}leads: ` +
              pool.slice(0, 4).map((l) => `${l.business}, ${l.status}`).join(". ") +
              (pool.length > 4 ? `. And ${pool.length - 4} more in the queue.` : "."),
          )
        }
      } else if (/paisa|money|revenue|earning|target|कमाई|પૈસા|kamai|dollar/.test(t)) {
        speak(
          `Daily pitch target ${data.targets.dailyPipelineUSD} dollars, minimum revenue goal ${data.targets.dailyRevenueGoalUSD} dollars a day. Earned to date: ${data.targets.earnedToDateUSD} dollars. ${won.length > 0 ? won.length + " deals won so far." : "First win is pending, Boss — approve the pitches in the queue and we hunt."}`,
        )
      } else if (/strategy|market|country|targeting|kya country/.test(t)) {
        speak(
          strategy?.primaryMarkets
            ? `Primary markets: ${strategy.primaryMarkets.join(", ")}. Positioning: ${strategy.positioning}. Typical pricing ${strategy.pricingUSD}.`
            : "Strategy: premium one-day micro-builds pitched to Western markets — USA, Canada, UK, Australia and Europe first; India only through the existing network.",
        )
      } else if (/agent|team|टीम|ટીમ|firm/.test(t)) {
        speak(
          data.agents.map((a) => `${a.name} — ${a.status}${a.lastRun ? ", last run " + a.lastRun : ""}`).join(". ") + ".",
        )
      } else if (/report|history|itihas/.test(t)) {
        speak(
          data.reports.slice(0, 3).map((r) => `${r.date}, ${r.agent}: ${r.summary}`).join(" Next. ") || "No reports yet.",
        )
      } else if (/contact|email|phone|whatsapp|number/.test(t)) {
        speak(
          "Company email info@madvision.tech. India WhatsApp nine six zero one one seven six zero five one — that lives in Brave. Canada WhatsApp plus one eight two five, nine zero seven, zero zero three six — that lives in Chrome, along with Titan mail.",
        )
      } else if (/resource|needed|joie|aapvanu/.test(t)) {
        const pending = (data.resourcesNeeded || []).filter((r) => r.status.includes("pending") || r.status.includes("promised"))
        speak(
          pending.length
            ? "Still needed from you, Boss: " + pending.map((r) => r.item).join(". ")
            : "Nothing pending from your side right now. All resources received.",
        )
      } else if (/repl(y|ies)|jawab|javab|responded|wrote back/.test(t)) {
        const replied = data.leads.filter((l) => l.status === "replied")
        speak(
          replied.length
            ? `${replied.length} lead${replied.length > 1 ? "s have" : " has"} replied, Boss: ${replied.map((l) => l.business).join(", ")}. Open your inbox and answer them personally — that's where deals are won.`
            : "No replies yet, Boss. The moment one comes in, I'll alert you and light up Mission Control.",
        )
      } else if (/learn|seekh|shikh|brain|dimag|focus|playbook|improve|sudhar/.test(t)) {
        const b = data.brain
        if (b?.learnings?.length) {
          speak(
            "Here's what I've learned so far, Boss. " +
              b.learnings.slice(0, 3).map((l) => l.insight).join(" ") +
              (b.focus ? ` Right now I'm focused on: ${b.focus}` : ""),
          )
        } else {
          speak("I'm still gathering learnings, Boss — every cycle I record what's working and what isn't.")
        }
      } else if (/update|status|briefing|badhu|अपडेट|બધું/.test(t)) {
        briefing()
      } else if (/\btime\b|\bdate\b|tarikh|samay/.test(t)) {
        speak(new Date().toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" }))
      } else if (/thank|dhanyavad|aabhar/.test(t)) {
        speak("Always, Boss. Back to work.")
      } else {
        speak(
          "I didn't quite catch that, Boss. Try — updates, leads, pricing, money, what you've learned, strategy, or say help.",
        )
      }
    },
    [data, speak, briefing],
  )

  const ask = useCallback(
    (text: string) => {
      const clean = text.trim()
      if (!clean) return
      setLog((l) => [...l, { who: "you", text: clean }])
      answer(clean)
    },
    [answer],
  )

  const listen = async () => {
    const w = window as unknown as Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition
    if (!SR) {
      setLog((l) => [...l, { who: "friday", text: "Aa browser voice input support nathi kartu — niche type kari ne pucho, hu boli ne javab aapis." }])
      return
    }
    if (listening) {
      recRef.current?.stop()
      return
    }
    // force the mic permission prompt explicitly before recognition starts
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((tr) => tr.stop())
    } catch {
      setLog((l) => [
        ...l,
        { who: "friday", text: "Mic permission block che, Boss. Address bar ma lock icon → Microphone → Allow karo, pachi fari try karo. Tya sudhi type kari ne pucho." },
      ])
      return
    }
    const rec = new SR()
    recRef.current = rec
    rec.lang = lang
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onstart = () => setListening(true)
    rec.onend = () => setListening(false)
    rec.onerror = (e: { error?: string }) => {
      setListening(false)
      if (e?.error === "network" || e?.error === "service-not-allowed") {
        setLog((l) => [
          ...l,
          { who: "friday", text: "Aa browser (Brave?) voice recognition block kare che — Chrome ma kholo athva niche type karo. Bolvanu to hu ahi pan karis." },
        ])
      }
    }
    rec.onresult = (e: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => {
      ask(e.results[0][0].transcript)
    }
    rec.start()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="w-80 max-h-96 overflow-y-auto rounded-2xl bg-foreground text-background shadow-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-background/60">
                Friday · voice ops
              </p>
              <div className="flex gap-1">
                {FRIDAY_LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`px-2 py-0.5 rounded-full font-mono text-[10px] ${
                      lang === l.code ? "text-black" : "text-background/50 hover:text-background"
                    }`}
                    style={lang === l.code ? { backgroundColor: ACCENT } : undefined}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            {log.length === 0 && (
              <p className="text-sm text-background/70 leading-relaxed">
                Boli ne athva type kari ne pucho — &quot;tell me updates&quot;, &quot;leads in Canada?&quot;,
                &quot;paisa ketla thaya?&quot;, &quot;what have you learned?&quot;, &quot;strategy su che?&quot;, &quot;help&quot;.
                {!supported && " (Aa browser voice input support nathi kartu — type karo, javab hu boli ne aapis.)"}
              </p>
            )}
            <div className="space-y-2">
              {log.map((m, i) => (
                <p
                  key={i}
                  className={`text-sm leading-relaxed ${m.who === "you" ? "text-background/60" : "text-background"}`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] mr-2" style={m.who === "friday" ? { color: ACCENT } : undefined}>
                    {m.who === "you" ? "You" : "Friday"}
                  </span>
                  {m.text}
                </p>
              ))}
              <div ref={logEndRef} />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                ask(input)
                setInput("")
              }}
              className="mt-3 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type to Friday…"
                className="flex-1 rounded-full bg-background/10 border border-background/20 px-4 py-2 text-sm text-background placeholder:text-background/40 outline-none focus:border-background/50"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full text-xs font-medium text-black"
                style={{ backgroundColor: ACCENT }}
              >
                Ask
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        {open && (
          <button
            onClick={listen}
            disabled={!supported}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform ${listening ? "scale-110" : ""}`}
            style={{ backgroundColor: listening ? "#ef4444" : ACCENT }}
            aria-label={listening ? "Stop listening" : "Start listening"}
          >
            <Mic className="w-5 h-5 text-black" />
          </button>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          className="h-14 px-5 rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-[0.25em] shadow-2xl flex items-center gap-2"
          aria-label="Toggle Friday"
        >
          <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ backgroundColor: ACCENT }} />
          Friday
        </button>
      </div>
    </div>
  )
}
