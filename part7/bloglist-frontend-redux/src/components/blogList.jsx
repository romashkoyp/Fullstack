import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ setBlogs, user }) => {
  const blogs = useSelector(state => state.blogs)  
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  
    return (
      <div>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
        )}
      </div>
    )
  }
  
  export default BlogList