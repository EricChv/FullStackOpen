import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // useEffect(() => {
  //   noteService
  //     .getAll()
  //     .then((initialNotes) => {
  //       setNotes(initialNotes.map)
  //   })
  // }, [])

  useEffect(() => {
  noteService
    .getAll()
    .then(initialNotes => {
      console.log('initialNotes:', initialNotes) // check what you actually received
      if (Array.isArray(initialNotes)) {
        setNotes(initialNotes.map(n => ({ ...n, id: n.id })))
      } else {
        console.error('Expected an array, got:', initialNotes)
        setNotes([]) // fallback
      }
    })
}, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    } 

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
    })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note =>
          // If the note's id doesn't match the updated note's id, keep it as-is;
          // otherwise, replace it with the updated note from the server.
          note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        // Remove the deleted note from local state to keep UI in sync
        // Keep every note whose id is not equal to the one you’re deleting.
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App