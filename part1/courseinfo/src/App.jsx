import { useState } from "react";
import Display from './components/Display'
import Button from './components/Button' 

const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing... value before: ', counter)
    setCounter(counter + 1)
  }
  const decreaseByOne = () => {
    console.log('decreasing... value before: ', counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('resetting to zero... value before: ', counter)
    setCounter(0)
  }

  //This component contains the Display component - which displays the counter's value 0. And three Button components. The buttons all have event handlers, which are used to change the state of the counter.
  return (
    <div>
      <Display counter={counter}/>
      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      />           
    </div>
  )
}

export default App