const express = require('express');
const router = express.Router();

// temporary products list (static)
const products = [
  { slug: 'case', name: 'เคสกันกระแทก', price: 199, img: '/images/case.jpg' },
  { slug: 'charger', name: 'สายชาร์จ Type-C', price: 249, img: '/images/charger.jpg' },
  { slug: 'earphone', name: 'หูฟังไร้สาย', price: 499, img: '/images/earphone.jpg' },
  { slug: 'powerbank', name: 'Power Bank 10000mAh', price: 799, img: '/images/powerbank.jpg' }
];

// ✅ Middleware ตรวจสอบการ login
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
}

// ✅ แสดงหน้าตะกร้า
router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  res.render('cart', { cart, total });
});

// ✅ เพิ่มสินค้าเข้าตะกร้า (เช็ค login ก่อน)
router.post('/add', isLoggedIn, (req, res) => {
  const { slug, qty } = req.body;

  if (!req.session.cart) req.session.cart = [];

  const product = products.find(p => p.slug === slug);
  if (!product) return res.redirect('/products');

  const existing = req.session.cart.find(item => item._id === slug);

  if (existing) {
    existing.quantity += parseInt(qty);
  } else {
    req.session.cart.push({
      _id: slug,
      name: product.name,
      price: product.price,
      quantity: parseInt(qty),
      img: product.img
    });
  }

  res.redirect('/cart');
});

// ✅ ลบสินค้าในตะกร้า
router.post('/remove', (req, res) => {
  const productId = req.body.productId;
  if (!req.session.cart) req.session.cart = [];

  req.session.cart = req.session.cart.filter(item => item._id !== productId);

  res.redirect('/cart');
});

// ✅ Middleware ตรวจสอบการ login + จำหน้าปัจจุบัน
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    req.session.returnTo = req.get('referer'); // บันทึกหน้าเดิมก่อน login
    return res.redirect('/auth/login');
  }
  next();
}

module.exports = router;
