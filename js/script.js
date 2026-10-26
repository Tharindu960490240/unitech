// ==========================================================================
// Unitech Networks - shared header/footer, nav behaviour, forms, counters
// ==========================================================================

const headerHTML = `
<header class="site-header">
  <div class="nav-container">
    <a href="index.html" class="brand-identity">
      <img src="../img/logo/logo.png" alt="Unitech Networks" class="main-logo-img" />
    </a>

    <button class="menu-toggle-btn" aria-label="Toggle Navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <nav class="navigation-gate">
      <ul class="menu-links">
        <li><a href="index.html#home">Home</a></li>
        <li><a href="index.html#about">About</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-trigger">Services <i data-lucide="chevron-down"></i></a>
          <ul class="dropdown-menu">
            <li><a href="telecommunications.html"><i data-lucide="radio"></i> Telecommunications</a></li>
            <li><a href="civils.html"><i data-lucide="hard-hat"></i> Civil Works</a></li>
            <li><a href="security.html"><i data-lucide="cctv"></i> CCTV & Security Solutions</a></li>
            <li><a href="solar.html"><i data-lucide="sun"></i> Solar & Battery Solutions</a></li>
          </ul>
        </li>
        <li><a href="index.html#contact" class="nav-action-cta">Contact Us</a></li>
      </ul>
    </nav>
  </div>
</header>`;

const footerHTML = `
<footer class="corporate-footer">
  <div class="footer-grid">
    <div class="footer-col brand-col">
      <img src="../img/logo/logo.png" alt="Unitech Networks" class="footer-logo" />
      <p>Providing enterprise-grade infrastructure and engineering solutions across Victoria, Australia since 2021.</p>
    </div>

    <div class="footer-col">
      <h4>Our Services</h4>
      <ul class="contact-details">
        <li><i data-lucide="radio"></i> <a href="telecommunications.html">Telecommunications</a></li>
        <li><i data-lucide="hard-hat"></i> <a href="civils.html">Civil Works</a></li>
        <li><i data-lucide="cctv"></i> <a href="security.html">CCTV & Security Solutions</a></li>
        <li><i data-lucide="sun"></i> <a href="solar.html">Solar & Battery Solutions</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Contact Us</h4>
      <ul class="contact-details">
        <li>
          <i data-lucide="mail"></i>
          <a href="mailto:admin@unitechnetworks.com.au">admin@unitechnetworks.com.au</a>
        </li>
        <li class="social-link-item">
          <i class="fa-brands fa-linkedin"></i>
          <a href="https://www.linkedin.com/company/unitechnetworks/" target="_blank" rel="noopener">
          LinkedIn</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    <p>© 2026 Unitech Networks. All Rights Reserved.</p>
    <p class="credit">Built by T&S Private Limited</p>
  </div>
</footer>`;

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject shared components
  document.getElementById("header-placeholder").innerHTML = headerHTML;
  document.getElementById("footer-placeholder").innerHTML = footerHTML;
  lucide.createIcons();

  // 2. UI references (after injection)
  const siteHeader = document.querySelector(".site-header");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const menuToggleBtn = document.querySelector(".menu-toggle-btn");
  const navigationGate = document.querySelector(".navigation-gate");
  const menuNavLinks = document.querySelectorAll(".menu-links a");
  const dropdownTrigger = document.querySelector(".dropdown-trigger");

  // 3. Header scroll behaviour + back-to-top
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

  // 4. Active navigation link (service pages only, so Home/About don't all light up)
  const currentPage = window.location.pathname.split("/").pop();
  menuNavLinks.forEach((link) => {
    const href = (link.getAttribute("href") || "").split("#")[0];
    if (href && href !== "index.html" && href === currentPage) {
      link.classList.add("active-nav");
    }
  });

  // 5. Mobile nav toggle
  function toggleMenu() {
    const expanded = menuToggleBtn.getAttribute("aria-expanded") === "true";
    menuToggleBtn.setAttribute("aria-expanded", String(!expanded));
    menuToggleBtn.classList.toggle("open");
    navigationGate.classList.toggle("open");
    document.body.style.overflow = !expanded ? "hidden" : "";

    if (expanded) {
      navigationGate.classList.remove("dropdown-expanded");
      const menu = dropdownTrigger?.nextElementSibling;
      if (menu) menu.style.display = "";
    }
  }
  if (menuToggleBtn) menuToggleBtn.addEventListener("click", toggleMenu);

  // 6. Close mobile menu when a normal link is clicked
  menuNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const isTrigger = link.classList.contains("dropdown-trigger");
      if (!isTrigger && navigationGate?.classList.contains("open"))
        toggleMenu();
    });
  });

  // 7. Services dropdown (mobile tap to expand)
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const menu = dropdownTrigger.nextElementSibling;
        const isOpen = menu.style.display === "block";
        menu.style.display = isOpen ? "none" : "block";
        navigationGate.classList.toggle("dropdown-expanded", !isOpen);
      } else {
        e.preventDefault();
      }
    });
  }

  // 8. Reusable Formspree handler (contact form + quotation form)
  function wireForm(formId, successId, errorId, buttonId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const success = document.getElementById(successId);
    const error = document.getElementById(errorId);
    const button = document.getElementById(buttonId);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (success) success.style.display = "none";
      if (error) error.style.display = "none";
      if (button) button.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Request failed");
        form.reset();
        form.style.display = "none";
        success.style.display = "block";
        setTimeout(() => {
          form.style.display = "";
          success.style.display = "none";
        }, 4000);
      } catch (err) {
        form.style.display = "none";
        error.style.display = "block";
        setTimeout(() => {
          form.style.display = "";
          error.style.display = "none";
        }, 4000);
      } finally {
        if (button) button.disabled = false;
      }
    });
  }
  wireForm("unitechForm", "formSuccessAlert", "formErrorAlert", "btn-submit");
  wireForm(
    "quotationForm",
    "quoteSuccessAlert",
    "quoteErrorAlert",
    "btn-submit-quote",
  );

  // 9. Minimum booking date = today + 7 days (local timezone)
  const bookingDateInput = document.getElementById("bookingDate");
  if (bookingDateInput) {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    const pad = (n) => String(n).padStart(2, "0");
    bookingDateInput.setAttribute(
      "min",
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    );
  }

  // 10. Animated stat counters (start when scrolled into view)
  const yearsEl = document.getElementById("years-of-operation");
  if (yearsEl) yearsEl.dataset.target = String(new Date().getFullYear() - 2021);

  const counters = document.querySelectorAll(".stat-number[data-target]");
  if (counters.length) {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const run = (el) => {
      const target = Number(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      if (reduceMotion || target === 0) {
        el.textContent = target + suffix;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
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
      { threshold: 0.4 },
    );
    counters.forEach((c) => observer.observe(c));
  }
});
