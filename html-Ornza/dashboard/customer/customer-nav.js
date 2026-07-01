/* ORNZA Customer portal — shared sidebar navigation (Tailwind) */
(function () {
  const mount = document.getElementById('customer-sidebar');
  if (!mount) return;

  const page = mount.dataset.page || '';

  const links = [
    { id: 'overview', href: 'index.html', label: 'Overview', icon: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>' },
    { id: 'orders', href: 'orders.html', label: 'My Orders', icon: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>', badge: '3' },
    { id: 'order-track', href: 'order-track.html', label: 'Order Tracker', icon: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' },
    { id: 'wishlist', href: 'wishlist.html', label: 'Wishlist', icon: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' },
    { id: 'addresses', href: 'addresses.html', label: 'Addresses', icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>' },
    { id: 'profile', href: 'profile.html', label: 'Profile & Settings', icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  ];

  const linkCls = (active) =>
    `portal-nav-link ornza-tw flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium no-underline transition-all mb-0.5 ${
      active
        ? 'bg-gold/12 text-gold-deep font-semibold'
        : 'text-portal-muted hover:bg-gold/8 hover:text-espresso'
    }`;

  const navHtml = links.map((link) => {
    const active = link.id === page;
    const badge = link.badge
      ? `<span class="nav-badge ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gold text-espresso">${link.badge}</span>`
      : '';
    return `<a href="${link.href}" class="${linkCls(active)}">
      <svg class="w-[18px] h-[18px] flex-shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${link.icon}</svg>
      <span class="flex-1">${link.label}</span>${badge}
    </a>`;
  }).join('');

  mount.innerHTML = `
    <div class="ornza-tw portal-brand px-6 py-5 border-b border-gold/15 flex items-center gap-3">
      <div class="portal-brand-logo font-display text-xl tracking-wider text-espresso">ORN<span class="text-gold italic">Z</span>A</div>
      <span class="portal-brand-badge text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded bg-gold/15 text-gold-deep font-semibold">Customer</span>
    </div>
    <nav class="portal-nav ornza-tw flex-1 px-3 py-4 overflow-y-auto">
      <div class="text-[9px] tracking-[0.22em] uppercase text-portal-muted font-semibold px-3 pt-1 pb-1.5">My Account</div>
      ${navHtml}
    </nav>
    <div class="ornza-tw portal-sidebar-footer px-3 py-4 border-t border-gold/15">
      <div class="flex items-center gap-2.5 px-3 py-2.5 mb-2">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center text-xs font-semibold text-espresso flex-shrink-0">PS</div>
        <div class="min-w-0">
          <div class="text-xs font-semibold text-espresso truncate">Priya Sharma</div>
          <div class="text-[10px] text-portal-muted">Gold Member</div>
        </div>
      </div>
      <a href="../../index.html" class="portal-back-link ornza-tw flex items-center gap-2 px-3 py-2 text-xs text-portal-muted no-underline rounded-lg hover:bg-gold/8 hover:text-espresso transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to Store
      </a>
      <a href="login.html" class="portal-back-link ornza-tw flex items-center gap-2 px-3 py-2 mt-1 text-xs text-portal-muted no-underline rounded-lg hover:bg-gold/8 hover:text-espresso transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign Out
      </a>
    </div>`;
})();
