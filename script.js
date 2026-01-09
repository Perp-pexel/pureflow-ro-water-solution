tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        darkblue: "#0f172a"
      }
    }
  }
};

const openModalBtn = document.getElementById('openBookingModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('bookingModal');
const heroBookingBtn = document.getElementById('heroBookingBtn');

if (openModalBtn && modal) {
  openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    if (calendarDropdown) calendarDropdown.classList.add('hidden');
  });
}

if (heroBookingBtn && modal) {
  heroBookingBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
}

if (closeModalBtn && modal) {
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const calendarBtn = document.getElementById('calendarBtn');
const calendarDropdown = document.getElementById('calendarDropdown');
const calendarDate = document.getElementById('calendarDate');
const nativeDatePicker = document.getElementById('nativeDatePicker');

function formatDate(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

function setToday() {
  const today = new Date();
  calendarDate.value = formatDate(today);
  nativeDatePicker.valueAsDate = today;
}

calendarBtn.addEventListener('click', () => {
  calendarDropdown.classList.toggle('hidden');
  setToday();
});

nativeDatePicker.addEventListener('change', () => {
  const selected = new Date(nativeDatePicker.value);
  calendarDate.value = formatDate(selected);
});

window.addEventListener('click', (e) => {
  if (!calendarBtn.contains(e.target) && !calendarDropdown.contains(e.target)) {
    calendarDropdown.classList.add('hidden');
    setToday();
  }
});

setToday();

const heroImages = [
  "asset/pngimg.com - water_PNG50209.png",
  "asset/clean-water.jpg",
  "asset/CC-BF1005-Building.avif",
  "asset/water-flowing-from-pipe.jpeg",
  "asset/abuja-kidz.webp"
];

const heroImgElement = document.getElementById("heroImage");
let currentHeroIndex = 0;

if (heroImgElement && heroImages.length > 1) {
  heroImgElement.classList.add("active");

  setInterval(() => {
    heroImgElement.classList.remove("active");

    setTimeout(() => {
      currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
      heroImgElement.src = heroImages[currentHeroIndex];
      heroImgElement.classList.add("active");
    }, 600);
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  const languageSwitcher = document.getElementById("languageSwitcher");
  if (!languageSwitcher) return;

  const API_URL = "https://translate.argosopentech.com/translate";
  const originalTexts = new Map();
  const translationCache = new Map();

  document.querySelectorAll("body *").forEach(el => {
    if (el.closest("script") || el.closest("style") || el.id === "languageSwitcher") return;

    if ((el.tagName === "INPUT" || el.tagName === "TEXTAREA") && el.placeholder?.trim()) {
      originalTexts.set(el, el.placeholder.trim());
    }

    if ((el.tagName === "BUTTON" || el.tagName === "OPTION") && el.textContent.trim()) {
      originalTexts.set(el, el.textContent.trim());
    }

    el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        originalTexts.set(node, node.textContent.trim());
      }
    });
  });

  async function translateText(text, target) {
    const key = `${text}|${target}`;
    if (translationCache.has(key)) return translationCache.get(key);

    try {
      const body = new URLSearchParams({
        q: text,
        source: "en",
        target: target,
        format: "text"
      });

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body.toString()
      });

      const data = await res.json();
      const translated = data.translatedText || text;
      translationCache.set(key, translated);
      return translated;

    } catch {
      return text;
    }
  }

  async function translatePage(lang) {
    if (lang === "en") {
      originalTexts.forEach((text, node) => {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = text;
        else if ("placeholder" in node) node.placeholder = text;
        else node.textContent = text;
      });
      localStorage.setItem("siteLanguage", "en");
      return;
    }

    for (let [node, text] of originalTexts.entries()) {
      const translated = await translateText(text, lang);
      if (node.nodeType === Node.TEXT_NODE) node.textContent = translated;
      else if ("placeholder" in node) node.placeholder = translated;
      else node.textContent = translated;
    }

    localStorage.setItem("siteLanguage", lang);
  }

  languageSwitcher.addEventListener("change", e => {
    translatePage(e.target.value);
  });

  const savedLang = localStorage.getItem("siteLanguage") || "en";
  languageSwitcher.value = savedLang;
  if (savedLang !== "en") translatePage(savedLang);
});

const fadeElements = [
  document.getElementById('mvHeading'),
  document.getElementById('mvTagline'),
  document.getElementById('missionCard'),
  document.getElementById('visionCard'),
  document.getElementById('valuesCard')
];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('opacity-0');
      entry.target.classList.add(
        'transition-all',
        'duration-700',
        'ease-out',
        'opacity-100',
        'translate-y-0',
        'translate-x-0'
      );
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => {
  if (el) observer.observe(el);
});
