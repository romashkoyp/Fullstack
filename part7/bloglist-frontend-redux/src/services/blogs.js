import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const getBlogsByUserId = async (userId) => {
  const response = await axios.get('/api/users')
  const users = response.data
  const user = users.find(u => u.id === userId)

  if (user) {
    return user.blogs || []
  } else {
    return []
  }
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const addComment = async (id, updatedBlog) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, updatedBlog)
  return response.data
}

const _delete = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll, getBlogsByUserId, create, update, setToken, _delete, addComment
}
