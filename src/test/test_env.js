const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mytdb.cxusk8iw0nmc.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'adminCarbon123',
  database: 'mytdb'
});

connection.connect(err => {
  if (err) {
    console.error('❌ ไม่สามารถเชื่อมต่อฐานข้อมูลได้:', err.message);
  } else {
    console.log('✅ เชื่อมต่อฐานข้อมูลสำเร็จ');
  }
});
