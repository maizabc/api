const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Lưu danh sách user trong bộ nhớ (hoặc bạn có thể dùng MongoDB)
let users = [];

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Thiếu thông tin" });

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(409).json({ message: "Tài khoản đã tồn tại" });

  const newUser = { username, password, createdAt: new Date().toISOString() };
  users.push(newUser);
  res.json({ message: "Đăng ký thành công", user: newUser });
});

app.get('/api/users', (req, res) => {
  res.json({ users });
});

app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
