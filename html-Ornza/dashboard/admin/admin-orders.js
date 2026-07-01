/* ORNZA Admin — order + payment status management */
(function () {
  const O = window.OrnzaOrders;
  if (!O) return;

  function paymentBadge(status) {
    const ps = O.PAYMENT_STATUS[status] || O.PAYMENT_STATUS.pending;
    return `<span class="portal-status payment-${status}">${ps.label}</span>`;
  }

  function orderBadge(status) {
    const os = O.ORDER_STATUS[status] || O.ORDER_STATUS.pending;
    return `<span class="portal-status ${os.cls}">${os.label}</span>`;
  }

  function renderOrdersTable() {
    const tbody = document.getElementById('admin-orders-tbody');
    if (!tbody) return;

    const orders = O.loadOrders().sort((a, b) => new Date(b.date) - new Date(a.date));
    tbody.innerHTML = orders.map((o) => `
      <tr data-order-id="${o.id}">
        <td class="order-id"><a href="order-detail.html?id=${encodeURIComponent(o.id)}" style="color:var(--portal-gold-deep);font-weight:600;">${o.id}</a></td>
        <td>${o.customer.name}<br><span style="font-size:11px;color:var(--portal-text-muted);">${o.customer.email}</span></td>
        <td>${o.items.length}</td>
        <td>${O.formatDate(o.date)}</td>
        <td>${o.payment.method}<br>${paymentBadge(o.payment.status)}</td>
        <td>${o.total}</td>
        <td>${orderBadge(o.status)}</td>
        <td>
          <select class="portal-form-select order-status-select" data-id="${o.id}" style="padding:4px 8px;font-size:11px;width:auto;">
            ${Object.keys(O.ORDER_STATUS).map((k) => `<option value="${k}" ${o.status === k ? 'selected' : ''}>${O.ORDER_STATUS[k].label}</option>`).join('')}
          </select>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.order-status-select').forEach((sel) => {
      sel.addEventListener('change', (e) => {
        O.setOrderStatus(e.target.dataset.id, e.target.value);
        renderOrdersTable();
      });
    });
  }

  function initOrderDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    const order = O.findOrder(id);
    if (!order) {
      document.getElementById('order-detail-missing')?.classList.remove('hidden');
      return;
    }
    document.getElementById('order-detail-missing')?.classList.add('hidden');

    document.getElementById('detail-order-id').textContent = order.id;
    document.getElementById('detail-customer').textContent = order.customer.name;
    document.getElementById('detail-email').textContent = order.customer.email;
    document.getElementById('detail-phone').textContent = order.customer.phone;
    document.getElementById('detail-date').textContent = O.formatDate(order.date);
    document.getElementById('detail-total').textContent = order.total;
    document.getElementById('detail-address').textContent = order.shipping.address || '—';
    document.getElementById('detail-payment-method').value = order.payment.method;
    document.getElementById('detail-payment-status').value = order.payment.status;
    document.getElementById('detail-txn').value = order.payment.txnId || '';
    document.getElementById('detail-order-status').value = order.status;
    document.getElementById('detail-courier').value = order.shipping.courier || '';
    document.getElementById('detail-tracking').value = order.shipping.trackingId || '';
    document.getElementById('detail-eta').value = order.shipping.eta || '';

    const statusDisplay = document.getElementById('detail-status-display');
    if (statusDisplay) statusDisplay.innerHTML = orderBadge(order.status);
    const paymentDisplay = document.getElementById('detail-payment-display');
    if (paymentDisplay) paymentDisplay.innerHTML = paymentBadge(order.payment.status);

    const itemsBody = document.getElementById('detail-items-tbody');
    if (itemsBody) {
      const prefix = window.location.pathname.includes('/admin/') ? '../../' : '';
      itemsBody.innerHTML = order.items.map((it) => `
        <tr>
          <td><div class="portal-table-product"><img src="${prefix}${it.img}" alt=""><span>${it.name}</span></div></td>
          <td>${it.qty}</td><td>${it.price}</td>
        </tr>
      `).join('');
    }

    const tl = document.getElementById('detail-timeline');
    if (tl) {
      tl.innerHTML = O.TIMELINE_STEPS.map((step) => {
        const at = order.timeline[step.key];
        const done = !!at;
        return `<div class="portal-timeline-step ${done ? 'done' : ''}">
          <div class="portal-timeline-dot">${done ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</div>
          <span class="portal-timeline-label">${step.label}<br><small style="font-size:9px;color:var(--portal-text-muted);">${O.formatDateTime(at)}</small></span>
        </div>`;
      }).join('');
    }

    const saveBtn = document.getElementById('save-order-btn');
    if (saveBtn && !saveBtn.dataset.bound) {
      saveBtn.dataset.bound = '1';
      saveBtn.addEventListener('click', () => {
        const orderId = new URLSearchParams(window.location.search).get('id');
        O.setPaymentStatus(orderId, document.getElementById('detail-payment-status').value, document.getElementById('detail-txn').value);
        O.updateOrder(orderId, {
          payment: { method: document.getElementById('detail-payment-method').value },
          shipping: {
            courier: document.getElementById('detail-courier').value,
            trackingId: document.getElementById('detail-tracking').value,
            eta: document.getElementById('detail-eta').value,
          },
        });
        O.setOrderStatus(orderId, document.getElementById('detail-order-status').value);
        const orig = saveBtn.textContent;
        saveBtn.textContent = 'Saved ✓';
        setTimeout(() => { saveBtn.textContent = orig; initOrderDetail(); }, 1200);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderOrdersTable();
    initOrderDetail();
  });

  window.OrnzaAdminOrders = { renderOrdersTable, initOrderDetail };
})();
