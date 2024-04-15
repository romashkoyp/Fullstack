import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { useState, useEffect } from 'react'

const Books = () => {
  const client = useApolloClient()
  const [selectedGenre, setSelectedGenre] = useState(null)
  const { loading, data, refetch } = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      setGenres([...new Set(data.allBooks.flatMap((book) => book.genres))])
    }
  }, [data])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const newBook = data.data.bookAdded
      alert(`New book with name "${newBook.title}" was added`)
      refetch()
    },
  })

  if (loading) return <p>Loading...</p>

  return (
    <>
      <div>
        <h2>books</h2>
        <label>Filter by genre:</label>
        <select
          value={selectedGenre || ''}
          onChange={e => setSelectedGenre(e.target.value || null)}
        >
          <option value="">All</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks
            .filter((book) => (selectedGenre ? book.genres.includes(selectedGenre) : true))
            .map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default Books