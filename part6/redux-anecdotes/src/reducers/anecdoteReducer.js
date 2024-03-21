const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (item) => {
  return {
    content: item,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INCREMENT': {
      const anecdoteToVote = state.find(anecdote => anecdote.id === action.data.id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : votedAnecdote
      )
    }
    case 'NEW_ANECDOTE': {
      const newAnecdote = asObject(action.payload.content)
      return [...state, newAnecdote]
    }
    default:
      return state
  }
}

export const incrementVote = (id) => {
  return {
    type: 'INCREMENT',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content
    }
  }
}

export default anecdoteReducer