import { useState } from 'react'

const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>

const Header = ({ header1, header2 }) => (
  <div>
    <h1>{header1}</h1>        
    <h1>{header2}</h1>      
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  console.log('array is:', votes)
  
  const nextAnecdote = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(newSelected)
    console.log('random number is:', {newSelected})
  }

  const newVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const names = {
    header1: 'Anecdote of the day',
    header2: 'Anecdote with most votes',
  }

  const maxVotes = () => {
    const maxVote = Math.max(...votes)
    const maxVoteIndex = votes.indexOf(maxVote)
    console.log('index with max votes is:', maxVoteIndex)
    return maxVoteIndex
  }

  return (
    <div>
      <Header header1={names.header1} />
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        This anecdote has {votes[selected]} votes
      </div>
      <div>
        <Button onSmash={newVote} text="vote" />
        <Button onSmash={nextAnecdote} text="next anecdote" />
      </div>
      <Header header2={names.header2} />
      <div>
        {anecdotes[maxVotes()]}
      </div>
      <div>
        This anecdote has {votes[maxVotes()]} votes
      </div>
    </div>
  )
}

export default App
