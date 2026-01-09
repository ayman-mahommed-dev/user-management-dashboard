const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// بيانات مؤقتة للمستخدمين
let users = [
  { id: 1, name: "Ali", email: "ali@example.com" },
  { id: 2, name: "Sara", email: "sara@example.com" }
];

// --- Read: جميع المستخدمين ---
app.get("/users", (req, res) => {
  res.json(users);
});

// --- Read: مستخدم واحد ---
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// --- Create: إضافة مستخدم جديد ---
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// --- Update: تعديل مستخدم ---
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
});

// --- Delete: حذف مستخدم ---
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "User deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
