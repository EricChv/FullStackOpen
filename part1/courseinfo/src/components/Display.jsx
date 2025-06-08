// Instead of directly showing the counter value inside the App component, you’re creating a reusable Display component that can:
// - Take a value (e.g. counter)
// - Display that value inside a <div>
// - Be reused wherever you want to show the counter

const Display = props => <div>{props.value}</div>

export default Display

