"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  Bot,
  DollarSign,
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
    status: string
    pitchEmailSubject?: string
    pitchEmailBody?: string
    pitchWhatsApp?: string
    notes?: string
  }[]
  reports: { date: string; agent: string; summary: string }[]
  resourcesNeeded?: { item: string; status: string }[]
}

const AGENT_ICONS: Record<string, typeof Radar> = { scout: Radar, builder: Wrench, pitcher: Send }

export default function AdminPageContent() {
  const [pass, setPass] = useState("")
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState<Agency | null>(null)
  const [sending, setSending] = useState<string | null>(null)
  const [sent, setSent] = useState<Record<string, boolean>>({})

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
              {data.leads.map((lead) => (
                <div key={lead.id} className="p-5 rounded-2xl bg-card border border-border">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {lead.id} · {lead.country ?? ""} · {lead.status}
                      </span>
                      <p className="font-serif text-xl text-foreground">{lead.business}</p>
                    </div>
                    <div className="flex gap-2">
                      {lead.email && lead.pitchEmailBody && (
                        <button
                          onClick={() => approveSend(lead.id)}
                          disabled={sending === lead.id || sent[lead.id]}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                            sent[lead.id] ? "bg-secondary text-muted-foreground" : "btn-lime"
                          }`}
                        >
                          <Mail className="w-4 h-4" />
                          {sent[lead.id] ? "Email sent" : sending === lead.id ? "Sending…" : "Approve & send email"}
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
                    </div>
                  </div>
                  {lead.pitchEmailSubject && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Subject:</span> {lead.pitchEmailSubject}
                    </p>
                  )}
                  {lead.notes && <p className="font-mono text-[11px] text-muted-foreground mt-2">{lead.notes}</p>}
                </div>
              ))}
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
  const recRef = useRef<{ stop: () => void } | null>(null)

  useEffect(() => {
    const w = window as unknown as Record<string, unknown>
    if (!w.SpeechRecognition && !w.webkitSpeechRecognition) setSupported(false)
  }, [])

  const speak = useCallback(
    (text: string) => {
      setLog((l) => [...l, { who: "friday", text }])
      try {
        window.speechSynthesis.cancel()
        const u = new SpeechSynthesisUtterance(text)
        u.lang = lang
        u.rate = 1.02
        window.speechSynthesis.speak(u)
      } catch {
        /* silent — text stays in the log */
      }
    },
    [lang],
  )

  const answer = useCallback(
    (q: string) => {
      const t = q.toLowerCase()
      const liveLeads = data.leads.filter((l) => l.status !== "lost")
      const won = data.leads.filter((l) => l.status === "won")

      if (/idea|आइडिया|વિચાર/.test(t)) {
        speak(
          `Today's idea: ${data.todayIdea.title}. Price range ${data.todayIdea.priceRangeUSD}. Status: ${data.todayIdea.status}. Target niche: ${data.todayIdea.targetNiche}.`,
        )
      } else if (/lead|pipeline|लीड|લીડ/.test(t)) {
        speak(
          liveLeads.length === 0
            ? "Pipeline is empty right now. Scout's next research cycle will bring fresh leads."
            : `${liveLeads.length} leads in pipeline, ${won.length} won. Latest: ${liveLeads[0].business}, status ${liveLeads[0].status}.`,
        )
      } else if (/paisa|money|revenue|earning|target|कमाई|પૈસા/.test(t)) {
        speak(
          `Daily pipeline target is ${data.targets.dailyPipelineUSD} dollars, minimum revenue goal ${data.targets.dailyRevenueGoalUSD} dollars per day. Earned to date: ${data.targets.earnedToDateUSD} dollars.`,
        )
      } else if (/agent|team|टीम|ટીમ/.test(t)) {
        speak(data.agents.map((a) => `${a.name}: ${a.status}`).join(". ") + ".")
      } else {
        const latest = data.reports[0]
        speak(
          `Boss, here's the update. ${latest ? latest.summary + " " : ""}Idea of the day: ${data.todayIdea.title}. Pipeline: ${liveLeads.length} leads, ${won.length} won, ${data.targets.earnedToDateUSD} dollars earned so far. Daily target: ${data.targets.dailyPipelineUSD} dollars of pitches.`,
        )
      }
    },
    [data, speak],
  )

  const listen = () => {
    const w = window as unknown as Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition
    if (!SR) return
    if (listening) {
      recRef.current?.stop()
      return
    }
    const rec = new SR()
    recRef.current = rec
    rec.lang = lang
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onstart = () => setListening(true)
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    rec.onresult = (e: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => {
      const text = e.results[0][0].transcript
      setLog((l) => [...l, { who: "you", text }])
      answer(text)
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
                Mic dabao ane bolo — &quot;Friday, tell me updates&quot;, &quot;idea su che?&quot;,
                &quot;leads kya che?&quot;, &quot;paisaketla thaya?&quot;
                {!supported && " (Aa browser voice support nathi karto — Chrome vaparo.)"}
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
            </div>
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
