import PropTypes from 'prop-types'
import { useState } from 'react'
import Input from './styles/Input'
import { PrimaryButton } from './styles/Buttons'

const BlogForm = ({ onSubmit }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
  
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      _url: newUrl,
      likes: 0,
    }

    onSubmit(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <Input
            id="title"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <Input
            id="author"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <Input
            id="url"
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <PrimaryButton type="submit">create</PrimaryButton>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  }

export default BlogForm