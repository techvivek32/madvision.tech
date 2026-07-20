import { NextRequest, NextResponse } from "next/server"
import * as nodemailer from "nodemailer"
import MailComposer from "nodemailer/lib/mail-composer"
import { ImapFlow } from "imapflow"
import { readAgency, writeAgency } from "@/lib/agency-store"

export const runtime = "nodejs"
export const maxDuration = 20

type Lead = {
  id: string
  business: string
  email?: string
  status: string
  notes?: string
  pitchEmailSubject?: string
  pitchEmailBody?: string
}

type MailOptions = { from: string; to: string; subject: string; text: string }

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([p, new Promise<T>((_, r) => setTimeout(() => r(new Error("timeout")), ms))])
}

/** Save a copy of the outgoing pitch into the mailbox's Sent folder, so it
 *  shows up in Titan webmail exactly like a normally-sent email. Best-effort:
 *  a plain SMTP send never auto-files to Sent, so we append it over IMAP. */
async function appendToSent(mail: MailOptions): Promise<boolean> {
  if (!process.env.SMTP_PASS) return false
  try {
    const raw: Buffer = await new Promise((resolve, reject) =>
      new MailComposer(mail).compile().build((err, msg) => (err ? reject(err) : resolve(msg))),
    )
    const client = new ImapFlow({
      host: process.env.IMAP_HOST || "imap.titan.email",
      port: Number(process.env.IMAP_PORT || 993),
      secure: true,
      auth: { user: process.env.SMTP_USER || "info@madvision.tech", pass: process.env.SMTP_PASS as string },
      logger: false,
    })
    await withTimeout(client.connect(), 8000)
    try {
      const boxes = await client.list()
      const sent =
        boxes.find((b) => b.specialUse === "\\Sent") || boxes.find((b) => /sent/i.test(b.path))
      await client.append(sent?.path || "Sent", raw, ["\\Seen"])
    } finally {
      await client.logout().catch(() => {})
    }
    return true
  } catch {
    return false
  }
}

/** POST { leadId, mode? }: mode "copy" only files a Sent copy (no re-send);
 *  default actually sends the pitch, marks it, and files it in Sent. */
export async function POST(request: NextRequest) {
  const pass = request.headers.get("x-admin-pass")
  if (!process.env.ADMIN_PASS || pass !== process.env.ADMIN_PASS) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { leadId, mode } = (await request.json()) as { leadId?: string; mode?: string }
  const data = await readAgency()
  const lead = (data.leads as Lead[]).find((l) => l.id === leadId)
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 })
  if (!lead.email || !lead.pitchEmailSubject || !lead.pitchEmailBody) {
    return NextResponse.json({ error: "Lead has no email pitch drafted" }, { status: 400 })
  }
  if (!process.env.SMTP_PASS) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
  }

  const smtpUser = process.env.SMTP_USER || "info@madvision.tech"
  const mail: MailOptions = {
    from: `"Vivek Vora — Vision Tech" <${smtpUser}>`,
    to: lead.email,
    subject: lead.pitchEmailSubject,
    text: lead.pitchEmailBody,
  }

  // copy-only: file a Sent copy without sending again (used to backfill history)
  if (mode === "copy") {
    const copied = await appendToSent(mail)
    return NextResponse.json({ success: true, copyOnly: true, copiedToSent: copied })
  }

  const port = Number(process.env.SMTP_PORT || 465)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.titan.email",
    port,
    secure: port === 465,
    auth: { user: smtpUser, pass: process.env.SMTP_PASS },
  })

  try {
    const result = await transporter.sendMail(mail)

    // record the send + keep the blob authoritative so a seed sync can't revert it
    lead.status = "pitched"
    lead.notes = `${lead.notes ? lead.notes + " · " : ""}Email sent ${new Date().toISOString().slice(0, 10)}`
    ;(data as Record<string, unknown>).updatedAt = new Date().toISOString()
    await writeAgency(data)

    const copiedToSent = await appendToSent(mail)
    return NextResponse.json({ success: true, messageId: result.messageId, to: lead.email, copiedToSent })
  } catch (error) {
    console.error("Outreach send error:", (error as Error).message)
    return NextResponse.json({ error: "Failed to send" }, { status: 500 })
  }
}
