const express = require("express");
const app = express();
const PORT = 8000;
const nameAPI = `http://localhost:${PORT}/`;

app.get("/", (req, res) => {
  res.send("Welcome to my node.js !");
});

app.get("/hello", (req, res) => {
  res.send("Hello from Express JS!");
});
app.get("/about", (req, res) => {
  res.send("Hello, nama saya Reva Ardiansyah Abdullah");
});

let users = [
  { id: 1,
    name: "Udin",
    NIM: 25101101,
    studi: "Sarjana Informasi"
  },
  { id: 2,
    name: "Selamet",
    NIM: 25101102, 
    studi: "Teknik Informatika" 
  },
  { id: 3, 
    name: "Ganjar", 
    NIM: 25101103, 
    studi: "Teknik Industri" 
  },
  { id: 4, 
    name: "Bahlil", 
    NIM: 25101104, 
    studi: "Teknik Sipil" 
  },
  { id: 5, 
    name: "Agus", 
    NIM: 25101105, 
    studi: "Sarjana Hukum" 
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((p) => p.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  res.json(user);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.NIM || !newUser.studi) {
    return res.status(400).json({
      message: "Field 'name', 'NIM' dan 'studi' wajib diisi!",
    });
  }

  const lastId = users.length > 0 ? Math.max(...users.map((p) => p.id)) : 0;
  newUser.id = lastId + 1;
  users.push(newUser);
  users.sort((a, b) => a.id - b.id);

  res.status(201).json({
    message: "User berhasil ditambahkan!",
    data: newUser,
  });
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedData = req.body;
  const index = users.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: `User dengan id ${id} tidak ditemukan!`,
    });
  }

  users[index] = { ...users[index], ...updatedData };
  res.json({
    message: "Data user berhasil diupdate!",
    data: users[index],
  });
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID tidak valid" });
  }

  const index = users.findIndex((p) => p.id === id);
  if (index === -1) {
    return res
      .status(404)
      .json({ message: `User dengan id ${id} tidak ditemukan!` });
  }

  const [deleted] = users.splice(index, 1);
  res.status(200).json({
    message: `User ${id} berhasil dihapus!`,
    data: deleted,
  });
});

app.use((err, req, res, next) => {
  console.error("Error terdeteksi:", err.message);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan internal pada server.",
    detail: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server Running at ${nameAPI}`);
});