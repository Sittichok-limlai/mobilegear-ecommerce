const express = require('express');
const router = express.Router();

const products = [
  { slug: 'case', name: 'เคสกันกระแทก', price: 199, img: '/images/case.jpg', stock: 50, desc: 'เคสกันกระแทกคุณภาพสูง' },
  { slug: 'charger', name: 'สายชาร์จ Type-C', price: 249, img: '/images/charger.jpg', stock: 100, desc: 'สายชาร์จเร็ว Type-C' },
  { slug: 'earphone', name: 'หูฟังไร้สาย', price: 499, img: '/images/earphone.jpg', stock: 30, desc: 'หูฟัง Bluetooth เสียงดี' },
  { slug: 'powerbank', name: 'Power Bank 10000mAh', price: 799, img: '/images/powerbank.jpg', stock: 40, desc: 'แบตสำรองความจุสูง ความจุ 10000mAh' }
];

// ✅ แสดงสินค้าทั้งหมด
router.get('/', (req, res) => {
  res.render('products', { title: 'เลือกสินค้า', products });
});

// ✅ แสดงรายละเอียดสินค้าแบบ slug
router.get('/:slug', (req, res) => {
  const product = products.find(p => p.slug === req.params.slug);

  if (!product) {
    return res.status(404).send('ไม่พบสินค้า');
  }

  res.render('product-detail', { title: product.name, product });
});

module.exports = router;
