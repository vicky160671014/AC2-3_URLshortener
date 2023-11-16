const express = require('express')
const router = express.Router()
const URL = require('../../models/url')

router.get('/:shortURL', (req, res) => {
  const userShortURL = req.params.shortURL
  URL.findOne({ shortURL: userShortURL }).exec()
    .then(url => {
      if (!url) {
        return res.render('error', { shortURL: userShortURL })
      }
      res.redirect(url.longURL)
    })
    .catch(error => console.log(error))
})

module.exports = router