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
    initButtonFill();
    initHeroParallax();
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

  // Всички фокусируеми елементи в панела (за focus trap)
  const focusables = () => Array.from(
    mobileMenu.querySelectorAll('a[href], button:not([disabled])')
  ).filter(el => el.offsetParent !== null);

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    mobileMenu.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Затвори менюто');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (mobileOverlay) mobileOverlay.setAttribute('aria-hidden', 'false');

    // Премести фокуса в панела (бутон „затвори")
    (mobileClose || focusables()[0])?.focus();
  }

  function closeMenu({ restoreFocus = true } = {}) {
    if (!isOpen) return;
    isOpen = false;
    mobileMenu.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';

    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Отвори менюто');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (mobileOverlay) mobileOverlay.setAttribute('aria-hidden', 'true');

    if (restoreFocus) menuToggle.focus();
  }

  menuToggle.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()));
  if (mobileClose) mobileClose.addEventListener('click', () => closeMenu());
  if (mobileOverlay) mobileOverlay.addEventListener('click', () => closeMenu());

  // Затвори при клик върху навигационна връзка (без да връща фокуса – ще навигираме)
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => closeMenu({ restoreFocus: false }));
  });

  // Клавиатура: ESC затваря, Tab остава „хванат" в панела
  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key === 'Tab') {
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ─── Header Scroll Effect ───
   Сянка при скрол + „скрий при скрол надолу / покажи при скрол нагоре".
   Работи на всички устройства, при затворено меню и без reduced-motion. */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const REVEAL_AT = 80; // над тази точка хедърът винаги е видим

  let lastScroll = window.scrollY;
  let ticking = false;

  function update() {
    ticking = false;
    const scrollY = window.scrollY;

    header.classList.toggle('scrolled', scrollY > 10);
    header.classList.toggle('condensed', scrollY > 80);

    const menuOpen = document.querySelector('.mobile-menu.active');
    const canHide = !reduceMotion.matches && !menuOpen;

    if (!canHide) {
      header.classList.remove('header-hidden');
    } else if (scrollY <= REVEAL_AT) {
      header.classList.remove('header-hidden');
    } else if (scrollY > lastScroll + 4) {
      header.classList.add('header-hidden');   // скрол надолу
    } else if (scrollY < lastScroll - 4) {
      header.classList.remove('header-hidden'); // скрол нагоре
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update(); // задай правилното начално състояние (напр. reload по средата на страницата)
}

/* ─── Active Navigation ─── */
function initActiveNav() {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  // Desktop nav
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('nav-link--active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Mobile nav
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('mobile-nav-link--active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ─── Hero Parallax ───
   Лек паралакс САМО на илюстрирания слой (.hero__accents) – никога на снимката
   (пази LCP). rAF-throttle, спира извън hero-а, изключен при reduced-motion. */
function initHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const accents = document.querySelector('.hero__accents');
  if (!accents) return;

  let ticking = false;

  function update() {
    ticking = false;
    const y = window.scrollY;
    if (y > window.innerHeight) return; // hero-ът е извън екрана – не смятай
    accents.style.transform = 'translate3d(0, ' + (y * 0.14) + 'px, 0)';
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* ─── Fluid Button Fill (entry-point tracking) ───
   Записва точката на влизане/излизане на курсора в CSS променливи, за да
   „избликва" fill-ът точно оттам. Само 2 листенера на бутон, без непрекъснато
   следене (не е cursor-follow). При reduced-motion CSS дава мигновен fallback,
   а при клавиатурен focus fill-ът тръгва от центъра (--btn-mx/my = 50%). */
function initButtonFill() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const setPoint = (btn, e) => {
    const r = btn.getBoundingClientRect();
    btn.style.setProperty('--btn-mx', (e.clientX - r.left) + 'px');
    btn.style.setProperty('--btn-my', (e.clientY - r.top) + 'px');
  };

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('pointerenter', (e) => setPoint(btn, e));
    btn.addEventListener('pointerleave', (e) => setPoint(btn, e));
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

  // Footprint trail „walks in" when the steps section enters the viewport.
  const stepsGrid = document.querySelector('.steps-grid');
  if (stepsGrid) {
    const trailObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('trail-in');
          trailObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    trailObserver.observe(stepsGrid);
  }

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
