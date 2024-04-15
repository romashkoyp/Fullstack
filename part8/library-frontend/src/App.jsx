import { useQuery, useApolloClient } from '@apollo/client'
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate } from 'react-router-dom'
import Authors from './components/Authors'
import Menu from './components/Menu'
import Books from './components/Books'
import RecommendBooks from './components/Recommend'
import BookForm from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const { loading: authorsLoading, data: authorsData } = useQuery(ALL_AUTHORS)
  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [token])

  if (authorsLoading || booksLoading) return <p>Loading...</p>
  if (!authorsData || !booksData) return <p>Error loading data</p>

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Menu token={token} />
          {token && <button onClick={logout}>logout</button>}
        </div>
        <Notify errorMessage={errorMessage} setError={notify} />
        <Routes>
          <Route path="/" element={<Authors authors={authorsData.allAuthors}/>} />
          <Route path="/books" element={<Books books={booksData.allBooks}/>} />
          <Route path="/recommend" element={token ? <RecommendBooks token={token} /> : <Navigate to="/" replace />} />
          <Route path="/newbook" element={!token ? <Navigate to="/" replace /> : <BookForm />} />
          <Route path="/login" element={!token ? <LoginForm setToken={setToken} /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App