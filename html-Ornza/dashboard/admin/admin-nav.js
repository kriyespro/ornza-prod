/* ORNZA Admin — shared sidebar navigation (Tailwind) */
(function () {
  const mount = document.getElementById('admin-sidebar');
  if (!mount) return;

  const page = mount.dataset.page || '';
  const ordersBadge = mount.dataset.ordersBadge || '18';

  const items = [
    { section: 'Overview', links: [
      { id: 'dashboard', href: 'index.html', label: 'Dashboard', icon: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>' },
      { id: 'analytics', href: 'analytics.html', label: 'Analytics', icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' },
    ]},
    { section: 'Catalog', links: [
      { id: 'products', href: 'products.html', label: 'All Products', icon: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>' },
      { id: 'product-add', href: 'product-add.html', label: 'Add Product', icon: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' },
      { id: 'categories', href: 'categories.html', label: 'Categories', icon: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>' },
      { id: 'hampers', href: 'hampers.html', label: 'Hampers', icon: '<path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>' },
      { id: 'inventory', href: 'inventory.html', label: 'Inventory', icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' },
    ]},
    { section: 'Sales', links: [
      { id: 'orders', href: 'orders.html', label: 'Orders', icon: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>', badge: ordersBadge },
      { id: 'customers', href: 'customers.html', label: 'Customers', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
      { id: 'reviews', href: 'reviews.html', label: 'Reviews', icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' },
    ]},
    { section: 'Configuration', links: [
      { id: 'settings', href: 'settings.html', label: 'Settings', icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>' },
    ]},
  ];

  const linkCls = (active) =>
    `portal-nav-link ornza-tw flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium no-underline transition-all mb-0.5 ${
      active
        ? 'bg-gold/15 text-gold-light font-semibold'
        : 'text-champagne/75 hover:bg-gold/10 hover:text-gold-light'
    }`;

  let navHtml = '';
  items.forEach((group) => {
    navHtml += `<div class="ornza-tw text-[9px] tracking-[0.22em] uppercase text-champagne/40 font-semibold px-3 pt-3 pb-1.5">${group.section}</div>`;
    group.links.forEach((link) => {
      const active = link.id === page;
      const badge = link.badge
        ? `<span class="nav-badge ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gold text-espresso">${link.badge}</span>`
        : '';
      navHtml += `<a href="${link.href}" class="${linkCls(active)}">
        <svg class="w-[18px] h-[18px] flex-shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${link.icon}</svg>
        <span class="flex-1">${link.label}</span>${badge}
      </a>`;
    });
  });

  mount.innerHTML = `
    <div class="ornza-tw portal-brand px-6 py-5 border-b border-gold/10 flex items-center gap-3">
      <div class="portal-brand-logo font-display text-xl tracking-wider text-gold-light">ORN<span class="text-gold italic">Z</span>A</div>
      <span class="portal-brand-badge text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded bg-gold/20 text-gold-light font-semibold">Admin</span>
    </div>
    <nav class="portal-nav ornza-tw flex-1 px-3 py-4 overflow-y-auto">${navHtml}</nav>
    <div class="ornza-tw portal-sidebar-footer px-3 py-4 border-t border-gold/10">
      <div class="flex items-center gap-2.5 px-3 py-2.5 mb-2">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center text-xs font-semibold text-espresso flex-shrink-0">AK</div>
        <div class="min-w-0">
          <div class="text-xs font-semibold text-gold-light truncate">Admin Kumar</div>
          <div class="text-[10px] text-champagne/50">Store Owner</div>
        </div>
      </div>
      <a href="../../index.html" class="portal-back-link ornza-tw flex items-center gap-2 px-3 py-2 text-xs text-champagne/60 no-underline rounded-lg hover:bg-gold/10 hover:text-gold-light transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        View Store
      </a>
      <a href="login.html" class="portal-back-link ornza-tw flex items-center gap-2 px-3 py-2 mt-1 text-xs text-champagne/60 no-underline rounded-lg hover:bg-gold/10 hover:text-gold-light transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign Out
      </a>
    </div>`;
})();
