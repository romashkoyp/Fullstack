import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    anecdoteVote(state, action) {
      const anecdote = state.find(anecdote => anecdote.id === action.payload)
      if (anecdote) {
        anecdote.votes += 1
      }
    }
  }
})

export const { appendAnecdote, setAnecdotes, anecdoteVote } = anecdoteSlice.actions

export const incrementVote = (id) => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch(anecdoteVote(id)
  )}
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer