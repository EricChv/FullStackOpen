import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // handle names
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: String(persons.length + 1)
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <input 
          value={newName}
          onChange={handleNameChange}
        />
      
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      {/* 👇 Debugging output */}
      {/* <div>debug: {newName}</div> */}

      <h2>Numbers</h2>
      {persons.map(person =>
        <Person key={person.name} name={person.name}/>
      )}

    </div>
  )
}

export default App