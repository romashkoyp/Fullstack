import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorForm = () => {
  const { loading, data } = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [newBorn, setNewBorn] = useState('')

  const [ updateAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      alert(`Error updating author: ${error.message}`)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, setBornTo: parseInt(newBorn) } })
    setName('')
    setNewBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Set birth year</h2>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
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