//generate_shortUrl.js

function sample(array){
  const index = Math.floor(Math.random()*array.length)
  return array[index]
}

function generateShortURL(){
  const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678901234567890123456789'
  const collection = pool.split('')
  let shortURL = ''
  for(let i = 0; i<5 ; i++){
    shortURL += sample(collection)
  }
  return shortURL
}