// Load environment variables from .env file (e.g., MONGODB_URI, PORT)
require('dotenv').config()

// Import Express framework
const express = require('express')
const app = express()
const cors = require('cors')


// Import the Note model (schema + helper methods)
const Note = require('./models/note')

// Middleware: logs details of each incoming request
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// Serve static files (e.g., React frontend build) from 'dist' folder
app.use(express.static('dist'))

// Enable CORS for all routes
app.use(cors())

// Middleware: parses incoming JSON request bodies
app.use(express.json())

// Use the request logger for all routes
app.use(requestLogger)

// -------------------- Routes --------------------

// Get all notes
app.get('/api/notes', (request, response) => {
  Note.find({})           // Fetch all notes from MongoDB
      .then(notes => response.json(notes))
})


app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then((note) => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end() // Not found, logical outcome, not an error in the system
    }
  })
  .catch(error => {
      // This runs if findById() fails entirely (e.g. invalid ID or database issue)
    console.log(error)
    response.status(500).end()
  })
})


// Create a new note
app.post('/api/notes', (request, response) => {
  const body = request.body

  // Validate request: content is required
  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  // Create new Note instance
  const note = new Note({
    content: body.content,
    important: body.important || false, // default to false if not provided
  })

  // Save to MongoDB
  note.save()
      .then(savedNote => response.json(savedNote))
      .catch(err => response.status(500).json({ error: `error saving note: ${err.message}` }))
})

// Update a note by ID
app.put('/api/notes/:id', (request, response) => {
  const { content, important } = request.body

  // Find note by ID and update fields
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true } // Return the updated note
  )
  .then(updateNote => {
    if (updateNote) {
      response.json(updateNote)
    } else {
      response.status(404).end() // Not found
    }
  })  
})

// Delete a note by ID
app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id)
      .then(result => {
  })
})

// Middleware: handle unknown endpoints (404)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Start server
const PORT = process.env.PORT || 3001 // Use PORT from env or default 3001
const BASE_URL = `http://localhost:${PORT}`
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
  console.log(`${BASE_URL}/api/notes`)
})