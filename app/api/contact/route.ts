import { NextRequest, NextResponse } from 'next/server'
import * as nodemailer from 'nodemailer'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@madvision.tech'

// escape user input before interpolating into the HTML mail body
function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, service, message } = body as Record<string, string>

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!process.env.SMTP_PASS) {
      console.error('SMTP_PASS is not set — add it to .env.local (and to Vercel env vars for production)')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const port = Number(process.env.SMTP_PORT || 465)
    const smtpUser = process.env.SMTP_USER || CONTACT_EMAIL

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.titan.email',
      port,
      secure: port === 465, // SSL on 465, STARTTLS on 587
      auth: {
        user: smtpUser,
        pass: process.env.SMTP_PASS,
      },
    })

    const result = await transporter.sendMail({
      from: `"Vision Tech Website" <${smtpUser}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${service || 'General Inquiry'}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Company:</strong> ${esc(company || 'Not provided')}</p>
        <p><strong>Service:</strong> ${esc(service || 'Not specified')}</p>
        <p><strong>Message:</strong></p>
        <p>${esc(message).replace(/\n/g, '<br/>')}</p>
      `,
    })

    return NextResponse.json({ success: true, messageId: result.messageId })
  } catch (error) {
    console.error('Contact form email error:', (error as Error).message)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
