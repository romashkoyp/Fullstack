import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const content = event.target.value
        dispatch(filterChange(content))
    }

    const style = {
        marginBottom: 10
      }

    return (
        <div style={style}>
            filter <input
                name='filter'
                onChange={handleChange} />
            <p></p>
        </div>
    )
}

export default Filter