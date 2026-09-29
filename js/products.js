// Centralized Product Database & Helper Functions for AgriAgent AI

const PRODUCTS_DATA = {
  "vai": {
    id: "vai",
    name: "Vải Thiều Lục Ngạn",
    priceText: "27.000đ / kg",
    priceNum: 27000,
    unit: "kg",
    image: "../image/Trái cây/vai.jpg",
    location: "Lục Ngạn, Tỉnh Bắc Giang",
    stock: "~120 kg",
    farmer: "Bác Hùng Bắc Giang",
    desc: "Vải thiều Lục Ngạn chín đỏ mọng, vỏ mỏng hạt nhỏ, thịt dày mọng nước và ngọt thanh đậm đà. Được hái lứa đầu mùa tươi ngon, không hoá chất bảo quản.",
    tags: ["✓ Thu hoạch trong ngày", "✓ Vải thiều chính gốc", "🚚 Giao nhanh toàn quốc"]
  },
  "thanh-long": {
    id: "thanh-long",
    name: "Thanh Long Ruột Đỏ",
    priceText: "20.000đ / kg",
    priceNum: 20000,
    unit: "kg",
    image: "../image/Trái cây/thanh long.jpg",
    location: "Chợ Gạo, Tỉnh Tiền Giang",
    stock: "~200 kg",
    farmer: "Anh Tuấn Tiền Giang",
    desc: "Thanh long ruột đỏ ngọt đậm, giàu vitamin và chất chống oxy hoá. Trái to tròn da căng bóng, thu hoạch tươi nguyên cành từ vườn Chợ Gạo.",
    tags: ["✓ Ruột đỏ mọng nước", "✓ Chuẩn VietGAP", "🚚 Ghép chuyến giá rẻ"]
  },
  "dua-hau": {
    id: "dua-hau",
    name: "Dưa Hấu Long An",
    priceText: "20.000đ / kg",
    priceNum: 20000,
    unit: "kg",
    image: "../image/Trái cây/dua hau.jpg",
    location: "Cần Đước, Tỉnh Long An",
    stock: "~85 kg",
    farmer: "Chú Sáu Long An",
    desc: "Dưa hấu vỏ mỏng ruột đỏ tươi, ngọt lịm giải nhiệt ngày hè. Dưa chín cây rộ cần hỗ trợ nông dân thu hoạch và tiêu thụ gấp.",
    tags: ["✓ Đỏ mọng ngọt lịm", "✓ Bao ăn bao đổi", "🚚 Giao ngay trong ngày"]
  },
  "sau-rieng": {
    id: "sau-rieng",
    name: "Sầu Riêng Ri6",
    priceText: "35.000đ / kg",
    priceNum: 35000,
    unit: "kg",
    image: "../image/Trái cây/sau rieng.jpg",
    location: "Cai Lậy, Tỉnh Tiền Giang",
    stock: "~40 kg",
    farmer: "Cô Ba Cai Lậy",
    desc: "Sầu riêng Ri6 cơm vàng hạt lép, múi dẻo quánh, vị ngọt béo ngậy tự nhiên. Hái rụng chín cây tỏa hương ngào ngạt.",
    tags: ["✓ Cơm vàng hạt lép", "✓ Chín cây tự nhiên", "🚚 Đóng thùng bảo quản"]
  },
  "oi": {
    id: "oi",
    name: "Ổi Vú Sữa Bến Tre",
    priceText: "25.000đ / kg",
    priceNum: 25000,
    unit: "kg",
    image: "../image/Trái cây/oi.jpg",
    location: "Châu Thành, Tỉnh Bến Tre",
    stock: "~60 kg",
    farmer: "Chú Bảy Bến Tre",
    desc: "Ổi vú sữa giòn ngọt xốp, ruột ít hạt, giàu vitamin C. Được trồng sạch theo hướng sinh học an toàn cho sức khỏe.",
    tags: ["✓ Trồng hữu cơ", "✓ Giòn ngọt đậm đà", "🚚 Giao hàng tận nơi"]
  },
  "xoai": {
    id: "xoai",
    name: "Xoài Cát Hòa Lộc",
    priceText: "30.000đ / kg",
    priceNum: 30000,
    unit: "kg",
    image: "../image/Trái cây/xoai.jpg",
    location: "Cao Lãnh, Tỉnh Đồng Tháp",
    stock: "~90 kg",
    farmer: "Anh Minh Cao Lãnh",
    desc: "Xoài Cát Hòa Lộc loại 1 nổi tiếng miền Tây, da mịn vàng ươm, thịt ngọt đậm hương thơm nức lòng.",
    tags: ["✓ Xoài Cát loại 1", "✓ Trái to ngọt đậm", "🚚 Hỗ trợ vận chuyển"]
  },
  "chom-chom": {
    id: "chom-chom",
    name: "Chôm Chôm Thái Vĩnh Long",
    priceText: "34.000đ / kg",
    priceNum: 34000,
    unit: "kg",
    image: "../image/Trái cây/chom chom ban.jpg",
    location: "Ấp Hòa, Xã Vĩnh Kim, Tỉnh Đồng Tháp",
    stock: "~50 kg",
    farmer: "Chú Thành Đồng Tháp",
    desc: "Chôm chôm Thái chín cây, trái to, râu xanh giòn, thịt tróc róc hạt, thơm ngọt tự nhiên. Thu hoạch trực tiếp tại vườn.",
    tags: ["✓ Hái tại vườn", "✓ Bao ăn 1 đổi 1", "🚚 Hỗ trợ ghép chuyến"]
  }
};

// Function to render Product Detail page dynamically
function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'chom-chom';
  const product = PRODUCTS_DATA[productId] || PRODUCTS_DATA['chom-chom'];

  const imgEl = document.getElementById('product-img');
  const nameEl = document.getElementById('product-name');
  const priceEl = document.getElementById('product-price');
  const stockEl = document.getElementById('product-stock');
  const locationEl = document.getElementById('product-location');
  const farmerEl = document.getElementById('product-farmer');
  const descEl = document.getElementById('product-desc');
  const tagsEl = document.getElementById('product-tags');
  const buyBtnEl = document.getElementById('btn-buy-now');

  if (imgEl) imgEl.src = product.image;
  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.innerHTML = `${product.priceText.replace(' / kg', '')} <span style="font-size: 14px; font-weight: 500; color: #64748b;">/ ${product.unit}</span>`;
  if (stockEl) stockEl.textContent = `📦 Còn ${product.stock}`;
  if (locationEl) locationEl.innerHTML = `<i class="fa-solid fa-location-dot" style="color: #769f2e;"></i> ${product.location}`;
  if (farmerEl) farmerEl.innerHTML = `${product.farmer} <i class="fa-solid fa-circle-check" style="color: #769f2e;"></i>`;
  if (descEl) descEl.textContent = product.desc;

  if (tagsEl && product.tags) {
    tagsEl.innerHTML = product.tags.map(tag => `<span style="background: #f1f5f9; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; color: #475569;">${tag}</span>`).join('');
  }

  if (buyBtnEl) {
    buyBtnEl.href = `21-xac-nhan-dat-hang.html?id=${product.id}`;
  }
}

// Function to render Order Confirmation page dynamically
function initCheckoutPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'chom-chom';
  const product = PRODUCTS_DATA[productId] || PRODUCTS_DATA['chom-chom'];

  const imgEl = document.getElementById('checkout-img');
  const nameEl = document.getElementById('checkout-name');
  const priceEl = document.getElementById('checkout-price');
  const locationEl = document.getElementById('checkout-location');
  const qtyInput = document.getElementById('checkout-qty');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const grandTotalEl = document.getElementById('checkout-total');
  const shipFee = 15000;

  if (imgEl) imgEl.src = product.image;
  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = `${product.priceNum.toLocaleString('vi-VN')} VNĐ/${product.unit}`;
  if (locationEl) locationEl.textContent = product.location;

  function updateTotals() {
    let qty = parseFloat(qtyInput ? qtyInput.value : 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    const subtotal = qty * product.priceNum;
    const total = subtotal + shipFee;

    if (subtotalEl) subtotalEl.textContent = `${subtotal.toLocaleString('vi-VN')} đ`;
    if (grandTotalEl) grandTotalEl.textContent = `${total.toLocaleString('vi-VN')} đ`;
  }

  if (qtyInput) {
    qtyInput.value = 10;
    qtyInput.addEventListener('input', updateTotals);
  }
  updateTotals();
}
