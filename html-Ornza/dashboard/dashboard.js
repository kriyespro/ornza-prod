/* ORNZA Portal — sidebar toggle, mobile nav, table row actions */
(function () {
  const sidebar = document.querySelector('.portal-sidebar');
  const overlay = document.querySelector('.portal-sidebar-overlay');
  const toggle = document.querySelector('.portal-topbar-toggle');

  function openSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle?.addEventListener('click', () => {
    if (sidebar?.classList.contains('open')) closeSidebar();
    else openSidebar();
  });

  overlay?.addEventListener('click', closeSidebar);

  /* Re-apply portal Tailwind after nav injection */
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => window.PortalEnhance?.run(), 50);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeSidebar();
  });

  /* Demo: mark order rows clickable */
  document.querySelectorAll('[data-href]').forEach((row) => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      window.location.href = row.dataset.href;
    });
  });

  /* Demo: toast on form submit */
  document.querySelectorAll('.portal-form-demo').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Saved ✓';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = orig;
          btn.disabled = false;
        }, 2000);
      }
    });
  });
})();
