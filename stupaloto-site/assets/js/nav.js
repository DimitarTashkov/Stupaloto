/* ==========================================================================
   NAV.JS – Mobile menu, scroll effects, include loader, active page
   ========================================================================== */

/* Маркира работещ JS възможно най-рано – CSS ползва .js за да скрие
   елементите преди scroll-reveal (без JS всичко остава видимо). */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  initIncludes().then(() => {
    initMobileMenu();
    initHeaderScroll();
    initActiveNav();
    initSmoothScroll();
    initScrollAnimations();
  });
});

/* ─── Include Loader (header.html / footer.html) ─── */
async function initIncludes() {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  const basePath = getBasePath();

  if (headerEl) {
    try {
      const response = await fetch(basePath + 'includes/header.html');
      if (response.ok) {
        let html = await response.text();
        html = adjustPaths(html, basePath);
        headerEl.innerHTML = html;
      }
    } catch (e) {
      console.warn('Header include not loaded:', e);
    }
  }

  if (footerEl) {
    try {
      const response = await fetch(basePath + 'includes/footer.html');
      if (response.ok) {
        let html = await response.text();
        html = adjustPaths(html, basePath);
        footerEl.innerHTML = html;
      }
    } catch (e) {
      console.warn('Footer include not loaded:', e);
    }
  }
}

/* ─── Adjust relative paths in include HTML for subdirectory pages ─── */
function adjustPaths(html, basePath) {
  if (basePath === './') return html; // root pages, no adjustment needed
  // Prefix relative hrefs and srcs (not starting with http, //, #, or data:)
  html = html.replace(/(href|src)="(?!https?:\/\/|\/\/|#|mailto:|tel:|viber:|data:)([^"]+)"/g,
    (match, attr, path) => `${attr}="${basePath}${path}"`
  );
  return html;
}

/* ─── Determine base path relative to current page ─── */
function getBasePath() {
  const path = window.location.pathname;
  // Pages in subdirectories (e.g., /uslugi/xxx.html)
  if (path.includes('/uslugi/')) {
    return '../';
  }
  return './';
}

/* ─── Mobile Menu ─── */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileClose = document.querySelector('.mobile-menu-close');

  if (!menuToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  // Close on mobile nav link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ─── Header Scroll Effect ─── */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }, { passive: true });
}

/* ─── Active Navigation ─── */
function initActiveNav() {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  // Desktop nav
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('nav-link--active');
    }
  });

  // Mobile nav
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('mobile-nav-link--active');
    }
  });
}

/* ─── Smooth Scroll for Anchor Links ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  });
}

/* ─── Intersection Observer for Animations ─── */
function initScrollAnimations() {
  const items = document.querySelectorAll('.animate-on-scroll');
  if (!items.length) return;

  const reveal = (el) => el.classList.add('animate-fade-in');

  // Graceful fallback: no observer support → show everything immediately.
  if (!('IntersectionObserver' in window)) {
    items.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    // Positive bottom margin starts the reveal ~120px before the element
    // scrolls into view, so fast scrolling never catches an empty section.
    rootMargin: '0px 0px 120px 0px'
  });

  items.forEach(el => observer.observe(el));

  // Failsafe: nothing should stay invisible for long. After 1.2s reveal
  // anything already within (or above) the viewport that hasn't fired.
  window.setTimeout(() => {
    items.forEach(el => {
      if (el.classList.contains('animate-fade-in')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        reveal(el);
        observer.unobserve(el);
      }
    });
  }, 1200);
}
