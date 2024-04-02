import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, user }) => {
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