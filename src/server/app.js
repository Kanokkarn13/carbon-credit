require('dotenv').config();
const express = require('express');
const app = express();

// โหลด Port จาก Environment Variables
const PORT = process.env.PORT || 3000;

// ตัวอย่าง Route
app.get('/', (req, res) => {
    res.send('Carbon Credit Exchange Platform is running!');
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
