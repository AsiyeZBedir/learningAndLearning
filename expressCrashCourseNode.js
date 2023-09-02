const express = require("express")
const router = express.Router()

// 'logger' adlı özel işlevi kullanarak bir middleware tanımlanır.
router.use(logger)

// Kök dizine (ana sayfa) gelen GET isteğini ele alır.
router.get("/", (req, res) => {
  console.log(req.query.name) // URL sorgu parametresini konsola yazdırır
  res.send("User List") // "User List" yanıtını gönderir
})

// Yeni kullanıcı oluşturmak için kullanılan sayfayı görüntüler.
router.get("/new", (req, res) => {
  res.render("users/new") // "users/new" şablonunu görüntüler
})

// Kullanıcı bilgilerini alır ve bir kullanıcı ekleme isteğini işler.
router.post("/", (req, res) => {
  const isValid = false // Geçerli bir işlem olup olmadığını belirler

  if (isValid) {
    // Eğer geçerliyse, yeni kullanıcıyı 'users' dizisine ekler ve kullanıcıyı yönlendirir.
    users.push({ firstName: req.body.firstName })
    res.redirect(`/users/${users.length - 1}`)
  } else {
    // Geçerli değilse, hata mesajını konsola yazdırır ve yeni kullanıcı sayfasını tekrar görüntüler.
    console.log("Error")
    res.render("users/new", { firstName: req.body.firstName })
  }
})

// Kullanıcı ile ilgili işlemleri bir grup içinde yönlendirir.
router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user) // Kullanıcıyı konsola yazdırır
    res.send(`Get User With ID ${req.params.id}`) // Kullanıcı ID'sini yanıt olarak gönderir
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`) // Kullanıcıyı güncelleme işlemini işler
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`) // Kullanıcıyı silme işlemini işler
  })

// Örnek kullanıcı verilerini içeren bir dizi oluşturur.
const users = [{ name: "Kyle" }, { name: "Sally" }]

// 'id' URL parametresini işlemek için bir middleware tanımlar.
router.param("id", (req, res, next, id) => {
  req.user = users[id] // 'id' parametresini kullanarak ilgili kullanıcıyı bulur
  next()
})

// Günlükleme (log) işlemini gerçekleştiren bir middleware işlevi tanımlar.
function logger(req, res, next) {
  console.log(req.originalUrl) // Gelen isteğin orijinal URL'sini konsola yazdırır
  next()
}

module.exports = router // 'router' nesnesini dışarıya aktarır.
