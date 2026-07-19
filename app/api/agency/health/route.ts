import { NextResponse } from "next/server"

/** Diagnostic only — reports whether env vars REACH the runtime (lengths, never values). */
export async function GET() {
  return NextResponse.json({
    adminPassSet: Boolean(process.env.ADMIN_PASS),
    adminPassLength: (process.env.ADMIN_PASS || "").length,
    smtpSet: Boolean(process.env.SMTP_PASS),
    blobTokenSet: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  })
}
