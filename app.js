const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

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

//setting route
app.get('/',(req,res)=>{
  res.send('This will be URL shortener.')
})

//listen on server
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`)
})