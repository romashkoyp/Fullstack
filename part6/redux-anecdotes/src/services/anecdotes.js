import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdoteToUpdate = response.data
  anecdoteToUpdate.votes += 1
  const updatedAnecdote = await axios.put(`${baseUrl}/${id}`, anecdoteToUpdate)
  return updatedAnecdote.data
}

export default { getAll, createNew, vote }