const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  longURL:{
    type: String,
    required: true
  },
  shortURL:{
    type: String
  }
})

module.exports = mongoose.model('URL', urlSchema)