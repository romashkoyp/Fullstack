import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const [contentVisible, setContentVisible] = useState(false)
  
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
      prevBlogs.map((prevBlog) => (prevBlog.id === updatedBlogResponse.id ? updatedBlogResponse : prevBlog))
    )
    console.log('likes updated for blog', {updatedBlog})
  }

  return (
    <div>   
      <div style={hideContent}>
        {blog.title} - {blog.author}
        <button onClick={() => setContentVisible(true)}>view</button>
      </div>
      <div style={showContent}>
        {blog.title} - {blog.author}
        <button onClick={() => setContentVisible(false)}>hide</button>
        <br />
        likes {blog.likes}
        <button onClick={handleLikes}>like</button>
        <br />
     </div>
    </div>
)}

export default Blog