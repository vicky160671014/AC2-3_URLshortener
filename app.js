const express = require('express')
const app = express()
const port = 3000


//setting route
app.get('/',(req,res)=>{
  res.send('This will be URL shortener.')
})

//listen on server
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`)
})