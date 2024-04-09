import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorForm = () => {
  const { data } = useQuery(ALL_AUTHORS)
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [newBorn, setNewBorn] = useState('')

  const [ updateAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      alert(`Error updating author: ${error.message}`)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    if (selectedAuthor) {
      updateAuthor({ variables: { name: selectedAuthor.name, setBornTo: parseInt(newBorn) } })
      setNewBorn('')
      setSelectedAuthor(null)
    }
  }

  const handleAuthorChange = (author) => {
    setSelectedAuthor(author)
    setNewBorn(author.born)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Set birth year</h2>
        <div>
          Author
          <select value={selectedAuthor?.name || ''} onChange={e => handleAuthorChange(data.allAuthors.find(a => a.name === e.target.value))}>
            <option value=''>Select an author</option>
            {data.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born <input value={newBorn}
            onChange={({ target }) => setNewBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm