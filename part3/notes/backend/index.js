const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

let notes = []

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

const PORT = process.env.PORT || 3001
const BASE_URL = `http://localhost:${PORT}`
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`${BASE_URL}/api/notes`)
})