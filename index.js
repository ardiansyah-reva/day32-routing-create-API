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

app.get("/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "kopi kapal api",
      price: 2500,
      stock: 12,
    },
    {
      id: 2,
      name: "kopi good day",
      price: 3000,
      stock: 12,
    },
    {
      id: 3,
      name: "kopi luwak",
      price: 2500,
      stock: 12,
    },
    {
      id: 4,
      name: "kopi ABC",
      price: 2000,
      stock: 12,
    },
    {
      id: 5,
      name: "kopi liyong",
      price: 5000,
      stock: 12,
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server Running at ${nameAPI}`);
});
