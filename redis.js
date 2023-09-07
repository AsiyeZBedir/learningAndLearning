// İlgili modülleri içe aktarıyoruz
const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

// Portları ve istemciyi yapılandırıyoruz
const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

// Express uygulamasını oluşturuyoruz
const app = express();

// Kullanıcıya yanıt oluşturmak için bir fonksiyon tanımlıyoruz
function setResponse(username, repos) {
  return `<h2>${username}, ${repos} Github reposuna sahiptir</h2>`;
}

// Github'dan veri almak için bir istek yapmak üzere async bir fonksiyon tanımlıyoruz
async function getRepos(req, res, next) {
  try {
    console.log('Veri Alınıyor...');

    // İstek parametresinden kullanıcı adını alıyoruz
    const { username } = req.params;

    // Github API'sine istek yapılıyor
    const response = await fetch(`https://api.github.com/users/${username}`);

    // Yanıtı JSON formatına çeviriyoruz
    const data = await response.json();

    // Kullanıcının açık repos sayısını alıyoruz
    const repos = data.public_repos;

    // Veriyi Redis'e kaydediyoruz ve bir saat süreyle saklıyoruz
    client.setex(username, 3600, repos);

    // Kullanıcıya yanıt gönderiyoruz
    res.send(setResponse(username, repos));
  } catch (err) {
    console.error(err);
    res.status(500).send("Sunucu hatası");
  }
}

// Önbellek (cache) orta yazılımını tanımlıyoruz
function cache(req, res, next) {
  const { username } = req.params;

  // Redis'ten veriyi getiriyoruz
  client.get(username, (err, data) => {
    if (err) throw err;

    // Eğer veri mevcutsa, kullanıcıya yanıt gönderiyoruz
    if (data !== null) {
      res.send(setResponse(username, data));
    } else {
      // Veri yoksa, sonraki middleware'e geçiyoruz
      next();
    }
  });
}

// '/repos/:username' yolunda önbellek (cache) orta yazılımını ve veri çekme işlevini kullanıyoruz
app.get('/repos/:username', cache, getRepos);

// Uygulamayı belirtilen portta dinlemeye başlıyoruz
app.listen(PORT, () => {
  console.log(`Uygulama port ${PORT} üzerinde dinleniyor`);
});
