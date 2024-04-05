import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { incrementLikes, deleteBlog, addComments } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const IndividualBlog = ({ user }) => {
  const { blogId } = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === blogId)
  const dispatch = useDispatch()

  const [newComment, setNewComment] = useState('')

  const handleLikes = async (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlogResponse = await blogService.update(blog.id, updatedBlog)
    dispatch(incrementLikes(updatedBlogResponse))
  }

  const handleDeleteBlog = async (id) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService._delete(id)
      dispatch(deleteBlog(id))
    }
  }

    const handleCommentChange = (event) => {
      setNewComment(event.target.value)
    }

    const handleAddComment = async (event) => {
      event.preventDefault()
      
      if (newComment.trim() !== '') {
        console.log(newComment)
      try {
        await blogService.addComment(blogId, { comments: newComment })
        dispatch(addComments({ id: blogId, comments: newComment }))
        setNewComment('')
    } catch (error) {
        console.error('Error adding comment:', error)
      }
    }
  }

  const showRemoveButton = user?.id === blog?.user?.id

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} - {blog.author}</h2>
      <div>{blog._url}</div>
      <div>likes {blog.likes} <button className='like' onClick={handleLikes}>like</button></div>
      <div>added by {blog.user.name}</div>
      {showRemoveButton && <button onClick={() => handleDeleteBlog(blog.id)}>remove blog</button>}
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
      <input
        value={newComment}
        onChange={handleCommentChange}
      />
      <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default IndividualBlog