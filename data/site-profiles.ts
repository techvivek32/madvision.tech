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

/* Per-country pricing, localized for a better conversion ratio.
   One-time, no monthly fees, live in 48h. Boss can override per deal. */
export const PRICING: Record<string, string> = {
  US: "$299",
  CA: "CA$349",
  UK: "£199",
  AU: "A$349",
  EU: "€249",
}
export function priceFor(country?: string) {
  return (country && PRICING[country]) || PRICING.US
}

export type SiteProfile = {
  slug: string
  leadId: string
  country?: string
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
    country: "CA",
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

  {
    slug: "nice-one-nail",
    leadId: "L-009",
    country: "CA",
    name: "Nice One Nail",
    accent: "#db2777",
    accent2: "#be185d",
    locality: "Oakville, Ontario",
    hero: {
      overline: "Nail & beauty studio · Oakville",
      headline: "Beautiful nails,",
      headlineAccent: "beautifully easy to book.",
      sub: "A full-service nail and beauty studio in Oakville — manicures, pedicures, gel, facials, waxing and tinting, seven days a week.",
      bullets: ["Open 7 days", "Walk-ins & appointments", "Nails · facials · waxing · tinting"],
    },
    contact: {
      phone: "(905) 847-2501",
      tel: "tel:+19058472501",
      email: "niceonenails88@gmail.com",
      address: ["2501 Third Line", "Oakville, ON L6M 5A9"],
      mapQuery: "2501 Third Line, Oakville, ON L6M 5A9",
    },
    book: { label: "Book now" },
    services: {
      title: "Services",
      subtitle: "What we offer",
      note: "Category ranges from our published price list; the exact price depends on the service. Taxes extra.",
      items: [
        { name: "Manicures & pedicures", price: "$25–$65", note: "Classic, gel & spa", real: true },
        { name: "Facials", price: "$35–$100", real: true },
        { name: "Waxing", price: "$7–$50", real: true },
        { name: "Brow & lash tinting", price: "$20–$30", real: true },
      ],
    },
    features: {
      title: "Why Oakville books with us",
      items: [
        { h: "Open 7 days", p: "Weekday evenings too — grooming that fits your week." },
        { h: "Full-service beauty", p: "Nails, facials, waxing and tinting under one roof." },
        { h: "Easy booking", p: "Call or book online in seconds." },
        { h: "In the heart of Oakville", p: "2501 Third Line, with easy parking." },
      ],
    },
    hours: [
      { day: "Monday – Friday", time: "10:00am – 8:00pm" },
      { day: "Saturday", time: "9:30am – 6:00pm" },
      { day: "Sunday", time: "11:00am – 5:00pm" },
    ],
    footerCtaPrice: "$299 one-time",
  },

  {
    slug: "studio-51-ink",
    leadId: "L-010",
    country: "UK",
    name: "Studio 51 Ink",
    accent: "#e11d48",
    accent2: "#be123c",
    established: "2023",
    locality: "Leytonstone, London",
    hero: {
      overline: "Tattoo & piercing · Leytonstone E11",
      headline: "Custom ink,",
      headlineAccent: "done right.",
      sub: "A modern tattoo and piercing studio on the High Road in Leytonstone. Bespoke custom work from artists Noel, Steve and Lucy — every piece drawn for you.",
      bullets: ["Est. 2023", "Custom tattoos & piercing", "Mon–Sat 11–7"],
    },
    contact: {
      phone: "07943 471235",
      tel: "tel:+447943471235",
      email: "studio51ink1@gmail.com",
      address: ["743 High Road Leytonstone", "London E11 4QS"],
      mapQuery: "743 High Road Leytonstone, London E11 4QS",
      socials: [
        { label: "Instagram", href: "https://www.instagram.com/studio51ink" },
        { label: "Facebook", href: "https://www.facebook.com/area.51.ink" },
        { label: "TikTok", href: "https://www.tiktok.com/@studio.51.ink" },
      ],
    },
    book: { label: "Book a consultation" },
    services: {
      title: "What we do",
      subtitle: "Custom work, by consultation",
      note: "Every piece is custom — prices are quoted at your free consultation.",
      items: [
        { name: "Custom tattoos", note: "Bespoke designs, any style" },
        { name: "Body piercing", note: "Professional & sterile" },
      ],
    },
    team: {
      title: "The artists",
      subtitle: "The hands behind the work.",
      members: [
        { name: "Noel", role: "Artist" },
        { name: "Steve", role: "Artist" },
        { name: "Lucy", role: "Artist" },
      ],
    },
    features: {
      title: "Why Studio 51",
      items: [
        { h: "Est. 2023", p: "A fresh, modern studio on the High Road." },
        { h: "Custom-first", p: "Every design drawn for you, never off the wall." },
        { h: "Clean & sterile", p: "Professional piercing and hygiene standards." },
        { h: "Six days a week", p: "Mon–Sat 11–7; Sundays by appointment." },
      ],
    },
    hours: [
      { day: "Monday – Saturday", time: "11:00am – 7:00pm" },
      { day: "Sunday", time: "By appointment" },
    ],
    reviews: {
      headline: "See the work, daily",
      body: "Fresh pieces and healed shots go up on our socials — take a look before you book.",
      links: [
        { label: "Instagram →", href: "https://www.instagram.com/studio51ink" },
        { label: "TikTok →", href: "https://www.tiktok.com/@studio.51.ink" },
      ],
    },
    footerCtaPrice: "£220 one-time",
  },

  {
    slug: "cp-mobile-detailing",
    leadId: "L-011",
    country: "AU",
    name: "C&P Mobile Detailing",
    accent: "#2563eb",
    accent2: "#1d4ed8",
    locality: "Bendigo, VIC",
    hero: {
      overline: "Mobile car detailing · Bendigo",
      headline: "We come to you —",
      headlineAccent: "your car, showroom-fresh.",
      sub: "Fully mobile car detailing across Bendigo and surrounds. Seven detailing packages, from a quick express to a deep interior reset — done at your home or work.",
      bullets: ["Fully mobile", "7 detailing packages", "Bendigo & surrounds"],
    },
    contact: {
      phone: "0492 881 509",
      tel: "tel:+61492881509",
      email: "mobiledetailing.cp@gmail.com",
      address: ["Servicing Bendigo, VIC & surrounds"],
      mapQuery: "Bendigo VIC Australia",
    },
    book: { label: "Get a quote" },
    services: {
      title: "Packages",
      subtitle: "Pick your detailing package",
      note: "Pricing varies by vehicle size and condition — message us for a fast quote.",
      items: [
        { name: "Deluxe Detail", note: "Our full inside-and-out" },
        { name: "Pre-Sale Detail", note: "Sell for more" },
        { name: "Deep Interior Detail", note: "Reset the cabin" },
        { name: "Interior Detail", note: "Fresh inside" },
        { name: "Exterior Detail", note: "Paint & wheels" },
        { name: "Express Detail", note: "Quick refresh" },
        { name: "Maintenance Detail", note: "Customisable upkeep" },
      ],
    },
    features: {
      title: "Why C&P",
      items: [
        { h: "Fully mobile", p: "We detail at your home or workplace." },
        { h: "7 packages", p: "From express to deep interior detail." },
        { h: "Bendigo local", p: "Servicing Bendigo and surrounding areas." },
        { h: "Fast quotes", p: "Call or message for a quick price." },
      ],
    },
    footerCtaPrice: "$299 one-time",
  },

  {
    slug: "looks-like-new-detailing",
    leadId: "L-012",
    country: "AU",
    name: "Looks Like New Mobile Car Detailing",
    accent: "#0d9488",
    accent2: "#0f766e",
    established: "7 years",
    locality: "Toowoomba, QLD",
    hero: {
      overline: "Mobile detailing · Toowoomba",
      headline: "Looks like new —",
      headlineAccent: "we bring the detail to you.",
      sub: "Seven years detailing Toowoomba's cars, fully mobile. Simple size-based pricing, ceramic-coating specialist, and Alan at the buffer — booked straight to your driveway.",
      bullets: ["7 years detailing", "Fully mobile", "Ceramic coating specialist"],
    },
    contact: {
      phone: "0478 896 369",
      tel: "tel:+61478896369",
      email: "alan.jones13@yahoo.com.au",
      address: ["14 Mott Crescent", "Rockville QLD"],
      mapQuery: "Rockville QLD Australia",
      socials: [{ label: "Facebook", href: "https://www.facebook.com/Looks-like-new-mobile-car-detailing-103282137711654" }],
    },
    book: { label: "Book a detail" },
    services: {
      title: "Packages & prices",
      subtitle: "Simple, size-based pricing",
      note: "Prices are approximate and depend on your vehicle's size and condition.",
      items: [
        { name: "Express Maintenance Wash & Vacuum", price: "~$145–$235", unit: "3–5 hrs · by size", real: true },
        { name: "Premium Upkeep — Interior & Exterior", price: "~$245–$335", unit: "5–7 hrs · by size", real: true, featured: true },
        { name: "Premium Reset — Neglected Vehicles", price: "~$345–$435", unit: "7–9 hrs · by size", real: true },
        { name: "Headlight rejuvenation", price: "$55–$110", note: "Add-on", real: true },
        { name: "Ceramic coating", note: "Labocosmetica / Gyeon — quoted on discussion" },
      ],
    },
    team: {
      title: "Who you'll meet",
      members: [{ name: "Alan Jones", role: "Owner & detailer" }],
    },
    features: {
      title: "Why Looks Like New",
      items: [
        { h: "7 years", p: "Seven years detailing Toowoomba's cars." },
        { h: "Fully mobile", p: "We come to your driveway." },
        { h: "Ceramic specialist", p: "Labocosmetica and Gyeon coatings." },
        { h: "Size-based pricing", p: "Clear tiers — no surprises." },
      ],
    },
    hours: [
      { day: "Monday – Friday", time: "7:00am – 5:00pm" },
      { day: "Saturday", time: "8:00am – 12:00pm" },
      { day: "Sunday", time: "Closed", closed: true },
    ],
    reviews: {
      headline: "Seven years of happy cars",
      body: "See the before-and-afters on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/Looks-like-new-mobile-car-detailing-103282137711654" }],
    },
    footerCtaPrice: "$299 one-time",
  },

  {
    slug: "savannahs-barbershop",
    leadId: "L-013",
    country: "US",
    name: "Savannah's Traditional Barbershop",
    accent: "#b91c1c",
    accent2: "#991b1b",
    locality: "Savannah, GA",
    hero: {
      overline: "Traditional barbershop · Savannah",
      headline: "Classic cuts,",
      headlineAccent: "Savannah tradition.",
      sub: "Traditional barbering on Ogeechee Road — sharp haircuts, clean beard trims and the full hot-towel shave. Walk in or book your chair.",
      bullets: ["Haircut $30", "Hot-towel shave $45", "Open Tue–Sat"],
    },
    contact: {
      phone: "912-358-0758",
      tel: "tel:+19123580758",
      email: "Savannahtraditionalbarbers@gmail.com",
      address: ["4395 Ogeechee Rd #107", "Savannah, GA 31405"],
      mapQuery: "4395 Ogeechee Rd #107, Savannah, GA 31405",
      socials: [
        { label: "Facebook", href: "https://www.facebook.com/savannahstraditionalbarbershop" },
        { label: "Instagram", href: "https://www.instagram.com/savannahstraditionalbarbershop" },
      ],
    },
    book: { label: "Book a chair" },
    services: {
      title: "The board",
      subtitle: "Cuts & prices",
      items: [
        { name: "Haircut", price: "$30", real: true },
        { name: "Beard Trim", price: "$20", real: true },
        { name: "Hot Towel Shave", price: "$45", real: true, featured: true },
      ],
    },
    features: {
      title: "Why Savannah's",
      items: [
        { h: "Classic barbering", p: "Cuts, beard trims and hot-towel shaves." },
        { h: "Hot-towel shaves", p: "The full traditional experience." },
        { h: "Open Tue–Sat", p: "Closed Sundays and Mondays." },
        { h: "Easy to find", p: "4395 Ogeechee Rd, Savannah." },
      ],
    },
    hours: [
      { day: "Tuesday – Friday", time: "9:00am – 6:00pm" },
      { day: "Saturday", time: "10:00am – 3:00pm" },
      { day: "Sunday – Monday", time: "Closed", closed: true },
    ],
    reviews: {
      headline: "Savannah's regulars",
      body: "See the fresh cuts on our pages.",
      links: [
        { label: "Facebook →", href: "https://www.facebook.com/savannahstraditionalbarbershop" },
        { label: "Instagram →", href: "https://www.instagram.com/savannahstraditionalbarbershop" },
      ],
    },
    footerCtaPrice: "$299 one-time",
  },

  {
    slug: "wag-a-long-grooming",
    leadId: "L-014",
    country: "US",
    name: "Wag-A-Long Mobile Pet Salon & Spa",
    accent: "#0891b2",
    accent2: "#0e7490",
    established: "2016",
    locality: "Central Oklahoma",
    hero: {
      overline: "Mobile pet grooming · Central OK",
      headline: "Grooming that comes",
      headlineAccent: "to your driveway.",
      sub: "Fully mobile pet grooming across central Oklahoma since 2016 — baths, full grooms and nail trims, all at your home so your pet stays calm and stress-free.",
      bullets: ["Since 2016", "Fully mobile", "Guthrie, Edmond, OKC & more"],
    },
    contact: {
      phone: "(405) 888-1254",
      tel: "tel:+14058881254",
      email: "bark@wagalongmobilegrooming.com",
      address: ["Mobile service — Central Oklahoma"],
      mapQuery: "Guthrie, Oklahoma",
      socials: [{ label: "Facebook", href: "https://www.facebook.com/wagalongmobilegroomer/" }],
    },
    book: { label: "Book grooming" },
    services: {
      title: "Services",
      subtitle: "What we offer",
      note: "Rates depend on your pet's size and coat — ask for a quick quote.",
      items: [
        { name: "Bath", note: "Shampoo, conditioner, blow-out, nails, ears & brushing" },
        { name: "Full Groom", note: "Bath plus haircut, light de-matting, nails & ears" },
        { name: "Nail Trim", note: "Dremel or clippers, plus paw & pad tidy" },
      ],
    },
    features: {
      title: "Why Wag-A-Long",
      items: [
        { h: "Since 2016", p: "Years of gentle, patient mobile grooming." },
        { h: "Fully mobile", p: "We groom right outside your home." },
        { h: "Wide service area", p: "Guthrie, Edmond, North OKC, Yukon and more." },
        { h: "Full-service", p: "Bath, haircut, nails and ears." },
      ],
    },
    reviews: {
      headline: "Happy pets, happy owners",
      body: "See our furry clients on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/wagalongmobilegroomer/" }],
    },
    footerCtaPrice: "$299 one-time",
  },

  {
    slug: "next-level-detailing",
    leadId: "L-002",
    country: "CA",
    name: "Next Level Detailing",
    accent: "#1d4ed8",
    accent2: "#1e40af",
    established: "7 years",
    locality: "Vernon, BC",
    hero: {
      overline: "Auto detailing · Vernon BC",
      headline: "Vernon's ceramic &",
      headlineAccent: "detail specialists.",
      sub: "Over seven years making Vernon's vehicles look brand new — ceramic coating, undercoating, and full interior & exterior detailing. New customers get 10% off their first detail.",
      bullets: ["7+ years experience", "Ceramic coating specialists", "10% off your first detail"],
    },
    contact: {
      phone: "250-306-3077",
      tel: "tel:+12503063077",
      email: "nextleveldetailvernon@gmail.com",
      address: ["4609c 23rd Street", "Vernon, BC"],
      mapQuery: "4609c 23rd Street, Vernon, BC",
    },
    book: { label: "Book on Urable", href: "https://app.urable.com/virtual-shop/gYhpHE9qzpcc7Ur4ig55" },
    services: {
      title: "Services",
      subtitle: "What we do",
      note: "Pricing depends on your vehicle — get a fast quote. New customers get 10% off the first detail; ask about our VIP subscription and gift cards.",
      items: [
        { name: "Ceramic Coating", note: "Long-lasting paint protection" },
        { name: "Undercoating", note: "Protection built for our winters" },
        { name: "Interior & Exterior Detail", note: "Inside-and-out, showroom fresh" },
      ],
    },
    features: {
      title: "Why Next Level",
      items: [
        { h: "7+ years", p: "Seven years of serious detailing experience." },
        { h: "Ceramic specialists", p: "Proper coatings, done right." },
        { h: "VIP subscription", p: "Keep it showroom-fresh year round." },
        { h: "10% off first detail", p: "A warm welcome for new customers." },
      ],
    },
    hours: [{ day: "Monday – Friday", time: "8:00am – 5:00pm" }],
  },

  {
    slug: "boise-detail",
    leadId: "L-003",
    country: "US",
    name: "Boise Detail",
    accent: "#0f766e",
    accent2: "#115e59",
    established: "1991",
    locality: "Boise, Idaho",
    hero: {
      overline: "Auto detailing since 1991 · Boise",
      headline: "Boise's detail shop",
      headlineAccent: "since 1991.",
      sub: "Over three decades making Boise's cars look, feel and smell brand new — full interior and exterior restoration for cars, trucks, RVs, motorcycles and marine. Licensed, bonded and insured, with a free shuttle.",
      bullets: ["Since 1991", "Licensed, bonded & insured", "Free shuttle · same-day"],
    },
    contact: {
      phone: "208-343-3025",
      tel: "tel:+12083433025",
      email: "service@boisedetailinc.com",
      address: ["2715 W Idaho St.", "Boise, ID 83702"],
      mapQuery: "2715 W Idaho St., Boise, ID 83702",
      socials: [{ label: "Facebook", href: "https://www.facebook.com/boisedetail" }],
    },
    book: { label: "Book a detail" },
    services: {
      title: "Services",
      subtitle: "What we restore",
      note: "We detail cars, trucks, RVs, motorcycles and marine. Ask for a quote — same-day turnaround in most cases, all work guaranteed.",
      items: [
        { name: "Exterior restoration", note: "Paint, trim & wheels" },
        { name: "Interior restoration", note: "Deep clean & refresh" },
        { name: "Upholstery & carpet", note: "Shampoo & extract" },
        { name: "Vinyl & leather care", note: "Clean & condition" },
        { name: "Engine & undercarriage", note: "Detailed underneath" },
        { name: "Fleet service", note: "Business & dealer rates" },
      ],
    },
    features: {
      title: "Why Boise Detail",
      items: [
        { h: "Since 1991", p: "Three decades detailing Boise's vehicles." },
        { h: "Guaranteed", p: "All work is fully guaranteed." },
        { h: "Free shuttle", p: "We'll get you where you need to be." },
        { h: "Licensed & insured", p: "Licensed, bonded and insured." },
      ],
    },
    reviews: {
      headline: "Trusted in Boise since 1991",
      body: "See the work and reviews on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/boisedetail" }],
    },
  },

  {
    slug: "noonies-pet-care",
    leadId: "L-008",
    country: "AU",
    name: "Noonies Pet Care",
    accent: "#0891b2",
    accent2: "#0e7490",
    established: "2008",
    locality: "Port Stephens, NSW",
    hero: {
      overline: "Pet care · Salt Ash & Port Stephens",
      headline: "Loving pet care,",
      headlineAccent: "close to home.",
      sub: "Darrin & Carol have cared for Port Stephens pets since 2008 — dog walking, pet sitting, grooming and more, with over 15 years of experience and a genuine soft spot for your animals.",
      bullets: ["Since 2008", "Owner-run by Darrin & Carol", "25km around Salt Ash"],
    },
    contact: {
      phone: "0411 398 395",
      tel: "tel:+61411398395",
      email: "darrin@noonies.org",
      address: ["Salt Ash, NSW 2318"],
      mapQuery: "Salt Ash NSW 2318",
      socials: [{ label: "Facebook", href: "https://www.facebook.com/Noonies123" }],
    },
    book: { label: "Book a visit" },
    services: {
      title: "Services & rates",
      subtitle: "Care for every pet",
      note: "Grooming (quote), dog training, small-animal care and a pet taxi are available too — just ask. Extra pets from the same household are a small add-on.",
      items: [
        { name: "Dog Walking", price: "A$30", unit: "up to 30 min", real: true },
        { name: "Pet Sitting — Dogs", price: "A$35–40", unit: "per visit", real: true, featured: true },
        { name: "Pet Sitting — Cats", price: "A$30", unit: "per visit", real: true },
        { name: "Dog Grooming", note: "Basic wash to full groom — quote at our Salt Ash premises" },
      ],
    },
    team: {
      title: "Meet the owners",
      members: [
        { name: "Darrin", role: "Owner" },
        { name: "Carol", role: "Owner" },
      ],
    },
    areas: {
      title: "Where we care for pets",
      items: ["Newcastle", "Medowie", "Tanilba Bay", "Williamtown", "Port Stephens", "Fern Bay", "Fullerton Cove", "Raymond Terrace"],
    },
    features: {
      title: "Why Noonies",
      items: [
        { h: "Since 2008", p: "15+ years caring for local pets." },
        { h: "Owner-run", p: "Darrin & Carol, personally." },
        { h: "25km radius", p: "Salt Ash and all around Port Stephens." },
        { h: "Full pet care", p: "Walking, sitting, grooming and more." },
      ],
    },
    hours: [
      { day: "Monday – Friday", time: "9:00am – 6:00pm" },
      { day: "Saturday – Sunday", time: "9:00am – 5:00pm" },
    ],
    reviews: {
      headline: "Loved by local pet owners",
      body: "See happy clients on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/Noonies123" }],
    },
  },

  {
    slug: "lakeside-pawfection",
    leadId: "L-015",
    country: "US",
    name: "Lakeside Pawfection",
    accent: "#0891b2",
    accent2: "#0e7490",
    locality: "Leesburg, Alabama",
    hero: {
      overline: "Pet grooming & boarding · Weiss Lake",
      headline: "Your dog's happy place",
      headlineAccent: "on Weiss Lake.",
      sub: "Full grooming, baths and boarding by Jeff and the team, right by Coosa Corner in Leesburg. Loved by local dog owners — now with a home online so they can find and book you any time.",
      bullets: ["Grooming & boarding", "By Weiss Lake, Leesburg", "Book any time"],
    },
    contact: {
      phone: "(256) 526-8900",
      tel: "tel:+12565268900",
      email: "LakesidePawfection@gmail.com",
      address: ["5640 Weiss Lake Blvd", "Leesburg, AL 35983"],
      mapQuery: "5640 Weiss Lake Blvd, Leesburg, AL 35983",
      socials: [{ label: "Facebook", href: "https://www.facebook.com/lakesidepetsalon/" }],
    },
    book: { label: "Request a booking" },
    services: {
      title: "Services",
      subtitle: "Grooming & boarding",
      note: "Prices depend on your dog's size and coat — call or message for a quick quote.",
      items: [
        { name: "Full groom", note: "Wash, cut, nails & ears" },
        { name: "Bath & tidy", note: "Fresh and clean" },
        { name: "Sanitary trim", note: "Quick clean-up" },
        { name: "Dog boarding", note: "Safe overnight stays" },
        { name: "Pet sitting", note: "While you're away" },
      ],
    },
    features: {
      title: "Why Lakeside",
      items: [
        { h: "Grooming & boarding", p: "Everything your dog needs in one spot." },
        { h: "On Weiss Lake", p: "Right by Coosa Corner in Leesburg." },
        { h: "Loved locally", p: "A favourite of Cherokee County dog owners." },
        { h: "Easy to reach", p: "Call or message to book." },
      ],
    },
    hours: [
      { day: "Tuesday – Friday", time: "8:00am – 5:00pm" },
      { day: "Saturday", time: "8:00am – 3:00pm" },
      { day: "Sunday – Monday", time: "Closed", closed: true },
    ],
    reviews: {
      headline: "Loved by Weiss Lake dog owners",
      body: "See happy pups and reviews on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/lakesidepetsalon/" }],
    },
  },

  {
    slug: "the-village-barbers",
    leadId: "L-016",
    country: "UK",
    name: "The Village Barbers",
    accent: "#b91c1c",
    accent2: "#991b1b",
    locality: "Allesley, Coventry",
    hero: {
      overline: "Barbershop · Allesley, Coventry",
      headline: "Allesley's",
      headlineAccent: "village barbershop.",
      sub: "Classic and modern cuts, sharp fades, beard trims and hot shaves on Birmingham Road. A local favourite for years — now with a proper home online so new customers can find you on Google, not just Facebook.",
      bullets: ["Cuts, fades & hot shaves", "Birmingham Road, Allesley", "Walk in or book"],
    },
    contact: {
      phone: "024 7704 0318",
      tel: "tel:+442477040318",
      email: "thevillagebarbersallesley@hotmail.com",
      address: ["130 Birmingham Road", "Allesley, Coventry CV5 9HA"],
      mapQuery: "130 Birmingham Road, Allesley, Coventry CV5 9HA",
      socials: [{ label: "Facebook", href: "https://www.facebook.com/thevillagebarbersallesley/" }],
    },
    book: { label: "Book on Fresha", href: "https://www.fresha.com/lvp/the-village-barbers-birmingham-road-allesley-7reKXo" },
    services: {
      title: "The board",
      subtitle: "Cuts & grooming",
      note: "Ask in the chair for today's prices — clear and fair, no surprises.",
      items: [
        { name: "Men's haircut", note: "Classic & modern" },
        { name: "Fade & blade work", note: "Sharp and clean" },
        { name: "Beard trim", note: "Shaped & tidied" },
        { name: "Hot shave", note: "The traditional finish" },
        { name: "Head shave", note: "Clean all over" },
        { name: "Kids' cuts", note: "For the young gents" },
      ],
    },
    features: {
      title: "Why the Village Barbers",
      items: [
        { h: "Local favourite", p: "Trusted by Allesley and Coventry for years." },
        { h: "Traditional & modern", p: "From classic cuts to fresh fades." },
        { h: "Easy booking", p: "Walk in or book online in seconds." },
        { h: "On Birmingham Road", p: "Easy to find, easy to park." },
      ],
    },
    hours: [
      { day: "Tuesday, Wednesday, Friday", time: "9:00am – 5:45pm" },
      { day: "Thursday", time: "9:00am – 6:45pm" },
      { day: "Saturday", time: "8:00am – 1:30pm" },
      { day: "Sunday – Monday", time: "Closed", closed: true },
    ],
    reviews: {
      headline: "A Coventry favourite",
      body: "See the cuts and reviews on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/thevillagebarbersallesley/" }],
    },
  },

  {
    slug: "moms-cafe",
    leadId: "L-017",
    country: "CA",
    name: "Mom's Cafe",
    accent: "#ea580c",
    accent2: "#c2410c",
    established: "50+ years",
    locality: "Sooke, BC",
    hero: {
      overline: "Diner & bakery · Sooke, BC",
      headline: "Sooke's home of",
      headlineAccent: "homemade pies.",
      sub: "Big breakfasts, hearty lunches and legendary homemade pies — a Sooke institution for over 50 years on Shields Road. Now with a proper site so locals and Island visitors can find your menu and hours on Google.",
      bullets: ["Breakfast, lunch & pies", "50+ years in Sooke", "Dine in or take out"],
    },
    contact: {
      phone: "778-352-2204",
      tel: "tel:+17783522204",
      email: "momscafe1963@gmail.com",
      address: ["2036 Shields Road", "Sooke, BC V9Z 0P6"],
      mapQuery: "2036 Shields Road, Sooke, BC V9Z 0P6",
      socials: [{ label: "Facebook", href: "https://www.facebook.com/momscafesooke/" }],
    },
    book: { label: "Call to reserve" },
    services: {
      title: "On the menu",
      subtitle: "A taste of Mom's",
      note: "A full menu of breakfast, lunch and daily specials — ask about today's fresh pies.",
      items: [
        { name: "Breakfast & brunch", note: "Fried chicken benny, avocado benny & more" },
        { name: "Chicken wings", note: "A local favourite" },
        { name: "Japanese curry bowl", note: "Hearty and warming" },
        { name: "Bulgogi", note: "Sweet & savoury" },
        { name: "Crispy calamari", note: "Golden and fresh" },
        { name: "Homemade pies", note: "The signature — over 50 years running", featured: true },
      ],
    },
    features: {
      title: "Why Mom's",
      items: [
        { h: "50+ years", p: "A true Sooke institution." },
        { h: "Homemade pies", p: "Made fresh, the reason regulars return." },
        { h: "Big portions", p: "Breakfast and lunch done right." },
        { h: "On Shields Road", p: "Easy to find in the heart of Sooke." },
      ],
    },
    hours: [
      { day: "Monday", time: "8:00am – 2:00pm" },
      { day: "Tuesday", time: "Closed", closed: true },
      { day: "Wednesday – Saturday", time: "8:00am – 7:00pm" },
      { day: "Sunday", time: "8:00am – 3:00pm" },
    ],
    reviews: {
      headline: "A Sooke favourite for generations",
      body: "See the food and reviews on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/momscafesooke/" }],
    },
  },

  {
    slug: "grooming-lounge-penrith",
    leadId: "L-018",
    country: "AU",
    name: "The Grooming Lounge Barbershop",
    accent: "#0f172a",
    accent2: "#334155",
    locality: "Penrith, NSW",
    hero: {
      overline: "Barbershop · Penrith NSW",
      headline: "Penrith's fresh",
      headlineAccent: "grooming lounge.",
      sub: "Sharp cuts, fades, beard work and hot shaves on Henry Street. A new home for men's grooming in Penrith — now with a proper site so customers find you on Google and book in a tap.",
      bullets: ["Cuts, fades & shaves", "Henry St, Penrith", "Late night Thursdays"],
    },
    contact: {
      phone: "02 4742 4395",
      tel: "tel:+61247424395",
      email: "htainlin.bacchus@gmail.com",
      address: ["97A Henry St", "Penrith, NSW 2750"],
      mapQuery: "97A Henry St, Penrith, NSW 2750",
      socials: [
        { label: "Facebook", href: "https://www.facebook.com/thegroominglounge.barbershop/" },
        { label: "Instagram", href: "https://www.instagram.com/thegroominglounge_barbershop/" },
      ],
    },
    book: { label: "Book on Fresha", href: "https://www.fresha.com/lvp/the-grooming-lounge-barbershop-henry-street-penrith-VEVoXo" },
    services: {
      title: "Services",
      subtitle: "Men's grooming",
      note: "Ask for today's prices — clear and upfront.",
      items: [
        { name: "Men's haircut", note: "Classic & modern" },
        { name: "Fades & styling", note: "Sharp and fresh" },
        { name: "Beard trim", note: "Shaped & lined" },
        { name: "Men's shave", note: "Smooth finish" },
        { name: "Head shave", note: "Clean all over" },
      ],
    },
    features: {
      title: "Why the Grooming Lounge",
      items: [
        { h: "Fresh & modern", p: "A new grooming lounge for Penrith." },
        { h: "Late Thursdays", p: "Open until 8pm for after-work cuts." },
        { h: "Easy booking", p: "Book online in a tap." },
        { h: "On Henry Street", p: "Central Penrith, easy to reach." },
      ],
    },
    hours: [
      { day: "Monday – Wednesday", time: "10:00am – 5:30pm" },
      { day: "Thursday", time: "10:00am – 8:00pm" },
      { day: "Friday", time: "9:00am – 5:30pm" },
      { day: "Saturday", time: "8:30am – 3:00pm" },
      { day: "Sunday", time: "Closed", closed: true },
    ],
    reviews: {
      headline: "New in Penrith",
      body: "Follow the fresh cuts on Instagram & Facebook.",
      links: [
        { label: "Instagram →", href: "https://www.instagram.com/thegroominglounge_barbershop/" },
        { label: "Facebook →", href: "https://www.facebook.com/thegroominglounge.barbershop/" },
      ],
    },
  },

  {
    slug: "olde-tyme-tattoo",
    leadId: "L-019",
    country: "US",
    name: "Olde Tyme Tattoo & Barber Shop",
    accent: "#991b1b",
    accent2: "#7f1d1d",
    locality: "Evans, Georgia",
    hero: {
      overline: "Barber & tattoo · Evans, GA",
      headline: "Cuts & ink,",
      headlineAccent: "one old-school shop.",
      sub: "Fresh haircuts, beard trims, hot shaves and custom tattoos under one roof on Washington Road. A local staple — now with a proper site so Evans finds you on Google, not just Facebook.",
      bullets: ["Barber + tattoo", "Washington Road, Evans", "Open late Fri & Sat"],
    },
    contact: {
      phone: "(706) 955-8646",
      tel: "tel:+17069558646",
      address: ["4460 Washington Road, Ste 5", "Evans, GA 30809"],
      mapQuery: "4460 Washington Road Ste 5, Evans, GA 30809",
      socials: [{ label: "Facebook", href: "https://www.facebook.com/oldetymetattooandbarber/" }],
    },
    book: { label: "Call the shop" },
    services: {
      title: "Services",
      subtitle: "Barbering & tattoos",
      note: "Ask in the shop for pricing — cuts and custom ink, done right.",
      items: [
        { name: "Haircuts", note: "Classic & modern" },
        { name: "Beard trims", note: "Shaped & clean" },
        { name: "Hot shaves", note: "The traditional finish" },
        { name: "Custom tattoos", note: "Bespoke designs, any style", featured: true },
      ],
    },
    features: {
      title: "Why Olde Tyme",
      items: [
        { h: "Two crafts, one shop", p: "Barbering and tattoos under one roof." },
        { h: "Open late", p: "Fridays & Saturdays until 10pm." },
        { h: "Local staple", p: "Trusted by Evans and Columbia County." },
        { h: "On Washington Road", p: "Easy to find in Evans." },
      ],
    },
    hours: [
      { day: "Tuesday – Thursday", time: "12:00pm – 8:00pm" },
      { day: "Friday – Saturday", time: "12:00pm – 10:00pm" },
      { day: "Sunday – Monday", time: "Closed", closed: true },
    ],
    reviews: {
      headline: "Trusted in Evans",
      body: "See the cuts and ink on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/oldetymetattooandbarber/" }],
    },
  },

  {
    slug: "michelles-mobile-grooming",
    leadId: "L-020",
    country: "US",
    name: "Michelle's Mobile Grooming",
    accent: "#0d9488",
    accent2: "#0f766e",
    established: "2019",
    locality: "Lakeland & Bartow, FL",
    hero: {
      overline: "Mobile pet grooming · Lakeland & Bartow",
      headline: "Grooming that comes",
      headlineAccent: "to your driveway.",
      sub: "Michelle brings full grooming to your door across Lakeland and Bartow — bath, haircut, nails and more, with 14 years' experience and a gentle touch. Now with a site so busy pet owners can find and book the van online.",
      bullets: ["Fully mobile", "14 years' experience", "Lakeland & Bartow"],
    },
    contact: {
      phone: "(863) 677-5725",
      tel: "tel:+18636775725",
      address: ["Mobile service — Lakeland & Bartow, FL"],
      mapQuery: "Bartow, FL",
      socials: [{ label: "Facebook", href: "https://www.facebook.com/MichellesMobileGrooming/" }],
    },
    book: { label: "Request the van" },
    services: {
      title: "Services",
      subtitle: "Full grooming, at your home",
      note: "Rates depend on your pet's size and coat — message for a quick quote.",
      items: [
        { name: "Bath", note: "Shampoo, blow-out & brush" },
        { name: "Full groom", note: "Bath plus haircut" },
        { name: "Nail trim", note: "Quick and gentle" },
        { name: "De-shedding", note: "Less fur at home" },
        { name: "Teeth cleaning", note: "Fresher breath" },
        { name: "Flea & tick treatment", note: "Keep pests away" },
      ],
    },
    features: {
      title: "Why Michelle's",
      items: [
        { h: "Since 2019", p: "14 years of grooming experience." },
        { h: "Fully mobile", p: "We groom right outside your home." },
        { h: "Lakeland & Bartow", p: "Serving the local area." },
        { h: "Gentle & caring", p: "Stress-free for your pet." },
      ],
    },
    reviews: {
      headline: "Loved by Lakeland pet owners",
      body: "See happy pups on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/MichellesMobileGrooming/" }],
    },
  },

  {
    slug: "colossal-barbers-ballarat",
    leadId: "L-021",
    country: "AU",
    name: "Colossal Barbers",
    accent: "#b0353a",
    accent2: "#991b1b",
    locality: "Delacombe, Ballarat VIC",
    hero: {
      overline: "Barbershop · Delacombe, Ballarat",
      headline: "Ballarat's go-to for",
      headlineAccent: "a proper fade.",
      sub: "Skin fades, straight-razor shaves and kids' cuts inside D2E Gym, Delacombe. Walk in or book online — now with a real home online so Ballarat finds you on Google, not just Facebook.",
      bullets: ["Skin fades & razor shaves", "Kids' cuts welcome", "Easy online booking"],
    },
    contact: {
      phone: "0491 174 066",
      tel: "tel:+61491174066",
      address: ["5/6 Raydon Court (D2E Gym)", "Delacombe VIC 3356"],
      mapQuery: "5/6 Raydon Court, Delacombe VIC 3356",
      socials: [
        { label: "Facebook", href: "https://www.facebook.com/ColossalBarbers/" },
        { label: "Instagram", href: "https://www.instagram.com/colossalbarbers.ballarat/" },
      ],
    },
    book: { label: "Book a chair" },
    services: {
      title: "The board",
      subtitle: "Cuts & shaves",
      note: "Ask in the chair for today's prices — sharp work, fair rates.",
      items: [
        { name: "Standard Haircut", note: "Classic & modern" },
        { name: "Skin Fade", note: "Sharp and clean" },
        { name: "Beard Trim", note: "Shaped & tidied" },
        { name: "Straight Razor Shave", note: "The traditional finish" },
        { name: "Kids' Cut", note: "For the young gents" },
      ],
    },
    hours: [
      { day: "Monday – Wednesday", time: "10:00am – 8:00pm" },
      { day: "Thursday", time: "10:00am – 5:00pm" },
      { day: "Friday", time: "10:00am – 8:00pm" },
      { day: "Saturday", time: "9:00am – 5:00pm" },
      { day: "Sunday", time: "10:00am – 3:00pm" },
    ],
    reviews: {
      headline: "Ballarat's fade specialists",
      body: "See the fresh cuts on Facebook & Instagram.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/ColossalBarbers/" }],
    },
  },

  {
    slug: "fancy-fur-babies-kamloops",
    leadId: "L-022",
    country: "CA",
    name: "Fancy Fur Babies",
    accent: "#4fa69c",
    accent2: "#0f766e",
    locality: "North Kamloops, BC",
    hero: {
      overline: "Dog grooming · North Kamloops",
      headline: "Grooming that keeps",
      headlineAccent: "tails wagging.",
      sub: "Gentle, careful grooming for every dog from tiny toy breeds to XL, on 8th Street in North Kamloops. Now with a real site so owners can find and book you online.",
      bullets: ["All sizes, small to XL", "Multi-dog appointments", "Simple online booking"],
    },
    contact: {
      phone: "250-299-5406",
      tel: "tel:+12502995406",
      address: ["864 C 8th St", "North Kamloops, BC"],
      mapQuery: "864 8th St, Kamloops, BC",
      socials: [
        { label: "Facebook", href: "https://www.facebook.com/Fancyfurbabiesgrooming" },
        { label: "Instagram", href: "https://www.instagram.com/fancyfurbabiesgrooming/" },
      ],
    },
    book: { label: "Book grooming" },
    services: {
      title: "Services",
      subtitle: "Grooming for every dog",
      note: "Priced by your dog's size and coat — message for a quick quote.",
      items: [
        { name: "Dog Groom — Small", note: "Toy & small breeds" },
        { name: "Dog Groom — Medium", note: "" },
        { name: "Dog Groom — Large / XL", note: "Big dogs welcome" },
        { name: "Multiple Dog Grooming", note: "Two dogs booked together" },
        { name: "Face & Bum Tidy-up", note: "Quick freshen-up" },
      ],
    },
    reviews: {
      headline: "A 'Best of Kamloops' groomer pick",
      body: "See happy pups on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/Fancyfurbabiesgrooming" }],
    },
  },

  {
    slug: "mr-cadillac-cutz-dubuque",
    leadId: "L-023",
    country: "US",
    name: "Mr. Cadillac Cutz",
    accent: "#c7a24b",
    accent2: "#a16207",
    established: "25 years",
    locality: "Dubuque, Iowa",
    hero: {
      overline: "Barbershop · Elm Street, Dubuque",
      headline: "25 years of",
      headlineAccent: "clean cuts.",
      sub: "Fresh haircuts, head shaves and beard trims — in the shop on Elm St or mobile to you. A quarter-century in the chair, now with a real home online.",
      bullets: ["Head shaves & beard trims", "Mobile barber available", "25 years in the chair"],
    },
    contact: {
      phone: "563-590-5685",
      tel: "tel:+15635905685",
      address: ["1573 Elm St", "Dubuque, IA 52001"],
      mapQuery: "1573 Elm St, Dubuque, IA 52001",
      socials: [{ label: "Facebook", href: "https://www.facebook.com/p/Mr-Cadillac-Cutz-100063573583514/" }],
    },
    book: { label: "Book a cut" },
    services: {
      title: "Services",
      subtitle: "Cuts & shaves",
      note: "Ask for today's prices — in the shop or mobile to you.",
      items: [
        { name: "Haircut", note: "Classic & modern" },
        { name: "Head Shave", note: "Smooth all over" },
        { name: "Beard Trim", note: "Shaped & lined" },
        { name: "Mobile Barber Visit", note: "We travel to you", featured: true },
      ],
    },
    reviews: {
      headline: "60+ reviews across the web",
      body: "See the work on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/p/Mr-Cadillac-Cutz-100063573583514/" }],
    },
  },

  {
    slug: "lady-and-the-tramp-groomers-sunderland",
    leadId: "L-024",
    country: "UK",
    name: "Lady & The Tramp Groomers",
    accent: "#c46a86",
    accent2: "#be185d",
    locality: "Cleadon, Sunderland",
    hero: {
      overline: "Dog & cat grooming · Cleadon",
      headline: "Grooming Sunderland",
      headlineAccent: "loves.",
      sub: "City & Guilds Level 3 grooming for dogs of every size — and cats too — on Front Street, Cleadon. 100% recommended by clients, now with a proper site to match.",
      bullets: ["Small to giant breeds", "Cat grooming too", "100% recommended by 60 clients"],
    },
    contact: {
      phone: "07736 219714",
      tel: "tel:+447736219714",
      email: "ladyandtrampgroomers@gmail.com",
      address: ["38a Front Street, Cleadon", "Sunderland SR6 7PG"],
      mapQuery: "38a Front Street, Cleadon, Sunderland SR6 7PG",
      socials: [{ label: "Facebook", href: "https://www.facebook.com/ladyandtrampgroomers/" }],
    },
    book: { label: "Book grooming" },
    services: {
      title: "Services",
      subtitle: "Grooming for dogs & cats",
      note: "Priced by size, coat and condition — message for a quick quote.",
      items: [
        { name: "Full Dog Groom", note: "Small to giant breeds, all ages" },
        { name: "Cat Grooming", note: "Gentle and careful" },
        { name: "Bath & Tidy", note: "A quick freshen-up" },
      ],
    },
    hours: [
      { day: "Tuesday – Saturday", time: "9:00am – 5:30pm" },
      { day: "Sunday – Monday", time: "Closed", closed: true },
    ],
    reviews: {
      headline: "100% recommended · 60 reviews",
      body: "See the happy pets on Facebook.",
      links: [{ label: "Facebook →", href: "https://www.facebook.com/ladyandtrampgroomers/" }],
    },
  },
]

export function profileBySlug(slug: string) {
  return PROFILES.find((p) => p.slug === slug)
}
