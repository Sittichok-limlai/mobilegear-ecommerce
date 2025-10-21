const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'MobileGear Store' });
});
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'ติดต่อเรา' });
});

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`📩 ข้อความจาก ${name} (${email}): ${message}`);
  res.render('contact', { title: 'ติดต่อเรา', success: 'ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อเรา 💛' });
});

module.exports = router;
