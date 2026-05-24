// Initialize Lucide Icons Vector graphics array
lucide.createIcons();

// OVERLAY NAVIGATION INTERACTIVE LOGIC
const menuTrigger = document.querySelector(".menu-trigger");
const navigationGate = document.querySelector(".navigation-gate");
const operationalLinks = document.querySelectorAll(".menu-links a");

function toggleStructuralMenu() {
  const isExpanded = menuTrigger.getAttribute("aria-expanded") === "true";
  menuTrigger.setAttribute("aria-expanded", !isExpanded);
  menuTrigger.classList.toggle("active");
  navigationGate.classList.toggle("active");
}

menuTrigger.addEventListener("click", toggleStructuralMenu);

operationalLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navigationGate.classList.contains("active")) {
      toggleStructuralMenu();
    }
  });
});

// SCROLL TRACKER ENGINE FOR NAVIGATION HEADER COMPRESSION & SURFACE TRIGGER
const siteHeader = document.querySelector(".site-header");
const surfaceFlightBtn = document.getElementById("surfaceBtn");

window.addEventListener("scroll", () => {
  const absoluteY = window.scrollY;

  // Header Compression Toggle
  if (absoluteY > 40) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }

  // Flight-To-Surface Visibility Threshold
  if (absoluteY > 400) {
    surfaceFlightBtn.classList.add("show");
  } else {
    surfaceFlightBtn.classList.remove("show");
  }
}, { passive: true });

// Flight Action Listener Event Execution
surfaceFlightBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// PROCUREMENT PARAMETERS FORM DISPATCH SIMULATION
const unitechForm = document.getElementById("unitechForm");
const formSuccessBlock = document.getElementById("formSuccessBlock");

if (unitechForm) {
  unitechForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Abstract submission array payload logic vector if needed
    this.style.display = "none";
    formSuccessBlock.style.display = "block";
  });
}