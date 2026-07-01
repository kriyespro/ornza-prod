/* ORNZA Customer portal — orders + tracker */
(function () {
  const O = window.OrnzaOrders;
  if (!O) return;

  const DEMO_EMAIL = 'priya.sharma@email.com';

  function paymentBadge(status) {
    const ps = O.PAYMENT_STATUS[status] || O.PAYMENT_STATUS.pending;
    return `<span class="portal-status payment-${status}">${ps.label}</span>`;
  }

  function orderBadge(status) {
    const os = O.ORDER_STATUS[status] || O.ORDER_STATUS.pending;
    return `<span class="portal-status ${os.cls}">${os.label}</span>`;
  }

  function renderActiveOrder(order) {
    const card = document.getElementById('customer-active-order');
    if (!card || !order) return;

    document.getElementById('active-order-id').textContent = order.id;
    document.getElementById('active-order-meta').textContent =
      `Placed ${O.formatDate(order.date)} · ${order.items.length} items · ${order.total}`;
    document.getElementById('active-order-status').innerHTML = orderBadge(order.status);
    document.getElementById('active-payment-status').innerHTML = paymentBadge(order.payment.status);
    document.getElementById('active-payment-method').textContent = order.payment.method;

    const tl = document.getElementById('active-order-timeline');
    if (tl) {
      const activeIdx = O.getActiveStep(order);
      tl.innerHTML = ['placed', 'payment', 'processing', 'packed', 'shipped', 'delivered'].map((key, i) => {
        const labels = { placed: 'Order Placed', payment: 'Payment', processing: 'Crafting', packed: 'Packed', shipped: 'Shipped', delivered: 'Delivered' };
        const at = order.timeline[key];
        let cls = '';
        if (order.status === 'cancelled') cls = i === 0 ? 'done' : '';
        else if (at || i < activeIdx) cls = 'done';
        else if (i === activeIdx) cls = 'active';
        return `<div class="portal-timeline-step ${cls}">
          <div class="portal-timeline-dot">${cls === 'done' ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</div>
          <span class="portal-timeline-label">${labels[key]}</span>
        </div>`;
      }).join('');
    }

    const tbody = document.getElementById('active-order-items');
    if (tbody) {
      tbody.innerHTML = order.items.map((it) => `
        <tr>
          <td><div class="portal-table-product"><img src="../../${it.img}" alt=""><span>${it.name}</span></div></td>
          <td>${it.qty}</td><td>${it.price}</td>
        </tr>
      `).join('');
    }

    const trackLink = document.getElementById('active-track-link');
    if (trackLink) {
      trackLink.href = `../../track-order.html?order=${encodeURIComponent(order.id)}&email=${encodeURIComponent(order.customer.email)}`;
    }
    const portalTrack = document.getElementById('active-portal-track');
    if (portalTrack) portalTrack.href = `order-track.html?id=${encodeURIComponent(order.id)}`;
  }

  function renderOrderHistory() {
    const tbody = document.getElementById('customer-orders-tbody');
    if (!tbody) return;

    const orders = O.getOrdersByEmail(DEMO_EMAIL).sort((a, b) => new Date(b.date) - new Date(a.date));
    tbody.innerHTML = orders.map((o) => `
      <tr>
        <td class="order-id">${o.id}</td>
        <td>${o.items.length} items</td>
        <td>${O.formatDate(o.date)}</td>
        <td>${o.total}</td>
        <td>${paymentBadge(o.payment.status)}</td>
        <td>${orderBadge(o.status)}</td>
        <td>
          <a href="order-track.html?id=${encodeURIComponent(o.id)}" class="portal-btn portal-btn-ghost portal-btn-sm">Track</a>
        </td>
      </tr>
    `).join('');
  }

  function initOrderTrackPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const order = id ? O.findOrder(id) : O.getOrdersByEmail(DEMO_EMAIL)[0];
    if (!order) return;

    document.getElementById('track-page-id').textContent = order.id;
    document.getElementById('track-page-status').innerHTML = orderBadge(order.status);
    document.getElementById('track-page-payment').innerHTML = paymentBadge(order.payment.status);
    document.getElementById('track-page-method').textContent = order.payment.method + (order.payment.txnId ? ' · ' + order.payment.txnId : '');
    document.getElementById('track-page-eta').textContent = order.status === 'delivered'
      ? 'Delivered ' + O.formatDate(order.timeline.delivered)
      : 'ETA ' + O.formatDate(order.shipping.eta);
    document.getElementById('track-page-courier').textContent = order.shipping.trackingId
      ? `${order.shipping.courier || 'Courier'} · ${order.shipping.trackingId}`
      : 'Tracking ID pending';

    const tl = document.getElementById('track-page-timeline');
    if (tl) {
      tl.innerHTML = O.TIMELINE_STEPS.map((step) => {
        const at = order.timeline[step.key];
        const stepIdx = O.TIMELINE_STEPS.findIndex((s) => s.key === step.key);
        const activeIdx = O.getActiveStep(order);
        let cls = at ? 'done' : '';
        if (stepIdx === activeIdx && order.status !== 'delivered' && order.status !== 'cancelled') cls = 'active';
        if (order.status === 'delivered') cls = at ? 'done' : '';
        return `<div class="portal-timeline-step ${cls}">
          <div class="portal-timeline-dot">${cls === 'done' ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</div>
          <span class="portal-timeline-label">${step.label}</span>
        </div>`;
      }).join('');
    }

    const items = document.getElementById('track-page-items');
    if (items) {
      items.innerHTML = order.items.map((it) => `
        <div class="portal-table-product" style="margin-bottom:12px;">
          <img src="../../${it.img}" alt=""><span>${it.name} · ${it.price}</span>
        </div>
      `).join('');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const orders = O.getOrdersByEmail(DEMO_EMAIL);
    const active = orders.find((o) => !['delivered', 'cancelled', 'returned'].includes(o.status)) || orders[0];
    renderActiveOrder(active);
    renderOrderHistory();
    initOrderTrackPage();
  });
})();
