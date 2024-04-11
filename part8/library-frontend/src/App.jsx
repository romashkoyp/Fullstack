import { useQuery, useApolloClient } from '@apollo/client'
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate } from 'react-router-dom'
import Authors from './components/Authors'
import Menu from './components/Menu'
import Books from './components/Books'
import BookForm from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { ALL_AUTHORS, ALL_BOOKS  } from './queries'

const App = () => {
  const { loading, data } = useQuery(ALL_AUTHORS)
  const { data: booksData } = useQuery(ALL_BOOKS)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [token])

  if (!booksData || !data) return null
  if (loading) return <p>Loading...</p>

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Router>
        <Notify errorMessage={errorMessage} setError={notify} />
        <Menu token={token} />
        {token && <button onClick={logout}>logout</button>}
        <Routes>
          <Route path="/" element={<Authors authors = {data.allAuthors}/>} />
          <Route path="/books" element={<Books books={booksData.allBooks}/>} />
          <Route path="/newbook" element={!token ? <Navigate to="/" replace /> : <BookForm />} />
          <Route path="/login" element={!token ? <LoginForm setToken={setToken} /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App