const Person = ({ name, number, deleteName }) => {
  
  return (
  <p>
    {name}: {number}
    <button className="person-delete-btn" onClick={deleteName}>delete</button>
  </p>
  )
}

export default Person