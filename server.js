const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'allusers.json');

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// دریافت همه کاربران
app.get('/api/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// دریافت یک کاربر بر اساس username
app.get('/api/users/:username', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.username === req.params.username);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// افزودن کاربر جدید (بدون چک‌های signup)
app.post('/api/users', (req, res) => {
  const users = readUsers();
  const newUser = req.body;
  users.push(newUser);
  writeUsers(users);
  res.json({ message: 'User added' });
});

// ویرایش کاربر بر اساس username
app.put('/api/users/:username', (req, res) => {
  const users = readUsers();
  const idx = users.findIndex(u => u.username === req.params.username);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users[idx] = { ...users[idx], ...req.body };
  writeUsers(users);
  res.json({ message: 'User updated' });
});

// حذف کاربر
app.delete('/api/users/:username', (req, res) => {
  let users = readUsers();
  const newUsers = users.filter(u => u.username !== req.params.username);
  if (newUsers.length === users.length) return res.status(404).json({ message: 'User not found' });
  writeUsers(newUsers);
  res.json({ message: 'User deleted' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));