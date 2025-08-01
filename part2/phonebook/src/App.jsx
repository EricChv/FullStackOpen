import { useState, useEffect } from 'react'
import './index.css';
import Filter from './components/Filter' 
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
    useEffect(() => {
    personService //latest code
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)


// handle filter
const handleFilterChange = (event) => {
  setFilter(event.target.value)
}

const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this contact?')) {
    personService
      .deleteName(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error('Error deleting person:', error)
        alert('The contact could not be deleted. It may have already been removed from the server.')
      })
  }
}

const showNotification = (message, type) => {
  setNotificationMessage(message);
  setNotificationType(type);
  setTimeout(() => {
    setNotificationMessage(null);
    setNotificationType(null); 
  }, 5000); 
}

// filter logic:
// new arr based on 'persons' arr, but only includes ppl whose name include the filter str
const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(filter.toLowerCase()) //.includes() checks if the name contains the typed substring
)

// handle names change
const handleNameChange = (event) => {
  setNewName(event.target.value)
}

// handle number change
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const addPerson = (event) => {
  event.preventDefault()

  // If it someone equal, it returns their object as 'existingPerson'
  const existingPerson = persons.find(person =>
    person.name.toLowerCase() === newName.toLowerCase()
  )

  // If 'existingPerson' true
  if (existingPerson) {
    const confirmUpdate = window.confirm(
      `${newName} is already added to the phonebook. Replace the old number with the new one?`
    )
    //if user click yes on 'confirmUpdate' = true
    if (confirmUpdate) {
      // Creates a new object with the same name and id, but updates the number
      const updatedPerson = { ...existingPerson, number: newNumber} 

      personService
        // update 'existingPerson.id' w/ 'updatedPerson' (same ID, new number)
        .update(existingPerson.id, updatedPerson)

        //Update local state
        // 'returnedPerson' = person object returned from backend
        .then(returnedPerson => {
          // Loops over all people. If the person’s id doesn’t match the one we updated, it stays the same. 
          // If it does, we replace it with the updated person returned from the server.
          setPersons(persons.map(p =>
            // If the current person p has a different ID than the one we updated, keep them unchanged.
            // Otherwise, replace them with the new, updated person from the server.
            //        condition ? valueIfTrue : valueIfFalse
            p.id !== existingPerson.id ? p : returnedPerson
          ))
          // Clears the input fields after the update is done.
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          showNotification(`Failed to update ${newName}. This contact has already been removed from the server.`, 'errorNotification')
          console.error(error)
        })
    }
    return
  }
  // If 'existingPerson' is falsey (no match found), the function continues down here:
  const personObject = {
    name: newName,
    number: newNumber
  }

  personService
    .create(personObject)
    .then(returnedPerson => {
      // Appends the new person to the current list.
      setPersons(persons.concat(returnedPerson))
      showNotification(`Added ${returnedPerson.name}`, 'successNotification')
      setNewName('')
      setNewNumber('')
    })
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>Add Contact</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <PersonsList 
        personsToShow={personsToShow} 
        handleDelete={handleDelete}
      />

    </div>
  )
}

export default App