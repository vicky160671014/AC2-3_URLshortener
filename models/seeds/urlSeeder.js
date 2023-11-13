const mongoose = require('mongoose')
const URL = require('../url')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  URL.create([
    { longURL: 'https://www.google.com', shortURL: '12Abc' },
    { longURL: 'https://www.npmjs.com', shortURL: '45jof' },
    { longURL: 'https://mongoosejs.com/docs/models.html', shortURL: 'fp937' }
  ])
  console.log('done')
})