const express = require('express');
const app = express();

// Kullanıcı verilerini temsil eden bir dizi (örnek veri)
const users = [
  { id: 1, username: 'john_doe', name: 'John Doe' },
  { id: 2, username: 'jane_smith', name: 'Jane Smith' },
  { id: 3, username: 'bob_johnson', name: 'Bob Johnson' },
];

// Kullanıcı profili sayfasını görüntüleme
app.get('/users/:id', (req, res) => {
  // :id parametresini URL'den alın
  const userId = parseInt(req.params.id);

  // Kullanıcıyı bulmak için id'yi kullanın
  const user = users.find(u => u.id === userId);

  if (!user) {
    // Kullanıcı bulunamadıysa 404 hatası gönderin
    return res.status(404).send('Kullanıcı bulunamadı');
  }

  // Kullanıcı profili sayfasını görüntüleme
  res.send(`<h1>Kullanıcı Profili</h1><p>Kullanıcı Adı: ${user.username}</p><p>Adı: ${user.name}</p>`);
});

// Uygulamayı dinlemeye başla
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
