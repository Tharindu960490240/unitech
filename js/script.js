// ==========================================================================
// Unitech Networks - shared header/footer, nav, forms, tracking, counters
// ==========================================================================

// ---- 0. SITE SETTINGS: edit these in one place -----------------------------
const SITE = {
  phoneDisplay: "0415 661 770", // confirm with client before launch
  phoneHref: "tel:+61415661770",
  email: "admin@unitechnetworks.com.au",
  // Google Tag Manager container ID, e.g. "GTM-ABC1234". Leave empty until created.
  // GA4 and Google Ads conversion tags are then configured inside GTM.
  gtmId: "",
};

// ---- 1. Google Tag Manager + dataLayer ------------------------------------
window.dataLayer = window.dataLayer || [];
function track(event, params = {}) {
  window.dataLayer.push({ event, page_path: location.pathname, ...params });
}
if (SITE.gtmId) {
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtm.js?id=" + SITE.gtmId;
  document.head.appendChild(s);
}

// ---- 2. Lead source capture (first landing page + UTM / gclid) ------------
(function captureSource() {
  try {
    const params = new URLSearchParams(location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "gclid"];
    const stored = JSON.parse(sessionStorage.getItem("leadSource") || "null");
    const hasNew = keys.some((k) => params.get(k));
    if (!stored || hasNew) {
      const src = { landing: location.href, referrer: document.referrer || "direct" };
      keys.forEach((k) => (src[k] = params.get(k) || ""));
      sessionStorage.setItem("leadSource", JSON.stringify(src));
    }
  } catch (e) {
    /* storage blocked: forms still send the current page */
  }
})();
function getLeadSource() {
  try {
    return JSON.parse(sessionStorage.getItem("leadSource") || "{}");
  } catch (e) {
    return {};
  }
}

// ---- 3. Shared header / footer --------------------------------------------
const headerHTML = `
<header class="site-header">
  <div class="nav-container">
    <a href="index.html" class="brand-identity">
      <img src="../img/logo/logo.png" alt="Unitech Networks" class="main-logo-img" width="180" height="42" />
    </a>

    <a href="${SITE.phoneHref}" class="header-phone-mobile" aria-label="Call Unitech Networks">
      <i data-lucide="phone"></i>
    </a>

    <button class="menu-toggle-btn" aria-label="Toggle Navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <nav class="navigation-gate" aria-label="Main">
      <ul class="menu-links">
        <li><a href="index.html#home">Home</a></li>
        <li><a href="index.html#about">About</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-trigger">Services <i data-lucide="chevron-down"></i></a>
          <ul class="dropdown-menu">
            <li><a href="cctv-installation-melbourne.html"><i data-lucide="cctv"></i> CCTV Installation Melbourne</a></li>
            <li><a href="security.html"><i data-lucide="shield-check"></i> Security Systems</a></li>
            <li><a href="telecommunications.html"><i data-lucide="radio"></i> Telecommunications</a></li>
            <li><a href="civils.html"><i data-lucide="hard-hat"></i> Civil Works</a></li>
            <li><a href="solar.html"><i data-lucide="sun"></i> Solar & Battery Solutions</a></li>
          </ul>
        </li>
        <li><a href="cctv-installation-melbourne.html">CCTV Installation</a></li>
        <li><a href="${SITE.phoneHref}" class="nav-phone"><i data-lucide="phone"></i> ${SITE.phoneDisplay}</a></li>
        <li><a href="cctv-installation-melbourne.html#quote-request" class="nav-action-cta" data-cta="nav_quote">Get a Quote</a></li>
      </ul>
    </nav>
  </div>
</header>`;

const footerHTML = `
<footer class="corporate-footer">
  <div class="footer-grid">
    <div class="footer-col brand-col">
      <img src="../img/logo/logo.png" alt="Unitech Networks" class="footer-logo" width="180" height="42" loading="lazy" />
      <p>Telecommunications, civil works, CCTV & security and solar solutions across Victoria, Australia since 2021.</p>
    </div>

    <div class="footer-col">
      <h4>Our Services</h4>
      <ul class="contact-details">
        <li><i data-lucide="cctv"></i> <a href="cctv-installation-melbourne.html">CCTV Installation Melbourne</a></li>
        <li><i data-lucide="shield-check"></i> <a href="security.html">Security Systems</a></li>
        <li><i data-lucide="radio"></i> <a href="telecommunications.html">Telecommunications</a></li>
        <li><i data-lucide="hard-hat"></i> <a href="civils.html">Civil Works</a></li>
        <li><i data-lucide="sun"></i> <a href="solar.html">Solar & Battery Solutions</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Contact Us</h4>
      <ul class="contact-details">
        <li>
          <i data-lucide="phone"></i>
          <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a>
        </li>
        <li>
          <i data-lucide="mail"></i>
          <a href="mailto:${SITE.email}">${SITE.email}</a>
        </li>
        <li class="social-link-item">
          <i class="fa-brands fa-linkedin"></i>
          <a href="https://www.linkedin.com/company/unitechnetworks/" target="_blank" rel="noopener">LinkedIn</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    <p>© <span id="footer-year">2026</span> Unitech Networks. All Rights Reserved.</p>
    <p class="credit">Built by T&S Private Limited</p>
  </div>
</footer>`;

document.addEventListener("DOMContentLoaded", () => {
  // 4. Inject shared components
  const hp = document.getElementById("header-placeholder");
  const fp = document.getElementById("footer-placeholder");
  if (hp) hp.innerHTML = headerHTML;
  if (fp) fp.innerHTML = footerHTML;
  const fy = document.getElementById("footer-year");
  if (fy) fy.textContent = new Date().getFullYear();
  if (window.lucide) lucide.createIcons();

  // 5. UI references
  const siteHeader = document.querySelector(".site-header");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const menuToggleBtn = document.querySelector(".menu-toggle-btn");
  const navigationGate = document.querySelector(".navigation-gate");
  const menuNavLinks = document.querySelectorAll(".menu-links a");
  const dropdownTrigger = document.querySelector(".dropdown-trigger");

  // 6. Header scroll behaviour + back-to-top
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (siteHeader) siteHeader.classList.toggle("compressed", y > 40);
      if (scrollToTopBtn) scrollToTopBtn.classList.toggle("visible", y > 400);
    },
    { passive: true },
  );
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  // 7. Active nav link (works with or without .html / trailing slash)
  const pageSlug = (p) =>
    (p || "").split("#")[0].replace(/\/$/, "").split("/").pop().replace(/\.html$/, "");
  const currentPage = pageSlug(location.pathname);
  menuNavLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href.includes("#")) return;
    const slug = pageSlug(href);
    if (slug && slug !== "index" && slug === currentPage) link.classList.add("active-nav");
  });

  // 8. Mobile nav toggle
  function toggleMenu() {
    const expanded = menuToggleBtn.getAttribute("aria-expanded") === "true";
    menuToggleBtn.setAttribute("aria-expanded", String(!expanded));
    menuToggleBtn.classList.toggle("open");
    navigationGate.classList.toggle("open");
    document.body.style.overflow = !expanded ? "hidden" : "";
    if (expanded) {
      const menu = dropdownTrigger?.nextElementSibling;
      if (menu) menu.style.display = "";
    }
  }
  if (menuToggleBtn) menuToggleBtn.addEventListener("click", toggleMenu);

  menuNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const isTrigger = link.classList.contains("dropdown-trigger");
      if (!isTrigger && navigationGate?.classList.contains("open")) toggleMenu();
    });
  });

  if (dropdownTrigger) {
    dropdownTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.innerWidth <= 768) {
        const menu = dropdownTrigger.nextElementSibling;
        const isOpen = menu.style.display === "block";
        menu.style.display = isOpen ? "none" : "block";
      }
    });
  }

  // 9. Click tracking: phone, email, quote buttons
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href.startsWith("tel:")) track("click_to_call", { link_location: a.className || "link" });
    else if (href.startsWith("mailto:")) track("click_email");
    else if (a.dataset.cta) track("quote_cta_click", { cta: a.dataset.cta });
  });

  // 10. Form handler (contact, quotation and CCTV forms)
  function fillSourceFields(form) {
    const src = getLeadSource();
    form.querySelectorAll("[data-source]").forEach((input) => {
      const key = input.dataset.source;
      if (key === "page") input.value = location.href + (src.landing && src.landing !== location.href ? ` (landed on ${src.landing})` : "");
      else input.value = src[key] || "";
    });
  }

  function wireForm(formId, successId, errorId, buttonId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const success = document.getElementById(successId);
    const error = document.getElementById(errorId);
    const button = document.getElementById(buttonId);
    const label = button?.querySelector("span");
    const labelText = label?.textContent;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (error) error.style.display = "none";

      // Optional photo: keep under Formspree's size limit
      const file = form.querySelector('input[type="file"]')?.files?.[0];
      if (file && file.size > 10 * 1024 * 1024) {
        alert("That photo is larger than 10 MB. Please choose a smaller one or leave it out.");
        return;
      }

      fillSourceFields(form);
      if (button) button.disabled = true;
      if (label) label.textContent = "Sending...";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Request failed");

        // Success is shown ONLY after the server confirms the submission
        const fd = new FormData(form);
        track("generate_lead", {
          form_id: form.dataset.leadForm || formId,
          service: fd.get("Service Required") || fd.get("Service Type") || "",
          property_type: fd.get("Property Type") || "",
        });
        form.reset();
        form.style.display = "none";
        if (success) {
          success.style.display = "block";
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } catch (err) {
        // Keep the form (and what they typed) so they can retry
        if (error) error.style.display = "block";
        track("form_error", { form_id: form.dataset.leadForm || formId });
      } finally {
        if (button) button.disabled = false;
        if (label) label.textContent = labelText;
      }
    });
  }
  wireForm("unitechForm", "formSuccessAlert", "formErrorAlert", "btn-submit");
  wireForm("quotationForm", "quoteSuccessAlert", "quoteErrorAlert", "btn-submit-quote");
  wireForm("cctvQuoteForm", "cctvSuccessAlert", "cctvErrorAlert", "btn-submit-cctv");

  // 11. Date fields: optional, can't pick a past date
  const pad = (n) => String(n).padStart(2, "0");
  const t = new Date();
  t.setDate(t.getDate() + 1);
  const minDate = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
  document.querySelectorAll('form input[type="date"]').forEach((d) => d.setAttribute("min", minDate));

  // 12. Stat counters. Real values are in the HTML (so Google and no-JS
  //     visitors never see "0"); we only animate when the bar scrolls into view.
  const yearsEl = document.getElementById("years-of-operation");
  if (yearsEl) {
    const years = String(new Date().getFullYear() - 2021);
    yearsEl.dataset.target = years;
    yearsEl.textContent = years + (yearsEl.dataset.suffix || "");
  }

  const counters = document.querySelectorAll(".stat-number[data-target]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    const run = (el) => {
      const target = Number(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    counters.forEach((c) => observer.observe(c));
  }
});
