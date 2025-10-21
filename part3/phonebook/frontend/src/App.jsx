// Import React tools for state and side effects
import { useState, useEffect } from 'react'

// Import CSS and components
import './index.css'
import Filter from './components/Filter' 
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import Notification from './components/Notification'
import personService from './services/persons' // handles backend API calls

const App = () => {
  // STATE: list of all people from the server
  const [persons, setPersons] = useState([])

  // Fetch the initial list of contacts when the component loads (runs once)
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      console.log('initialPersons:', initialPersons)
      setPersons(initialPersons) // Save the contacts to state
    })
  }, []) // empty dependency array = run only once when page loads

  // More state for the form input fields and filter
  const [newName, setNewName] = useState('')      // text in name input
  const [newNumber, setNewNumber] = useState('')  // text in number input
  const [filter, setFilter] = useState('')        // current filter string
  const [notificationMessage, setNotificationMessage] = useState(null) // message to show
  const [notificationType, setNotificationType] = useState(null)       // "success" or "error"

  // When user types in the filter box
  const handleFilterChange = (event) => {
    setFilter(event.target.value) // update filter state
  }

  // Handle deleting a person by their ID
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      personService
        .deleteName(id)
        .then(() => {
          // Remove the deleted person from the list in state
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          // If the person was already deleted or error occurs
          console.error('Error deleting person:', error)
          alert('The contact could not be deleted. It may have already been removed from the server.')
        })
    }
  }

  // Display a message (success or error) for 5 seconds
  const showNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)

    // Clear the message after 5 seconds
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null) 
    }, 5000)
  }

  // Filtered list of people to display
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
    // shows only names that include the filter text (case-insensitive)
  )

  // When user types in the name input field
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // When user types in the number input field
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // When the form is submitted (add or update contact)
  const addPerson = (event) => {
    event.preventDefault() // prevent page reload

    // check if empty name or number
    if (newName.trim() === '' || newNumber.trim() === '') {
      showNotification(`Name and number cannot be empty.`, 'errorNotification')
      return
    }
    
    // Check if the person already exists (same name)
    const existingPerson = persons.find(person =>
      person.name.toLowerCase() === newName.toLowerCase()
    )

    // If person exists, ask to update their number
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with the new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber } // same name/id, new number

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            // Replace the updated person in the state list
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : returnedPerson
            ))
            setNewName('')   // Clear form
            setNewNumber('')
          })
          .catch(error => {
            // Show error message if update fails (e.g. already deleted)
            showNotification(`Failed to update ${newName}. This contact has already been removed from the server.`, 'errorNotification')
            console.error(error)
          })
      }
      return // exit function here if updating
    }

    // If person is new, create and send to backend
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson)) // add new person to list
        showNotification(`Added ${returnedPerson.name}`, 'successNotification') // show success
        setNewName('')  // clear form
        setNewNumber('')
      })
  }

  // UI (JSX) to render
  return (
    <div>
      <h1>Phonebook</h1>

      {/* Notification banner */}
      <Notification message={notificationMessage} type={notificationType}/>

      {/* Filter input */}
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>Add Contact</h2>

      {/* Form to add new contact */}
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      {/* List of filtered contacts */}
      <PersonsList
        personsToShow={personsToShow} 
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App