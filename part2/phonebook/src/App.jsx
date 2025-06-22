import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'

const App = () => {
  // dummy data for testing
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
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