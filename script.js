// Mount Vector Layer Elements via Lucide Asset Library
lucide.createIcons();

// OVERLAY DRAWER NAV CONTROL ARCHITECTURE
const menuToggleBtn = document.querySelector(".menu-toggle-btn");
const navigationGate = document.querySelector(".navigation-gate");
const menuNavLinks = document.querySelectorAll(".menu-links a");

function performMenuToggle() {
  const isExpanded = menuToggleBtn.getAttribute("aria-expanded") === "true";
  menuToggleBtn.setAttribute("aria-expanded", !isExpanded);
  menuToggleBtn.classList.toggle("open");
  navigationGate.classList.toggle("open");
}

if (menuToggleBtn) {
  menuToggleBtn.addEventListener("click", performMenuToggle);
}

menuNavLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navigationGate.classList.contains("open")) {
      performMenuToggle();
    }
  });
});

// INTERACTIVE SERVICES MATRIX DATA SWITCHER LOGIC
const tabTriggers = document.querySelectorAll(".tab-trigger");
const tabPanes = document.querySelectorAll(".tab-pane");

tabTriggers.forEach(trigger => {
  trigger.addEventListener("click", function() {
    const targetId = this.getAttribute("data-target");
    
    // Clear Active Classes
    tabTriggers.forEach(t => t.classList.remove("active"));
    tabPanes.forEach(p => p.classList.remove("active"));
    
    // Assign Target Active Status
    this.classList.add("active");
    document.getElementById(targetId).classList.add("active");
  });
});

// VERTICAL SCROLL CONTROLLER MATRICES
const siteHeader = document.querySelector(".site-header");
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  const currentOffset = window.scrollY;

  // Compress Header Navigation Surface
  if (currentOffset > 40) {
    siteHeader.classList.add("compressed");
  } else {
    siteHeader.classList.remove("compressed");
  }

  // Display Back-to-Surface Trigger
  if (currentOffset > 400) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
}, { passive: true });

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// SECURE LOCAL DATA SUBMISSION HANDLER
const unitechForm = document.getElementById("unitechForm");
const formSuccessAlert = document.getElementById("formSuccessAlert");

if (unitechForm) {
  unitechForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Mock Submission Execution
    this.style.display = "none";
    formSuccessAlert.style.display = "block";
  });
}