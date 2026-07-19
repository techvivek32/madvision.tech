import { NextRequest, NextResponse } from "next/server"
import agencyData from "@/data/agency.json"

export async function GET(request: NextRequest) {
  const pass = request.headers.get("x-admin-pass")
  if (!process.env.ADMIN_PASS || pass !== process.env.ADMIN_PASS) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return NextResponse.json(agencyData)
}
