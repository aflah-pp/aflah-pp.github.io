const html = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const icon = themeBtn.querySelector("i");

let dark = html.getAttribute("data-theme") === "dark";
icon.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";

themeBtn.addEventListener("click", () => {
  dark = !dark;
  html.setAttribute("data-theme", dark ? "dark" : "light");
  icon.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  localStorage.setItem("theme", dark ? "dark" : "light");
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

function closeMobile() {
  mobileMenu.classList.remove("open");
}

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => observer.observe(el));

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach((a) => {
    a.style.color =
      a.getAttribute("href") === "#" + current ? "var(--accent)" : "";
  });
});

function handleContact() {
  const name = document.getElementById("msg-name").value.trim();
  const email = document.getElementById("msg-email").value.trim();
  const body = document.getElementById("msg-body").value.trim();
  const fb = document.getElementById("form-feedback");

  if (!name || !email || !body) {
    fb.textContent = "⚠ Fill in all fields first!";
    fb.style.color = "var(--accent)";
    return;
  }
  const mailto = `mailto:aflahpp777@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(body + "\n\nFrom: " + email)}`;
  window.location.href = mailto;
  fb.textContent = "✓ Opening your mail client...";
  fb.style.color = "var(--green-dark)";
}

document.getElementById("year").textContent = new Date().getFullYear();
