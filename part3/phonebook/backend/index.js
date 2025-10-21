require('dotenv').config()

const express = require('express')
const app = express()


// import the Person model (schema + helper methods)
const Person = require('./models/person')

// Middleware
app.use(express.json())

// GET all persons
app.get('/persons', (request, response) => {
  Person.find({})
    .then(persons => response.json(persons))
})

// GET a single person by id
app.get('/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => res.status(400).json({ error: err.message }))
})

// POST a new person
app.post('/persons', (req, res) => {
  const newPerson = new Person(req.body)
  newPerson.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(err => res.status(400).json({ error: err.message }))
})

// PUT update a person by id
app.put('/persons/:id', (req, res) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(updatedPerson => {
      if (updatedPerson) res.json(updatedPerson)
      else res.status(404).end()
    })
    .catch(err => res.status(400).json({ error: err.message }))
})

// DELETE a person by id
app.delete('/persons/:id', (req, response) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
          response.status(204).end() // Successfully deleted
        } else {
          response.status(404).end() // Not found
        }
      })
      .catch(err => response.status(400).json({ error: err.message }))
})

app.use(express.static('dist'))



// Start the server
const PORT = process.env.PORT || 3001
const BASE_URL = `http://localhost:${PORT}`
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
  console.log(`${BASE_URL}/persons`)
})