import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'

const RecommendBooks = ({ token }) => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const { data: favoriteGenreData } = useQuery(FAVORITE_GENRE)

  const favoriteGenreBooks = data.allBooks.filter(book =>
    favoriteGenreData?.me?.booksByFavoriteGenre?.includes(book.id)
  )

  if (loading) return <p>Loading...</p>

  return (
    <>
      <h2>Recommended books by favorite genre</h2>
      {favoriteGenreBooks.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {favoriteGenreBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books found in your favorite genre.</p>
      )}
    </>
  )
}

export default RecommendBooks