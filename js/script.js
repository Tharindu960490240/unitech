// Initialize Lucide icons
lucide.createIcons();

// components.js
const headerHTML = `
<header class="site-header">
  <div class="nav-container">
    <a href="index.html" class="brand-identity">
      <img src="../img/logo/logo.png" alt="Unitech Networks" class="main-logo-img" />
    </a>

    <button class="menu-toggle-btn" aria-label="Toggle Navigation">
      <span></span><span></span><span></span>
    </button>

    <nav class="navigation-gate">
      <ul class="menu-links">

        <li><a href="index.html#home">Home</a></li>
        <li><a href="index.html#about">About</a></li>

       <li class="dropdown">
          <a href="#" class="dropdown-trigger">
            Services <i data-lucide="chevron-down"></i>
          </a>

          <ul class="dropdown-menu">
            <li><a href="telecommunications.html"><i data-lucide="radio"></i> Telecommunications</a></li>
            <li><a href="civils.html"><i data-lucide="hard-hat"></i> Civil Works</a></li>
            <li><a href="security.html"><i data-lucide="cctv"></i> CCTV & Security Solutions</a></li>
            <li><a href="solar.html"><i data-lucide="sun"></i> Solar & Battery Solutions</a></li>
          </ul>
        </li>

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
      <img src="../img/logo/logo.png" alt="Unitech Networks" class="footer-logo">

      <p>
        Providing enterprise-grade infrastructure and engineering
        solutions across Victoria, Australia since 2021.
      </p>
    </div>

    <div class="footer-col">
      <h4>Our Services</h4>

      <ul class="contact-details">
        <li><i data-lucide="radio"></i> <a href="telecommunications.html">Telecommunications</a></li>
        <li><i data-lucide="hard-hat"></i> <a href="civils.html">Civil Works</a></li>
        <li><i data-lucide="cctv"></i><a href="security.html"> CCTV & Security Solutions</a></li>
        <li><i data-lucide="sun"></i><a href="solar.html"> Solar & Battery Solutions</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Contact Us</h4>

      <ul class="contact-details">
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
  lucide.createIcons();

  // 2. Define UI variables AFTER injection
  const siteHeader = document.querySelector(".site-header");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const menuToggleBtn = document.querySelector(".menu-toggle-btn");
  const navigationGate = document.querySelector(".navigation-gate");
  const menuNavLinks = document.querySelectorAll(".menu-links a");
  const dropdownTrigger = document.querySelector(".dropdown-trigger");

  // 3. Header Scroll Behavior
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

  // 4. Active Navigation Link Logic
  const currentPath = window.location.pathname;
  menuNavLinks.forEach((link) => {
    if (
      link.getAttribute("href") &&
      currentPath.includes(link.getAttribute("href").replace("../html/", ""))
    ) {
      link.classList.add("active-nav");
    }
  });

  // 5. Mobile Nav Toggle Function
  function toggleMenu() {
    const expanded = menuToggleBtn.getAttribute("aria-expanded") === "true";
    menuToggleBtn.setAttribute("aria-expanded", String(!expanded));
    menuToggleBtn.classList.toggle("open");
    navigationGate.classList.toggle("open");
    document.body.style.overflow = !expanded ? "hidden" : "";

    // Reset dropdown height when menu closes
    if (expanded) {
      navigationGate.classList.remove("dropdown-expanded");
      const menu = dropdownTrigger?.nextElementSibling;
      if (menu) menu.style.display = "none";
    }
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener("click", toggleMenu);

  // 6. Navigation Link Closing Logic (FIXED: Ignores Dropdown Trigger)
  menuNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const isDropdownTrigger = link.classList.contains("dropdown-trigger");
      // Close menu only if it's not the trigger and the menu is currently open
      if (!isDropdownTrigger && navigationGate?.classList.contains("open")) {
        toggleMenu();
      }
    });
  });

  // 7. Dropdown Logic (Mobile Specific)
  if (dropdownTrigger) {
    // Desktop Hover logic
    dropdownTrigger.addEventListener("mouseenter", () => {
      if (window.innerWidth < 1024) {
        navigationGate.classList.add("dropdown-expanded");
      }
    });

    dropdownTrigger.addEventListener("mouseleave", () => {
      if (window.innerWidth < 1024) {
        navigationGate.classList.remove("dropdown-expanded");
      }
    });

    dropdownTrigger.addEventListener("click", (e) => {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        const menu = dropdownTrigger.nextElementSibling;
        const isOpen = menu.style.display === "block";
        menu.style.display = isOpen ? "none" : "block";
        navigationGate.classList.toggle("dropdown-expanded", !isOpen);
      }
    });
  }

  // 8. Form Submission Handling
  const unitechForm = document.getElementById("unitechForm");
  if (unitechForm) {
    unitechForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formSuccessAlert = document.getElementById("formSuccessAlert");
      const formErrorAlert = document.getElementById("formErrorAlert");
      const submitButton = document.getElementById("btn-submit");

      if (formSuccessAlert) formSuccessAlert.style.display = "none";
      if (formErrorAlert) formErrorAlert.style.display = "none";
      if (submitButton) submitButton.disabled = true;

      try {
        const response = await fetch(this.action, {
          method: "POST",
          body: new FormData(this),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          this.reset();
          this.style.display = "none";
          formSuccessAlert.style.display = "block";
          setTimeout(() => {
            this.style.display = "block";
            formSuccessAlert.style.display = "none";
          }, 3000);
        } else {
          throw new Error();
        }
      } catch (error) {
        this.style.display = "none";
        formErrorAlert.style.display = "block";
        setTimeout(() => {
          this.style.display = "block";
          formErrorAlert.style.display = "none";
        }, 3000);
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }
});

// 9. Footer Years Calculation
const yearsElement = document.getElementById("years-of-operation");
if (yearsElement) {
  yearsElement.textContent = new Date().getFullYear() - 2021 + "+";
}
