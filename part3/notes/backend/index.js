const express = require('express')
const app = express()

let notes = [
  {
    "id": "1",
    "content": "HTML is easy",
    "important": false
  },
  {
    "id": "2",
    "content": "Browser can execute only JavaScript",
    "important": false
  },
  {
    "id": "3",
    "content": "GET and POST are the most important methods of HTTP protocol",
    "important": false
  }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)
app.use(express.static('dist'))
app.use(express.json())


app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  notes = [...notes, note]
  response.json(note)
})

app.put('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const newNote = request.body
  notes = notes.map(note => note.id === id ? newNote : note)
  response.json(newNote)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
const BASE_URL = `http://localhost:${PORT}`
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
  console.log(`${BASE_URL}/api/notes`)
})