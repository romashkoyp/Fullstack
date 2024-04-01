import { useSelector } from 'react-redux'

const Notification = () => {
    const { message, type } = useSelector(state => state.notification)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 2,
        color: type === 'error' ? 'red' : 'green',
      }

    return message ? (
      <div>
        <div style={style}>{message}</div>
        <p></p>
      </div>
    ) : null
}
    
export default Notification