import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeOneBlog } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>Author: {blog.author}</p>
      <p><a href={blog.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a></p>
      <p>Likes: {blog.likes}</p>
      <form action={likeOneBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">
          Like
        </button>
      </form>
    </div>
  )
}

export default BlogPage