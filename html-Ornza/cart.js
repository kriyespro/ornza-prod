/* ORNZA — Shared shopping cart (localStorage + drawer) */
(function () {
  const STORAGE_KEY = 'ornzaCart';
  const WA_NUMBER = '919999999999';

  const CART_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/><path d="M3 3h2l2.2 10.3a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H6"/></svg>`;

  const parsePrice = (str) => parseInt(String(str).replace(/[^\d]/g, ''), 10) || 0;

  const addCartMarkup = (label = 'Add') =>
    `${CART_ICON}<span class="ornza-add-cart-label ornza-tw">${label}</span>`;

  const flashAddCartBtn = (btn) => {
    if (!btn) return;
    btn.classList.add('added');
    const label = btn.querySelector('.ornza-add-cart-label, .prod-add-cart-label, .add-cart-label');
    if (label) {
      if (!btn.dataset.originalLabel) btn.dataset.originalLabel = label.textContent;
      label.textContent = 'Added ✓';
      setTimeout(() => {
        btn.classList.remove('added');
        label.textContent = btn.dataset.originalLabel;
      }, 1800);
      return;
    }
    if (!btn.dataset.originalLabel) btn.dataset.originalLabel = btn.textContent;
    btn.textContent = 'Added ✓';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.textContent = btn.dataset.originalLabel;
    }, 1800);
  };

  const getCart = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const setCart = (cart) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  };

  const injectCartUI = () => {
    if (document.getElementById('cart-drawer')) return;

    const wrap = document.createElement('div');
    wrap.id = 'ornza-cart-root';
    wrap.setAttribute('x-data', 'ornzaCart()');
    wrap.setAttribute('x-cloak', '');
    wrap.innerHTML = `
<div class="ornza-tw fixed bottom-6 right-6 z-[700]">
  <button type="button" class="cart-float-btn relative w-14 h-14 rounded-full bg-espresso text-gold shadow-ornza-lg flex items-center justify-center border border-gold/30 transition-all duration-300 hover:bg-gold hover:text-espresso hover:scale-105" id="cart-float-open" aria-label="Open cart" @click="openCart()">
    <span class="cart-count absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1" id="cart-count">0</span>
    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <circle cx="9" cy="20" r="1"></circle>
      <circle cx="17" cy="20" r="1"></circle>
      <path d="M3 3h2l2.2 10.3a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H6"></path>
    </svg>
  </button>
</div>
<div class="ornza-tw cart-drawer fixed top-0 right-0 z-[710] w-full max-w-[400px] h-screen bg-ivory-alt flex flex-col shadow-[-8px_0_40px_rgba(0,0,0,0.15)] transition-transform duration-350 ease-out" id="cart-drawer" aria-hidden="true" :class="open ? 'translate-x-0' : 'translate-x-full'" x-show="open" @keydown.escape.window="close()">
  <div class="flex items-center justify-between px-6 py-5 border-b border-gold/20">
    <div class="font-display text-xl text-espresso">Your Cart</div>
    <button type="button" class="text-2xl leading-none text-taupe-muted hover:text-espresso p-1 bg-transparent border-0 cursor-pointer" id="cart-drawer-close" aria-label="Close cart" @click="close()">&times;</button>
  </div>
  <div class="flex-1 overflow-y-auto px-6 py-5" id="cart-body"></div>
  <div class="px-6 py-5 border-t border-gold/20" id="cart-footer" hidden>
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs text-taupe uppercase tracking-wider">Total (est.)</span>
      <span class="font-display text-xl text-espresso font-medium" id="cart-total">₹0</span>
    </div>
    <p class="text-[11px] text-taupe mb-4" id="cart-shipping-note">Free shipping on orders above ₹999</p>
    <button type="button" class="w-full bg-espresso text-gold border-0 py-3.5 text-[9px] font-bold tracking-[0.2em] uppercase rounded cursor-pointer transition-colors hover:bg-gold hover:text-espresso" id="cart-checkout-btn">Order via WhatsApp</button>
  </div>
</div>
<div class="ornza-tw fixed inset-0 bg-black/50 z-[705] backdrop-blur-[2px]" id="cart-overlay-bg" x-show="open" x-transition.opacity @click="close()"></div>`;
    document.body.appendChild(wrap);

    document.getElementById('cart-checkout-btn')?.addEventListener('click', whatsappOrder);

    const bootAlpine = () => {
      if (window.OrnzaStack) window.OrnzaStack.initTree(wrap);
      else if (window.Alpine) window.Alpine.initTree(wrap);
    };
    if (window.OrnzaStack) window.OrnzaStack.whenAlpineReady(bootAlpine);
    else document.addEventListener('alpine:init', bootAlpine, { once: true });
  };

  const updateCartCount = () => {
    const cart = getCart();
    const count = cart.reduce((s, i) => s + (i.qty || 1), 0);
    document.querySelectorAll('#cart-count, .cart-count').forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  };

  const renderCart = () => {
    const body = document.getElementById('cart-body');
    const footer = document.getElementById('cart-footer');
    if (!body) return;

    const cart = getCart();
    if (!cart.length) {
      body.innerHTML = `
        <div class="ornza-tw text-center py-12 px-4">
          <div class="text-4xl text-gold mb-3">✦</div>
          <p class="text-sm text-taupe-muted leading-relaxed mb-5">Your cart is empty.<br>Add jewellery to get started.</p>
          <a href="women.html" class="inline-block bg-espresso text-gold px-6 py-3 rounded text-[10px] font-semibold tracking-[0.15em] uppercase no-underline transition-colors hover:bg-gold hover:text-espresso">Shop Now</a>
        </div>`;
      if (footer) footer.hidden = true;
      return;
    }

    let total = 0;
    body.innerHTML = cart.map((item, idx) => {
      const unit = parsePrice(item.price);
      total += unit * (item.qty || 1);
      const img = item.img || 'images/earrings.png';
      const safeName = item.name.replace(/</g, '&lt;');
      return `
        <div class="ornza-tw flex gap-3 py-4 border-b border-gold/10 last:border-0">
          <img class="w-16 h-16 object-cover rounded border border-gold/15 flex-shrink-0" src="${img}" alt="" loading="lazy">
          <div class="flex-1 min-w-0">
            <div class="text-sm text-espresso font-medium truncate">${safeName}</div>
            <div class="text-xs text-taupe mt-0.5">${item.price} × ${item.qty || 1}</div>
          </div>
          <button type="button" class="text-taupe-muted hover:text-red-500 text-xl leading-none p-1 bg-transparent border-0 cursor-pointer flex-shrink-0" data-cart-index="${idx}" aria-label="Remove">&times;</button>
        </div>`;
    }).join('');

    body.querySelectorAll('.cart-item-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        removeFromCart(parseInt(btn.dataset.cartIndex, 10));
      });
    });

    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = '₹' + total.toLocaleString('en-IN');

    const shipNote = document.getElementById('cart-shipping-note');
    if (shipNote) {
      shipNote.textContent = total >= 999
        ? '✓ Free shipping applied'
        : 'Add ₹' + (999 - total).toLocaleString('en-IN') + ' more for free shipping';
      shipNote.classList.toggle('cart-shipping-free', total >= 999);
    }

    if (footer) footer.hidden = false;
  };

  const showToast = (message) => {
    let toast = document.querySelector('.cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'cart-toast ornza-tw fixed bottom-24 right-6 z-[720] bg-espresso text-gold text-xs font-medium px-4 py-2.5 rounded shadow-ornza-lg opacity-0 translate-y-2 transition-all duration-300';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show', 'opacity-100', 'translate-y-0');
    toast.classList.remove('opacity-0', 'translate-y-2');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toast.classList.remove('show', 'opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-2');
    }, 2000);
  };

  function addToCart(name, price, img, btn) {
    if (!name) return;
    const cart = getCart();
    const existing = cart.find((i) => i.name === name);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({ name, price: price || '₹0', img: img || 'images/earrings.png', qty: 1 });
    }
    setCart(cart);
    updateCartCount();
    renderCart();

    const count = cart.reduce((s, i) => s + (i.qty || 1), 0);
    showToast(`Added to cart · ${count} item${count === 1 ? '' : 's'}`);

    flashAddCartBtn(btn);

    if (btn?.dataset?.name && typeof window.addToRecentlyViewed === 'function') {
      window.addToRecentlyViewed(btn.dataset.name, btn.dataset.price, btn.dataset.img);
    }
  }

  function removeFromCart(idx) {
    const cart = getCart();
    cart.splice(idx, 1);
    setCart(cart);
    updateCartCount();
    renderCart();
  }

  function setCartOpen(isOpen) {
    const drawer = document.getElementById('cart-drawer');
    const root = document.getElementById('ornza-cart-root');
    if (!drawer) return;
    drawer.classList.toggle('open', isOpen);
    drawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (root?._x_dataStack?.[0]) root._x_dataStack[0].open = isOpen;
    if (isOpen) renderCart();
  }

  function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    setCartOpen(!drawer.classList.contains('open'));
  }

  function whatsappOrder() {
    const cart = getCart();
    if (!cart.length) return;
    let msg = 'Hi ORNZA! I would like to order:\n\n';
    cart.forEach((item) => {
      msg += `• ${item.name} × ${item.qty || 1} (${item.price})\n`;
    });
    const total = cart.reduce((s, i) => s + parsePrice(i.price) * (i.qty || 1), 0);
    msg += `\nEstimated total: ₹${total.toLocaleString('en-IN')}\nPlease confirm availability and payment options.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  }

  function bindHamperCards() {
    document.querySelectorAll('.hamper-card').forEach((card) => {
      if (card.querySelector('.cat-add-cart-btn')) return;
      const name = card.querySelector('.hamper-card-name')?.textContent?.trim();
      const priceEl = card.querySelector('.hamper-price');
      const price = priceEl?.childNodes[0]?.textContent?.trim() || priceEl?.textContent?.trim();
      const img = card.querySelector('.hamper-card-img')?.getAttribute('src') || 'images/hampers.png';
      const footer = card.querySelector('.hamper-card-footer');
      if (!name || !footer) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ornza-add-cart cat-add-cart-btn';
      btn.setAttribute('aria-label', 'Add to cart');
      btn.innerHTML = addCartMarkup('Add');
      btn.addEventListener('click', () => addToCart(name, price, img, btn));
      footer.appendChild(btn);
    });
  }

  function bindCatalogCards() {
    document.querySelectorAll('.cat-product-card').forEach((card) => {
      if (card.querySelector('.cat-add-cart-btn')) return;
      const name = card.querySelector('.cat-product-name')?.textContent?.trim();
      const price = card.querySelector('.cat-product-price')?.textContent?.trim();
      const img = card.querySelector('.cat-product-img img')?.getAttribute('src');
      const footer = card.querySelector('.cat-product-footer');
      if (!name || !footer) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ornza-add-cart cat-add-cart-btn';
      btn.setAttribute('aria-label', 'Add to cart');
      btn.innerHTML = addCartMarkup('Add');
      btn.addEventListener('click', () => addToCart(name, price, img, btn));
      footer.appendChild(btn);
    });
  }

  function bindProductPageButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
      if (btn.dataset.cartBound) return;
      btn.dataset.cartBound = '1';
      btn.classList.add('ornza-add-cart');

      const card = btn.closest('.product-card');
      const title = card?.querySelector('.product-title')?.textContent?.trim();
      const price = card?.querySelector('.product-price')?.textContent?.trim();
      const img = card?.querySelector('.product-image-container img')?.getAttribute('src');

      if (!btn.querySelector('.ornza-add-cart-label, .add-cart-label')) {
        const label = document.createElement('span');
        label.className = 'ornza-add-cart-label';
        label.textContent = 'Add';
        btn.appendChild(label);
      }

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const prodId = btn.getAttribute('data-product-id');
        const db = window.ORNZA_PRODUCTS;
        if (prodId && db && db[prodId]) {
          const p = db[prodId];
          const pPrice = p.price || price || '₹0';
          addToCart(p.title, pPrice, p.image || img, btn);
        } else if (title) {
          addToCart(title, price, img, btn);
        }
      });
    });
  }

  function migrateLegacyCart() {
    try {
      const legacy = localStorage.getItem('ornza_cart');
      if (!legacy) return;
      const parsed = JSON.parse(legacy);
      if (!Array.isArray(parsed) || !parsed.length) return;
      const cart = getCart();
      if (cart.length) return;
      /* legacy items only had id — skip empty migration */
      localStorage.removeItem('ornza_cart');
    } catch { /* ignore */ }
  }

  document.addEventListener('DOMContentLoaded', () => {
    migrateLegacyCart();
    injectCartUI();

    document.querySelectorAll('[onclick*="toggleCart"]').forEach((el) => {
      el.removeAttribute('onclick');
      el.addEventListener('click', toggleCart);
    });

    const closeBtn = document.querySelector('.cart-drawer-close:not(#cart-drawer-close)');
    if (closeBtn && !closeBtn.id) {
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', toggleCart);
    }

    document.getElementById('cart-overlay-bg')?.addEventListener('click', toggleCart);
    document.getElementById('cart-checkout-btn')?.addEventListener('click', whatsappOrder);

    document.querySelectorAll('.prod-add-cart').forEach((btn) => {
      if (btn.dataset.cartBound) return;
      btn.dataset.cartBound = '1';
      btn.classList.add('ornza-add-cart');
      const label = btn.querySelector('.ornza-add-cart-label, .prod-add-cart-label');
      if (label) label.classList.add('ornza-add-cart-label');
      else btn.innerHTML = addCartMarkup('Add');
      btn.addEventListener('click', () => {
        addToCart(btn.dataset.name, btn.dataset.price, btn.dataset.img, btn);
      });
    });

    document.querySelectorAll('.qv-add-cart').forEach((btn) => {
      btn.classList.add('ornza-add-cart');
    });

    bindCatalogCards();
    bindHamperCards();
    bindProductPageButtons();
    updateCartCount();
    renderCart();
    window.OrnzaEnhance?.run();
  });

  window.OrnzaCart = {
    addToCart,
    removeFromCart,
    toggleCart,
    whatsappOrder,
    getCart,
    updateCartCount,
    renderCart,
    showToast,
    bindCatalogCards,
    bindHamperCards,
    bindProductPageButtons,
  };

  window.addToCart = addToCart;
  window.toggleCart = toggleCart;
  window.removeFromCart = removeFromCart;
  window.whatsappOrder = whatsappOrder;

  function ornzaCart() {
    return {
      open: false,
      openCart() {
        this.open = true;
        setCartOpen(true);
      },
      close() {
        this.open = false;
        setCartOpen(false);
      },
      toggle() {
        this.open = !this.open;
        setCartOpen(this.open);
      }
    };
  }

  document.addEventListener('alpine:init', () => {
    if (window.Alpine) Alpine.data('ornzaCart', ornzaCart);
  });
})();
