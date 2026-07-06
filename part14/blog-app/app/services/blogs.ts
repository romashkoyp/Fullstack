const blogs = [
  { id: 1, content: "Hello there, it is my first blog.", title: "one two four", author: "Author 1", url: "", likes: 3},
  { id: 2, content: "Hello there, it is my second blog.", title: "two", author: "Author 2", url: "", likes: 5},
  { id: 3, content: "Hello there, it is my third blog.", title: "three", author: "Author 3", url: "", likes: 2}
]

export const getBlogs = () => {
  return blogs
}

export const sortBlogsByLikes = () => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

export const addBlog = (content: string, author: string, title: string) => {
  blogs.push({ id: blogs.length + 1, content, author, title, url: "", likes: 0 })
}

export const getBlogById = (id: number) => {
  return blogs.find(blog => blog.id === id)
}

export const likeBlog = (id: number) => {
  const blog = blogs.find(blog => blog.id === id)
  if (blog) {
    blog.likes += 1
  }
}

export const filterBlogsByTitle = (title: string) => {
  return blogs.filter(blog => blog.title.toLowerCase().includes(title.toLowerCase()))
}