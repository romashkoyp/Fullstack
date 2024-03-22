import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    color: 'green',

  }

  const message = notification.message

  return (
    message && 
      <div>
        <div style={style}>
          {message}
        </div>
        <p></p>
      </div>
  )
}

export default Notification