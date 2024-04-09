import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">authors</Link>
      <Link style={padding} to="/books">books</Link>
    </div>
  )
}

export default Menu