const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('Connected to mongoDB');
  })
  .catch(error => {
    console.log('error connecting to mongoDB', error.message)
  })



const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

module.exports = mongoose.model('Person', personSchema)