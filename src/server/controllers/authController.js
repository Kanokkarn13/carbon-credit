const db = require('../config/db'); // นำเข้าโมดูล db
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  console.log('💡 authController.login was called');

  const { email, password } = req.body;

  // สร้างคำสั่ง SQL
  const query = 'SELECT * FROM users WHERE email = ?';
  console.log('🔍 SQL Query:', query);

  try {
    // ใช้คำสั่ง query พร้อมพารามิเตอร์
    const [results] = await db.query(query, [email]);

    console.log('✅ Query executed successfully!');

    // ตรวจสอบผลลัพธ์
    if (results.length > 0) {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        console.log('✅ User found:', user);
        return res.json({ success: true, message: 'Login successful', data: user });
      } else {
        console.log('❌ Invalid password.');
        return res.status(404).json({ success: false, message: 'Invalid email or password' });
      }
    } else {
      console.log('❌ No user found with the given email.');
      return res.status(404).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('❌ Error executing query:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.register = async (req, res) => {
  const { name, lname, email, password, phone } = req.body;

  // ตรวจสอบว่าข้อมูล
  if (!name || !lname || !email || !password || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // เช็คว่า email ซ้ำหรือไม่
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // เพิ่มผู้ใช้ใหม่ในฐานข้อมูล
    const newUser = {
      name,
      lname,
      email,
      password: hashedPassword,
      phone,
    };

    await db.query('INSERT INTO users SET ?', newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};