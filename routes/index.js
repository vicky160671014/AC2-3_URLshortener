const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const url = require('./modules/url')
const connectLongUrl = require('./modules/connectLongurl')

//route modules
router.use('/', home)
router.use('/url',url)
router.use('/',connectLongUrl)


module.exports = router