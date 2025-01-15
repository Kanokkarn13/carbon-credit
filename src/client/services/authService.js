export const login = async (email, password) => {
  const API_URL = 'http://192.168.0.104:3000/api/check-user';
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // ถ้าเซิร์ฟเวอร์ตอบกลับด้วยสถานะที่ไม่ใช่ 200
      throw new Error(`Server responded with status ${response.status}`);
    }

    return await response.json(); // แปลง Response เป็น JSON
  } catch (error) {
    console.error('Error in login function:', error);
    throw error; // ส่ง Error กลับไปที่ handleLogin
  }
};

export const register = async (name, lname, email, password, phone) => {
  const API_URL = 'http://192.168.0.104:3000/api/register';
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, lname, email, password, phone }),
    });

    if (!response.ok) {
      // ถ้าเซิร์ฟเวอร์ตอบกลับด้วยสถานะที่ไม่ใช่ 200
      throw new Error(`Server responded with status ${response.status}`);
    }

    return await response.json(); // แปลง Response เป็น JSON
  } catch (error) {
    console.error('Error in register function:', error);
    throw error; // ส่ง Error กลับไปที่ handleRegister
  }
};