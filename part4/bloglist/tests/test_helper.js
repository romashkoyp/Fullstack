const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Database',
    author: 'Artoo Hellas',
    _url: 'https://cloud.mongodb.com/',
    likes: 10
  },
  {
    title: 'Database2',
    author: 'Marine',
    _url: 'https://cloud.mongodb.com/',
    likes: 5
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}