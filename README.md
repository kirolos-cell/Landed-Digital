# Landed Digital

Premium marketing website for **Landed Digital**, the growth and technology arm of Landed Group.
Helps Australian local businesses **get found on Google, build trust with reviews, and save time with practical AI**.

- **Live domain (target):** https://digital.landedgroupau.com
- **Brand family:** sub-brand of Landed Group (landedgroupau.com)
- **Stack:** hand-built static HTML, CSS and vanilla JS. No build step, no framework, no Node required. Deploys to GitHub Pages.
- **Forms:** shared Landed Formspree account (`formspree.io/f/xgoqddbl`), so submissions land in the same inbox as Landed Group.

> **Why static, not Next.js?** This machine has no Node/npm, and hosting is GitHub Pages (static). The site delivers every page, form, interaction and SEO requirement from the brief on a stack that actually ships to your existing GitHub Pages workflow, matching the Landed Group and Promptworks sites.

---

## 1. Run it locally

No install needed. Any static server works. This repo is wired into the Desktop preview config:

- Launch config **`landed-digital`** in `Desktop/.claude/launch.json` runs a PowerShell static server on **http://localhost:4455**.
- Or serve the folder any way you like, for example with Python:

```bash
python -m http.server 4455
```

Then open `http://localhost:4455`.

---

## 2. Everything lives in one config file

Open **`js/config.js`**. The `window.LANDED` object is the single source of truth. The navigation and footer are **rendered from it on every page**, so one change updates the whole site.

| Want to change... | Edit in `js/config.js` |
|---|---|
| Business name / tagline | `business.name`, `business.tagline` |
| Phone / email / location / ABN | `business.*` |
| Formspree endpoint | `integrations.formspreeId` |
| Booking link (Calendly etc.) | `integrations.bookingUrl` (blank hides booking UI) |
| Google Analytics / Ads IDs | `integrations.gaId`, `integrations.googleAdsId`, `integrations.adsConversionLabel` |
| Social links | `social.*` |
| Nav items | `nav[]` |
| Packages, pricing, inclusions | `packages[]` |
| Industries | `industries[]` |
| FAQs | `faqs[]` |
| Hero copy variants (A/B) | `heroVariants[]`, `heroActive` |

Values marked `[CONFIRM]` or `[INSERT ...]` in the file must be checked before go-live.

### Update the business name
Change `business.name` in `js/config.js`. Note: the nav/footer wordmark ("LANDED / DIGITAL") is drawn in two lines in `js/main.js` (`renderNav`) and the footer; update there too if the name changes substantially.

### Update contact details
Change `business.email`, `business.phone` and `business.phoneHref` in `js/config.js`. These flow to the nav, footer, contact page, mobile call bar and form success messages automatically (anything with `data-fill`).

### Update package content
Edit the `packages[]` array in `js/config.js` for the summary cards, and the full lists on **`packages.html`** (that page spells out each inclusion in HTML for SEO). Keep the two in sync.

---

## 3. Connect the forms

Forms already post to the shared Landed Formspree endpoint (`xgoqddbl`) via AJAX with an inline success state, honeypot spam protection and validation. Nothing else is needed to receive leads.

- To use a **different** Formspree form, change `integrations.formspreeId`.
- To route somewhere else later (HubSpot, GoHighLevel, Airtable, Zapier, Make, Google Sheets, a custom CRM): the submit handler is in `js/main.js` → `initForms()`. Swap the `fetch()` target, or point Formspree at a webhook. Comments mark the spot.
- Each form carries a hidden `source` field so you can tell which page a lead came from.

---

## 4. Connect analytics and tracking

Nothing loads until you add an ID. In `js/config.js` set any of:

- `integrations.gaId` (GA4) and/or `integrations.googleAdsId` (Google Ads) — the gtag script auto-loads only when set.
- `integrations.adsConversionLabel` — fired on successful form submit as a conversion.

Hooks are ready for Meta Pixel, call-click, email-click, booking-click, and the two lead types (free NFC + business check, via each form's `data-conversion`). See `initAnalytics()` and `trackConversion()` in `js/main.js`.

> Consistent with Landed Group, you may choose to reuse the existing gtag `AW-18202148938`. If so, create a **separate conversion action** for Landed Digital rather than reusing the cleaning conversion label.

---

## 5. Connect a booking link

Set `integrations.bookingUrl` in `js/config.js` to a Calendly / Cal.com / Google Calendar link. The booking card on the contact page appears automatically when a URL is present, and stays hidden when blank.

---

## 6. Add testimonials and case studies

The homepage has clearly-marked **placeholder** testimonial and results blocks (`.testi`, `.stat`). They are dashed and labelled so nothing fake is shown publicly. To activate:

1. Replace the placeholder quote text and `.who-name` with a real client quote and business.
2. Replace the `&mdash;` in `.stat .n` with a real figure and remove the `.placeholder-note`.
3. For a full case study, follow the structure in the brief (overview, challenge, starting position, solution, services used, implementation, results, quote, before/after, next steps). A `resources`/`case-studies` page can be added later using the same components.

**Do not invent testimonials, metrics, client logos or awards.** The design assumes honesty.

---

## 7. Deploy (GitHub Pages)

Same pattern as the Landed Group site, under the same GitHub account (`kirolos-cell`).

1. Create a new repo, e.g. **`kirolos-cell/Landed-Digital`**.
2. Push all files in this folder to `main` (including `CNAME`, `favicon.svg`, `sitemap.xml`, `robots.txt`).
3. Repo **Settings → Pages** → deploy from `main` / root.
4. The `CNAME` file sets the custom domain to `digital.landedgroupau.com`.
5. **DNS:** at your domain provider for `landedgroupau.com`, add a **CNAME record** for host `digital` pointing to `kirolos-cell.github.io`. (Apex `landedgroupau.com` stays on the existing Landed site — this only adds the `digital` subdomain.)
6. Wait for DNS + GitHub's HTTPS cert, then verify `https://digital.landedgroupau.com`.

A push to `main` auto-redeploys, usually live within a minute.

---

## 8. Project structure

```
Landed-Digital/
  index.html              Home
  google.html             Google Services (Get Found)
  reviews.html            Review Engine (Get Chosen)
  ai-office.html          AI Office (Save Time)
  websites.html           Websites
  packages.html           Packages + comparison
  industries.html         Industries
  about.html              About
  contact.html            Contact + full enquiry form
  free-review-setup.html  Free NFC offer landing page
  privacy.html            Privacy Policy (placeholder)
  terms.html              Terms + NFC offer terms (#nfc) (placeholder)
  disclaimer.html         Disclaimer (placeholder)
  css/styles.css          Design system + all components
  js/config.js            >>> central content + business config <<<
  js/main.js              Nav/footer render, forms, demos, interactions
  assets/og-image.svg     Social share image
  favicon.svg
  CNAME  robots.txt  sitemap.xml
  .env.example  README.md
```

---

## 9. Business details still needed before go-live

- [x] Displayed **email** set to `contact@landedgroupau.com` (shared Landed address)
- [ ] Confirm displayed **phone** (currently the shared Landed line `0403 385 125`)
- [x] **ABN** set to Landed Group `19 698 633 448`
- [ ] Real **founder** intro + photo for About
- [ ] Confirm final **prices** (all pricing is marked placeholder)
- [ ] **Google Business Profile** link for Landed Digital (if separate from Landed Group)
- [ ] **Booking** link, if using one
- [ ] Decide on **analytics/Ads** IDs and a dedicated conversion action
- [ ] Real **testimonials, case studies and result figures** as they land
- [ ] Have the **legal placeholder pages reviewed** by an Australian legal professional
- [ ] Instagram / Facebook URLs, if any
- [ ] Confirm subdomain choice (`digital` vs `grow`) and add the DNS record

---

## 10. Recommended next improvements

- Add a lightweight **Resources/Blog** section (structure noted in the brief) with genuinely useful local-business articles for SEO.
- Add real **before/after** screenshots to the Google visibility and website sections once you have client permission.
- Add **local landing pages** (e.g. NFC Review Cards Melbourne, AI Receptionist Melbourne) using the existing page pattern — one genuine page per real service area, not thin duplicates.
- Generate a proper raster **OG image** (PNG) from `assets/og-image.svg` for platforms that do not render SVG previews, and add `favicon.ico` / `apple-touch-icon.png`.
- Wire a real **CRM** (HubSpot/GoHighLevel/Airtable) behind the forms once lead volume justifies it.
- Add a subtle **cookie notice** if/when advertising tags are enabled.
