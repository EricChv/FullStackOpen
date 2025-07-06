import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'

const App = () => {
  // dummy data for testing
  const [persons, setPersons] = useState([])
    useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, []) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

// handle filter
const handleFilterChange = (event) => {
  setFilter(event.target.value)
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
  setPersons(persons.concat(personObject))
  setNewName('')
  setNewNumber('')
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
      <PersonsList personsToShow={personsToShow} />
    </div>
  )
}

export default App