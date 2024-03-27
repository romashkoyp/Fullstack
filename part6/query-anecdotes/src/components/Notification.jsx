import { useContext } from 'react'
import { NotificationContext } from '../NotificationContext'

const Notification = () => {
  const { state: { message, type } } = useContext(NotificationContext)

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
