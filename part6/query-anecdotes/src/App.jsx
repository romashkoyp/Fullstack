import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { NotificationContext } from './NotificationContext'
import { useContext } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const { isLoading, isError, data: anecdotes } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })
  
  const queryClient = useQueryClient()

  const { dispatch } = useContext(NotificationContext)

  const anecdoteVoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: async (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'SET_NOTIFICATION', payload: `You voted for: '${updatedAnecdote.content}'` })
      await new Promise(resolve => setTimeout(resolve, 5000))
      dispatch({ type: 'CLEAR_NOTIFICATION', payload: '' })
    },
    onMutate: (updatedAnecdote) => {
      console.log('New vote for:', updatedAnecdote)
    }
  })

  const handleVote = (anecdote) => {
    const updateVoteAnecdote = async (event) => {
      event.preventDefault()
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      anecdoteVoteMutation.mutate(updatedAnecdote)
    }

    return <button onClick={updateVoteAnecdote}>vote</button>
  }

  if ( isLoading ) {
    return <div>loading data...</div>
  }

  if ( isError ) {
    return <div>anecdote service not available due to problems in server</div>
  } 

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div> {anecdote.content} </div>
          <div>
            has {anecdote.votes}
            {handleVote(anecdote)}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
