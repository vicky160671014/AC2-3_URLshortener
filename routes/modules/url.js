const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const generateShortURL = require('../../generate_shorturl') 


router.post('/longURL', (req, res) => {
  if (!req.body.longURL.trim()) return res.redirect('/')
  const userLongURL = req.body.longURL
  const newShortURL = generateShortURL()

  //確認longURL是否已存在資料庫(輸入相同網址時，產生一樣的縮址)
  URL.findOne({ longURL: userLongURL }).exec()
    .then(data =>
      data ? data : URL.create({ longURL: userLongURL, shortURL: newShortURL }))
    .then((data) => res.redirect(`/url/showShortURL/${data.shortURL}`))
    .catch(error => console.log(error))

})

router.get('/showShortURL/:shortURL', (req, res) => {
  const userShortURL = req.params.shortURL
  res.render('show', { shortURL: userShortURL })
  // URL.findOne({ shortURL : userShortURL}).exec()
  //   .then(url=>res.render('show',{shortURL: url.shortURL, longURL: url.longURL}))
  //   .catch(error => console.log(error))
})


module.exports = router