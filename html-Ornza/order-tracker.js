/* ORNZA — public client order tracker UI */
(function () {
  const O = window.OrnzaOrders;
  if (!O) return;

  function paymentBadge(payment) {
    const ps = O.PAYMENT_STATUS[payment.status] || O.PAYMENT_STATUS.pending;
    return `<span class="track-payment-badge ${ps.cls}">${ps.label}</span>`;
  }

  function orderBadge(status) {
    const os = O.ORDER_STATUS[status] || O.ORDER_STATUS.pending;
    return `<span class="track-order-badge status-${os.cls}">${os.label}</span>`;
  }

  function renderTimeline(order) {
    const tl = order.timeline || {};
    const cancelled = order.status === 'cancelled' || order.status === 'returned';
    const activeIdx = O.getActiveStep(order);

    return O.TIMELINE_STEPS.map((step, idx) => {
      const at = tl[step.key];
      let cls = '';
      let badge = '';

      if (cancelled && step.key !== 'placed') {
        cls = '';
      } else if (step.key === 'payment') {
        if (order.payment.status === 'failed') {
          cls = 'failed';
          badge = '<span class="track-step-badge failed">Payment Failed</span>';
        } else if (at || order.payment.status === 'paid' || order.payment.status === 'cod_collected') {
          cls = order.payment.status === 'cod_pending' && !at ? 'active' : 'completed';
          badge = order.payment.status === 'cod_pending'
            ? '<span class="track-step-badge in-progress">Pay on Delivery</span>'
            : '<span class="track-step-badge done">Done</span>';
        } else if (order.payment.method === 'COD') {
          cls = 'active';
          badge = '<span class="track-step-badge in-progress">Pay on Delivery</span>';
        } else {
          badge = '<span class="track-step-badge pending">Awaiting</span>';
        }
      } else if (at) {
        if (order.status === 'delivered' || idx < activeIdx) {
          cls = 'completed';
          badge = '<span class="track-step-badge done">Done</span>';
        } else if (idx === activeIdx) {
          cls = 'active';
          badge = '<span class="track-step-badge in-progress">In Progress</span>';
        } else {
          cls = 'completed';
          badge = '<span class="track-step-badge done">Done</span>';
        }
      }

      let desc = step.desc;
      if (step.key === 'payment') {
        desc = `Payment via ${order.payment.method}${order.payment.txnId ? ' · Ref: ' + order.payment.txnId : ''}`;
      }
      if (step.key === 'shipped' && order.shipping.trackingId) {
        desc = `Tracking: <strong style="color:var(--color-gold)">${order.shipping.trackingId}</strong> via ${order.shipping.courier || 'Courier'}`;
      }

      return `<div class="track-step ${cls}" data-step="${step.key}">
        <div class="track-step-header">
          <div class="track-step-name">${step.label}</div>
          <div class="track-step-time">${O.formatDateTime(at)}</div>
        </div>
        <div class="track-step-desc">${desc}</div>
        ${badge}
      </div>`;
    }).join('');
  }

  function renderResult(order) {
    const result = document.getElementById('track-result');
    if (!result) return;

    document.getElementById('result-oid').textContent = order.id;
    document.getElementById('result-items').textContent = order.items.length + ' Item' + (order.items.length > 1 ? 's' : '');
    document.getElementById('result-date').textContent = O.formatDate(order.date);
    document.getElementById('result-total').textContent = order.total;
    document.getElementById('result-payment-method').textContent = order.payment.method;
    document.getElementById('result-payment-status').innerHTML = paymentBadge(order.payment);
    document.getElementById('result-order-status').innerHTML = orderBadge(order.status);

    const etaEl = document.getElementById('eta-date');
    const etaNote = document.getElementById('eta-note');
    if (order.status === 'delivered') {
      etaEl.textContent = O.formatDate(order.timeline.delivered);
      etaNote.textContent = 'Delivered successfully';
    } else if (order.status === 'cancelled') {
      etaEl.textContent = 'Cancelled';
      etaNote.textContent = order.payment.status === 'refunded' ? 'Refund processed' : 'Order was cancelled';
    } else {
      etaEl.textContent = O.formatDate(order.shipping.eta);
      etaNote.textContent = order.shipping.courier ? `Via ${order.shipping.courier}` : 'Estimated delivery';
    }

    const itemsEl = document.getElementById('track-items-list');
    if (itemsEl) {
      itemsEl.innerHTML = order.items.map((it) =>
        `<div class="track-item-row">
          <img src="${it.img}" alt="">
          <div><div class="track-item-name">${it.name}</div><div class="track-item-meta">Qty ${it.qty} · ${it.price}</div></div>
        </div>`
      ).join('');
    }

    const timelineEl = document.getElementById('track-timeline');
    if (timelineEl) timelineEl.innerHTML = renderTimeline(order);

    result.classList.add('visible');
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  window.trackOrder = function () {
    const oid = document.getElementById('order-id')?.value.trim();
    const email = document.getElementById('order-email')?.value.trim();
    const msg = document.getElementById('track-message');
    const btn = document.getElementById('track-btn');

    if (!oid || !email) {
      if (msg) { msg.textContent = 'Please enter both Order ID and email or phone.'; msg.className = 'form-message error'; }
      return;
    }

    if (btn) { btn.disabled = true; btn.style.opacity = '0.7'; }
    if (msg) { msg.textContent = ''; msg.className = 'form-message'; }

    setTimeout(() => {
      const order = O.findOrder(oid, email);
      if (btn) { btn.disabled = false; btn.style.opacity = '1'; }

      if (!order) {
        if (msg) { msg.textContent = 'Order not found. Check your Order ID and email/phone.'; msg.className = 'form-message error'; }
        document.getElementById('track-result')?.classList.remove('visible');
        return;
      }
      renderResult(order);
    }, 800);
  };

  /* Auto-track from URL ?order=ORN-2847&email=... */
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const order = params.get('order');
    const email = params.get('email');
    if (order) document.getElementById('order-id').value = order;
    if (email) document.getElementById('order-email').value = email;
    if (order && email) trackOrder();
  });
})();
