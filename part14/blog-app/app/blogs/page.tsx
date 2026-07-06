import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {blogs.map(blog => (
          <div key={blog.id}>
            <hr />
            <p><strong>{blog.title}</strong> By {blog.author}</p>
            <p>{blog.content}</p>
            <p><a href={blog.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
            <p>Likes: {blog.likes}</p>          
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs