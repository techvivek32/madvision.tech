import { get, put } from "@vercel/blob"
import seed from "@/data/agency.json"

/* ------------------------------------------------------------------ */
/*  Agency data lives in the private Vercel Blob store (agency-store). */
/*  data/agency.json in the repo is only the first-run seed.           */
/*  Every write snapshots a dated backup first — state is never lost.  */
/* ------------------------------------------------------------------ */

const KEY = "agency/agency.json"

export type AgencyData = typeof seed & Record<string, unknown>

async function streamToString(stream: AsyncIterable<Uint8Array>): Promise<string> {
  const chunks: Buffer[] = []
  for await (const c of stream) chunks.push(Buffer.from(c))
  return Buffer.concat(chunks).toString("utf8")
}

export async function readAgency(): Promise<AgencyData> {
  let blob: AgencyData | null = null
  try {
    const r = await get(KEY, { access: "private" })
    if (!r) throw new Error("blob missing")
    // Node's ReadableStream is async-iterable at runtime; TS types lag behind.
    const text = await streamToString(r.stream as unknown as AsyncIterable<Uint8Array>)
    blob = JSON.parse(text) as AgencyData
  } catch {
    blob = null
  }

  // The daily cloud cycle commits data/agency.json (no secrets needed there);
  // after the redeploy the bundled seed is newer than the blob — sync it in.
  const seedData = seed as AgencyData
  const seedNewer =
    !blob ||
    (typeof seedData.updatedAt === "string" &&
      typeof blob.updatedAt === "string" &&
      new Date(seedData.updatedAt) > new Date(blob.updatedAt))

  if (seedNewer) {
    try {
      await writeAgency(seedData)
    } catch {
      /* keep serving the seed even if the sync write fails */
    }
    return seedData
  }
  return blob as AgencyData
}

export async function writeAgency(data: unknown): Promise<void> {
  const body = JSON.stringify(data, null, 2)
  const stamp = new Date().toISOString().replace(/[:.]/g, "-")
  // dated snapshot on every write = full history, nothing is ever lost
  await put(`agency/backups/agency-${stamp}.json`, body, {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  })
  await put(KEY, body, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  })
}
