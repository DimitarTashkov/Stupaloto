/* ==========================================================================
   NAV.JS – Mobile menu, scroll effects, include loader, active page
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initIncludes().then(() => {
    initMobileMenu();
    initHeaderScroll();
    initActiveNav();
    initSmoothScroll();
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
  // Prefix relative hrefs and srcs (not starting with http, //, or #)
  html = html.replace(/(href|src)="(?!https?:\/\/|\/\/|#|mailto:|tel:|viber:)([^"]+)"/g,
    (match, attr, path) => `${attr}="${basePath}${path}"`
  );
  return html;
}

/* ─── Determine base path relative to current page ─── */
function getBasePath() {
  const path = window.location.pathname;
  // Pages in subdirectories (e.g., /uslugi/xxx.html or /blog/xxx.html)
  if (path.includes('/uslugi/') || path.includes('/blog/')) {
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
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ─── Intersection Observer for Animations ─── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Initialize animations after page load
window.addEventListener('load', initScrollAnimations);
