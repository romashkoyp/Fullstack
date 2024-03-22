import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (item) => {
  return {
    content: item,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: anecdotesAtStart.map(asObject),
  reducers: {
    incrementVote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      anecdoteToVote.votes += 1;
    },
    createAnecdote(state, action) {
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
    }
  }
})

export const { incrementVote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer