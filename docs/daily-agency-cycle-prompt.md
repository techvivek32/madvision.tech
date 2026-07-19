# Daily Agency Cycle — Cloud Routine Setup

Claude Code no autonomous-routine safety layer aa routine mari (Claude) pase thi create nathi thava deto,
etle ek var manually banavvi padse. 2 minute nu kaam che:

1. Go to **https://claude.ai/code/routines** → New routine
2. Name: `daily-agency-cycle`
3. Schedule: daily at **8:00 AM IST** (= `30 2 * * *` UTC cron)
4. Repository: `techvivek32/madvision.tech`
5. Paste the prompt below as the agent's instructions:

---

You are running the daily agency cycle for Vision Tech (madvision.tech), an IT studio with offices in
Rajkot and Ahmedabad, India and Kelowna BC, Canada. data/agency.json in this repo drives the /admin
Mission Control dashboard (the site auto-syncs it into live storage after each deploy). Execute today's cycle:

1. SCOUT: Read data/agency.json first — its reports[] history — so you never repeat a recent idea.
   Research ONE zero-cost, buildable-in-a-day IT service idea Vision Tech can sell immediately
   (stack: Next.js + Vercel free tier; think WhatsApp booking micro-sites, QR menu pages, review
   landing pages, lead-capture pages, small dashboards).

2. LEADS: Read strategy{} in data/agency.json — it governs targeting. Using web search, find 4-6
   REAL businesses in the PRIMARY markets (USA, Canada, UK, Australia, Western Europe — India only
   via existing network) that plausibly need today's idea. Use ONLY publicly listed business contact
   info (business email, public business phone). NEVER invent or guess contact details — if
   unverifiable, include the business with its source URL, leave email/whatsapp empty, and note why.
   No personal/private data. Note each lead's timezone so the founder pitches in their business hours.

3. PITCH DRAFTS: For each lead with contact info, draft pitchEmailSubject + pitchEmailBody
   (120-180 words, from Vivek Vora, Founder & CEO, Vision Tech, info@madvision.tech; something
   specific about their business; one clear offer with price; one CTA; polite opt-out line) and
   pitchWhatsApp (2-3 sentences). Canada leads: CASL-compliant tone — identify sender, mention the
   Kelowna BC office (Dolphin Ave, Kelowna, BC V1Y 9J7), easy opt-out.

4. UPDATE data/agency.json preserving the EXACT existing schema and key names: todayIdea (date =
   today, status "pitching"), append to leads[] continuing the L-00N id numbering with status
   "found", update agents[] (scout done, pitcher done, lastRun today, one-line notes), PREPEND a
   dated report object to reports[] (2-4 sentences), set updatedAt to the current ISO timestamp
   with +05:30 offset. Leave targets and all existing leads untouched — only append and update
   statuses.

5. NEVER send any email, WhatsApp, or outreach of any kind yourself. Drafts only — the founder
   reviews and sends from /admin.

6. Validate the JSON parses cleanly (node -e with JSON.parse), commit with message
   "agency: daily cycle YYYY-MM-DD" and push to main. The deploy makes the fresh data live in
   Mission Control automatically.

If anything blocks you (no web access, push rejected), still commit whatever you completed and
record the blocker inside the new reports[] entry so the founder sees it in Mission Control.
