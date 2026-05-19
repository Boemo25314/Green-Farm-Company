/**
 * Green Farm Agriculture – script.js
 * Shared JavaScript for all pages.
 * Author: Student / Green Farm Agriculture
 */

// ============================================================
// 1. MOBILE MENU TOGGLE
// ============================================================
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', function () {
    const isOpen = !mobileMenu.classList.contains('hidden');

    if (isOpen) {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.remove('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close menu when clicking a nav link inside mobile menu
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
  });
})();


// ============================================================
// 2. STICKY HEADER – add shadow on scroll
// ============================================================
(function () {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.classList.add('shadow-xl');
    } else {
      header.classList.remove('shadow-xl');
    }
  }, { passive: true });
})();


// ============================================================
// 3. PRODUCT FILTER (products.html only)
// ============================================================
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Update button states
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-farm-green', 'text-white');
        b.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-200');
      });
      this.classList.add('active', 'bg-farm-green', 'text-white');
      this.classList.remove('bg-white', 'text-gray-700');

      // Show / hide product cards
      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeIn .4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();


// ============================================================
// 4. SCROLL REVEAL – fade in elements as they come into view
// ============================================================
(function () {
  if (!('IntersectionObserver' in window)) return;

  const revealElements = document.querySelectorAll('article, section > div, blockquote');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();


// ============================================================
// 5. SMOOTH ANCHOR SCROLL (for in-page links like #vegetables)
// ============================================================
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


// ============================================================
// 6. ACTIVE NAV LINK HIGHLIGHT (based on current page)
// ============================================================
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === currentPage) {
      link.classList.add('text-white');
      link.classList.remove('text-gray-300');
    }
  });
})();


// ============================================================
// 7. CONSOLE GREETING
// ============================================================
console.log('%c🌿 Green Farm Agriculture', 'color:#2d6a4f;font-size:18px;font-weight:bold;');
console.log('%c Fresh from our farm to your table.', 'color:#52b788;font-size:12px;');
