require('dotenv').config();
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log("Please provide your password as first argument.")
  process.exit(1)
}

const password = process.argv[2]
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.log('Error connecting: ', err.message))

// Define schema and model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// If name and number are provide create new contact
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({ name, number })

  person.save()
    .then(() => {
      console.log(`Added ${name} number ${number} to your phonebook.`)
      mongoose.connection.close()
    })
    .catch(err => console.log(err))
} else {
  // If no name or number, list all contact
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
  .catch(err => console.log(err))
}


