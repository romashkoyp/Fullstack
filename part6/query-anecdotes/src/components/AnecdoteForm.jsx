import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { NotificationContext } from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const { dispatch } = useContext(NotificationContext)
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: async (createdAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'SET_NOTIFICATION', payload: `New anecdote created: '${createdAnecdote.content}'` })
      await new Promise(resolve => setTimeout(resolve, 5000))
      dispatch({ type: 'CLEAR_NOTIFICATION', payload: '' })
    },
    onMutate: (newAnecdote) => {
      console.log('Creating new anecdote:', newAnecdote)
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
