import { Link } from 'react-router-dom'

const Menu = ({ token }) => {
  const padding = {
    paddingRight: 10
  }

  return (
    <div style={{ paddingRight: 10, paddingBottom: 10 }}>
      <Link style={padding} to="/">authors</Link>
      <Link style={padding} to="/books">books</Link>
      {token && <Link style={padding} to="/newbook">add book</Link>}
      {token && <Link style={padding} to="/recommend">recommend</Link>}
      {!token && <Link style={padding} to="/login">login</Link>}
    </div>
  )
}

export default Menu