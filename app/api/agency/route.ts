import { NextRequest, NextResponse } from "next/server"
import { readAgency, writeAgency } from "@/lib/agency-store"

function authorized(request: NextRequest) {
  const pass = request.headers.get("x-admin-pass")
  return Boolean(process.env.ADMIN_PASS) && pass === process.env.ADMIN_PASS
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  return NextResponse.json(await readAgency())
}

/** Full-document update from the daily agency cycle (local or cloud agent). */
export async function POST(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const data = (await request.json()) as Record<string, unknown>
  for (const key of ["targets", "todayIdea", "agents", "leads", "reports"]) {
    if (!(key in data)) {
      return NextResponse.json({ error: `Missing required key: ${key}` }, { status: 400 })
    }
  }

  await writeAgency(data)
  return NextResponse.json({ success: true })
}
