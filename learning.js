const express = require('express');
const app = express();

// Middleware tanımlama
app.use(express.urlencoded({ extended: true }));

// POST isteği işleme
app.post('/submit', (req, res) => {
  // req.body içinde form verileri bulunur
  const username = req.body.username;
  const password = req.body.password;
  
  // Verileri kullanarak işlem yapabilirsiniz
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
