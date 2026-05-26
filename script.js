// Initialize Lucide icons
lucide.createIcons();

// ── Mobile Navigation ────────────────────────────────────────────
const menuToggleBtn   = document.querySelector(".menu-toggle-btn");
const navigationGate  = document.querySelector(".navigation-gate");
const menuNavLinks    = document.querySelectorAll(".menu-links a");

function toggleMenu() {
  const expanded = menuToggleBtn.getAttribute("aria-expanded") === "true";
  menuToggleBtn.setAttribute("aria-expanded", String(!expanded));
  menuToggleBtn.classList.toggle("open");
  navigationGate.classList.toggle("open");
  document.body.style.overflow = !expanded ? "hidden" : "";
}

if (menuToggleBtn) {
  menuToggleBtn.addEventListener("click", toggleMenu);
}

menuNavLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navigationGate.classList.contains("open")) toggleMenu();
  });
});

// ── Header scroll behaviour ──────────────────────────────────────
const siteHeader    = document.querySelector(".site-header");
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  siteHeader.classList.toggle("compressed", y > 40);
  if (scrollToTopBtn) {
    scrollToTopBtn.classList.toggle("visible", y > 400);
  }
}, { passive: true });

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── Services tab switcher ────────────────────────────────────────
const tabTriggers = document.querySelectorAll(".tab-trigger");
const tabPanes    = document.querySelectorAll(".tab-pane");

tabTriggers.forEach(trigger => {
  trigger.addEventListener("click", function () {
    tabTriggers.forEach(t => t.classList.remove("active"));
    tabPanes.forEach(p => p.classList.remove("active"));

    this.classList.add("active");
    const target = document.getElementById(this.getAttribute("data-target"));
    if (target) target.classList.add("active");

    // Scroll tab into view on mobile
    this.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  });
});

// ── Contact form ─────────────────────────────────────────────────
const unitechForm       = document.getElementById("unitechForm");
const formSuccessAlert  = document.getElementById("formSuccessAlert");

if (unitechForm) {
  unitechForm.addEventListener("submit", function (e) {
    e.preventDefault();
    this.style.display = "none";
    if (formSuccessAlert) formSuccessAlert.style.display = "block";
  });
}