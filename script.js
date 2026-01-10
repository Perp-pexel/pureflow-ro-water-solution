// tailwind.config.js
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

// translation
document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.getElementById("languageSwitcher");
  if (!switcher) return;

  switcher.addEventListener("change", () => {
    const lang = switcher.value;
    localStorage.setItem("siteLanguage", lang);

    const interval = setInterval(() => {
      const googleCombo = document.querySelector(".goog-te-combo");
      if (googleCombo) {
        googleCombo.value = lang;
        googleCombo.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 200);
  });

  // Load saved language on refresh
  const savedLang = localStorage.getItem("siteLanguage");
  if (savedLang && savedLang !== "en") {
    const interval = setInterval(() => {
      const googleCombo = document.querySelector(".goog-te-combo");
      if (googleCombo) {
        googleCombo.value = savedLang;
        googleCombo.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 300);
  }
});

// modal functionality
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

// scroll to top
// const scrollTopBtn = document.getElementById('scrollTopBtn');
// if (scrollTopBtn) {
//   scrollTopBtn.addEventListener('click', () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   });
// }

const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
  // Optional: toggle button text/icons
  scrollTopBtn.addEventListener('click', () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollPosition > 0) {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to bottom
      window.scrollTo({ top: pageHeight, behavior: 'smooth' });
    }
  });

  // Optional: Change button text based on position
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollPosition > pageHeight / 2) {
      scrollTopBtn.textContent = '↑'; // show scroll up
    } else {
      scrollTopBtn.textContent = '↓'; // show scroll down
    }
  });
}


// calendar
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

// hero image slider
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

// fade in on scroll
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

// Staggered fade-up animation for service cards
const serviceCards = document.querySelectorAll(".service-card");
const servicesHeading = document.getElementById("servicesHeading");

const observerOptions = {
  threshold: 0.2
};

const serviceObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate heading immediately
      if (entry.target === servicesHeading) {
        entry.target.classList.remove("opacity-0", "-translate-y-10");
        entry.target.classList.add("opacity-100", "translate-y-0");
      }

      // Animate cards one after another
      if (entry.target.classList.contains("service-card")) {
        const cards = Array.from(serviceCards);
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.remove("opacity-0", "translate-y-10");
            card.classList.add("opacity-100", "translate-y-0");
          }, index * 1000); // 1s stagger
        });
      }

      observer.unobserve(entry.target); // animate only once
    }
  });
}, observerOptions);

// Observe all cards and heading
serviceCards.forEach(card => serviceObserver.observe(card));
if (servicesHeading) serviceObserver.observe(servicesHeading);

// Sequential fade-in for gallery cards
const galleryCards = document.querySelectorAll(".gallery-card");

const galleryObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate each card with a stagger
      galleryCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.remove("opacity-0", "translate-y-10");
          card.classList.add("opacity-100", "translate-y-0");
        }, index * 200); // 200ms stagger per card
      });

      observer.unobserve(entry.target); // animate only once
    }
  });
}, {
  threshold: 0.2
});

// Observe the first card to trigger animation
if (galleryCards.length) galleryObserver.observe(galleryCards[0]);
