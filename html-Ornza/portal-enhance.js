/* ORNZA Portal — Tailwind utility migration for dashboard/admin/customer */
(function () {
  if (!document.body.classList.contains('portal')) return;

  const add = (el, cls) => {
    if (!el) return;
    cls.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
  };

  function enhanceShell() {
    document.body.classList.add('ornza-tw', 'bg-ivory', 'text-portal-text', 'font-sans', 'antialiased');
    add(document.querySelector('.portal-shell'), 'flex min-h-screen');
    add(document.querySelector('.portal-main'), 'flex-1 ml-0 lg:ml-[260px] min-w-0 flex flex-col min-h-screen');
    add(document.querySelector('.portal-sidebar-overlay'), 'fixed inset-0 bg-black/40 z-[90]');
    add(document.querySelector('.portal-content'), 'flex-1 p-6 md:p-8');
  }

  function enhanceSidebar() {
    document.querySelectorAll('.portal-sidebar').forEach((el) => {
      add(el, 'fixed top-0 left-0 bottom-0 z-[100] w-[260px] flex flex-col transition-transform duration-300');
    });
    document.querySelectorAll('.portal-sidebar.admin-sidebar').forEach((el) => {
      add(el, 'bg-espresso border-r border-gold/10');
    });
    document.querySelectorAll('.portal-sidebar:not(.admin-sidebar)').forEach((el) => {
      add(el, 'bg-white border-r border-gold/20 shadow-ornza');
    });
  }

  function enhanceTopbar() {
    document.querySelectorAll('.portal-topbar').forEach((el) => {
      add(el, 'sticky top-0 z-50 h-16 bg-white/95 backdrop-blur border-b border-gold/15 flex items-center gap-4 px-4 md:px-6');
    });
    document.querySelectorAll('.portal-topbar-title').forEach((el) => {
      add(el, 'font-display text-lg text-espresso font-medium');
    });
    document.querySelectorAll('.portal-topbar-toggle').forEach((el) => {
      add(el, 'lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-gold/20 text-taupe hover:bg-gold/10');
    });
    document.querySelectorAll('.portal-search').forEach((el) => {
      add(el, 'hidden md:flex items-center gap-2 bg-ivory-alt border border-gold/20 rounded-lg px-3 py-2 min-w-[220px]');
    });
    document.querySelectorAll('.portal-search input').forEach((el) => {
      add(el, 'bg-transparent border-0 outline-none text-sm text-espresso placeholder:text-taupe/50 w-full');
    });
    document.querySelectorAll('.portal-icon-btn').forEach((el) => {
      add(el, 'relative w-10 h-10 flex items-center justify-center rounded-lg border border-gold/20 text-taupe hover:bg-gold/10 transition-colors');
    });
  }

  function enhanceCards() {
    document.querySelectorAll('.portal-stat-grid').forEach((el) => {
      add(el, 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6');
    });
    document.querySelectorAll('.portal-stat-card').forEach((el) => {
      add(el, 'bg-white border border-gold/15 rounded-xl p-5 shadow-ornza relative overflow-hidden');
    });
    document.querySelectorAll('.portal-stat-label').forEach((el) => {
      add(el, 'text-[10px] tracking-[0.15em] uppercase text-portal-muted font-medium mb-1');
    });
    document.querySelectorAll('.portal-stat-value').forEach((el) => {
      add(el, 'font-display text-2xl text-espresso font-medium');
    });
    document.querySelectorAll('.portal-stat-change.up').forEach((el) => {
      add(el, 'text-xs text-emerald-600 mt-1');
    });
    document.querySelectorAll('.portal-stat-change.down').forEach((el) => {
      add(el, 'text-xs text-red-500 mt-1');
    });
    document.querySelectorAll('.portal-card').forEach((el) => {
      add(el, 'bg-white border border-gold/15 rounded-xl shadow-ornza overflow-hidden');
    });
    document.querySelectorAll('.portal-card-header').forEach((el) => {
      add(el, 'px-5 py-4 border-b border-gold/10 flex items-center justify-between');
    });
    document.querySelectorAll('.portal-card-title').forEach((el) => {
      add(el, 'font-display text-base text-espresso font-medium');
    });
    document.querySelectorAll('.portal-card-body').forEach((el) => {
      add(el, 'p-5');
    });
    document.querySelectorAll('.portal-grid-2').forEach((el) => {
      add(el, 'grid grid-cols-1 lg:grid-cols-2 gap-6');
    });
    document.querySelectorAll('.portal-page-header p').forEach((el) => {
      add(el, 'text-sm text-portal-muted mb-6');
    });
  }

  function enhanceForms() {
    document.querySelectorAll('.portal-form-label').forEach((el) => {
      add(el, 'block text-xs font-medium text-portal-muted mb-1.5');
    });
    document.querySelectorAll('.portal-form-input, .portal-form-select, .portal-form-textarea').forEach((el) => {
      add(el, 'w-full bg-ivory-alt border border-gold/20 rounded-lg px-3 py-2.5 text-sm text-espresso outline-none focus:border-gold transition-colors');
    });
    document.querySelectorAll('.portal-btn-primary').forEach((el) => {
      add(el, 'inline-flex items-center justify-center gap-2 bg-espresso text-gold border border-espresso px-4 py-2.5 text-xs font-semibold tracking-wide uppercase rounded-lg transition-colors hover:bg-gold hover:text-espresso');
    });
    document.querySelectorAll('.portal-btn-secondary, .portal-btn-outline').forEach((el) => {
      add(el, 'inline-flex items-center justify-center gap-2 bg-transparent text-espresso border border-gold/30 px-4 py-2.5 text-xs font-semibold tracking-wide uppercase rounded-lg transition-colors hover:border-gold hover:text-gold-deep');
    });
    document.querySelectorAll('.portal-btn-sm').forEach((el) => {
      add(el, '!px-3 !py-2 !text-[10px]');
    });
    document.querySelectorAll('.portal-form-group').forEach((el) => {
      add(el, 'mb-4');
    });
  }

  function enhanceTables() {
    document.querySelectorAll('.portal-table-wrap').forEach((el) => {
      add(el, 'overflow-x-auto rounded-xl border border-gold/15 bg-white shadow-ornza');
    });
    document.querySelectorAll('.portal-table').forEach((el) => {
      add(el, 'w-full text-sm text-left');
    });
    document.querySelectorAll('.portal-table thead').forEach((el) => {
      add(el, 'bg-ivory-alt border-b border-gold/15');
    });
    document.querySelectorAll('.portal-table th').forEach((el) => {
      add(el, 'px-4 py-3 text-[10px] tracking-[0.12em] uppercase text-portal-muted font-semibold');
    });
    document.querySelectorAll('.portal-table td').forEach((el) => {
      add(el, 'px-4 py-3 text-espresso border-b border-gold/8');
    });
    document.querySelectorAll('.portal-table tbody tr:hover').forEach(() => {});
    document.querySelectorAll('.portal-table tbody tr').forEach((el) => {
      add(el, 'hover:bg-gold/5 transition-colors');
    });
  }

  function enhanceLogin() {
    document.querySelectorAll('.portal-login-page').forEach((el) => {
      add(el, 'min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory to-ivory-alt p-6');
    });
    document.querySelectorAll('.portal-login-card').forEach((el) => {
      add(el, 'w-full max-w-md bg-white border border-gold/20 rounded-2xl shadow-ornza-lg p-8 md:p-10');
    });
    document.querySelectorAll('.portal-login-logo').forEach((el) => {
      add(el, 'font-display text-3xl tracking-[0.12em] text-espresso text-center mb-1');
    });
    document.querySelectorAll('.portal-login-subtitle').forEach((el) => {
      add(el, 'text-center text-sm text-portal-muted mb-8');
    });
  }

  function enhanceBadges() {
    document.querySelectorAll('.portal-badge, .status-badge').forEach((el) => {
      add(el, 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase');
    });
    document.querySelectorAll('.portal-badge-success, .status-badge.delivered, .status-badge.paid').forEach((el) => {
      add(el, 'bg-emerald-100 text-emerald-800');
    });
    document.querySelectorAll('.portal-badge-warning, .status-badge.pending, .status-badge.processing').forEach((el) => {
      add(el, 'bg-amber-100 text-amber-800');
    });
    document.querySelectorAll('.portal-badge-danger, .status-badge.cancelled, .status-badge.failed').forEach((el) => {
      add(el, 'bg-red-100 text-red-700');
    });
  }

  function run() {
    enhanceShell();
    enhanceSidebar();
    enhanceTopbar();
    enhanceCards();
    enhanceForms();
    enhanceTables();
    enhanceLogin();
    enhanceBadges();
  }

  function schedule() {
    /* Run after sidebar/nav scripts inject markup */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(run, 0));
    } else {
      setTimeout(run, 0);
    }
  }

  schedule();
  window.PortalEnhance = { run };
})();
