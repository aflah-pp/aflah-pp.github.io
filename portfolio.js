const html = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
let dark = true;
const saved = localStorage.getItem("aflah-theme");
if (saved === "light") {
  dark = false;
  html.setAttribute("data-theme", "light");
  themeBtn.textContent = "Dark";
}

const text = document.querySelector('.hero-name');

text.addEventListener('mousemove', (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  text.style.setProperty('--x', `${x}px`);
  text.style.setProperty('--y', `${y}px`);
});

themeBtn.addEventListener("click", () => {
  dark = !dark;
  html.setAttribute("data-theme", dark ? "dark" : "light");
  themeBtn.textContent = dark ? "Light" : "Dark";
  localStorage.setItem("aflah-theme", dark ? "dark" : "light");
});

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});
function closeMobile() {
  mobileNav.classList.remove("open");
}

const reveals = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "-50px" },
);
reveals.forEach((el) => revealObs.observe(el));

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#navLinks a");
window.addEventListener(
  "scroll",
  () => {
    let cur = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 100) cur = s.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + cur);
    });
  },
  { passive: true },
);

function handleContact() {
  const name = document.getElementById("f-name").value.trim();
  const email = document.getElementById("f-email").value.trim();
  const msg = document.getElementById("f-msg").value.trim();
  const fb = document.getElementById("formFeedback");
  if (!name || !email || !msg) {
    fb.textContent = "/ Fill in all fields.";
    fb.style.color = "#FF3D00";
    return;
  }
  window.location.href = `mailto:aflahpp777@gmail.com?subject=Portfolio Inquiry — ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + "\n\nFrom: " + email)}`;
  fb.textContent = "/ Opening your mail client...";
  fb.style.color = "#22c55e";
}

document.getElementById("yr").textContent = new Date().getFullYear();
