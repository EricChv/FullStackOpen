import Person from "./Person";

const PersonsList = ({ personsToShow, handleDelete }) => (
  <div>
    {personsToShow.map(person => (
      <Person 
        key={person.id} 
        name={person.name} 
        number={person.number}
        deleteName={() => handleDelete(person.id)} 
      />
    ))}
  </div>
)

export default PersonsList