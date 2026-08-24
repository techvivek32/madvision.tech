/* ------------------------------------------------------------------ *
 *  The Mad Vision Tech email signature.                               *
 *  ONE definition, used by every email the site sends, so the         *
 *  signature can never drift between the contact auto-reply, the      *
 *  lead notification and the outreach pitches.                        *
 *                                                                     *
 *  The logo is embedded in the message itself as a CID attachment,    *
 *  NOT linked from madvision.tech. That means it works before the     *
 *  site is deployed, survives a domain change, and can never show a   *
 *  broken image. Cost: ~2.3 KB per email.                             *
 * ------------------------------------------------------------------ */

export const SIGNATURE_CID = "mvt-logo"

/** public/logo-mark.gif — the animated mark, inlined so no filesystem or
 *  network access is needed at runtime. Frame 1 is the COMPLETE logo, so
 *  Outlook desktop (which shows only the first frame) still renders it right. */
const LOGO_GIF_BASE64 =
  "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" +
  "rCuBADs="

/* ---- the facts, in one place ---- */
export const COMPANY = "Mad Vision Tech"
export const TAGLINE = "Turning Vision Into Innovation"
export const PHONE_DISPLAY = "+91 83206 93440"
export const PHONE_TEL = "+918320693440"
export const SITE = "https://madvision.tech"
/** Company Instagram profile. Set empty to fall back to a plain website link. */
export const INSTAGRAM = "https://www.instagram.com/madvisiontech/"
export const LINKEDIN = "https://www.linkedin.com/in/vivek-tech32/"
export const GITHUB = "https://github.com/techvivek32"

export const OFFICES = [
  ["Head Office", "R.K. World Tower, Rajkot, Gujarat, India"],
  ["Ahmedabad", "Titanium City Center Business Park, Ahmedabad 380015"],
  ["Canada", "Dolphin Ave, Kelowna, BC V1Y 9J7"],
] as const

export type Signer = { name: string; role: string; email: string }

export const FOUNDER: Signer = {
  name: "Vivek Vora",
  role: "Founder & CEO",
  email: process.env.CONTACT_EMAIL || "madevisionstudios@gmail.com",
}

/** The attachment that carries the logo. Spread into nodemailer sendMail(). */
export function signatureAttachments() {
  return [
    {
      filename: "mad-vision-tech.gif",
      content: Buffer.from(LOGO_GIF_BASE64, "base64"),
      cid: SIGNATURE_CID,
      contentType: "image/gif",
    },
  ]
}

/** Splits a name so the surname can carry the house italic. */
function splitName(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length < 2) return { first: name, last: "" }
  return { first: parts.slice(0, -1).join(" "), last: parts[parts.length - 1] }
}

/** The HTML signature block. Table-based so it survives every email client. */
export function signatureHtml(signer: Signer = FOUNDER) {
  const { first, last } = splitName(signer.name)
  const offices = OFFICES.map(
    ([label, value]) =>
      `<span style="color:#111111;font-weight:bold;">${label}:</span> ${value}`,
  ).join("<br>")

  return `
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;margin-top:26px;">
  <tr>
    <td valign="top" style="padding:0 20px 0 0;">
      <a href="${SITE}" style="text-decoration:none;border:0;">
        <img src="cid:${SIGNATURE_CID}" width="84" height="84" alt="${COMPANY}"
             style="display:block;width:84px;height:84px;border:0;border-radius:14px;">
      </a>
    </td>
    <td valign="top" style="border-left:3px solid #c8ff00;padding:2px 0 2px 20px;">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.2;color:#111111;">
        ${first}${last ? ` <span style="font-style:italic;">${last}</span>` : ""}
      </div>
      <div style="font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#6b6b6b;padding-top:4px;">
        ${signer.role}
      </div>
      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#111111;font-weight:bold;padding-top:6px;">
        ${COMPANY}
      </div>
      <div style="font-size:12.5px;color:#333333;line-height:1.8;padding-top:12px;">
        <a href="tel:${PHONE_TEL}" style="color:#111111;text-decoration:none;">${PHONE_DISPLAY}</a>
        &nbsp;&middot;&nbsp;
        <a href="https://wa.me/${PHONE_TEL.replace("+", "")}" style="color:#555555;text-decoration:none;">WhatsApp</a>
        <br>
        <a href="mailto:${signer.email}" style="color:#111111;text-decoration:none;">${signer.email}</a>
        <br>
        ${INSTAGRAM
          ? `<a href="${INSTAGRAM}" style="color:#4d6b00;font-weight:bold;text-decoration:none;">Instagram</a>`
          : `<a href="${SITE}" style="color:#4d6b00;font-weight:bold;text-decoration:none;">madvision.tech</a>`}
        &nbsp;&middot;&nbsp;
        <a href="${LINKEDIN}" style="color:#555555;text-decoration:none;">LinkedIn</a>
        &nbsp;&middot;&nbsp;
        <a href="${GITHUB}" style="color:#555555;text-decoration:none;">GitHub</a>
      </div>
      <div style="font-size:10.5px;color:#8a8a8a;padding-top:10px;line-height:1.7;">
        ${offices}
      </div>
      <div style="padding-top:12px;font-size:9px;font-weight:bold;letter-spacing:2.5px;text-transform:uppercase;color:#0a0a0f;">
        <span style="background:#c8ff00;padding:4px 10px;display:inline-block;">${TAGLINE}</span>
      </div>
    </td>
  </tr>
</table>`
}

/** Plain-text signature, for the text/plain part of every message. */
export function signatureText(signer: Signer = FOUNDER) {
  return [
    "--",
    `${signer.name} — ${signer.role}`,
    COMPANY,
    `${PHONE_DISPLAY} (call / WhatsApp) · ${signer.email}`,
    INSTAGRAM || "madvision.tech",
    ...OFFICES.map(([label, value]) => `${label}: ${value}`),
    TAGLINE,
  ].join("\n")
}
