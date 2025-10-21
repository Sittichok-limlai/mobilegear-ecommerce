const express = require('express');
const router = express.Router();

// 🔸 Mock users (จำลองข้อมูลผู้ใช้)
const mockUsers = [
  { username: 'admin', password: '1234', role: 'admin' },
  { username: 'user', password: '1234', role: 'user' }
];

// 🔹 หน้าเข้าสู่ระบบ
router.get('/login', (req, res) => {
  res.render('login', { title: 'เข้าสู่ระบบ', error: null, success: null });
});

// 🔹 หน้าสมัครสมาชิก
router.get('/register', (req, res) => {
  res.render('register', { title: 'สมัครสมาชิก', error: null, success: null });
});

// 🔹 เข้าสู่ระบบ
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.render('login', {
      title: 'เข้าสู่ระบบ',
      error: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
      success: null
    });
  }

  // ✅ เก็บ session
  req.session.user = { username: user.username, role: user.role };

  // ✅ ถ้ามี returnTo → กลับไปหน้าสินค้าเดิม
  if (req.session.returnTo) {
    const returnTo = req.session.returnTo;
    req.session.returnTo = null;
    return res.redirect(returnTo);
  }

  // ✅ ถ้าไม่มี returnTo → redirect ปกติ
  if (user.role === 'admin') {
    return res.redirect('/admin/dashboard');
  } else {
    return res.redirect('/products');
  }
});

// 🔹 สมัครสมาชิก (mock)
router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render('register', {
      title: 'สมัครสมาชิก',
      error: '⚠️ รหัสผ่านไม่ตรงกัน',
      success: null
    });
  }

  const exists = mockUsers.find((u) => u.username === username);
  if (exists) {
    return res.render('register', {
      title: 'สมัครสมาชิก',
      error: '⚠️ ชื่อผู้ใช้นี้มีอยู่แล้ว',
      success: null
    });
  }

  mockUsers.push({ username, email, password, role: 'user' });

  res.render('login', {
    title: 'เข้าสู่ระบบ',
    success: '✅ สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ',
    error: null
  });
});

// ✅ แสดงหน้า forgot password
router.get('/forgot', (req, res) => {
  res.render('forgot', { title: 'ลืมรหัสผ่าน', success: null });
});

// ✅ รับ email และตอบกลับ success (mock)
router.post('/forgot', (req, res) => {
  const { email } = req.body;
  res.render('forgot', {
    title: 'ลืมรหัสผ่าน',
    success: `✅ ระบบได้ส่งลิงก์รีเซ็ตไปยัง ${email} แล้ว (จำลอง)`
  });
});

// ✅ ออกจากระบบ
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;
