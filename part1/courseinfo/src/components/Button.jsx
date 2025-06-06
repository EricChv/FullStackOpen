// Instead of repeating the <button> element three times
// with slightly different text and event handlers, 
// you’re creating a reusable Button component that can:
// - Take an event handler (e.g. onClick)
// - Take a label (e.g. 'plus', 'zero', 'minus')
// - Render a button with the correct behavior and label

const Button = ({ onClick, text}) => 
<button onClick={onClick}>{text}</button>

export default Button