/* ORNZA — Product detail page (?id=product-slug) */
(function () {
  const CAT_LINKS = {
    Rings: 'rings.html',
    Diamonds: 'diamonds.html',
    Necklaces: 'necklaces.html',
    Bangles: 'bangles.html',
    Earrings: 'earrings.html',
    Bracelets: 'bracelets.html',
  };

  const WA = '919999999999';

  function show(el) {
    if (!el) return;
    el.hidden = false;
    el.removeAttribute('hidden');
    el.style.removeProperty('display');
  }

  function hide(el) {
    if (!el) return;
    el.hidden = true;
    el.style.display = 'none';
  }

  function renderRelated(currentId, category) {
    const section = document.getElementById('pdp-related-section');
    const wrap = document.getElementById('pdp-related');
    const db = window.ORNZA_PRODUCTS;
    if (!section || !wrap || !db) return;

    const related = Object.entries(db)
      .filter(([id, p]) => id !== currentId && p.category === category)
      .slice(0, 4);

    if (!related.length) return;

    wrap.innerHTML = related.map(([id, p]) => `
      <a href="product.html?id=${encodeURIComponent(id)}" class="group bg-white border border-gold/20 rounded overflow-hidden shadow-ornza no-underline transition-all hover:-translate-y-1 hover:shadow-ornza-lg">
        <div class="aspect-square bg-ivory-alt p-3 flex items-center justify-center overflow-hidden">
          <img src="${p.image}" alt="${p.title}" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy">
        </div>
        <div class="p-3">
          <div class="text-[8px] tracking-wider uppercase text-gold mb-1">${p.category}</div>
          <div class="text-sm text-espresso font-medium truncate">${p.title}</div>
          <div class="text-sm text-taupe mt-1">${p.price}</div>
        </div>
      </a>`).join('');

    show(section);
  }

  function render(product, id) {
    hide(document.getElementById('product-loading'));
    hide(document.getElementById('product-not-found'));
    show(document.getElementById('product-detail'));

    document.title = `${product.title} · ORNZA`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = `${product.title} — ${product.material}. ${product.price}. Shop ORNZA luxury artificial jewellery.`;

    const img = document.getElementById('pdp-image');
    if (img) {
      img.src = product.image;
      img.alt = product.title;
    }

    const set = (sel, text) => {
      const el = document.getElementById(sel);
      if (el) el.textContent = text;
    };

    set('pdp-title', product.title);
    set('pdp-price', product.price);
    set('pdp-desc', product.desc);
    set('pdp-material', product.material);
    set('pdp-stones', product.stones);
    set('pdp-category', product.category || 'Jewellery');
    set('pdp-breadcrumb-title', product.title);

    const catLink = document.getElementById('pdp-breadcrumb-cat-link');
    if (catLink) {
      catLink.textContent = product.category || 'Collections';
      catLink.href = CAT_LINKS[product.category] || 'collections.html';
    }

    const wa = document.getElementById('pdp-whatsapp');
    if (wa) {
      const msg = `Hi ORNZA! I'm interested in "${product.title}" (${product.material}) — ${product.price}. Please confirm availability and delivery.`;
      wa.href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    }

    const addBtn = document.getElementById('pdp-add-cart');
    if (addBtn) {
      addBtn.onclick = () => {
        if (window.OrnzaCart) {
          window.OrnzaCart.addToCart(product.title, product.price, product.image, addBtn);
        } else if (window.addToCart) {
          window.addToCart(product.title, product.price, product.image, addBtn);
        }
      };
    }

    renderRelated(id, product.category);
  }

  function init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const loading = document.getElementById('product-loading');
    const notFound = document.getElementById('product-not-found');

    if (!id) {
      hide(loading);
      show(notFound);
      return;
    }

    const product = window.OrnzaProducts?.getProduct(id) || window.ORNZA_PRODUCTS?.[id];
    if (!product) {
      hide(loading);
      show(notFound);
      return;
    }

    render(product, id);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
