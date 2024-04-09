import { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  BrowserRouter as Router,
  Routes, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Menu from './components/Menu'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)
  const { data: booksData } = useQuery(ALL_BOOKS)

  if (!booksData || !data) return null
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Authors authors = {data.allAuthors}/>} />
          <Route path="/books" element={<Books books={booksData.allBooks}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App