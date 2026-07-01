/* ORNZA — shared order + payment status data (demo; persists via localStorage) */
(function () {
  const STORAGE_KEY = 'ornza_orders_v1';

  const PAYMENT_STATUS = {
    pending:      { label: 'Payment Pending',   cls: 'payment-pending' },
    paid:         { label: 'Paid',            cls: 'payment-paid' },
    cod_pending:  { label: 'COD — On Delivery', cls: 'payment-cod' },
    cod_collected:{ label: 'COD Collected',   cls: 'payment-paid' },
    failed:       { label: 'Payment Failed',  cls: 'payment-failed' },
    refunded:     { label: 'Refunded',        cls: 'payment-refunded' },
  };

  const ORDER_STATUS = {
    pending:          { label: 'Pending',          cls: 'pending',      step: 0 },
    confirmed:        { label: 'Confirmed',        cls: 'processing',   step: 1 },
    processing:       { label: 'Processing',       cls: 'processing',   step: 2 },
    packed:           { label: 'Packed',           cls: 'processing',   step: 3 },
    shipped:          { label: 'Shipped',          cls: 'shipped',      step: 4 },
    out_for_delivery: { label: 'Out for Delivery', cls: 'shipped',      step: 5 },
    delivered:        { label: 'Delivered',        cls: 'delivered',    step: 6 },
    cancelled:        { label: 'Cancelled',        cls: 'cancelled',    step: -1 },
    returned:         { label: 'Returned',         cls: 'cancelled',    step: -1 },
  };

  const TIMELINE_STEPS = [
    { key: 'placed',           label: 'Order Placed',        desc: 'Your order has been received.' },
    { key: 'payment',          label: 'Payment Confirmed',   desc: 'Payment verified and order confirmed.' },
    { key: 'processing',       label: 'Being Crafted',       desc: 'Our artisans in Surat are crafting your jewellery.' },
    { key: 'packed',           label: 'Quality Checked',       desc: 'Passed 10-point QC and packed in luxury box.' },
    { key: 'shipped',          label: 'Shipped',             desc: 'Parcel handed to courier partner.' },
    { key: 'out_for_delivery', label: 'Out for Delivery',    desc: 'Courier is on the way to your address.' },
    { key: 'delivered',        label: 'Delivered',           desc: 'Order delivered successfully.' },
  ];

  const DEFAULT_ORDERS = [
    {
      id: 'ORN-2847',
      customer: { name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43210' },
      date: '2026-06-02',
      items: [
        { name: 'Aurora Drop Earrings', qty: 1, price: '₹1,799', img: 'images/earrings.png' },
        { name: 'Pearl Pendant Set', qty: 1, price: '₹2,999', img: 'images/necklaces.png' },
      ],
      total: '₹4,299',
      payment: { method: 'UPI', status: 'paid', txnId: 'UPI2847291034', paidAt: '2026-06-02T10:32:00' },
      status: 'shipped',
      shipping: { courier: 'Delhivery', trackingId: 'DL7829345612', eta: '2026-06-06', address: '14 Shanti Nagar, Surat 395007' },
      timeline: {
        placed: '2026-06-02T10:30:00',
        payment: '2026-06-02T10:32:00',
        processing: '2026-06-02T14:00:00',
        packed: '2026-06-03T11:00:00',
        shipped: '2026-06-04T09:15:00',
        out_for_delivery: null,
        delivered: null,
      },
    },
    {
      id: 'ORN-2812',
      customer: { name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43210' },
      date: '2026-05-28',
      items: [{ name: 'Celestine Solitaire Ring', qty: 1, price: '₹2,999', img: 'images/rings.png' }],
      total: '₹2,999',
      payment: { method: 'Card', status: 'paid', txnId: 'CARD8812034', paidAt: '2026-05-28T16:10:00' },
      status: 'processing',
      shipping: { courier: null, trackingId: null, eta: '2026-06-08', address: '14 Shanti Nagar, Surat 395007' },
      timeline: {
        placed: '2026-05-28T16:08:00',
        payment: '2026-05-28T16:10:00',
        processing: '2026-05-29T10:00:00',
        packed: null, shipped: null, out_for_delivery: null, delivered: null,
      },
    },
    {
      id: 'ORN-2891',
      customer: { name: 'Riya Patel', email: 'riya.patel@email.com', phone: '+91 98234 56789' },
      date: '2026-06-04',
      items: [
        { name: 'Bride\'s Delight Hamper', qty: 1, price: '₹4,999', img: 'images/hamper-brides.png' },
        { name: 'Aurora Drop Earrings', qty: 1, price: '₹1,799', img: 'images/earrings.png' },
      ],
      total: '₹3,499',
      payment: { method: 'COD', status: 'cod_pending', txnId: null, paidAt: null },
      status: 'pending',
      shipping: { courier: null, trackingId: null, eta: '2026-06-10', address: '22 Ring Road, Ahmedabad 380015' },
      timeline: { placed: '2026-06-04T11:20:00', payment: null, processing: null, packed: null, shipped: null, out_for_delivery: null, delivered: null },
    },
    {
      id: 'ORN-2888',
      customer: { name: 'Arjun Mehta', email: 'arjun.mehta@email.com', phone: '+91 97654 32109' },
      date: '2026-06-04',
      items: [{ name: 'Cuban Link Bracelet', qty: 1, price: '₹1,799', img: 'images/bracelets.png' }],
      total: '₹1,799',
      payment: { method: 'UPI', status: 'paid', txnId: 'UPI9901234', paidAt: '2026-06-04T08:45:00' },
      status: 'packed',
      shipping: { courier: 'BlueDart', trackingId: null, eta: '2026-06-09', address: '88 MG Road, Pune 411001' },
      timeline: {
        placed: '2026-06-04T08:42:00', payment: '2026-06-04T08:45:00',
        processing: '2026-06-04T15:00:00', packed: '2026-06-05T10:30:00',
        shipped: null, out_for_delivery: null, delivered: null,
      },
    },
    {
      id: 'ORN-2756',
      customer: { name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43210' },
      date: '2026-05-15',
      items: [
        { name: 'Pearl Pendant Set', qty: 1, price: '₹2,999', img: 'images/necklaces.png' },
        { name: 'CZ Tennis Bracelet', qty: 2, price: '₹1,799', img: 'images/bracelets.png' },
      ],
      total: '₹6,499',
      payment: { method: 'UPI', status: 'paid', txnId: 'UPI7756123', paidAt: '2026-05-15T12:00:00' },
      status: 'delivered',
      shipping: { courier: 'Delhivery', trackingId: 'DL6612345890', eta: '2026-05-20', address: '14 Shanti Nagar, Surat 395007' },
      timeline: {
        placed: '2026-05-15T11:58:00', payment: '2026-05-15T12:00:00',
        processing: '2026-05-15T18:00:00', packed: '2026-05-16T10:00:00',
        shipped: '2026-05-17T09:00:00', out_for_delivery: '2026-05-19T08:00:00',
        delivered: '2026-05-19T14:30:00',
      },
    },
    {
      id: 'ORN-2874',
      customer: { name: 'Karan Shah', email: 'karan.shah@email.com', phone: '+91 99012 34567' },
      date: '2026-06-01',
      items: [
        { name: 'Celestial Hoop Set', qty: 1, price: '₹1,299', img: 'images/earrings.png' },
        { name: 'Classic Silver Band', qty: 1, price: '₹799', img: 'images/rings.png' },
      ],
      total: '₹2,998',
      payment: { method: 'Card', status: 'refunded', txnId: 'CARD7700123', paidAt: '2026-06-01T09:00:00' },
      status: 'cancelled',
      shipping: { courier: null, trackingId: null, eta: null, address: '5 Park Street, Kolkata 700016' },
      timeline: { placed: '2026-06-01T08:58:00', payment: '2026-06-01T09:00:00', processing: null, packed: null, shipped: null, out_for_delivery: null, delivered: null },
    },
  ];

  function loadOrders() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return JSON.parse(JSON.stringify(DEFAULT_ORDERS));
  }

  function saveOrders(orders) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  function normalizeId(id) {
    if (!id) return '';
    const s = id.trim().toUpperCase().replace(/^#/, '');
    if (s.startsWith('ORN-') || s.startsWith('ORNZA-')) return s.replace('ORNZA-', 'ORN-');
    return 'ORN-' + s.replace(/^ORN/, '');
  }

  function findOrder(id, emailOrPhone) {
    const orders = loadOrders();
    const normId = normalizeId(id);
    const contact = (emailOrPhone || '').trim().toLowerCase();
    return orders.find((o) => {
      const idMatch = normalizeId(o.id) === normId;
      if (!idMatch) return false;
      if (!contact) return true;
      const em = (o.customer.email || '').toLowerCase();
      const ph = (o.customer.phone || '').replace(/\s/g, '');
      const c = contact.replace(/\s/g, '');
      return em === contact || ph === c || em.includes(contact) || ph.includes(c);
    }) || null;
  }

  function getOrdersByEmail(email) {
    const e = (email || '').trim().toLowerCase();
    return loadOrders().filter((o) => (o.customer.email || '').toLowerCase() === e);
  }

  function updateOrder(id, updates) {
    const orders = loadOrders();
    const normId = normalizeId(id);
    const idx = orders.findIndex((o) => normalizeId(o.id) === normId);
    if (idx === -1) return null;
    orders[idx] = { ...orders[idx], ...updates };
    if (updates.payment) orders[idx].payment = { ...orders[idx].payment, ...updates.payment };
    if (updates.shipping) orders[idx].shipping = { ...orders[idx].shipping, ...updates.shipping };
    if (updates.timeline) orders[idx].timeline = { ...orders[idx].timeline, ...updates.timeline };
    saveOrders(orders);
    return orders[idx];
  }

  function setOrderStatus(id, status) {
    const order = findOrder(id);
    if (!order) return null;
    const now = new Date().toISOString();
    const timeline = { ...order.timeline };
    const statusToTimeline = {
      confirmed: 'payment', processing: 'processing', packed: 'packed',
      shipped: 'shipped', out_for_delivery: 'out_for_delivery', delivered: 'delivered',
    };
    if (statusToTimeline[status] && !timeline[statusToTimeline[status]]) {
      timeline[statusToTimeline[status]] = now;
    }
    if (status === 'confirmed' && !timeline.payment && order.payment.status === 'paid') {
      timeline.payment = now;
    }
    return updateOrder(id, { status, timeline });
  }

  function setPaymentStatus(id, paymentStatus, txnId) {
    const order = findOrder(id);
    if (!order) return null;
    const payment = { ...order.payment, status: paymentStatus };
    if (txnId) payment.txnId = txnId;
    if (paymentStatus === 'paid' || paymentStatus === 'cod_collected') {
      payment.paidAt = new Date().toISOString();
    }
    const timeline = { ...order.timeline };
    if ((paymentStatus === 'paid' || paymentStatus === 'cod_collected') && !timeline.payment) {
      timeline.payment = payment.paidAt;
    }
    let status = order.status;
    if (paymentStatus === 'paid' && status === 'pending') status = 'confirmed';
    return updateOrder(id, { payment, timeline, status });
  }

  function formatDate(iso, opts) {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleDateString('en-IN', opts || { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) { return '—'; }
  }

  function formatDateTime(iso) {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return '—'; }
  }

  function getActiveStep(order) {
    const statusToTimelineIdx = {
      pending: 0, confirmed: 1, processing: 2, packed: 3,
      shipped: 4, out_for_delivery: 5, delivered: 6,
    };
    if (order.status === 'cancelled' || order.status === 'returned') return -1;
    return statusToTimelineIdx[order.status] ?? 0;
  }

  function resetDemoData() {
    localStorage.removeItem(STORAGE_KEY);
    return loadOrders();
  }

  window.OrnzaOrders = {
    PAYMENT_STATUS,
    ORDER_STATUS,
    TIMELINE_STEPS,
    DEFAULT_ORDERS,
    loadOrders,
    saveOrders,
    findOrder,
    getOrdersByEmail,
    updateOrder,
    setOrderStatus,
    setPaymentStatus,
    normalizeId,
    formatDate,
    formatDateTime,
    getActiveStep,
    resetDemoData,
  };
})();
