// Import Mongoose for MongoDB interaction
const mongoose = require('mongoose')

// Optional: disables Mongoose strict query warning
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// -------------------- Define schema --------------------

// Schema defines the shape of Note documents in MongoDB
const personSchema = new mongoose.Schema({
  name: String,   // The text content of the note
  number: String // Whether the note is marked as important
})

// Customize how documents are returned as JSON
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Convert _id (MongoDB ObjectId) to string and rename to 'id'
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id    // Remove original MongoDB _id field
    delete returnedObject.__v    // Remove version key added by Mongoose
  }
})

// Export the Note model for use in other files
// This allows you to do Note.find(), Note.save(), etc.
module.exports = mongoose.model('Person', personSchema)