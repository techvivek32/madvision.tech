/* ------------------------------------------------------------------ */
/*  Per-lead demo configs for /demo/[slug].                            */
/*  HONESTY RULES: real business name/city/phone only (all publicly    */
/*  published on their own sites). Prices marked real:true were seen   */
/*  on their site; everything else is clearly labeled SAMPLE. Reviews  */
/*  are never invented for real businesses — placeholder cards only.   */
/* ------------------------------------------------------------------ */

export type DemoService = { name: string; price: string; time: string; real?: boolean }

export type DemoConfig = {
  slug: string
  leadId: string
  name: string
  tagline: string
  city: string
  phone: string
  accent: string
  currencyNote: string
  samplePrices: boolean
  services: DemoService[]
}

export const DEMOS: DemoConfig[] = [
  {
    slug: "best-little-hair-house",
    leadId: "L-001",
    name: "Best Little Hair House",
    tagline: "Penticton's salon since the Sally's Hair Port days — est. 1978",
    city: "Penticton, BC",
    phone: "+1 (250) 493-5566",
    accent: "#b45309",
    currencyNote: "CAD",
    samplePrices: true,
    services: [
      { name: "Women's Cut & Style", price: "$55", time: "45 min" },
      { name: "Men's Cut", price: "$35", time: "30 min" },
      { name: "Full Colour", price: "$110", time: "2 hrs" },
      { name: "Highlights / Balayage", price: "$150", time: "2.5 hrs" },
      { name: "Extensions Consult", price: "Free", time: "20 min" },
      { name: "Ear Piercing", price: "$40", time: "15 min" },
    ],
  },
  {
    slug: "next-level-detailing",
    leadId: "L-002",
    name: "Next Level Detailing",
    tagline: "Vernon's ceramic coating & detail specialists",
    city: "Vernon, BC",
    phone: "+1 250-306-3077",
    accent: "#1d4ed8",
    currencyNote: "CAD",
    samplePrices: true,
    services: [
      { name: "Express Detail", price: "$89", time: "1 hr" },
      { name: "Full Interior Detail", price: "$189", time: "3 hrs" },
      { name: "Exterior + Interior Package", price: "$289", time: "4.5 hrs" },
      { name: "Ceramic Coating", price: "$799", time: "1 day" },
      { name: "Undercoating", price: "$249", time: "2 hrs" },
      { name: "Headlight Restoration", price: "$79", time: "45 min" },
    ],
  },
  {
    slug: "boise-detail",
    leadId: "L-003",
    name: "Boise Detail Inc",
    tagline: "Detailing Boise's cars since 1991",
    city: "Boise, ID",
    phone: "+1 208-343-3025",
    accent: "#0f766e",
    currencyNote: "USD",
    samplePrices: true,
    services: [
      { name: "Express Wash & Wax", price: "$59", time: "45 min" },
      { name: "Full Interior Detail", price: "$159", time: "2.5 hrs" },
      { name: "Complete Detail Package", price: "$259", time: "4 hrs" },
      { name: "Paint Correction", price: "$349", time: "5 hrs" },
      { name: "Engine Bay Detail", price: "$89", time: "1 hr" },
      { name: "Fleet / Dealer Rates", price: "Ask us", time: "—" },
    ],
  },
  {
    slug: "quality-lawn-care",
    leadId: "L-004",
    name: "Quality Lawn Care & Landscaping",
    tagline: "Chattanooga lawns, kept beautiful year-round",
    city: "Chattanooga, TN",
    phone: "+1 423-475-1731",
    accent: "#15803d",
    currencyNote: "USD",
    samplePrices: true,
    services: [
      { name: "Weekly Mowing", price: "$45", time: "per visit" },
      { name: "Mulch & Bed Refresh", price: "$220", time: "half day" },
      { name: "Seasonal Cleanup", price: "$180", time: "3 hrs" },
      { name: "Hedge & Shrub Trimming", price: "$95", time: "2 hrs" },
      { name: "Sod Installation", price: "Quote", time: "—" },
      { name: "Irrigation Check", price: "$75", time: "1 hr" },
    ],
  },
  {
    slug: "blades-of-norwich",
    leadId: "L-005",
    name: "Blades of Norwich",
    tagline: "Norwich's straight-talking barbershop",
    city: "Norwich, UK",
    phone: "01603 630736",
    accent: "#b91c1c",
    currencyNote: "GBP",
    samplePrices: false,
    services: [
      { name: "Wet Cut", price: "£19", time: "30 min", real: true },
      { name: "Buzz Cut", price: "£13", time: "20 min", real: true },
      { name: "Beard Trim", price: "£10", time: "15 min" },
      { name: "Cut + Beard Combo", price: "£26", time: "45 min" },
      { name: "Kids' Cut", price: "£14", time: "25 min" },
      { name: "Senior's Cut", price: "£15", time: "25 min" },
    ],
  },
  {
    slug: "drive-automatic",
    leadId: "L-006",
    name: "Drive Automatic",
    tagline: "Automatic driving lessons in Brighton — calm, clear, modern",
    city: "Brighton, UK",
    phone: "07721 760868",
    accent: "#7c3aed",
    currencyNote: "GBP",
    samplePrices: false,
    services: [
      { name: "2-Hour Lesson", price: "£88", time: "2 hrs", real: true },
      { name: "Intro Offer — 6 hrs for 5", price: "£220", time: "6 hrs", real: true },
      { name: "10-Hour Block", price: "£430", time: "10 hrs" },
      { name: "Mock Test", price: "£90", time: "2 hrs" },
      { name: "Test-Day Package", price: "£130", time: "3 hrs" },
      { name: "Refresher Lesson", price: "£88", time: "2 hrs" },
    ],
  },
  {
    slug: "geelong-mobile-mechanic",
    leadId: "L-007",
    name: "Geelong Mobile Mechanic",
    tagline: "20+ years of mechanical experience — we come to you",
    city: "Geelong, VIC",
    phone: "0426 507 837",
    accent: "#c2410c",
    currencyNote: "AUD",
    samplePrices: true,
    services: [
      { name: "Mobile Inspection", price: "A$120", time: "1 hr" },
      { name: "Logbook Service", price: "A$280", time: "2 hrs" },
      { name: "Brake Pads & Rotors", price: "A$350", time: "2.5 hrs" },
      { name: "Battery Replacement", price: "A$220", time: "45 min" },
      { name: "Pre-Purchase Check", price: "A$150", time: "1.5 hrs" },
      { name: "Breakdown Callout", price: "A$99", time: "ASAP" },
    ],
  },
  {
    slug: "noonies-pet-care",
    leadId: "L-008",
    name: "Noonies Pet Care",
    tagline: "Newcastle's caring dog grooming & pet services",
    city: "Newcastle, NSW",
    phone: "0411 398 395",
    accent: "#0e7490",
    currencyNote: "AUD",
    samplePrices: true,
    services: [
      { name: "Small Dog Full Groom", price: "A$85", time: "1.5 hrs" },
      { name: "Large Dog Full Groom", price: "A$120", time: "2 hrs" },
      { name: "Wash & Tidy", price: "A$55", time: "45 min" },
      { name: "Nail Trim", price: "A$20", time: "15 min" },
      { name: "De-shedding Treatment", price: "A$95", time: "1.5 hrs" },
      { name: "Puppy Intro Groom", price: "A$60", time: "1 hr" },
    ],
  },
]

export function demoBySlug(slug: string) {
  return DEMOS.find((d) => d.slug === slug)
}
