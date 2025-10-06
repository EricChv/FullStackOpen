const express = require('express')
const app = express()
const morgan = require('morgan')

// body-parsing (for JSON bodies)
app.use(express.json())

// "middleware"
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time ms - :body'))

let persons = [
  { 
    "id": "1",
    "name": "Tony Soprano", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Jennifer Melfi", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Christopher Moltisanti", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Paulie Walnuts", 
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  return Math.floor(Math.random() * 1000000).toString()
}


// 3.1 - Get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})


// 3.2 - Get info
app.get('/info', (request, response) => {
  const num_persons = persons.length
  const date = new Date()
  
  response.send(`
    <p>Phonebook has info for ${num_persons} people!</p>
    <p>${date}</p>
    `)
})

// 3.3 - Get single person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = persons.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// 3.4 - Delete single person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)
  response.status(204).end() // 204: no content and return no data with response
})

// 3.5 - Create single person
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'The name or number is missing' })
  }
  
  if (persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())) {
    return response.status(400).json({ error: 'The name already exists in the phonebook' })
  }

    const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  } 

  persons = persons.concat(person)
  response.json(person)
})

// PUT test
app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  console.log('BODY:', request.body)

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'The name or number is missing' })
  }

  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if (!person) {
    return response.status(404).json({ error: 'Person not found' })
  }

  const updatedPerson = { ...person, name: body.name, number: body.number }
  persons = persons.map(p => (p.id === id ? updatedPerson : p))
  response.json(updatedPerson)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}/api/persons`)
  console.log(`http://localhost:${PORT}/info`)
})