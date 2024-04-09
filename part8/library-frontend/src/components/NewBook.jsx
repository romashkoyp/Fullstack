import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'
import Books from './Books'

const BookForm = () => {
  const { data: booksData } = useQuery(ALL_BOOKS)
  const { loading, data } = useQuery(ALL_AUTHORS)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
    createBook({  variables: { title, author, published: parseInt(published), genres } })
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
  }

  const addGenre = () => {
    setGenres([...genres, ''])
  }

  const handleGenreChange = (index, value) => {
    const updatedGenres = [...genres]
    updatedGenres[index] = value
    setGenres(updatedGenres)
  }

  if (!booksData || !data) return null
  if (loading) return <p>Loading...</p>

  return (
    <><div>
      <h2>add new book</h2>
      <form onSubmit={submit}>
        <div>
          title <input value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author <input value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published <input value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          genres
          <button type="button" onClick={addGenre}>
            add genre
          </button>
          {genres.map((genre, index) => (
            <div key={index}>
              <input
                value={genre}
                onChange={({ target }) => handleGenreChange(index, target.value)}
              />
            </div>
          ))}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
    <Books books={booksData.allBooks}/></>
  )
}

export default BookForm