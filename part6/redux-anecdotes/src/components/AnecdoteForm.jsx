import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationToHide, notificationToShow } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value.trim()
        if (content === '') { return }
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(notificationToShow(`You created '${content}'`))
        setTimeout(() => { dispatch(notificationToHide()) }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm