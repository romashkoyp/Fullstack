import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { NotificationContext } from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const { showNotification } = useContext(NotificationContext)
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: async (createdAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(`New anecdote created: '${createdAnecdote.content}'`)
    },
    onError: (error) => {
      showNotification(`Error: ${error.response.data.error}`, 'error')
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
