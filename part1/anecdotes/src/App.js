import React, { useState } from 'react'

const BestAnecdote = ({ copy, anecdotes }) => {
  const highestVote = Math.max(...copy)
  
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[copy.indexOf(highestVote)]}<br></br>
        has {highestVote} votes
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length + 1).join('0').split('').map(parseFloat))

  const randomiseAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const copy = [...points]

  const registerVote = () => {
    copy[anecdotes.indexOf(anecdotes[selected])] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br></br>
      has {copy[anecdotes.indexOf(anecdotes[selected])]} votes<br></br>
      <button onClick={() => registerVote()}>vote</button>
      <button onClick={() => randomiseAnecdote()}>next anecdote</button>
      <BestAnecdote anecdotes={anecdotes} copy={copy} />
    </div>
  )
}

export default App