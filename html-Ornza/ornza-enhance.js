/* ORNZA — Tailwind utility migration for static HTML product/layout blocks */
(function () {
  const add = (el, cls) => {
    if (!el || el.dataset.twEnhanced) return;
    cls.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
    el.dataset.twEnhanced = '1';
  };

  const isIvory = () => document.body.classList.contains('ornza-page');

  function enhancePageHeaders() {
    document.querySelectorAll('.page-header').forEach((el) => {
      add(el, 'ornza-tw text-center max-w-3xl mx-auto px-6 mb-12');
    });
    document.querySelectorAll('.page-header .badge, .page .badge').forEach((el) => {
      add(el, 'ornza-tw inline-block text-[9px] tracking-[0.35em] uppercase text-gold-deep font-medium mb-4');
    });
    document.querySelectorAll('.page-title').forEach((el) => {
      add(el, 'ornza-tw font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-espresso mb-4');
    });
    document.querySelectorAll('.page-desc').forEach((el) => {
      add(el, 'ornza-tw text-sm md:text-base text-taupe leading-relaxed max-w-2xl mx-auto');
    });
  }

  function enhanceSectionHeaders() {
    document.querySelectorAll('.cat-section-header').forEach((el) => {
      add(el, 'ornza-tw flex flex-wrap items-end justify-between gap-4 pb-6 mb-8 border-b border-gold/15');
    });
    document.querySelectorAll('.cat-section-title').forEach((el) => {
      add(el, 'ornza-tw font-display text-2xl md:text-3xl text-espresso font-light tracking-wide');
    });
    document.querySelectorAll('.cat-section-desc').forEach((el) => {
      add(el, 'ornza-tw text-sm text-taupe max-w-md leading-relaxed');
    });
    document.querySelectorAll('.cat-section-num').forEach((el) => {
      add(el, 'ornza-tw text-[9px] tracking-[0.3em] uppercase text-gold-deep mb-2');
    });
    document.querySelectorAll('.cat-products-grid, .products-grid').forEach((el) => {
      add(el, 'ornza-tw grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7');
    });
  }

  function enhanceProductCards() {
    const ivory = isIvory();
    const cardBase = ivory
      ? 'ornza-tw group bg-white border border-gold/20 rounded-sm overflow-hidden shadow-ornza transition-all duration-300 hover:-translate-y-1.5 hover:shadow-ornza-lg hover:border-gold/40'
      : 'ornza-tw group bg-espresso/50 border border-gold/10 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]';

    document.querySelectorAll('.cat-product-card, .product-card').forEach((card) => {
      add(card, cardBase);
    });

    document.querySelectorAll('.cat-product-img, .product-image-container').forEach((el) => {
      add(el, 'ornza-tw relative aspect-square overflow-hidden bg-[#0d0b07]');
    });

    document.querySelectorAll('.cat-product-img img, .product-image-container img').forEach((el) => {
      add(el, 'ornza-tw w-full h-full object-cover transition-transform duration-700 group-hover:scale-105');
    });

    document.querySelectorAll('.cat-product-info, .product-info').forEach((el) => {
      add(el, 'ornza-tw p-5');
    });

    document.querySelectorAll('.cat-product-cat, .product-meta').forEach((el) => {
      add(el, 'ornza-tw block text-[8px] tracking-[0.25em] uppercase text-gold font-medium mb-1.5');
    });

    document.querySelectorAll('.cat-product-name, .product-title').forEach((el) => {
      add(el, ivory
        ? 'ornza-tw font-display text-lg text-espresso leading-snug group-hover:text-gold-deep transition-colors'
        : 'ornza-tw font-display text-lg text-ivory leading-snug group-hover:text-gold-light transition-colors');
    });

    document.querySelectorAll('.cat-product-detail, .product-spec').forEach((el) => {
      add(el, 'ornza-tw text-xs text-taupe leading-relaxed mt-1');
    });

    document.querySelectorAll('.cat-product-footer, .product-footer').forEach((el) => {
      add(el, 'ornza-tw flex items-center justify-between mt-4 pt-4 border-t border-gold/10');
    });

    document.querySelectorAll('.cat-product-price, .product-price').forEach((el) => {
      add(el, 'ornza-tw font-display text-lg text-espresso font-medium');
    });

    document.querySelectorAll('.cat-product-badge, .product-tag').forEach((el) => {
      add(el, 'ornza-tw absolute top-3 left-3 z-10 bg-gold text-espresso text-[7px] tracking-[0.15em] font-bold uppercase px-2.5 py-1 rounded-full');
    });
  }

  function enhanceButtons() {
    const btn = 'ornza-tw inline-flex items-center justify-center gap-2 bg-espresso text-gold border border-espresso px-4 py-2.5 text-[9px] font-semibold tracking-[0.15em] uppercase rounded-sm transition-all duration-300 hover:bg-gold hover:text-espresso hover:border-gold';
    document.querySelectorAll('.ornza-add-cart, .cat-add-cart-btn, .product-btn.add-to-cart-btn').forEach((el) => {
      add(el, btn);
    });
    document.querySelectorAll('.product-btn-group').forEach((el) => {
      add(el, 'ornza-tw flex items-center gap-2');
    });
    document.querySelectorAll('.product-btn:not(.add-to-cart-btn)').forEach((el) => {
      add(el, 'ornza-tw inline-flex items-center justify-center w-9 h-9 border border-gold/25 text-taupe rounded-sm transition-colors hover:border-gold hover:text-gold');
    });
  }

  function enhanceCollections() {
    document.querySelectorAll('.collections-grid').forEach((el) => {
      add(el, 'ornza-tw grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8');
    });
    document.querySelectorAll('.collection-card').forEach((el) => {
      add(el, 'ornza-tw relative h-[480px] rounded overflow-hidden cursor-pointer border border-gold/15 transition-all duration-500 hover:border-gold/30');
    });
    document.querySelectorAll('.collection-card-title').forEach((el) => {
      add(el, 'ornza-tw font-display text-3xl font-light text-white tracking-wide mb-3');
    });
    document.querySelectorAll('.collection-card-desc').forEach((el) => {
      add(el, 'ornza-tw text-xs text-champagne/90 leading-relaxed mb-6 line-clamp-3');
    });
    document.querySelectorAll('.collection-card-badge').forEach((el) => {
      add(el, 'ornza-tw text-[8px] tracking-[0.3em] uppercase text-gold mb-3');
    });
    document.querySelectorAll('.collection-card-link').forEach((el) => {
      add(el, 'ornza-tw inline-flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-gold-light hover:text-gold transition-colors');
    });
  }

  function enhanceHeroes() {
    document.querySelectorAll('.hero-v2').forEach((el) => {
      add(el, 'ornza-tw relative min-h-[min(100vh,900px)] grid lg:grid-cols-2 bg-espresso overflow-hidden');
    });
    document.querySelectorAll('.hero-v2-left').forEach((el) => {
      add(el, 'ornza-tw flex flex-col justify-center px-8 md:px-12 lg:px-16 py-24 lg:py-32 z-10');
    });
    document.querySelectorAll('.hero-v2-right').forEach((el) => {
      add(el, 'ornza-tw relative hidden lg:flex items-center justify-center overflow-hidden');
    });
    document.querySelectorAll('.hero-v2-right img').forEach((el) => {
      add(el, 'ornza-tw max-h-[85vh] w-auto object-contain');
    });
    document.querySelectorAll('.hero-eyebrow, .category-hero-label').forEach((el) => {
      add(el, 'ornza-tw text-[9px] tracking-[0.35em] uppercase text-gold font-medium mb-4');
    });
    document.querySelectorAll('.hero-v2-h1, .category-hero-title').forEach((el) => {
      add(el, 'ornza-tw font-display text-4xl md:text-5xl lg:text-6xl font-light text-ivory leading-[1.1] tracking-wide mb-5');
    });
    document.querySelectorAll('.hero-v2-h1 em, .category-hero-title em').forEach((el) => {
      add(el, 'ornza-tw italic text-gold');
    });
    document.querySelectorAll('.hero-v2-p, .category-hero-sub').forEach((el) => {
      add(el, 'ornza-tw text-sm md:text-base text-champagne/80 leading-relaxed max-w-lg mb-8');
    });
    document.querySelectorAll('.hero-v2-btns').forEach((el) => {
      add(el, 'ornza-tw flex flex-wrap gap-4 mb-10');
    });
    document.querySelectorAll('.btn-hero-primary').forEach((el) => {
      add(el, 'ornza-tw inline-flex items-center gap-2 bg-gold text-espresso px-6 py-3.5 text-[10px] font-bold tracking-[0.18em] uppercase no-underline rounded transition-all hover:bg-gold-light');
    });
    document.querySelectorAll('.btn-hero-secondary').forEach((el) => {
      add(el, 'ornza-tw inline-flex items-center gap-2 border border-gold/50 text-ivory px-6 py-3.5 text-[10px] font-bold tracking-[0.18em] uppercase no-underline rounded transition-all hover:bg-gold/10 hover:border-gold');
    });
    document.querySelectorAll('.hero-stats').forEach((el) => {
      add(el, 'ornza-tw flex flex-wrap gap-8 md:gap-12');
    });
    document.querySelectorAll('.hero-stat-num').forEach((el) => {
      add(el, 'ornza-tw font-display text-2xl text-gold font-medium');
    });
    document.querySelectorAll('.hero-stat-label').forEach((el) => {
      add(el, 'ornza-tw text-[10px] tracking-[0.15em] uppercase text-champagne/60 mt-1');
    });

    document.querySelectorAll('.category-hero, .hamper-hero').forEach((el) => {
      add(el, 'ornza-tw relative min-h-[380px] md:min-h-[440px] flex items-end bg-espresso overflow-hidden');
    });
    document.querySelectorAll('.category-hero-content').forEach((el) => {
      add(el, 'ornza-tw relative z-10 px-8 md:px-12 py-16 md:py-20 max-w-2xl');
    });
    document.querySelectorAll('.category-hero-line').forEach((el) => {
      add(el, 'ornza-tw absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent');
    });

    document.querySelectorAll('.cat-nav-sticky').forEach((el) => {
      add(el, 'ornza-tw sticky z-[290] bg-ivory/95 backdrop-blur border-b border-gold/15 shadow-sm');
    });
    document.querySelectorAll('.cat-nav-inner').forEach((el) => {
      add(el, 'ornza-tw flex gap-1 overflow-x-auto px-4 py-2 scrollbar-hide');
    });
    document.querySelectorAll('.cat-nav-item').forEach((el) => {
      add(el, 'ornza-tw flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-[0.12em] uppercase text-taupe no-underline rounded-full transition-colors hover:bg-gold/10 hover:text-espresso');
    });
    document.querySelectorAll('.cn-badge').forEach((el) => {
      add(el, 'ornza-tw text-[8px] px-1.5 py-0.5 rounded bg-red-500/90 text-white font-bold');
    });
    document.querySelectorAll('.cn-badge.gold').forEach((el) => {
      add(el, '!bg-gold !text-espresso');
    });

    document.querySelectorAll('.trust-strip-v2').forEach((el) => {
      add(el, 'ornza-tw bg-ivory-alt border-y border-gold/15 py-6');
    });
    document.querySelectorAll('.trust-strip-v2-inner').forEach((el) => {
      add(el, 'ornza-tw max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6');
    });
    document.querySelectorAll('.trust-badge').forEach((el) => {
      add(el, 'ornza-tw flex items-center gap-3');
    });
    document.querySelectorAll('.trust-badge-title').forEach((el) => {
      add(el, 'ornza-tw text-sm font-medium text-espresso');
    });
    document.querySelectorAll('.trust-badge-sub').forEach((el) => {
      add(el, 'ornza-tw text-xs text-taupe');
    });

    document.querySelectorAll('.category-tabs').forEach((el) => {
      add(el, 'ornza-tw sticky z-[280] bg-white border-b border-gold/15 shadow-sm');
    });
    document.querySelectorAll('.category-tabs-inner').forEach((el) => {
      add(el, 'ornza-tw flex gap-0 overflow-x-auto max-w-6xl mx-auto');
    });
    document.querySelectorAll('.cat-tab').forEach((el) => {
      add(el, 'ornza-tw flex-shrink-0 px-5 py-3.5 text-[10px] tracking-[0.15em] uppercase text-taupe no-underline border-b-2 border-transparent transition-all hover:text-gold-deep hover:border-gold/40');
    });
  }

  function enhanceHampers() {
    document.querySelectorAll('.hamper-card').forEach((el) => {
      add(el, 'ornza-tw group bg-white border border-gold/20 rounded-sm overflow-hidden shadow-ornza transition-all duration-300 hover:-translate-y-1 hover:shadow-ornza-lg');
    });
    document.querySelectorAll('.hamper-card-name').forEach((el) => {
      add(el, 'ornza-tw font-display text-xl text-espresso');
    });
    document.querySelectorAll('.hamper-card-desc').forEach((el) => {
      add(el, 'ornza-tw text-sm text-taupe leading-relaxed');
    });
    document.querySelectorAll('.hamper-price').forEach((el) => {
      add(el, 'ornza-tw font-display text-lg text-espresso font-medium');
    });
  }

  function run() {
    enhanceHeroes();
    enhancePageHeaders();
    enhanceSectionHeaders();
    enhanceProductCards();
    enhanceButtons();
    enhanceCollections();
    enhanceHampers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  window.OrnzaEnhance = { run };
})();
