const Person = ({ name, number, deleteName }) => {
  
  return (
  <p>
    {name}: {number}
    <button onClick={deleteName}>delete</button>
  </p>
  )
}

export default Person