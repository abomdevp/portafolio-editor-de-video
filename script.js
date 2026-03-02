/* =====================================================
   FRANCISCO GONZALEZ — VIDEO EDITOR PORTFOLIO · script.js
   ===================================================== */

'use strict';

/* ── UTILS ─────────────────────────────────────────── */
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

/* ══════════════════════════════════════════════════════
   1. NAV — Scroll effect & mobile menu
══════════════════════════════════════════════════════ */
(function initNav() {
  const nav = $('#nav');
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const mobileLinks = $$('.mobile-link');

  // Scroll shadow
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Toggle mobile menu
  let menuOpen = false;
  const toggleMenu = () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    hamburger.setAttribute('aria-expanded', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);
  mobileLinks.forEach(l => l.addEventListener('click', () => {
    if (menuOpen) toggleMenu();
  }));

  // Close on outside click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) toggleMenu();
  });
})();

/* ══════════════════════════════════════════════════════
   2. SCROLL REVEAL
══════════════════════════════════════════════════════ */
(function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = $$('.reveal', entry.target.parentElement);
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 400);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════════════════
   3. SMOOTH ANCHOR SCROLLING (with nav offset)
══════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    const navHeight = document.querySelector('#nav').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

/* ══════════════════════════════════════════════════════
   4. ACTIVE NAV LINK HIGHLIGHTING
══════════════════════════════════════════════════════ */
(function initActiveLinks() {
  const sections = $$('section[id], footer[id]');
  const navLinks = $$('.nav__links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'nav__link--active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ══════════════════════════════════════════════════════
   5. HOVER TILT EFFECT (cards)
══════════════════════════════════════════════════════ */
(function initTilt() {
  const cards = $$('.video-card:not(.video-card--add), .service-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -3;
      const rotateY = ((x - cx) / cx) * 3;
      card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ══════════════════════════════════════════════════════
   8. INIT
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎬 Portafolio de Francisco González — Listo.');
});
