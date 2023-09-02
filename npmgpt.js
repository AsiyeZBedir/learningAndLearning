// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Ana sayfa
app.get('/', (req, res) => {
  res.send('Merhaba, Dünya!');
});

// Hakkında sayfası
app.get('/about', (req, res) => {
  res.send('Hakkında Sayfası');
});

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});
