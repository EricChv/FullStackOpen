require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Note = require('./models/note')

// MongoDB connection
const password = process.argv[2]
const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)


app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({ error: 'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch(err => {
    response.status(500).json({ error: err.message })
  })
})

app.put('/api/notes/:id', (request, response) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true }
  )
  .then(updateNote => {
    if (updateNote) {
      response.json(updateNote)
    } else {
      response.status(404).end
    }
  })  
})

app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end() // Successfully deleted
      } else {
        response.status(404).end() // Not found
      }
    })
    .catch(err => response.status(400).json({ error: 'malformatted id'}))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001 // If port not provided by ENV use 3001
const BASE_URL = `http://localhost:${PORT}`
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
  console.log(`${BASE_URL}/api/notes`)
})