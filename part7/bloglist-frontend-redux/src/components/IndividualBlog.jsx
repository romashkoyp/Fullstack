import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { incrementLikes, deleteBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const IndividualBlog = ({ user }) => {
  const { blogId } = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === blogId)
  const dispatch = useDispatch()

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

  if (!blog || !blog.user) {
    return <p>Blog or user information missing</p>
  }

  const showRemoveButton = user?.id === blog?.user?.id

  return (
    <div>
      <h2>{blog.title} - {blog.author}</h2>
      <div>{blog._url}</div>
      <div>likes {blog.likes} <button className='like' onClick={handleLikes}>like</button></div>
      <div>added by {blog.user.name}</div>
      {showRemoveButton && <button onClick={() => handleDeleteBlog(blog.id)}>remove blog</button>}
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )}

export default IndividualBlog