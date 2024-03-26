import { useContext } from 'react'
import { NotificationContext } from '../NotificationContext'

const Notification = () => {
  const { state } = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    color: 'green',
  }

  return (
    state.message && 
      <div>
        <div style={style}>
          {state.message}
        </div>
        <p></p>
      </div>
  )
}

export default Notification
