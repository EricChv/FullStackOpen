//Show also the sum of the exercises of the course.

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    console.log('sum:', sum, 'part:', part)
    return sum + part.exercises
  }, 0)

  return <p><strong>Total of {total} exercises</strong></p>
}

export default Total