const express = require('express');
const db = require('../server/config/db'); // นำเข้าโมดูล db

const app = express();
app.use(express.json()); // Middleware สำหรับแปลง JSON body เป็น JavaScript object

// Endpoint สำหรับตรวจสอบ email และ password
app.post('/test-query', async (req, res) => {
  console.log('💡 /test-query endpoint was called');
  console.log('Request body:', req.body);

  const { email, password } = req.body;

  // ตรวจสอบว่ามีการส่ง email และ password มาหรือไม่
  if (!email || !password) {
    console.error('❌ Missing email or password');
    return res.status(400).json({ error: 'Missing email or password' });
  }

  const testQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
  console.log('🔍 Executing query:', testQuery);
  console.log('🔍 Parameters:', [email, password]);

  try {
    // ใช้คำสั่ง query พร้อมพารามิเตอร์
    const [results] = await db.query(testQuery, [email, password]);

    console.log('✅ Query executed successfully!');
    console.log('🔍 Results:', results);

    // ตรวจสอบผลลัพธ์
    if (results.length > 0) {
      console.log('✅ User found:', results[0]);
      return res.json({ success: true, message: 'User found', data: results[0] });
    } else {
      console.log('❌ No user found with the given email and password.');
      return res.status(404).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('❌ Error executing query:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // ปิดการเชื่อมต่อถ้าจำเป็น (ไม่ควรปิดถ้าใช้ Connection Pool)
    try {
      await db.end();
      console.log('✅ Database connection closed.');
    } catch (closeErr) {
      console.error('❌ Error closing the database connection:', closeErr.message);
    }
  }
});

// รันเซิร์ฟเวอร์
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
