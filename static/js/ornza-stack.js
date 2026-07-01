/* ORNZA — Tailwind CSS + Alpine.js + HTMX stack loader */
(function () {
  if (window.__ornzaStackLoaded) return;
  window.__ornzaStackLoaded = true;

  const append = (el) => document.head.appendChild(el);

  const tw = document.createElement('script');
  tw.src = 'https://cdn.tailwindcss.com';
  append(tw);

  const cfg = document.createElement('script');
  cfg.textContent = `
tailwind.config = {
  important: '.ornza-tw',
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: '#FFFFF0', alt: '#FAF7F0' },
        gold: { DEFAULT: '#C9A55A', light: '#E8D5A0', deep: '#A8833A' },
        espresso: { DEFAULT: '#1A1507', muted: '#3D3420' },
        taupe: { DEFAULT: '#5C4F38', muted: '#7A6B4A' },
        champagne: '#F7E7CE',
        portal: { bg: '#FFFFF0', text: '#3D3420', muted: '#5C4F38' }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Cormorant Garamond', 'serif'],
        sans: ['Poppins', 'Montserrat', 'sans-serif']
      },
      boxShadow: {
        'ornza': '0 4px 24px rgba(61, 52, 32, 0.06)',
        'ornza-lg': '0 12px 40px rgba(0, 0, 0, 0.1)'
      },
      keyframes: {
        annScroll: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'ann-scroll': 'annScroll 28s linear infinite'
      }
    }
  }
};`;
  append(cfg);

  const htmx = document.createElement('script');
  htmx.src = 'https://unpkg.com/htmx.org@2.0.4';
  htmx.defer = true;
  append(htmx);

  const alpine = document.createElement('script');
  alpine.src = 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.3/dist/cdn.min.js';
  alpine.defer = true;
  append(alpine);

  window.OrnzaStack = {
    whenAlpineReady(cb) {
      if (window.Alpine) {
        cb();
        return;
      }
      document.addEventListener('alpine:init', cb, { once: true });
    },
    initTree(el) {
      if (window.Alpine && el) window.Alpine.initTree(el);
    },
    lockBody() {
      document.body.style.overflow = 'hidden';
    },
    unlockBody() {
      const open = document.querySelector('.mobile-nav-drawer.open, .search-overlay.open, .cart-drawer.open');
      if (!open) document.body.style.overflow = '';
    }
  };
})();
