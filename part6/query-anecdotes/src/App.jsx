import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const { isLoading, data: anecdotes } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })
  
  const queryClient = useQueryClient()
  const anecdoteVoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
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
