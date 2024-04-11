import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = ({ books }) => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState(null)

  const filteredBooks = selectedGenre
    ? books.filter(book => book.genres.includes(selectedGenre))
    : books

  const genres = [...new Set(books.flatMap(book => book.genres))]

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
          {genres.map((genre) => (
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
          {filteredBooks.map(book => (
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