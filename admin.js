const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.render('admin-dashboard', { title: 'Admin Dashboard' });
});

router.get('/products', (req, res) => {
  res.render('admin-products', { title: 'จัดการสินค้า' });
});

// ✅ หน้า Contract (ลูกค้า)
router.get('/contract', (req, res) => {
  // จำลองข้อมูลลูกค้า
  const customers = [
    { id: 1, name: "คุณสมชาย ตัวอย่าง", email: "customer01@example.com", phone: "081-234-5678" },
    { id: 2, name: "คุณสุภาวดี พัฒนา", email: "customer02@example.com", phone: "082-987-6543" },
    { id: 3, name: "คุณอนันต์ รักษา", email: "customer03@example.com", phone: "083-123-4567" }
  ];

  res.render('admin-contract', { title: 'Contract ลูกค้า', customers });
});

module.exports = router;
