import { useState } from 'react'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from '../queries'

const BookForm = () => {
  const { data: booksData } = useQuery(ALL_BOOKS)
  const { loading, data } = useQuery(ALL_AUTHORS)
  const [title, setTitle] = useState('new book')
  const [author, setAuthor] = useState('new author')
  const [published, setPublished] = useState('1977')
  const [genres, setGenres] = useState(['refactoring'])

  const [ createBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data.data)
      alert(`New book with name "${data.data.bookAdded.title}" was added`)
    }
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
    </>
  )
}

export default BookForm