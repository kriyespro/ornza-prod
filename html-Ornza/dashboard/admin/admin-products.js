/* ORNZA Admin — product catalog data + table render */
(function () {
  const PRODUCTS = [
    { name: 'Aurora Drop Earrings', sku: 'ORN-EAR-001', cat: 'Earrings', price: '₹1,799', stock: 84, status: 'active', img: '../../images/earrings.png' },
    { name: 'Celestial Hoop Set', sku: 'ORN-EAR-002', cat: 'Earrings', price: '₹1,299', stock: 62, status: 'active', img: '../../images/earrings.png' },
    { name: 'Royal Chandelier', sku: 'ORN-EAR-003', cat: 'Earrings', price: '₹2,199', stock: 41, status: 'active', img: '../../images/earrings.png' },
    { name: 'Brilliant CZ Studs', sku: 'ORN-EAR-004', cat: 'Earrings', price: '₹999', stock: 120, status: 'active', img: '../../images/earrings.png' },
    { name: 'Pearl Pendant Set', sku: 'ORN-NEK-012', cat: 'Necklaces', price: '₹2,999', stock: 52, status: 'active', img: '../../images/necklaces.png' },
    { name: 'Diamond Cut Mangalsutra', sku: 'ORN-MNG-001', cat: 'Mangalsutras', price: '₹2,499', stock: 36, status: 'active', img: '../../images/necklaces.png' },
    { name: 'Classic Pearl Strand', sku: 'ORN-NEK-018', cat: 'Necklaces', price: '₹3,499', stock: 28, status: 'active', img: '../../images/necklaces.png' },
    { name: 'Solitaire Diamond Set', sku: 'ORN-SET-001', cat: 'Necklaces', price: '₹4,999', stock: 19, status: 'active', img: '../../images/necklaces.png' },
    { name: 'Celestine Solitaire Ring', sku: 'ORN-RNG-008', cat: 'Rings', price: '₹1,599', stock: 6, status: 'low', img: '../../images/rings.png' },
    { name: 'Stackable Band Set', sku: 'ORN-RNG-009', cat: 'Rings', price: '₹1,299', stock: 45, status: 'active', img: '../../images/rings.png' },
    { name: 'Floral Statement Ring', sku: 'ORN-RNG-010', cat: 'Rings', price: '₹1,899', stock: 33, status: 'active', img: '../../images/rings.png' },
    { name: 'Classic Silver Band', sku: 'ORN-SLV-001', cat: '925 Silver', price: '₹799', stock: 88, status: 'active', img: '../../images/rings.png' },
    { name: 'CZ Tennis Bracelet', sku: 'ORN-BRC-004', cat: 'Bracelets', price: '₹1,799', stock: 38, status: 'active', img: '../../images/bracelets.png' },
    { name: 'Delicate Link Chain', sku: 'ORN-BRC-005', cat: 'Bracelets', price: '₹1,499', stock: 55, status: 'active', img: '../../images/bracelets.png' },
    { name: 'Cuban Link Bracelet', sku: 'ORN-MEN-001', cat: "Men's", price: '₹2,499', stock: 42, status: 'active', img: '../../images/bracelets.png' },
    { name: 'Miami Cuban Link', sku: 'ORN-MEN-002', cat: "Men's", price: '₹3,299', stock: 24, status: 'active', img: '../../images/bracelets.png' },
    { name: 'Classic Signet Ring', sku: 'ORN-MEN-003', cat: "Men's", price: '₹1,999', stock: 31, status: 'active', img: '../../images/rings.png' },
    { name: 'Sacred Om Pendant', sku: 'ORN-MEN-004', cat: "Men's", price: '₹1,699', stock: 47, status: 'active', img: '../../images/necklaces.png' },
    { name: 'Gold Kada Bangle', sku: 'ORN-BNG-003', cat: 'Bangles', price: '₹2,499', stock: 0, status: 'oos', img: '../../images/bangles.png' },
    { name: 'Bangle Style Kada', sku: 'ORN-BNG-004', cat: 'Bangles', price: '₹2,199', stock: 18, status: 'active', img: '../../images/bangles.png' },
    { name: "Bride's Delight Hamper", sku: 'ORN-HMP-001', cat: 'Hampers', price: '₹4,999', stock: 24, status: 'active', img: '../../images/hamper-brides.png' },
    { name: 'Anniversary Gold Hamper', sku: 'ORN-HMP-002', cat: 'Hampers', price: '₹3,799', stock: 18, status: 'active', img: '../../images/hamper-anniversary.png' },
    { name: 'Birthday Sparkle Hamper', sku: 'ORN-HMP-003', cat: 'Hampers', price: '₹2,999', stock: 22, status: 'active', img: '../../images/hamper-birthday.png' },
    { name: 'Diwali Luxury Hamper', sku: 'ORN-HMP-004', cat: 'Hampers', price: '₹5,499', stock: 15, status: 'active', img: '../../images/festival-diwali.png' },
    { name: "Men's Power Hamper", sku: 'ORN-HMP-005', cat: 'Hampers', price: '₹3,499', stock: 12, status: 'active', img: '../../images/bracelets.png' },
    { name: 'Pearl Luxury Hamper', sku: 'ORN-HMP-006', cat: 'Hampers', price: '₹4,299', stock: 14, status: 'active', img: '../../images/necklaces.png' },
    { name: 'Custom Hamper', sku: 'ORN-HMP-007', cat: 'Hampers', price: '₹2,499+', stock: 99, status: 'active', img: '../../images/packaging-hero.png' },
    { name: 'Classic Black Bead Mangalsutra', sku: 'ORN-MNG-002', cat: 'Mangalsutras', price: '₹1,899', stock: 8, status: 'low', img: '../../images/necklaces.png' },
    { name: 'CZ Silver Hoops', sku: 'ORN-SLV-002', cat: '925 Silver', price: '₹1,099', stock: 56, status: 'active', img: '../../images/earrings.png' },
    { name: 'Sterling Silver Band', sku: 'ORN-SLV-003', cat: '925 Silver', price: '₹899', stock: 72, status: 'active', img: '../../images/rings.png' },
  ];

  const STATUS_MAP = {
    active: { cls: 'active', label: 'Active' },
    low: { cls: 'pending', label: 'Low Stock' },
    oos: { cls: 'cancelled', label: 'Out of Stock' },
    draft: { cls: 'inactive', label: 'Draft' },
  };

  function statusBadge(status) {
    const s = STATUS_MAP[status] || STATUS_MAP.active;
    return `<span class="portal-status ${s.cls}">${s.label}</span>`;
  }

  function renderRow(p) {
    return `<tr>
      <td><div class="portal-table-product"><img src="${p.img}" alt=""><span>${p.name}</span></div></td>
      <td>${p.sku}</td>
      <td>${p.cat}</td>
      <td>${p.price}</td>
      <td>${p.stock}</td>
      <td>${statusBadge(p.status)}</td>
      <td><a href="product-edit.html?sku=${encodeURIComponent(p.sku)}" class="portal-btn portal-btn-ghost portal-btn-sm">Edit</a></td>
    </tr>`;
  }

  const tbody = document.getElementById('admin-products-tbody');
  if (tbody) {
    tbody.innerHTML = PRODUCTS.map(renderRow).join('');
  }

  window.OrnzaAdminProducts = { PRODUCTS, renderRow };
})();
