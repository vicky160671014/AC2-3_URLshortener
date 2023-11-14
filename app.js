const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const URL = require('./models/url')
const generateShortURL = require('./generate_shorturl')
const app = express()
const port = 3000

//database
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error',()=>{
  console.log('mongodb error!')
})
db.once('open',()=>{
  console.log('mongodb connected!')
})

app.engine('hbs',exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))


//setting route
app.get('/',(req,res)=>{
  res.render('index')
})

app.post('/longURL',(req,res)=>{
  if(!req.body.longURL.trim()) return res.redirect('/')
  const userLongURL = req.body.longURL
  const newShortURL = generateShortURL()

  //確認longURL是否已存在資料庫(輸入相同網址時，產生一樣的縮址)
  URL.findOne({ longURL: userLongURL }).exec()
      .then(data=>
        data ? data : URL.create({longURL: userLongURL, shortURL: newShortURL}))
      .then((data) => res.redirect(`/showShortURL/${data.shortURL}`))
      .catch(error => console.log(error))
  
})

app.get('/showShortURL/:shortURL',(req,res)=>{
  const userShortURL = req.params.shortURL
  res.render('show', { shortURL: userShortURL})
  // URL.findOne({ shortURL : userShortURL}).exec()
  //   .then(url=>res.render('show',{shortURL: url.shortURL, longURL: url.longURL}))
  //   .catch(error => console.log(error))
})

app.get('/:shortURL', (req, res) => {
  const userShortURL = req.params.shortURL
  URL.findOne({ shortURL : userShortURL}).exec()
    .then(url =>{
      if(!url){
        return res.render('error', { shortURL: userShortURL })
      }
      res.redirect(url.longURL)
    })
    .catch(error => console.log(error))
})

//listen on server
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`)
})