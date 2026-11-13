(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav-list");
  var navLinks = nav.querySelectorAll("a");
  var backToTop = document.querySelector(".back-to-top");
  var heroLede = document.querySelector(".lede");

  // --- Mobile menu toggle ---
  function openNav() {
    nav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("open");
      if (isOpen) closeNav(); else openNav();
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  // --- Typewriter effect on hero lede ---
  var phrases = [
    "Solusi AI yang dekat dengan kebutuhan Anda",
    "Otomatisasi tanpa mengubah alur kerja saat ini",
    "Dukungan di lapangan sampai skalanya tumbuh"
  ];

  function typewrite(el, phrase, speed) {
    var i = 0;
    function step() {
      if (i <= phrase.length) {
        el.textContent = phrase.substring(0, i);
        i++;
        setTimeout(step, speed || 45);
      }
    }
    step();
  }

  if (heroLede) {
    var current = 0;
    function rotate() {
      typewrite(heroLede, phrases[current], 45);
      current = (current + 1) % phrases.length;
    }
    rotate();
    setInterval(rotate, 5000);
  }

  // --- Back to top ---
  function updateBackToTop() {
    if (window.scrollY > 500) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
  }

  // --- Reveal-on-scroll for cards and steps ---
  var revealEls = document.querySelectorAll(
    ".card, .step, .mock-card"
  );

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealEls.forEach(function (el) {
      el.classList.remove("revealed");
      observer.observe(el);
    });
  }
})();
