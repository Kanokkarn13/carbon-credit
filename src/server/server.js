const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db'); 
const authController = require('./controllers/authController'); // นำเข้า authController

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route สำหรับ Login
app.post('/api/check-user', (req, res, next) => {
  console.log('✅ Route /api/check-user was called');
  console.log('Request body:', req.body); // ตรวจสอบข้อมูลที่ถูกส่งเข้ามา
  next(); // ดำเนินการต่อไปที่ `authController.login`
}, authController.login);

// Route สำหรับ Register
app.post('/api/register', authController.register); // ตรวจสอบว่าเส้นทางนี้ถูกต้อง

// เริ่มต้นเซิร์ฟเวอร์
app.listen(3000, () => {
  console.log('✅ Server is running on http://localhost:3000');
});