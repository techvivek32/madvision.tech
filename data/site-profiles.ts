/* ------------------------------------------------------------------ *
 *  GENERATOR ENGINE — data layer.                                     *
 *  A SiteProfile is the single structured input that the SiteTemplate  *
 *  renders into a full, finished, real-data business site.            *
 *  The pipeline is: business URL --(harvester agent)--> SiteProfile    *
 *  --(SiteTemplate)--> live page. Fill a profile, get a site.         *
 *                                                                     *
 *  HONESTY RULES (enforced by convention + QA): every field must come *
 *  from the business's own public listings. Prices with real:true were *
 *  seen on their site. Never fabricate reviews — use reviewLinks to    *
 *  point at their real Google/Facebook pages instead.                 *
 * ------------------------------------------------------------------ */

export type ProfileService = {
  name: string
  price?: string // omit when the business doesn't publish prices
  unit?: string // "45 min", "per 2 hours", "per visit"
  note?: string
  real?: boolean // true = price/detail seen on their own site
  featured?: boolean
}

export type ProfileLink = { label: string; href: string }

export type SiteProfile = {
  slug: string
  leadId: string
  name: string
  /** clean light theme suits most local services; "dark" reserved for bespoke pages */
  accent: string
  accent2?: string // warm/secondary highlight (headings, overlines)
  established?: string // "1978"
  locality?: string // "The Norwich Lanes", "Brighton & Hove"

  hero: {
    overline?: string
    headline: string
    headlineAccent?: string // rendered in accent colour on its own line
    sub: string
    bullets?: string[]
  }

  contact: {
    phone: string
    tel: string // tel:+... form
    email?: string
    address?: string[]
    mapQuery?: string // for the embedded map + directions
    socials?: ProfileLink[]
  }

  /** primary booking action; if bookHref omitted, template falls back to tel */
  book?: { label: string; href?: string }

  services?: {
    title?: string
    subtitle?: string
    note?: string
    items: ProfileService[]
  }

  features?: { title?: string; items: { h: string; p: string }[] }

  team?: { title?: string; subtitle?: string; members: { name: string; role?: string }[] }

  hours?: { day: string; time: string; closed?: boolean }[]

  areas?: { title?: string; items: string[] }

  /** honest social proof: a headline + links to their REAL review pages. No invented quotes. */
  reviews?: { headline: string; body?: string; links: ProfileLink[] }

  /** small trust badges / awards actually earned (verified from their listings) */
  badges?: string[]

  footerCtaPrice?: string // "$299 one-time", "£220 one-time"
}

/* ------------------------------------------------------------------ */

export const PROFILES: SiteProfile[] = [
  {
    slug: "best-little-hair-house",
    leadId: "L-001",
    name: "Best Little Hair House",
    accent: "#b45309", // warm copper
    accent2: "#a16207",
    established: "1978",
    locality: "Downtown Penticton",
    hero: {
      overline: "Est. 1978 · 486 Main Street, Penticton",
      headline: "Penticton's salon",
      headlineAccent: "for over 40 years.",
      sub: "Family-owned since the Sally's Hair Port days — cuts, colour, extensions, piercing and more, in a warm, friendly downtown studio that regulars have trusted for four decades.",
      bullets: ["Voted Best Hair Salon — Okanagan Life", "Red Seal stylists", "Booked by appointment"],
    },
    contact: {
      phone: "(250) 493-5566",
      tel: "tel:+12504935566",
      email: "bestlittlehairhouse1@gmail.com",
      address: ["486 Main Street", "Penticton, BC V2A 5C5"],
      mapQuery: "486 Main Street, Penticton, BC V2A 5C5",
      socials: [
        { label: "Facebook", href: "https://www.facebook.com/bestlittlehairhousepenticton" },
        { label: "@bestlittlehairhouse1", href: "https://www.instagram.com/bestlittlehairhouse1/" },
        { label: "YouTube", href: "https://www.youtube.com/@bestlittlehairhouse" },
      ],
    },
    book: { label: "Book on Vagaro" }, // real: they use Vagaro; link swapped in on the real build
    services: {
      title: "What we do",
      subtitle: "A full-service salon — book any of these by appointment.",
      note: "Prices vary by stylist and service — we'll quote you when you book. Everything below is offered in-studio today.",
      items: [
        { name: "Cutting & styling", note: "Women's & men's", real: true },
        { name: "Custom colour", note: "Full colour, highlights, balayage", real: true },
        { name: "Perms & relaxing", real: true },
        { name: "Hair extensions", note: "Braiding, tinsel & feathers", real: true },
        { name: "Wigs & hairpieces", real: true },
        { name: "Ear piercing", note: "All ages", real: true },
        { name: "Spray tan", note: "Norvell certified", real: true },
        { name: "Tooth gems", real: true },
      ],
    },
    team: {
      title: "Your stylists",
      subtitle: "The team that's kept Penticton looking its best.",
      members: [
        { name: "Sally", role: "Founder" },
        { name: "Amanda", role: "Stylist" },
        { name: "Brandee", role: "Stylist" },
        { name: "Sabrina", role: "Stylist" },
        { name: "Norma", role: "Stylist" },
      ],
    },
    features: {
      title: "Why regulars stay for decades",
      items: [
        { h: "Since 1978", p: "The same trusted downtown salon, four decades and counting." },
        { h: "Red Seal stylists", p: "Certified professionals, Beauty Council of Western Canada." },
        { h: "Warm & relaxed", p: "Unique décor and a friendly, upbeat atmosphere." },
        { h: "Gives back", p: "A proud Canadian Cancer Society hair-donation partner." },
      ],
    },
    reviews: {
      headline: "Voted Best Hair Salon in the Okanagan",
      body: "Decades of loyal clients and dozens of five-star reviews. Read what Penticton actually says — straight from our own pages.",
      links: [
        { label: "Reviews on Facebook →", href: "https://www.facebook.com/bestlittlehairhousepenticton" },
        { label: "@bestlittlehairhouse1 →", href: "https://www.instagram.com/bestlittlehairhouse1/" },
      ],
    },
    badges: ["Okanagan Life — Best Hair Salon", "Customer Service Excellence", "Beauty Safe certified", "Red Seal Hairstylists"],
    footerCtaPrice: "$299 one-time",
  },
]

export function profileBySlug(slug: string) {
  return PROFILES.find((p) => p.slug === slug)
}
