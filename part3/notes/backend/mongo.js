// Test script. Check that app connects you MongoDB
require('dotenv').config()
const mongoose = require('mongoose')
const Note = require('./models/note')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    return Note.find({})
  })
  .then(notes => {
    notes.forEach(note => console.log(note))
    return mongoose.connection.close()
  })
  .catch(err => console.error('Error:', err.message))