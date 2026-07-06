import Link from "next/link"
import { sortBlogsByLikes } from "../services/blogs"

const Blogs = () => {
  const blogs = sortBlogsByLikes()
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {blogs.map(blog => (
          <div key={blog.id}>
            <hr />
            <p>
              <Link href={`/blogs/${blog.id}`}><strong>{blog.title}</strong></Link>
              By {blog.author}
            </p>
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