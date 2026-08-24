import { NextRequest, NextResponse } from 'next/server'
import * as nodemailer from 'nodemailer'
import { signatureAttachments, signatureHtml, signatureText } from '@/lib/email-signature'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'madevisionstudios@gmail.com'

/* The <select> posts a short code — map it back to the human label so both
   the notification and the visitor's confirmation read properly. */
const SERVICE_LABELS: Record<string, string> = {
  ai: 'AI Solutions',
  saas: 'SaaS Development',
  erp: 'ERP/CRM Systems',
  web: 'Web Development',
  mobile: 'Mobile App Development',
  cloud: 'Cloud & DevOps',
  other: 'Other',
}

// escape user input before interpolating into the HTML mail body
function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

type Fields = { name: string; email: string; company: string; service: string; message: string }

/* ---------------- 1. what lands in the Mad Vision Tech inbox ---------------- */
function notificationHtml(f: Fields) {
  return `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${esc(f.name)}</p>
    <p><strong>Email:</strong> ${esc(f.email)}</p>
    <p><strong>Company:</strong> ${esc(f.company || 'Not provided')}</p>
    <p><strong>Service:</strong> ${esc(f.service || 'Not specified')}</p>
    <p><strong>Message:</strong></p>
    <p>${esc(f.message).replace(/\n/g, '<br/>')}</p>
  `
}

/* ---------------- 2. the thank-you that goes back to the visitor ---------------- */
function confirmationHtml(f: Fields) {
  const firstName = esc(f.name.split(' ')[0] || f.name)
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 0;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8a8a8a;width:110px;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;font-size:14px;color:#111111;line-height:1.6;">${value}</td>
    </tr>`

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Thanks for reaching out</title></head>
<body style="margin:0;padding:24px 12px;background:#ececea;font-family:Arial,Helvetica,sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;margin:0 auto;border-collapse:separate;">

    <!-- header -->
    <tr>
      <td style="background:#0a0a0f;border-radius:14px 14px 0 0;padding:32px 32px 28px;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.2;color:#ffffff;">
          Mad Vision <span style="font-style:italic;">Tech</span>
        </div>
        <div style="width:28px;height:3px;background:#c8ff00;margin:12px 0 0;font-size:0;line-height:0;">&nbsp;</div>
      </td>
    </tr>

    <!-- body -->
    <tr>
      <td style="background:#ffffff;border-left:1px solid #e4e4e0;border-right:1px solid #e4e4e0;padding:32px;">
        <p style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.35;color:#111111;">
          Thank you, ${firstName}.
        </p>
        <p style="margin:0 0 16px;font-size:14.5px;line-height:1.75;color:#444444;">
          We&rsquo;ve received your message and it&rsquo;s already with our team. Someone will read it properly
          and get back to you personally &mdash; usually <strong style="color:#111111;">within 24 hours</strong>, often sooner.
        </p>
        <p style="margin:0 0 26px;font-size:14.5px;line-height:1.75;color:#444444;">
          No bots on our side &mdash; just a real reply from the team that would build your project.
        </p>

        <!-- recap of what they submitted -->
        <div style="border:1px solid #e4e4e0;border-radius:12px;padding:18px 20px;background:#fafaf8;">
          <div style="font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#8a8a8a;padding-bottom:10px;">
            What you sent us
          </div>
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            ${row('Name', esc(f.name))}
            ${row('Email', esc(f.email))}
            ${f.company ? row('Company', esc(f.company)) : ''}
            ${f.service ? row('Service', esc(f.service)) : ''}
            ${row('Message', esc(f.message).replace(/\n/g, '<br/>'))}
          </table>
        </div>

        <p style="margin:26px 0 0;font-size:14.5px;line-height:1.75;color:#444444;">
          Need us sooner? Reply straight to this email, or reach us on
          <a href="https://wa.me/918320693440" style="color:#4d6b00;font-weight:bold;text-decoration:none;">WhatsApp</a>.
        </p>

        <p style="margin:26px 0 0;font-size:14.5px;line-height:1.75;color:#444444;">
          Warm regards,
        </p>
      </td>
    </tr>

    <!-- house signature. Sits INSIDE the document body — Gmail discards markup
         placed after the closing html tag, which silently swallowed both the
         signature and its inline logo when it was concatenated onto the end.
         This is the ONLY place the contact details appear: the old contact
         strip and lime tagline row were removed because the signature already
         carries every one of those facts, and printing them twice made the
         email read like it had two endings. -->
    <tr>
      <td style="background:#ffffff;border-left:1px solid #e4e4e0;border-right:1px solid #e4e4e0;border-bottom:1px solid #e4e4e0;border-radius:0 0 14px 14px;padding:8px 32px 30px;">
        ${signatureHtml()}
      </td>
    </tr>

    <tr>
      <td style="padding:18px 32px;font-size:11px;color:#9a9a9a;line-height:1.6;text-align:center;">
        You&rsquo;re receiving this because you submitted the contact form on madvision.tech.
      </td>
    </tr>

  </table>
</body>
</html>`
}

/* Plain-text alternative — improves deliverability and covers text-only clients. */
function confirmationText(f: Fields) {
  const firstName = f.name.split(' ')[0] || f.name
  return [
    `Thank you, ${firstName}.`,
    '',
    "We've received your message and it's already with our team. Someone will get back to you personally — usually within 24 hours, often sooner.",
    '',
    'WHAT YOU SENT US',
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.company ? `Company: ${f.company}` : '',
    f.service ? `Service: ${f.service}` : '',
    `Message: ${f.message}`,
    '',
    'Need us sooner? Reply straight to this email, or WhatsApp +91 83206 93440.',
    '',
    'Warm regards,',
    '',
    "You're receiving this because you submitted the contact form on madvision.tech.",
  ]
    .filter(Boolean)
    .join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, service, message } = body as Record<string, string>

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!isEmail(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
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

    const fields: Fields = {
      name: name.trim(),
      email: email.trim(),
      company: (company || '').trim(),
      service: SERVICE_LABELS[service] || (service || '').trim(),
      message: message.trim(),
    }

    /* 1. The lead notification — this is the one that must succeed. */
    const result = await transporter.sendMail({
      from: `"Mad Vision Tech Website" <${smtpUser}>`,
      to: CONTACT_EMAIL,
      replyTo: fields.email,
      subject: `Contact Form: ${fields.service || 'General Inquiry'} — ${fields.name}`,
      html: notificationHtml(fields) + signatureHtml(),
      attachments: signatureAttachments(),
    })

    /* 2. The thank-you back to the visitor. Best-effort: if this bounces we
          still captured the lead, so the form must not report a failure. */
    let confirmationSent = false
    try {
      await transporter.sendMail({
        from: `"Mad Vision Tech" <${smtpUser}>`,
        to: fields.email,
        replyTo: CONTACT_EMAIL,
        subject: `Thanks for reaching out, ${fields.name.split(' ')[0] || fields.name} — we've got your message`,
        text: `${confirmationText(fields)}\n\n${signatureText()}`,
        html: confirmationHtml(fields),
        attachments: signatureAttachments(),
      })
      confirmationSent = true
    } catch (error) {
      console.error('Confirmation email failed (lead was still captured):', (error as Error).message)
    }

    return NextResponse.json({ success: true, messageId: result.messageId, confirmationSent })
  } catch (error) {
    console.error('Contact form email error:', (error as Error).message)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
