import { NextRequest, NextResponse } from "next/server"
import * as nodemailer from "nodemailer"
import agencyData from "@/data/agency.json"

type Lead = {
  id: string
  business: string
  email?: string
  pitchEmailSubject?: string
  pitchEmailBody?: string
}

/** Sends ONE approved, personalized pitch email to one lead (human-in-the-loop). */
export async function POST(request: NextRequest) {
  const pass = request.headers.get("x-admin-pass")
  if (!process.env.ADMIN_PASS || pass !== process.env.ADMIN_PASS) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { leadId } = (await request.json()) as { leadId?: string }
  const lead = (agencyData.leads as Lead[]).find((l) => l.id === leadId)
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 })
  if (!lead.email || !lead.pitchEmailSubject || !lead.pitchEmailBody) {
    return NextResponse.json({ error: "Lead has no email pitch drafted" }, { status: 400 })
  }
  if (!process.env.SMTP_PASS) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
  }

  const port = Number(process.env.SMTP_PORT || 465)
  const smtpUser = process.env.SMTP_USER || "info@madvision.tech"
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.titan.email",
    port,
    secure: port === 465,
    auth: { user: smtpUser, pass: process.env.SMTP_PASS },
  })

  try {
    const result = await transporter.sendMail({
      from: `"Vivek Vora — Vision Tech" <${smtpUser}>`,
      to: lead.email,
      subject: lead.pitchEmailSubject,
      text: lead.pitchEmailBody,
    })
    return NextResponse.json({ success: true, messageId: result.messageId, to: lead.email })
  } catch (error) {
    console.error("Outreach send error:", (error as Error).message)
    return NextResponse.json({ error: "Failed to send" }, { status: 500 })
  }
}
