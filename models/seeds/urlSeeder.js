const URL = require('../url')
const db = require('../../config/mongoose')

db.once('open', () => {
  URL.create([
    { longURL: 'https://www.google.com', shortURL: '12Abc' },
    { longURL: 'https://www.npmjs.com', shortURL: '45jof' },
    { longURL: 'https://mongoosejs.com/docs/models.html', shortURL: 'fp937' }
  ])
  console.log('done')
})