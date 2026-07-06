const blogs = [
  { id: 1, content: "Hello there, it is my first blog.", title: "Test title 1", author: "Author 1", url: "", likes: 3},
  { id: 2, content: "Hello there, it is my second blog.", title: "Test title 2", author: "Author 2", url: "", likes: 5},
  { id: 3, content: "Hello there, it is my third blog.", title: "Test title 3", author: "Author 3", url: "", likes: 2}
]

export const getBlogs = () => {
  return blogs
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