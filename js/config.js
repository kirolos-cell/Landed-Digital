/* ============================================================================
   LANDED DIGITAL - CENTRAL SITE CONFIG
   ----------------------------------------------------------------------------
   This is the ONE place to update business details, copy variants and CTAs.
   Everything marked [CONFIRM] should be checked before go-live.
   Nav and footer are rendered from this file by js/main.js, so a change here
   updates every page at once.
   ========================================================================== */

window.LANDED = {

  /* ---- Business identity -------------------------------------------------- */
  business: {
    name: "Landed Digital",
    parent: "Landed Group",                      // sub-brand of Landed Group
    tagline: "Google growth and practical AI for Australian businesses.",
    taglineAlt: "Get found. Get chosen. Save time.",
    // Displayed contact details. Forms are received via the shared Landed
    // Formspree account, so submissions land in the same inbox as Landed Group.
    email: "contact@landedgroupau.com",           // shared Landed contact address
    phone: "0403 385 125",                        // [CONFIRM] shared Landed line
    phoneHref: "+61403385125",
    location: "Melbourne, Australia",
    serviceArea: "Australia",
    abn: "19 698 633 448",                         // Landed Group ABN
    domain: "https://digital.landedgroupau.com",
  },

  /* ---- Integrations (no secrets here; IDs only) --------------------------- */
  integrations: {
    // Reuses the shared Landed Formspree endpoint (same receiving inbox).
    formspreeId: "xgoqddbl",
    formspreeUrl: "https://formspree.io/f/xgoqddbl",
    // Optional. Leave blank to hide booking buttons until you have a link.
    bookingUrl: "",                               // e.g. Calendly / Cal.com URL
    googleBusinessProfile: "",                    // [INSERT GBP LINK]
    // Analytics: set to activate. Left blank so nothing loads by default.
    gaId: "",                                      // GA4, e.g. G-XXXXXXX
    googleAdsId: "",                               // e.g. AW-XXXXXXXXX
    adsConversionLabel: "",                        // e.g. AW-XXXX/xxxxxxxx
    metaPixelId: "",
  },

  /* ---- Social ------------------------------------------------------------- */
  social: {
    linkedin: "https://www.linkedin.com/company/landed-group-pty-ltd/",
    instagram: "",
    facebook: "",
  },

  /* ---- Calls to action (reused across the site) --------------------------- */
  cta: {
    primary:   { label: "Claim Your Free Review Setup", href: "free-review-setup.html" },
    secondary: { label: "Book a Free Business Check",    href: "contact.html#business-check" },
    navOffer:  { label: "Free Review Setup",             href: "free-review-setup.html" },
  },

  /* ---- Primary navigation ------------------------------------------------- */
  nav: [
    { label: "Home",       href: "index.html" },
    { label: "Google",     href: "google.html" },
    { label: "Reviews",    href: "reviews.html" },
    { label: "AI Office",  href: "ai-office.html" },
    { label: "Websites",   href: "websites.html" },
    { label: "Results",    href: "results.html" },
    { label: "Packages",   href: "packages.html" },
    { label: "Industries", href: "industries.html" },
    { label: "About",      href: "about.html" },
    { label: "Contact",    href: "contact.html" },
  ],

  /* ---- Home hero copy variants (A/B ready) -------------------------------- */
  heroVariants: [
    {
      headline: ["Get found on Google.", "Build trust.", "Save time with AI."],
      sub: "We help Australian businesses improve their Google presence, generate more reviews, build better websites and use practical AI to handle repetitive work.",
    },
    { headline: ["Make your business easier to find, choose and contact."], sub: "One partner for Google, reviews, websites and practical AI." },
    { headline: ["A smarter growth system for local businesses."], sub: "Better visibility. More trust. Less admin." },
    { headline: ["Better visibility.", "More trust.", "Less admin."], sub: "Google, reviews, websites and AI working together." },
    { headline: ["Google growth and practical AI for Australian businesses."], sub: "One point of contact across everything that helps you get found and chosen." },
    { headline: ["One partner for Google, reviews, websites and AI."], sub: "We make your business easier to find, easier to choose and easier to run." },
  ],
  // Index of the hero variant currently shown on the homepage.
  heroActive: 0,

  /* ---- Rotating phrase system (used in hero + section accents) ------------ */
  rotatingPhrases: [
    "easier to find",
    "easier to contact",
    "easier to choose",
    "easier to run",
  ],

  /* ---- Three pillars ------------------------------------------------------ */
  pillars: [
    {
      id: "found",
      no: "01",
      name: "Get Found",
      line: "Make it easier for the right customers to find your business.",
      href: "google.html",
      points: ["Google Business Profile", "Local search", "Websites that convert", "Google Ads done properly"],
    },
    {
      id: "chosen",
      no: "02",
      name: "Get Chosen",
      line: "Give customers more reasons to choose you.",
      href: "reviews.html",
      points: ["NFC and QR review cards", "A repeatable review process", "Reputation support", "Trust built before the call"],
    },
    {
      id: "time",
      no: "03",
      name: "Save Time",
      line: "Use AI to handle repetitive work without making your business feel robotic.",
      href: "ai-office.html",
      points: ["AI receptionist", "Missed call response", "FAQ and enquiry automation", "Follow up that runs itself"],
    },
  ],

  /* ---- Productised packages ----------------------------------------------- */
  packages: [
    {
      id: "foundation",
      name: "Google Foundation",
      price: "From $690 setup",     // [PLACEHOLDER PRICING]
      priceNote: "one-off, placeholder",
      summary: "Everything your business needs to be found and trusted on Google. Website not included, it works with the site you already have.",
      cta: { label: "Build My Google Foundation", href: "contact.html?interest=Google%20Foundation" },
      for: ["New businesses", "Incomplete Google profiles", "Hard to find online", "Have a website already"],
      includes: [
        "Google Business Profile setup or optimisation",
        "Local search basics",
        "Google Analytics setup",
        "Google Search Console setup",
        "Conversion and call tracking",
        "Local keyword structure",
        "Business information consistency across listings",
        "Google Maps and profile photos setup",
        "Tracking connected to your existing website",
        "Initial performance review and next-step plan",
      ],
    },
    {
      id: "review-engine",
      name: "Review Engine",
      price: "From $290 setup",
      priceNote: "placeholder, cards from",
      summary: "Turn happy customers into visible proof that your business delivers.",
      cta: { label: "Build My Review Engine", href: "reviews.html" },
      for: ["Barbers and salons", "Clinics and trades", "Mechanics", "Hospitality and retail", "Multi location"],
      includes: [
        "NFC review cards",
        "QR review assets",
        "Direct review link setup",
        "Counter display options",
        "Staff review request process and scripts",
        "Review response support",
        "Google Business Profile review check",
        "Monthly review tracking",
        "Replacement card options",
        "Multi location review systems",
      ],
      featured: true,
    },
    {
      id: "ai-office",
      name: "AI Office",
      price: "Custom",
      priceNote: "scoped to your workflow",
      summary: "A practical AI support system built around the way your business already works.",
      cta: { label: "Explore AI Office", href: "ai-office.html" },
      for: ["Businesses that miss calls", "Repetitive question load", "Slow enquiry response", "Manual admin heavy"],
      includes: [
        "AI website assistant",
        "AI receptionist",
        "Missed call response system",
        "FAQ automation",
        "Lead capture and qualification",
        "Appointment request handling",
        "Email response assistance",
        "Quote request workflow",
        "Customer enquiry routing",
        "Follow up automation",
        "Internal knowledge assistant",
        "Automation training and ongoing optimisation",
      ],
    },
    {
      id: "growth",
      name: "Growth Accelerator",
      price: "From $890 / month",
      priceNote: "placeholder retainer",
      summary: "Ongoing support to improve visibility, enquiries and customer experience.",
      cta: { label: "Discuss Ongoing Growth", href: "contact.html?interest=Growth%20Accelerator" },
      for: ["Established businesses", "Ready to scale", "Multi location", "One partner across systems"],
      includes: [
        "Google Ads management",
        "Google Business Profile management",
        "Website optimisation",
        "Review growth support",
        "Local SEO",
        "Conversion improvements",
        "AI workflow improvements",
        "Monthly reporting and lead tracking",
        "Campaign recommendations",
        "Quarterly planning and priority support",
      ],
    },
  ],

  /* ---- Industries --------------------------------------------------------- */
  industries: [
    { id: "barbers-salons", name: "Barbers & Salons", pain: "Booked out one week, quiet the next, and reviews trailing the shop down the road.", fix: "A tap-to-review card at the counter and a Google profile that shows your work." },
    { id: "trades", name: "Trades", pain: "Great work, but you are hard to find and quotes slip through when you are on the tools.", fix: "Local search that surfaces you, plus missed call and quote follow up that runs without you." },
    { id: "mechanics", name: "Mechanics", pain: "Phone rings while you are under a car, and half the callers never ring back.", fix: "Missed call response and an AI assistant that captures the job and books it in." },
    { id: "health-clinics", name: "Health & Clinics", pain: "Reception is buried in repeat questions and new patients cannot find you online.", fix: "FAQ automation, an up to date profile and a steady, genuine review flow." },
    { id: "gyms", name: "Gyms", pain: "Enquiries come in at all hours and trials go cold before anyone replies.", fix: "Instant enquiry capture, fast follow up and reviews that show the community." },
    { id: "hospitality", name: "Hospitality", pain: "Busy service means review requests never happen and bookings get missed.", fix: "Table and counter review prompts, plus enquiry handling that keeps up." },
    { id: "retail", name: "Retail", pain: "Foot traffic is down and your listing does not reflect what is in store.", fix: "A sharp local profile, review stands at the till and a site that sells." },
    { id: "professional-services", name: "Professional Services", pain: "Referrals are strong but your online presence does not build the same trust.", fix: "A credible website, visible reviews and enquiry follow up that feels considered." },
    { id: "new-businesses", name: "New Businesses", pain: "You are starting from zero on Google with no reviews and no website yet.", fix: "The Google Foundation: profile, website, tracking and a review system from day one." },
    { id: "multi-location", name: "Multi Location", pain: "Each site has its own profile, its own reviews and no consistent system.", fix: "One review and visibility system rolled out across every location, reported together." },
  ],

  /* ---- Frequently asked questions (home + shared) ------------------------- */
  faqs: [
    { q: "What types of businesses do you work with?", a: "Local and small to medium Australian businesses. Barbers, salons, clinics, mechanics, trades, gyms, hospitality, retail, professional services and multi location businesses are all a good fit." },
    { q: "Do I need all four services?", a: "No. Most businesses start with one clear opportunity, usually the free review setup or a Google Business check, then add services only where they make a practical difference." },
    { q: "Can you improve an existing Google Business Profile?", a: "Yes. We can review, tidy and optimise a profile you already have. You keep ownership the whole way through." },
    { q: "Can you work with my existing website?", a: "Yes. We can improve what you have, connect it to Google and reviews, or rebuild it if that is the better call. We will tell you honestly which one makes sense." },
    { q: "How does the NFC review card work?", a: "A customer taps the card with their phone, or scans the QR code, and lands straight on your Google review page. No searching, no typing in your business name." },
    { q: "Does the review card work with iPhone and Android?", a: "Modern iPhones and most Android phones read NFC. Every card also carries a QR code as a backup, so any smartphone camera can use it." },
    { q: "Can the card be reprogrammed?", a: "Yes. Cards can be re-pointed if your details change, and additional cards and counter stands are available." },
    { q: "Can you help multiple business locations?", a: "Yes. We set up review and visibility systems that work across every location and report on them together." },
    { q: "What can an AI receptionist do?", a: "Answer common questions, capture enquiry details, respond to missed calls, help book appointments and pass real leads to your team. It works around your existing process." },
    { q: "Will AI replace my staff?", a: "No. Our AI handles the repetitive load so your team can spend time on the work that needs a person. There is always human oversight." },
    { q: "Do you manage Google Ads?", a: "Yes, where it suits the business. We set up proper conversion tracking first so you can actually see what your spend returns." },
    { q: "How long does a website take?", a: "A focused local business site is usually a few weeks depending on content and scope. We will give you a clear timeline before we start." },
    { q: "Is there ongoing support?", a: "Yes. The Growth Accelerator covers ongoing visibility, reviews, website and AI improvements, but it is optional and never locked in behind long contracts." },
    { q: "What happens during the free business check?", a: "We look at your Google profile, visibility, website, reviews and enquiry process, then show you what is working, what is missing and where you could improve. No pressure." },
    { q: "Is the NFC setup really free?", a: "Yes. Eligible Australian businesses get one programmed card, a QR code and a direct review link set up at no cost. Extra cards, stands and ongoing review services are separate." },
    { q: "Are there any ongoing fees?", a: "Only if you choose an ongoing package. Setups and one-off work are just that. We will always be clear about what is one-off and what recurs." },
    { q: "Do you guarantee Google rankings?", a: "No. Nobody can honestly guarantee rankings or review numbers, and we will not pretend to. We focus on the practical work that moves the needle." },
    { q: "How do we get started?", a: "Claim the free review setup or book a free business check. We will take it from there with one clear next step." },
  ],

  /* ---- Conversion microcopy ---------------------------------------------- */
  micro: [
    "No pressure. We will simply show you what could improve.",
    "Start with one clear opportunity.",
    "Not sure which service fits? We will help you work it out.",
    "Tell us where your business is getting stuck.",
  ],
};
