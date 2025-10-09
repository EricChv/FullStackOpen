const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

// Middleware
app.use(cors())
app.use(express.json())

// Read data from db.json
const getPersons = () => {
  const data = fs.readFileSync('db.json', 'utf-8')
  return JSON.parse(data).persons
}

// GET all persons
app.get('/persons', (req, res) => {
  res.json(getPersons())
})

// GET a single person by id
app.get('/persons/:id', (req, res) => {
  const persons = getPersons()
  const person = persons.find(p => String(p.id) === req.params.id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// POST a new person
app.post('/persons', (req, res) => {
  const persons = getPersons()
  const newPerson = req.body

  // Simple ID generation
  newPerson.id = persons.length > 0 // if persons exist
  ? Math.max(...persons.map(p => p.id)) + 1 // do this (max id + 1)
  : 1 // else start at 1
  
  persons.push(newPerson)

  // Save to db.json
  fs.writeFileSync('db.json', JSON.stringify({ persons }, null, 2))
  res.status(201).json(newPerson)
})

// PUT update a person by id
app.put('/persons/:id',  (req, res) => {
  const persons = getPersons()
  const personIndex = persons.findIndex(p => String(p.id) === req.params.id)

  if (personIndex !== -1) {
    const updatedPerson = { ...persons[personIndex], ...req.body }
    persons[personIndex] = updatedPerson

    // Save to db.json
    fs.writeFileSync('db.json', JSON.stringify({ persons }, null, 2))
    res.json(updatedPerson)
  } else {
    res.status(404).end()
  }
})

// DELETE a person by id
app.delete('/persons/:id', (req, res) => {
  let persons = getPersons()
  const personIndex = persons.findIndex(p => String(p.id) === req.params.id)

  if (personIndex !== -1) {
    persons = persons.filter(p => String(p.id) !== req.params.id)

    // Save to db.json
    fs.writeFileSync('db.json', JSON.stringify({ persons }, null, 2))
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

app.use(express.static('dist'))

// Start the server
const PORT = process.env.PORT || 3001
const BASE_URL = `http://localhost:${PORT}`
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
  console.log(`${BASE_URL}/api/notes`)
})