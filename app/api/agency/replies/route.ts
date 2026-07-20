import { NextRequest, NextResponse } from "next/server"
import { ImapFlow } from "imapflow"
import { readAgency, writeAgency } from "@/lib/agency-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 15

type Lead = { id: string; business: string; email?: string; status: string; notes?: string }

function authed(request: NextRequest) {
  const pass = request.headers.get("x-admin-pass")
  return !!process.env.ADMIN_PASS && pass === process.env.ADMIN_PASS
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("imap-timeout")), ms)),
  ])
}

/** Best-effort IMAP scan of the last 14 days for messages from any lead's email.
 *  Fails soft (timeout / not-configured) so the admin poll never hangs. */
async function scanInbox(leadEmails: Set<string>) {
  const client = new ImapFlow({
    host: process.env.IMAP_HOST || "imap.titan.email",
    port: Number(process.env.IMAP_PORT || 993),
    secure: true,
    auth: { user: process.env.SMTP_USER || "info@madvision.tech", pass: process.env.SMTP_PASS as string },
    logger: false,
  })
  const hits: { from: string; subject: string; date: string | null }[] = []
  await client.connect()
  try {
    const lock = await client.getMailboxLock("INBOX")
    try {
      const since = new Date(Date.now() - 14 * 24 * 3600 * 1000)
      const uids = (await client.search({ since }, { uid: true })) || []
      if (uids.length) {
        for await (const msg of client.fetch(uids as number[], { envelope: true }, { uid: true })) {
          const from = (msg.envelope?.from?.[0]?.address || "").toLowerCase()
          if (leadEmails.has(from)) {
            hits.push({ from, subject: msg.envelope?.subject || "", date: msg.envelope?.date ? new Date(msg.envelope.date).toISOString() : null })
          }
        }
      }
    } finally {
      lock.release()
    }
  } finally {
    await client.logout().catch(() => {})
  }
  return hits
}

/** GET: auto-detect replies via IMAP and flag those leads as "replied". */
export async function GET(request: NextRequest) {
  if (!authed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!process.env.SMTP_PASS) return NextResponse.json({ ok: false, configured: false, replies: [] })

  const data = await readAgency()
  const byEmail = new Map<string, Lead>()
  for (const l of data.leads as Lead[]) if (l.email) byEmail.set(l.email.toLowerCase(), l)

  let hits: { from: string; subject: string; date: string | null }[]
  try {
    hits = await withTimeout(scanInbox(new Set(byEmail.keys())), 10_000)
  } catch (e) {
    return NextResponse.json({ ok: false, configured: true, error: (e as Error).message, replies: [] })
  }

  let changed = false
  const replies: { leadId: string; business: string; from: string; subject: string; date: string | null }[] = []
  for (const h of hits) {
    const lead = byEmail.get(h.from)
    if (!lead) continue
    if (lead.status !== "replied" && lead.status !== "won") {
      lead.status = "replied"
      lead.notes = `${lead.notes ? lead.notes + " · " : ""}Reply received ${new Date().toISOString().slice(0, 10)}`
      changed = true
    }
    replies.push({ leadId: lead.id, business: lead.business, from: h.from, subject: h.subject, date: h.date })
  }
  if (changed) await writeAgency(data)
  return NextResponse.json({ ok: true, configured: true, replies })
}

/** POST { leadId }: manual fallback — mark a lead as replied (guaranteed, no IMAP). */
export async function POST(request: NextRequest) {
  if (!authed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { leadId } = (await request.json()) as { leadId?: string }
  const data = await readAgency()
  const lead = (data.leads as Lead[]).find((l) => l.id === leadId)
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 })
  lead.status = "replied"
  lead.notes = `${lead.notes ? lead.notes + " · " : ""}Marked replied ${new Date().toISOString().slice(0, 10)}`
  await writeAgency(data)
  return NextResponse.json({ ok: true })
}
