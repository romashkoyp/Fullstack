import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {
  const [contentVisible, setContentVisible] = useState(false)
  const showRemoveButton = user && blog.user && user.id === blog.user.id

  const hideContent = {
    display: contentVisible ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showContent = {
    display: contentVisible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = async (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlogResponse = await blogService.update(blog.id, updatedBlog)
    setBlogs((prevBlogs) =>
      prevBlogs.map((prevBlog) => (prevBlog.id === updatedBlogResponse.id ? { ...prevBlog, ...updatedBlogResponse } : prevBlog))
    )
    console.log('likes updated for blog', { updatedBlog })
  }

  const handleDeleteBlog = async (id) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService._delete(id)
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))
    }
  }

  return (
    <div>
      <div style={hideContent} className='smallBlog'>
        <div>
          {blog.title} - {blog.author} <button onClick={() => setContentVisible(true)}>view</button>
        </div>
      </div>
      <div style={showContent} className='bigBlog'>
        <div>
          {blog.title} - {blog.author} <button onClick={() => setContentVisible(false)}>hide</button>
        </div>
        <div>{blog._url}</div>
        <div>likes {blog.likes} <button onClick={handleLikes}>like</button></div>
        <div>{blog.user.name}</div>
        {showRemoveButton && <button onClick={() => handleDeleteBlog(blog.id)}>remove blog</button>}
      </div>
    </div>
  )}

export default Blog