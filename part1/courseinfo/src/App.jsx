import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Display = ({text, value}) => (
  <div>{text}{value}</div>
)

// start component. here we call the renamed props
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = total > 0 ? (good - bad) / total : 0
  const positive = total > 0 ? (good / total) * 100 : 0

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td>┊{good}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>┊{neutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>┊{bad}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>┊{total}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>┊{average}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>┊{positive}%</td>
        </tr>
      </tbody>
    </table>
  )
}
// end component

const App = () => {
  // save clicks of each button to its own state
  const [goodCount, setGood] = useState(0)
  const [neutralCount, setNeutral] = useState(0)
  const [badCount, setBad] = useState(0)

  return (
    
    <div>
      <h1>Give feedback</h1>
      <div>
        {/* this 'text=' is used to label the button */}
        <Button onClick={() => setGood(goodCount + 1)} text="good" /> 
        <Button onClick={() => setNeutral(neutralCount + 1)} text="neutral" />
        <Button onClick={() => setBad(badCount + 1)} text="bad" />      
      <h2>Statistics</h2>
        {/* here we pass props and rename them to good, neutral, bad */}
        <Statistics good={goodCount} neutral={neutralCount} bad={badCount} />
      </div>
    </div>
  )
}

export default App