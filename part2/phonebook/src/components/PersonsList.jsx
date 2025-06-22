import Person from "./Person";

const PersonsList = ({ personsToShow }) => (
  <div>
    {personsToShow.map(person => (
      <Person key={person.id} name={person.name} number={person.number}/> 
    ))}
  </div>
)

export default PersonsList