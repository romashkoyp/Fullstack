import Link from "next/link"
import { sortBlogsByLikes, filterBlogsByTitle } from "../services/blogs"
import { filterByTitle } from "../actions/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>
}) => {
  const blogs = sortBlogsByLikes()
  const title = (await searchParams)?.title?.trim().toLowerCase()

  const filteredBlogs = title
    ? filterBlogsByTitle(title)
    : blogs
    
  return (
    <div>
      <h2>Blogs</h2>
      <form action={filterByTitle}>
        <input type="text" name="title" placeholder="Filter by title" />
        <button type="submit">
          Filter
        </button>
      </form>
      <div>
        {filteredBlogs.map(blog => (
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