import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs) || []
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  
    return (
      <div>
        {sortedBlogs.map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
          </div>
        )}
      </div>
    )
  }
  
  export default BlogList