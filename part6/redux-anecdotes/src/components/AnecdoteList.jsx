import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { notificationToHide, notificationToShow } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

    const vote = (id, content) => {
        console.log('vote', id)
        console.log('content', content)
        dispatch(incrementVote(id))
        dispatch(notificationToShow(`You voted for '${content}'`))
        setTimeout(() => { dispatch(notificationToHide()) }, 5000)
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes} <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
            </div>
            )}
        </div>
    )  
}

export default AnecdoteList