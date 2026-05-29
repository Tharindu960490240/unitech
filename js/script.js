// Initialize Lucide icons
lucide.createIcons();

// components.js
const headerHTML = `
<header class="site-header">
  <div class="nav-container">
    <a href="index.html" class="brand-identity">
      <img src="../img/logo.png" alt="Unitech Networks" class="main-logo-img" />
    </a>

    <button class="menu-toggle-btn" aria-label="Toggle Navigation">
      <span></span><span></span><span></span>
    </button>

    <nav class="navigation-gate">
      <ul class="menu-links">

        <li><a href="index.html#about">About</a></li>
        <li><a href="index.html#values">Values</a></li>

        <li class="dropdown">
          <a href="#" class="dropdown-trigger">
            Services <i data-lucide="chevron-down"></i>
          </a>

          <ul class="dropdown-menu">

            <li class="dropdown-header">
              <i data-lucide="layers"></i> Core Infrastructure
            </li>

            <li><a href="transmission.html"><i data-lucide="radio"></i> Transmission</a></li>
            <li><a href="access.html"><i data-lucide="network"></i> Access Networks</a></li>
            <li><a href="wireline.html"><i data-lucide="git-branch"></i> Wireline Projects</a></li>
            <li><a href="civil_electrical.html"><i data-lucide="zap"></i> Civil & Electrical</a></li>
            <li><a href="civils.html"><i data-lucide="factory"></i> Civils Infrastructure</a></li>

            <li class="dropdown-header">
              <i data-lucide="shield-check"></i> Specialized Services
            </li>

            <li><a href="fiber.html"><i data-lucide="git-commit"></i> Optical Fibre Splicing</a></li>
            <li><a href="security.html"><i data-lucide="cctv"></i> CCTV & Security</a></li>
            <li><a href="special.html"><i data-lucide="star"></i> Special Projects</a></li>

            <li class="dropdown-header">
              <i data-lucide="settings"></i> Operations & Support
            </li>

            <li><a href="maintenance.html"><i data-lucide="wrench"></i> Operation & Maintenance</a></li>
            <li><a href="fault.html"><i data-lucide="alert-triangle"></i> Faults & Emergencies</a></li>

          </ul>
        </li>

        <li><a href="index.html#safety">Safety</a></li>

        <li>
          <a href="index.html#contact" class="nav-action-cta">
            Contact Us
          </a>
        </li>

      </ul>
    </nav>
  </div>
</header>`;

const footerHTML = `
<footer class="corporate-footer">

  <div class="footer-grid">

    <div class="footer-col brand-col">
      <img src="../img/logo.png" alt="Unitech Networks" class="footer-logo">

      <p>
        Providing enterprise-grade infrastructure and engineering
        solutions across Australia since 2021.
      </p>
    </div>

    <div class="footer-col">
      <h4>Our Services</h4>

      <ul>
        <li><a href="fiber.html">Optical Fibre</a></li>
        <li><a href="security.html">CCTV & Security</a></li>
        <li><a href="transmission.html">Transmission</a></li>
        <li><a href="security.html">Security Systems</a></li>
      </ul>
      <p style="margin-top: 10px; font-size: 0.85rem;">
        <a href="index.html">See full service list in menu</a>
      </p>
    </div>

    <div class="footer-col">
      <h4>Contact Us</h4>

      <ul class="contact-details">
        <li>
          <i data-lucide="map-pin"></i>
          34, Priya street,<br>Werribee, VIC 3030
        </li>

        <li>
          <i data-lucide="phone"></i>
          <a href="tel:+61415661770">+61 415 661 770</a>
        </li>

        <li>
          <i data-lucide="mail"></i>
          <a href="mailto:admin@unitechnetworks.com.au">
            admin@unitechnetworks.com.au
          </a>
        </li>

        <li class="social-link-item">
          <a href="https://www.linkedin.com/company/unitechnetworks/" target="_blank">
            <i class="fa-brands fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
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
  // 1. Inject components
  document.getElementById("header-placeholder").innerHTML = headerHTML;
  document.getElementById("footer-placeholder").innerHTML = footerHTML;

  // 2. Re-initialize icons
  lucide.createIcons();

  // 3. Define UI variables AFTER injection
  const siteHeader = document.querySelector(".site-header");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const menuToggleBtn = document.querySelector(".menu-toggle-btn");
  const navigationGate = document.querySelector(".navigation-gate");
  const menuNavLinks = document.querySelectorAll(".menu-links a");
  const unitechForm = document.getElementById("unitechForm");
  const formSuccessAlert = document.getElementById("formSuccessAlert");
  const dropdownTrigger = document.querySelector(".dropdown-trigger");

  // 4. Attach Listeners

  // Header Scroll
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
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Add this inside DOMContentLoaded in components.js
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".menu-links a");

  navLinks.forEach((link) => {
    // Check if link matches current URL
    if (
      link.getAttribute("href") &&
      currentPath.includes(link.getAttribute("href").replace("../html/", ""))
    ) {
      link.classList.add("active-nav");
    }

    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active-nav"));
      link.classList.add("active-nav");
    });
  });

  // Mobile Nav
  function toggleMenu() {
    const expanded = menuToggleBtn.getAttribute("aria-expanded") === "true";
    menuToggleBtn.setAttribute("aria-expanded", String(!expanded));
    menuToggleBtn.classList.toggle("open");
    navigationGate.classList.toggle("open");
    document.body.style.overflow = !expanded ? "hidden" : "";
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener("click", toggleMenu);

  menuNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navigationGate && navigationGate.classList.contains("open"))
        toggleMenu();
    });
  });

  // Contact Form
  if (unitechForm) {
    unitechForm.addEventListener("submit", function (e) {
      e.preventDefault();
      this.style.display = "none";
      if (formSuccessAlert) formSuccessAlert.style.display = "block";
    });
  }

  // Dropdown
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener("click", (e) => {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        const menu = dropdownTrigger.nextElementSibling;
        menu.style.display = menu.style.display === "block" ? "none" : "block";
      }
    });
  }
});

const establishYear = 2021;
const currentYear = new Date().getFullYear();
const yearsActive = currentYear - establishYear;

const yearsElement = document.getElementById("years-of-operation");
if (yearsElement) {
  // Use yearsActive + "+" if you want to keep the "4+" style,
  // or just yearsActive for the exact number.
  yearsElement.textContent = yearsActive + "+";
}
