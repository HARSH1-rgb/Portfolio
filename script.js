document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const placeholders = document.querySelectorAll("body *");
  const marked = [];

  placeholders.forEach((node) => {
    if (node.children.length === 0 && node.textContent.includes("PLACEHOLDER")) {
      marked.push(node.textContent.trim());
    }
  });

  if (marked.length > 0) {
    console.info(
      `Found ${marked.length} PLACEHOLDER text nodes. Replace them with your details.`,
      marked
    );
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      const target = id ? document.querySelector(id) : null;
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
const themeButton = document.getElementById("themeToggle");
themeButton.addEventListener("click", function () {
document.body.classList.toggle("dark-mode");
if (document.body.classList.contains("dark-mode")) {
themeButton.textContent = "Switch to Light Mode";
} else {
themeButton.textContent = "Switch to Dark Mode";
}
});