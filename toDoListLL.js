// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('To-Do List App');
});

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});

// app.js (Devam)
const todos = [];

// Yapılacakları listeleme
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Yapılacak ekleme
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.json(newTodo);
});
