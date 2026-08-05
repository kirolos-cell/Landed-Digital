/* ============================================================================
   LANDED DIGITAL - shared behaviour
   Renders nav + footer + mobile CTA from config, handles menu, scroll reveal,
   hero rotator, FAQ, Formspree forms, and the interactive demos.
   ========================================================================== */
(function () {
  "use strict";
  var C = window.LANDED || {};
  var page = (document.body && document.body.dataset.page) || "";

  function h(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* ---- Brand mark (simple, ownable "LD" monogram) ----------------------- */
  var MARK = '<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">' +
    '<rect x="1" y="1" width="38" height="38" rx="9" fill="#1f4b3a"/>' +
    '<path d="M11 10v20h10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="square"/>' +
    '<path d="M23 10h5a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6h-5V10z" fill="none" stroke="#c05f3c" stroke-width="3"/>' +
    '</svg>';

  /* ---- NAV --------------------------------------------------------------- */
  function renderNav() {
    var mount = document.querySelector("[data-nav]");
    if (!mount) return;
    var links = (C.nav || []).map(function (n) {
      var cur = n.href === page ? ' aria-current="page"' : "";
      return '<li><a href="' + n.href + '"' + cur + ">" + esc(n.label) + "</a></li>";
    }).join("");
    var offer = C.cta && C.cta.navOffer;
    mount.className = "nav";
    mount.setAttribute("aria-label", "Primary");
    mount.innerHTML =
      '<div class="nav-inner">' +
        '<a class="brand" href="index.html" aria-label="' + esc(C.business.name) + ' home">' +
          MARK +
          '<span class="brand-text"><span class="brand-name">Landed</span><span class="brand-sub">Digital</span></span>' +
        "</a>" +
        '<button class="hamburger" aria-label="Menu" aria-expanded="false" aria-controls="navlinks"><span></span><span></span><span></span></button>' +
        '<ul class="nav-links" id="navlinks">' + links +
          (offer ? '<li><a class="nav-offer" href="' + offer.href + '">' + esc(offer.label) + "</a></li>" : "") +
        "</ul>" +
      "</div>";

    var burger = mount.querySelector(".hamburger");
    var list = mount.querySelector(".nav-links");
    burger.addEventListener("click", function () {
      var open = list.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    list.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        list.classList.remove("open"); burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
      });
    });
    var onScroll = function () { mount.classList.toggle("scrolled", window.scrollY > 20); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* ---- Mobile CTA bar ---------------------------------------------------- */
  function renderMobileCta() {
    var mount = document.querySelector("[data-mcta]");
    if (!mount) return;
    var b = C.business, primary = C.cta.primary;
    mount.className = "mcta-bar";
    mount.innerHTML =
      '<a class="mcta mcta-call" href="tel:' + b.phoneHref + '">Call</a>' +
      '<a class="mcta mcta-primary" href="' + primary.href + '">' + esc(primary.label) + "</a>";
  }

  /* ---- FOOTER ------------------------------------------------------------ */
  function renderFooter() {
    var mount = document.querySelector("[data-footer]");
    if (!mount) return;
    var b = C.business, s = C.social;
    var svcLinks = [
      ["Google Services", "google.html"], ["Review Engine", "reviews.html"],
      ["AI Office", "ai-office.html"], ["Websites", "websites.html"],
    ];
    var pkgLinks = (C.packages || []).map(function (p) { return ["packages.html#" + p.id, p.name]; });
    var LI_ICON = '<svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>';
    var socialIcons = "";
    if (s.linkedin) socialIcons += '<a class="soc-btn" href="' + s.linkedin + '" target="_blank" rel="noopener" aria-label="Follow Landed Digital on LinkedIn">' + LI_ICON + "</a>";

    mount.className = "footer";
    mount.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-top">' +
          '<div class="footer-brand">' +
            '<span class="brand-text"><span class="brand-name">Landed Digital</span><span class="brand-sub">by ' + esc(b.parent) + "</span></span>" +
            '<p class="footer-pos">We make Australian businesses easier to find, easier to choose and easier to run. Google, reviews, websites and practical AI, under one point of contact.</p>' +
            '<div class="footer-cta-row">' +
              '<a class="btn btn-clay" href="' + C.cta.primary.href + '">' + esc(C.cta.primary.label) + "</a>" +
              '<a class="btn btn-ghost on-dark" href="' + C.cta.secondary.href + '">' + esc(C.cta.secondary.label) + "</a>" +
            "</div>" +
            (socialIcons ? '<div class="footer-social"><span class="footer-social-label">Follow us</span>' + socialIcons + "</div>" : "") +
          "</div>" +
          "<div><h5>Services</h5><ul>" + svcLinks.map(function (l) { return '<li><a href="' + l[1] + '">' + l[0] + "</a></li>"; }).join("") + "</ul></div>" +
          "<div><h5>Packages</h5><ul>" + pkgLinks.map(function (l) { return '<li><a href="' + l[0] + '">' + esc(l[1]) + "</a></li>"; }).join("") +
            '<li><a href="results.html">Results</a></li>' +
            '<li><a href="industries.html">Industries</a></li></ul></div>' +
          "<div><h5>Contact</h5><ul>" +
            '<li><a href="tel:' + b.phoneHref + '">' + esc(b.phone) + "</a></li>" +
            '<li><a href="mailto:' + b.email + '">' + esc(b.email) + "</a></li>" +
            "<li>" + esc(b.location) + "</li>" +
            "<li>Serving " + esc(b.serviceArea) + "</li>" +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>&copy; " + new Date().getFullYear() + " " + esc(b.parent) + ". Landed Digital. ABN " + esc(b.abn) + ".</span>" +
          '<span class="footer-legal">' +
            '<a href="privacy.html">Privacy</a><a href="terms.html">Terms</a>' +
            '<a href="terms.html#nfc">NFC Offer Terms</a><a href="disclaimer.html">Disclaimer</a>' +
          "</span>" +
        "</div>" +
      "</div>";
  }

  /* ---- Scroll reveal ----------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---- Hero rotator ------------------------------------------------------ */
  function initRotator() {
    var el = document.querySelector("[data-rotator]");
    if (!el) return;
    var words = C.rotatingPhrases || [];
    if (!words.length) return;
    var i = 0;
    el.textContent = words[0];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setInterval(function () {
      el.style.opacity = 0;
      setTimeout(function () { i = (i + 1) % words.length; el.textContent = words[i]; el.style.opacity = 1; }, 300);
    }, 2400);
    el.style.transition = "opacity .3s ease";
  }

  /* ---- Prefill contact form from ?interest= / ?industry= ----------------- */
  function prefillFromQuery() {
    var params = new URLSearchParams(window.location.search);
    ["interest", "industry", "package"].forEach(function (key) {
      var val = params.get(key); if (!val) return;
      var field = document.querySelector('[name="' + key + '"], [name="service_interest"][data-key="' + key + '"]');
      var sel = document.querySelector('select[name="service_interest"]');
      if (key === "interest" && sel) { setSelect(sel, val); }
      if (field && field.tagName !== "SELECT") field.value = val;
    });
  }
  function setSelect(sel, val) {
    for (var i = 0; i < sel.options.length; i++) { if (sel.options[i].value.toLowerCase() === val.toLowerCase() || sel.options[i].text.toLowerCase() === val.toLowerCase()) { sel.selectedIndex = i; return; } }
  }

  /* ---- Forms: AJAX to Formspree + inline success ------------------------- */
  function initForms() {
    document.querySelectorAll("form[data-formspree]").forEach(function (form) {
      var endpoint = C.integrations.formspreeUrl;
      form.setAttribute("action", endpoint);
      form.setAttribute("method", "POST");
      // The success panel is a sibling of the .form-card that wraps the form,
      // so search from the card's parent (fall back to nearby scopes / document).
      var card = form.closest(".form-card");
      var scope = (card && card.parentNode) || form.parentNode;
      var success = scope.querySelector(".form-success") || document.querySelector(".form-success");

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        // native validation
        if (!form.checkValidity()) {
          form.querySelectorAll(":invalid").forEach(function (f) { var wrap = f.closest(".field"); if (wrap) wrap.classList.add("show-err"); });
          var firstInvalid = form.querySelector(":invalid"); if (firstInvalid) firstInvalid.focus();
          return;
        }
        // honeypot
        var hp = form.querySelector('input[name="_gotcha"]');
        if (hp && hp.value) return;

        var btn = form.querySelector('button[type="submit"]');
        var original = btn ? btn.innerHTML : "";
        if (btn) { btn.disabled = true; btn.innerHTML = "Sending..."; }

        fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
          .then(function (r) {
            // Read the JSON body too: Formspree can return 200 with an error inside.
            return r.json().then(function (d) { return { ok: r.ok, data: d }; }, function () { return { ok: r.ok, data: {} }; });
          })
          .then(function (res) {
            var d = res.data || {};
            var delivered = res.ok && !d.error && !(d.errors && d.errors.length);
            if (!delivered) {
              throw new Error(d.error || (d.errors && d.errors[0] && d.errors[0].message) || "Form error");
            }
            form.classList.add("sent");
            if (card) card.style.display = "none";        // hide the empty form card
            if (success) {
              success.classList.add("show");
              try { success.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {}
            }
            trackConversion(form.dataset.conversion || "lead");
          })
          .catch(function () {
            if (btn) { btn.disabled = false; btn.innerHTML = original; }
            alert("Sorry, something went wrong sending your enquiry. Please call " + C.business.phone + " or email " + C.business.email + ".");
          });
      });

      // clear error state on input
      form.querySelectorAll("input, select, textarea").forEach(function (f) {
        f.addEventListener("input", function () { var w = f.closest(".field"); if (w) w.classList.remove("show-err"); });
      });
    });
  }

  function trackConversion(type) {
    // Fires only if analytics IDs are configured. No IDs, no calls.
    try {
      if (window.gtag && C.integrations.adsConversionLabel) {
        window.gtag("event", "conversion", { send_to: C.integrations.adsConversionLabel });
      }
      if (window.gtag && C.integrations.gaId) {
        window.gtag("event", "generate_lead", { form_type: type });
      }
    } catch (e) {}
  }

  /* ---- Optional analytics loader (only if IDs present) ------------------- */
  function initAnalytics() {
    var id = C.integrations.googleAdsId || C.integrations.gaId;
    if (!id) return;
    var s = document.createElement("script"); s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    if (C.integrations.gaId) window.gtag("config", C.integrations.gaId);
    if (C.integrations.googleAdsId) window.gtag("config", C.integrations.googleAdsId);
  }

  /* ---- DEMO: NFC tap ----------------------------------------------------- */
  function initNfcDemo() {
    var card = document.querySelector("[data-nfc-card]");
    var screen = document.querySelector("[data-nfc-screen]");
    if (!card || !screen) return;
    var idle = screen.nextElementSibling; // the "Tap to leave a review" idle prompt
    var stars = screen.querySelectorAll(".rev-stars span");
    function play() {
      screen.classList.add("show");
      if (idle) idle.style.display = "none";
      stars.forEach(function (st, idx) { setTimeout(function () { st.classList.add("lit"); }, 350 + idx * 160); });
    }
    function reset() {
      screen.classList.remove("show");
      if (idle) idle.style.display = "flex";
      stars.forEach(function (s) { s.classList.remove("lit"); });
    }
    card.addEventListener("click", function () { screen.classList.contains("show") ? (reset(), setTimeout(play, 200)) : play(); });
    card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
  }

  /* ---- DEMO: AI chat ----------------------------------------------------- */
  function initChatDemo() {
    var body = document.querySelector("[data-chat-body]");
    if (!body) return;
    var script = [
      { who: "them", text: "Hi, do you have any appointments this Saturday?" },
      { who: "us", text: "We do. We have 9:30am and 1:15pm free on Saturday. Would you like me to hold one for you?" },
      { who: "them", text: "9:30 works. It is for a full service." },
      { who: "us", text: "Great, I have your name and number here. I have flagged a 9:30am full service for Saturday and passed it to the team to confirm." },
    ];
    var captured = document.querySelector("[data-chat-captured]");
    var started = false;
    function run() {
      if (started) return; started = true;
      var delay = 400;
      script.forEach(function (m, idx) {
        setTimeout(function () {
          if (m.who === "us") {
            var t = h('<div class="bubble them"><span class="typing"><span></span><span></span><span></span></span></div>');
            body.appendChild(t);
            setTimeout(function () { t.remove(); body.appendChild(h('<div class="bubble ' + m.who + '">' + esc(m.text) + "</div>")); if (idx === script.length - 1 && captured) setTimeout(function () { captured.classList.add("show"); }, 400); }, 900);
          } else {
            body.appendChild(h('<div class="bubble ' + m.who + '">' + esc(m.text) + "</div>"));
          }
        }, delay);
        delay += m.who === "us" ? 2100 : 1400;
      });
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { run(); io.disconnect(); } }); }, { threshold: 0.4 });
      io.observe(body);
    } else { run(); }
  }

  /* ---- DEMO: Google search before/after ---------------------------------- */
  function initSearchDemo() {
    var demo = document.querySelector("[data-search-demo]");
    if (!demo) return;
    var buttons = demo.querySelectorAll(".search-toggle button");
    var before = demo.querySelector("[data-search-before]");
    var after = demo.querySelector("[data-search-after]");
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        buttons.forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        var showAfter = b.dataset.state === "after";
        before.style.display = showAfter ? "none" : "block";
        after.style.display = showAfter ? "block" : "none";
      });
    });
  }

  /* ---- Animated counters (any number of them) ---------------------------- */
  function initCounter() {
    var els = document.querySelectorAll("[data-counter]");
    if (!els.length) return;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    els.forEach(function (el) {
      var target = parseInt(el.dataset.counter, 10) || 0;
      if (reduced) { el.textContent = target; return; }
      function run() {
        var start = null, dur = 1600;
        function step(ts) { if (!start) start = ts; var p = Math.min((ts - start) / dur, 1); el.textContent = Math.floor(p * target); if (p < 1) requestAnimationFrame(step); }
        requestAnimationFrame(step);
      }
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { run(); io.disconnect(); } }); }, { threshold: 0.5 });
        io.observe(el);
      } else { run(); }
    });
  }

  /* ---- Pathway diagram hover cycle --------------------------------------- */
  function initPathway() {
    var nodes = document.querySelectorAll(".pathway .path-node");
    if (!nodes.length) return;
    var i = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { nodes[0].classList.add("active"); return; }
    setInterval(function () { nodes.forEach(function (n) { n.classList.remove("active"); }); nodes[i].classList.add("active"); i = (i + 1) % nodes.length; }, 1800);
    nodes.forEach(function (n) { n.addEventListener("mouseenter", function () { nodes.forEach(function (x) { x.classList.remove("active"); }); n.classList.add("active"); }); });
  }

  /* ---- Year + phone/email fills for static spots ------------------------- */
  function fillTokens() {
    document.querySelectorAll("[data-fill]").forEach(function (el) {
      var key = el.dataset.fill;
      // Link that should call us but keep its own label (e.g. "Call us")
      if (key === "phone-btn" && el.tagName === "A") { el.href = "tel:" + C.business.phoneHref; return; }
      var map = {
        phone: C.business.phone, email: C.business.email, name: C.business.name,
        tagline: C.business.tagline, location: C.business.location, year: new Date().getFullYear(),
      };
      if (map[key] != null) {
        if (el.tagName === "A" && key === "phone") { el.href = "tel:" + C.business.phoneHref; }
        if (el.tagName === "A" && key === "email") { el.href = "mailto:" + C.business.email; }
        el.textContent = map[key];
      }
    });
  }

  /* ---- Boot -------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderNav(); renderMobileCta(); renderFooter();
    fillTokens(); prefillFromQuery();
    initReveal(); initRotator(); initForms(); initAnalytics();
    initNfcDemo(); initChatDemo(); initSearchDemo(); initCounter(); initPathway();
  });
})();
