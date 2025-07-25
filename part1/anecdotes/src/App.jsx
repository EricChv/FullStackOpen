import { useState } from 'react';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x‑rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  // Click‑handler to choose a random index, log it, and update state
  const handleNext = () => {
    const rand = Math.floor(Math.random() * anecdotes.length);
    console.log('New index:', rand, '\nAnecdote:', anecdotes[rand]);
    setSelected(rand);
  };

  // Click‑handler to vote
  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes)
    console.log(`Voted for: "${anecdotes[selected]}". \nTotal votes: ${updatedVotes[selected]}`)
  }

  const maxVotes = Math.max(...votes);
  const topAnecdoteIndex = votes.indexOf(maxVotes)
 
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <Button onClick={handleVote} text="vote"/>
      <Button onClick={handleNext} text="next anecdote" />

    {/* If the condition before && is true, it renders the expression after the &&.
	  •	If the condition is false, it renders nothing. */}
      {maxVotes > 0 && (
        <>
          <h2>Anecdote with most votes</h2>
          <p>{anecdotes[topAnecdoteIndex]}</p>
          <p>Votes: {maxVotes}</p>
        </>
      )}
    </div>
  );
};

export default App;