/* ORNZA shared site header — announcement bar + nav + search + mobile drawer */
(function () {
  const mount = document.getElementById('ornza-site-header');
  if (!mount) return;

  const page = mount.dataset.page || detectPage();
  const navMode = mount.dataset.navMode || detectNavMode();

  document.body.classList.add('has-site-header', 'ornza-page');
  if (navMode === 'hero') document.body.classList.add('has-hero');
  if (navMode === 'solid') document.body.classList.add('nav-solid');

  const chevron = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="chevron-icon"><polyline points="6 9 12 15 18 9"/></svg>';

  mount.innerHTML = `
<div class="ornza-header-root ornza-tw" x-data="ornzaNav()" x-cloak @keydown.escape.window="closeAll()">
<div class="site-header-wrap fixed top-0 left-0 right-0 z-[300] w-full">
  <div class="ann-bar ornza-tw bg-gradient-to-r from-[#0a0804] via-[#1a1408] to-[#0a0804] border-b border-gold/20 px-5 overflow-hidden h-[37px] flex items-center" id="ann-bar">
    <div class="ann-bar-track flex gap-20 items-center w-max animate-ann-scroll hover:[animation-play-state:paused]">
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">✦</span> Free Shipping Above ₹999</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">✦</span> Cash on Delivery Available</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">✦</span> Premium Gift Packaging on All Orders</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">✦</span> BIS Hallmarked 925 Silver Collection</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">⭐</span> 10,000+ Happy Customers</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">✦</span> Surat's Most Loved Jewellery Brand</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">✦</span> Free Shipping Above ₹999</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">✦</span> Cash on Delivery Available</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">✦</span> Premium Gift Packaging on All Orders</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">✦</span> BIS Hallmarked 925 Silver Collection</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">⭐</span> 10,000+ Happy Customers</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
      <div class="ann-item flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne/80 whitespace-nowrap"><span class="text-gold">✦</span> Surat's Most Loved Jewellery Brand</div><div class="ann-item-dot w-1 h-1 rounded-full bg-gold/40 flex-shrink-0"></div>
    </div>
  </div>
  <nav class="nav ornza-tw relative w-full grid grid-cols-[minmax(140px,1fr)_auto_minmax(140px,1fr)] items-center gap-3 h-20 px-[6%] transition-all duration-500" id="main-nav">
    <a href="index.html" class="nav-logo justify-self-start font-display text-[2rem] font-light tracking-[0.15em] text-ivory no-underline whitespace-nowrap">ORN<span class="text-gold italic">Z</span>A</a>
    <ul class="nav-links-hp justify-self-center hidden lg:flex items-center list-none m-0 p-0">
      <li><a href="index.html" data-nav="home">Home</a></li>
      <li class="mega-parent">
        <a href="women.html" class="mega-trigger" data-nav="women">Women ${chevron}</a>
        <div class="mega-menu">
          <div class="mega-menu-inner">
            <div class="mega-section">
              <div class="mega-section-label">Women's Jewellery</div>
              <ul class="mega-list">
                <li><a href="women.html#mangalsutras"><span class="mega-icon">◆</span> Mangalsutras</a></li>
                <li><a href="women.html#bracelets"><span class="mega-icon">◆</span> Bracelets</a></li>
                <li><a href="women.html#chains"><span class="mega-icon">◆</span> Chains</a></li>
                <li><a href="women.html#pendants"><span class="mega-icon">◆</span> Pendants</a></li>
                <li><a href="women.html#silver925"><span class="mega-icon">◆</span> 925 Silver</a></li>
                <li><a href="women.html#set-chain-pendant"><span class="mega-icon">◆</span> Set Chain &amp; Pendant</a></li>
                <li><a href="women.html#rings"><span class="mega-icon">◆</span> Rings</a></li>
                <li><a href="women.html#earrings"><span class="mega-icon">◆</span> Earrings</a></li>
                <li><a href="women.html#pearl"><span class="mega-icon">◆</span> Pearl Collection</a></li>
              </ul>
            </div>
            <div class="mega-featured">
              <div class="mega-featured-tag">New Season</div>
              <div class="mega-featured-title">Pearl Collection</div>
              <p class="mega-featured-desc">Timeless elegance with lustrous freshwater pearls</p>
              <a href="women.html#pearl" class="mega-featured-link">Explore →</a>
            </div>
          </div>
        </div>
      </li>
      <li class="mega-parent">
        <a href="men.html" class="mega-trigger" data-nav="men">Men ${chevron}</a>
        <div class="mega-menu">
          <div class="mega-menu-inner">
            <div class="mega-section">
              <div class="mega-section-label">Men's Collection</div>
              <ul class="mega-list">
                <li><a href="men.html#bracelets"><span class="mega-icon">◆</span> Bracelets</a></li>
                <li><a href="men.html#chains"><span class="mega-icon">◆</span> Chains</a></li>
                <li><a href="men.html#pendants"><span class="mega-icon">◆</span> Pendants</a></li>
                <li><a href="men.html#rings"><span class="mega-icon">◆</span> Rings</a></li>
              </ul>
            </div>
            <div class="mega-featured">
              <div class="mega-featured-tag">Best Sellers</div>
              <div class="mega-featured-title">Cuban Link Chains</div>
              <p class="mega-featured-desc">Bold, refined chains for the modern gentleman</p>
              <a href="men.html#chains" class="mega-featured-link">Explore →</a>
            </div>
          </div>
        </div>
      </li>
      <li><a href="silver925.html" data-nav="silver925">925 Silver</a></li>
      <li><a href="hampers.html" data-nav="hampers">Hampers</a></li>
      <li><a href="reviews.html" data-nav="reviews">Reviews</a></li>
      <li><a href="track-order.html" data-nav="track-order">Track Order</a></li>
      <li><a href="collections.html" data-nav="collections">Collections</a></li>
      <li><a href="contact.html" data-nav="contact">Contact</a></li>
      <li><a href="dashboard/customer/login.html" data-nav="account">Account</a></li>
    </ul>
    <div class="nav-right-group justify-self-end flex items-center gap-3">
      <button type="button" class="nav-search-btn w-10 h-10 flex items-center justify-center border border-white/30 rounded-full text-ivory bg-transparent cursor-pointer transition-colors hover:border-gold hover:text-gold" id="search-open-btn" aria-label="Search" @click="openSearch()">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </button>
      <a href="contact.html" class="nav-cta text-[0.72rem] font-medium tracking-[0.18em] uppercase px-5 py-2.5 border border-white/50 text-ivory no-underline whitespace-nowrap transition-all hover:bg-gold hover:border-gold hover:text-espresso">Inquire</a>
      <button type="button" class="nav-hamburger lg:hidden flex flex-col justify-center gap-1.5 w-10 h-10 border border-white/30 rounded bg-transparent cursor-pointer p-2" id="nav-hamburger" aria-label="Menu" :class="{ 'active': mobileOpen }" @click="openMobile()">
        <span class="block w-5 h-0.5 bg-ivory transition-all"></span><span class="block w-5 h-0.5 bg-ivory transition-all"></span><span class="block w-5 h-0.5 bg-ivory transition-all"></span>
      </button>
    </div>
  </nav>
</div>
<div class="search-overlay ornza-tw fixed inset-0 z-[500] bg-espresso/95 backdrop-blur-md flex flex-col items-center justify-center px-6" id="search-overlay" :class="{ 'open': searchOpen }" x-show="searchOpen" x-transition.opacity @click.self="closeSearch()">
  <button type="button" class="absolute top-6 right-6 text-3xl text-champagne/60 hover:text-ivory bg-transparent border-0 cursor-pointer" id="search-close-btn" aria-label="Close search" @click="closeSearch()">×</button>
  <div class="text-[9px] tracking-[0.35em] uppercase text-gold mb-4">What are you looking for?</div>
  <div class="w-full max-w-xl">
    <input type="text" class="search-input w-full bg-transparent border-0 border-b-2 border-gold/30 text-ivory font-display text-2xl md:text-4xl py-4 outline-none focus:border-gold placeholder:text-champagne/25" id="search-input" x-ref="searchInput" placeholder="Search jewellery..." autocomplete="off">
  </div>
  <div class="search-suggestions flex flex-wrap justify-center gap-3 mt-8 max-w-2xl">
    <a href="women.html#earrings" class="search-suggestion text-[10px] tracking-[0.15em] uppercase text-champagne/60 px-4 py-2 border border-gold/20 rounded-full no-underline transition-all hover:border-gold hover:text-gold">Earrings</a>
    <a href="women.html#mangalsutras" class="search-suggestion text-[10px] tracking-[0.15em] uppercase text-champagne/60 px-4 py-2 border border-gold/20 rounded-full no-underline transition-all hover:border-gold hover:text-gold">Mangalsutra</a>
    <a href="silver925.html" class="search-suggestion text-[10px] tracking-[0.15em] uppercase text-champagne/60 px-4 py-2 border border-gold/20 rounded-full no-underline transition-all hover:border-gold hover:text-gold">925 Silver</a>
    <a href="women.html#rings" class="search-suggestion text-[10px] tracking-[0.15em] uppercase text-champagne/60 px-4 py-2 border border-gold/20 rounded-full no-underline transition-all hover:border-gold hover:text-gold">Rings</a>
    <a href="hampers.html" class="search-suggestion text-[10px] tracking-[0.15em] uppercase text-champagne/60 px-4 py-2 border border-gold/20 rounded-full no-underline transition-all hover:border-gold hover:text-gold">Gift Hampers</a>
    <a href="women.html#pearl" class="search-suggestion text-[10px] tracking-[0.15em] uppercase text-champagne/60 px-4 py-2 border border-gold/20 rounded-full no-underline transition-all hover:border-gold hover:text-gold">Pearl Collection</a>
    <a href="men.html#chains" class="search-suggestion text-[10px] tracking-[0.15em] uppercase text-champagne/60 px-4 py-2 border border-gold/20 rounded-full no-underline transition-all hover:border-gold hover:text-gold">Men's Chains</a>
    <a href="women.html#bracelets" class="search-suggestion text-[10px] tracking-[0.15em] uppercase text-champagne/60 px-4 py-2 border border-gold/20 rounded-full no-underline transition-all hover:border-gold hover:text-gold">Bracelets</a>
  </div>
</div>
<div class="mobile-nav-overlay fixed inset-0 bg-black/60 z-[400] backdrop-blur-sm" id="mobile-nav-overlay" x-show="mobileOpen" x-transition.opacity @click="closeMobile()"></div>
<div class="mobile-nav-drawer fixed top-0 z-[410] w-full max-w-[340px] h-screen bg-ivory-alt flex flex-col shadow-[-8px_0_40px_rgba(0,0,0,0.2)] overflow-y-auto transition-transform duration-300 ease-out translate-x-full" id="mobile-nav-drawer" :class="{ 'translate-x-0': mobileOpen, 'translate-x-full': !mobileOpen }" x-show="mobileOpen" x-transition>
  <div class="flex items-center justify-between px-5 py-4 border-b border-gold/15">
    <a href="index.html" class="font-display text-xl tracking-[0.12em] text-espresso no-underline">ORN<span class="text-gold italic">Z</span>A</a>
    <button type="button" class="text-2xl text-taupe bg-transparent border-0 cursor-pointer" id="mobile-nav-close" aria-label="Close" @click="closeMobile()">×</button>
  </div>
  <div class="px-5 py-4">
    <div class="flex items-center gap-2 bg-ivory border border-gold/20 rounded px-3 py-2.5">
      <svg class="text-taupe flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" class="flex-1 bg-transparent border-0 outline-none text-sm text-espresso placeholder:text-taupe/50" id="mobile-search-input" placeholder="Search jewellery...">
    </div>
  </div>
  <div class="flex flex-wrap gap-2 px-5 pb-4">
    <a href="track-order.html" class="text-[10px] tracking-wide uppercase px-3 py-1.5 bg-gold/10 text-espresso rounded-full no-underline border border-gold/20" @click="closeMobile()">📦 Track Order</a>
    <a href="reviews.html" class="text-[10px] tracking-wide uppercase px-3 py-1.5 bg-gold/10 text-espresso rounded-full no-underline border border-gold/20" @click="closeMobile()">⭐ Reviews</a>
    <a href="hampers.html" class="text-[10px] tracking-wide uppercase px-3 py-1.5 bg-gold/10 text-espresso rounded-full no-underline border border-gold/20" @click="closeMobile()">🎁 Hampers</a>
    <a href="silver925.html" class="text-[10px] tracking-wide uppercase px-3 py-1.5 bg-gold/10 text-espresso rounded-full no-underline border border-gold/20" @click="closeMobile()">✦ 925 Silver</a>
  </div>
  <div class="mobile-nav-links flex flex-col px-5 pb-6">
    <a href="index.html" class="py-3 text-sm text-espresso no-underline border-b border-gold/10 font-medium" @click="closeMobile()">Home</a>
    <div class="mobile-nav-group mt-2">
      <div class="text-[9px] tracking-[0.25em] uppercase text-gold-deep font-semibold py-2">Women's Collection</div>
      <a href="women.html#mangalsutras" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Mangalsutras</a>
      <a href="women.html#earrings" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Earrings</a>
      <a href="women.html#bracelets" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Bracelets</a>
      <a href="women.html#chains" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Chains</a>
      <a href="women.html#pendants" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Pendants</a>
      <a href="women.html#rings" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Rings</a>
      <a href="women.html#set-chain-pendant" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Set Chain &amp; Pendant</a>
      <a href="women.html#pearl" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Pearl Collection</a>
    </div>
    <div class="mobile-nav-group mt-2">
      <div class="text-[9px] tracking-[0.25em] uppercase text-gold-deep font-semibold py-2">Men's Collection</div>
      <a href="men.html#bracelets" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Bracelets</a>
      <a href="men.html#chains" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Chains</a>
      <a href="men.html#pendants" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Pendants</a>
      <a href="men.html#rings" class="block py-2.5 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Rings</a>
    </div>
    <a href="silver925.html" class="py-3 text-sm text-espresso no-underline border-t border-gold/10 font-medium" @click="closeMobile()">925 Silver</a>
    <a href="hampers.html" class="py-3 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Gift Hampers</a>
    <a href="reviews.html" class="py-3 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Customer Reviews</a>
    <a href="track-order.html" class="py-3 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Track Order</a>
    <a href="contact.html" class="py-3 text-sm text-taupe no-underline hover:text-gold-deep" @click="closeMobile()">Contact Us</a>
  </div>
  <div class="flex gap-3 px-5 py-5 mt-auto border-t border-gold/15">
    <a href="https://wa.me/919999999999" class="flex-1 text-center py-3 text-[10px] font-semibold tracking-wider uppercase bg-[#25D366] text-white rounded no-underline" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    <a href="contact.html" class="flex-1 text-center py-3 text-[10px] font-semibold tracking-wider uppercase bg-espresso text-gold rounded no-underline" @click="closeMobile()">Inquire Now</a>
  </div>
</div>
</div>`;

  setActiveNav(page);
  initNavScroll(navMode);
  document.getElementById('mobile-search-input')?.addEventListener('input', (e) => mobileSearch(e.target.value));

  const bootAlpine = () => {
    const root = mount.querySelector('.ornza-header-root') || mount;
    if (window.OrnzaStack) window.OrnzaStack.initTree(root);
    else if (window.Alpine) window.Alpine.initTree(root);
  };
  if (window.OrnzaStack) window.OrnzaStack.whenAlpineReady(bootAlpine);
  else document.addEventListener('alpine:init', bootAlpine, { once: true });
})();

document.addEventListener('alpine:init', () => {
  if (window.Alpine) Alpine.data('ornzaNav', ornzaNav);
});

function ornzaNav() {
  return {
    mobileOpen: false,
    searchOpen: false,
    openMobile() {
      this.searchOpen = false;
      this.mobileOpen = true;
      document.body.style.overflow = 'hidden';
      document.getElementById('mobile-nav-drawer')?.classList.remove('open');
      document.getElementById('mobile-nav-overlay')?.classList.remove('open');
    },
    closeMobile() {
      this.mobileOpen = false;
      document.getElementById('mobile-nav-drawer')?.classList.remove('open');
      document.getElementById('mobile-nav-overlay')?.classList.remove('open');
      if (!this.searchOpen) document.body.style.overflow = '';
    },
    openSearch() {
      this.mobileOpen = false;
      this.searchOpen = true;
      document.body.style.overflow = 'hidden';
      this.$nextTick(() => this.$refs.searchInput?.focus());
    },
    closeSearch() {
      this.searchOpen = false;
      if (!this.mobileOpen) document.body.style.overflow = '';
    },
    closeAll() {
      this.mobileOpen = false;
      this.searchOpen = false;
      document.body.style.overflow = '';
    }
  };
}

function detectPage() {
  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const map = {
    'index.html': 'home',
    'women.html': 'women',
    'men.html': 'men',
    'silver925.html': 'silver925',
    'hampers.html': 'hampers',
    'reviews.html': 'reviews',
    'track-order.html': 'track-order',
    'contact.html': 'contact',
    'about.html': 'about',
    'collections.html': 'collections',
    'earrings.html': 'women',
    'rings.html': 'women',
    'necklaces.html': 'women',
    'bracelets.html': 'women',
    'bangles.html': 'women',
    'diamonds.html': 'women',
    'product.html': 'women',
  };
  return map[file] || 'home';
}

function detectNavMode() {
  if (document.querySelector('.hero-v2, .category-hero, .track-page, .reviews-hero, .reviews-page-hero, .hamper-hero')) return 'hero';
  return 'solid';
}

function setActiveNav(page) {
  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.classList.toggle('active', el.dataset.nav === page);
  });
}

function initNavScroll(navMode) {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  if (navMode === 'solid') nav.classList.add('scrolled');

  const onScroll = () => {
    const overLight = navMode === 'solid' || window.scrollY > 100;
    nav.classList.toggle('scrolled', overLight);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function mobileSearch(val) {
  if (!val || val.length < 2) return;
  const suggestions = {
    earring: 'women.html#earrings',
    ring: 'women.html#rings',
    bracelet: 'women.html#bracelets',
    necklace: 'women.html#chains',
    mangal: 'women.html#mangalsutras',
    silver: 'silver925.html',
    hamper: 'hampers.html',
    pendant: 'women.html#pendants',
    pearl: 'women.html#pearl',
    chain: 'men.html#chains',
  };
  const q = val.toLowerCase();
  for (const [kw, url] of Object.entries(suggestions)) {
    if (q.includes(kw)) {
      window.location.href = url;
      break;
    }
  }
}
