import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import personService from './services/persons'

const App = () => {
  // dummy data for testing
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

// filter logic:
// new arr based on 'persons' arr, but only includes ppl whose name include the filter str
const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(filter.toLowerCase()) //.includes() checks if the name contains the typed substring
)

// handle names change
const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}

// handle number change
const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

const addPerson = (event) => {
  event.preventDefault()

  if (persons.some(person =>
    person.name.toLowerCase() === newName.toLowerCase()
  )) {
    alert(`${newName} is already added to the phonebook`)
    return // immediately exits function
  }

  const personObject = {
    name: newName,
    number: newNumber,
    id: crypto.randomUUID()
  }

  personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
}

  return (
    <div>
      <h2>Phonebook</h2>
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