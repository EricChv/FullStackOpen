const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => (
  <form onSubmit={addPerson}>
        <div>
          <label>Name: </label>
          <input value={newName} onChange={handleNameChange} />
        </div>

        <div>        
          <label>Number: </label>
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

export default PersonForm