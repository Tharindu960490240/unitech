# Unitech Networks: CCTV SEO brief changes (6 Nov 2026)

Note: the brief describes a Next.js/Vercel site. The live site is static HTML on Cloudflare,
so each requirement was applied to the equivalent static files.

## Changed
- **Main address stays without www**: https://unitechnetworks.com.au (decided with the client)
  - canonicals, Open Graph, JSON-LD, sitemap.xml and robots.txt updated
  - the Cloudflare redirect keeps sending www to the address without www (301)
- **Service-area business**
  - Werribee Google Map, office map links and the address in the structured data are removed
  - replaced with "On-site service across Melbourne & Victoria" and a list of western suburbs
- **/security page**
  - new meta description from the brief
  - Twitter/X tags and `robots: index, follow` added
  - H1: "CCTV Installation Melbourne – Homes & Businesses"
  - on-site wording above the fold, with a Call button next to Request a Free Quote
  - H2 sections now follow the brief: Residential, Commercial, CCTV Systems & Features (IP, PoE, NVR, remote
    viewing, placement, upgrades, handover), Our Installation Process, Melbourne Service Areas,
    Frequently Asked Questions, Request a Free CCTV Quote
  - 3 new FAQs: existing homes, on-site quotes, "do you service my suburb"; pricing is described as depending on a site assessment
  - quote form: Mobile, Suburb/postcode, plus optional Site type, Preferred timeframe and Approx. number of cameras
  - privacy link on the form
  - cross-link to /telecommunications
- **Homepage**
  - descriptive "CCTV installation in Melbourne" link to /security
  - Service Area card instead of the map
  - consent line on the form
- **New Privacy Policy page** at /privacy, linked in the footer and on every form
- **Tracking (js/script.js, SITE block)**
  - supports GTM, or direct GA4 + Google Ads tags
  - Ads conversions fire only on a confirmed form submission (`generate_lead`) and on phone taps (`click_to_call`)
  - form contents are never sent to Google
- **Favicon**
  - sharper globe-only icon: favicon.svg, a real multi-size favicon.ico, favicon-192.png and apple-touch-icon.png
  - added to every page

## Same treatment for the other service pages
- **/telecommunications**: rebuilt, with:
  - title, H1 and meta: "Telecommunications & NBN Installation – Melbourne & Victoria"
  - Call and Quote buttons, and 6 services
  - sections: Who We Work With, Why Unitech, Our Project Process, Service Areas, 6 FAQs
  - no quote form: every button is "Contact Us" and goes to the homepage contact form, with the subject
    pre-filled as "Telecommunications enquiry"
  - mobile Call/Quote bar, Twitter tags and Service schema
- **/civils**: same structure ("Civil Works & Trenching – Melbourne & Victoria"), also "Contact Us" to the homepage
  form (subject pre-filled "Civil works enquiry")
- **/solar**:
  - title and H1: "Solar & Battery Installation Melbourne – Homes & Businesses"
  - on-site wording, a Call button, H2s in the same pattern, and FAQs on on-site assessment and "my suburb"
  - Twitter tags and a robots tag
  - a cross-link to /security
- **Homepage service cards**: descriptive links to each service page, e.g. "NBN and fibre installation in Melbourne"
- **Removed unverified claims** from the old telecom page: "24/7 technical support to guarantee maximum
  uptime" and "compliant with TPG/Nokia and Tier-1 carrier standards". Add them back only if the client confirms.

## Client to confirm before or after publishing
1. Security licence number and scope (TODO comment in security.html), and the "Licensed and insured" claim.
2. That PoE wired systems are offered, the workmanship warranty wording, and the suburb list.
3. Privacy policy wording.
4. Real installation photos and genuine reviews, with customer permission (phase 3).

## Rollback
Redeploy the previous commit from Cloudflare (Workers & Pages → unitech → Deployments). Keep the
redirect rule as it is (www → root).

## Google Ads conversion tracking (10 Nov 2026)
- Google tag AW-18555887123 installed once, on every page, via js/script.js (no tag in the HTML, no GTM)
- "Request quote" conversion (label y78mCMyLpLUdEJO8kZBF) fires only when Formspree confirms a CCTV quote
  (the "Quote request received" message). Failed sends, Solar quotes and homepage messages are not counted.
- To count Solar quotes too, add "solar_quote" to SITE.adsLeadForms in js/script.js
- GTM-TP3KBZ5L (Tag Manager container) is NOT installed on purpose, to avoid counting conversions twice

## Spam protection (10 Nov 2026)
- All forms (homepage, CCTV, Solar): Cloudflare Turnstile widget (set SITE.turnstileSiteKey), a hidden
  bot-trap field, a 3-second minimum before sending, and checks on name, phone, email and links
- Blocked spam is never sent to Formspree and never counted as a Google Ads conversion
- Server-side: Formspree verifies the Turnstile token once the Turnstile secret key is added in Formspree

## Promo code (11 Nov 2026)
- Optional "Promo code" field on the CCTV and Solar quote forms (letters/numbers, max 30 characters)
- Sent to Formspree as "Promo Code" and recorded with the lead event (promo_code) for GA4
