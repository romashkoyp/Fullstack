const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

let blogs = [
]

blogsRouter.get('/', async (request, response) => {
  if (blogs) {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  let blog
  const user = await User.findById(body.userId)

  if (!body.title || !body.author || !body._url) {
    return response.status(400).json({
      error: 'The title, author or number is missing'
    })
  } else if (!body.likes) {
    blog = new Blog({
      title: body.title,
      author: body.author,
      _url: body._url,
      user: body.userId,
      likes: 0
    })
  } else {
    blog = new Blog({
      title: body.title,
      author: body.author,
      _url: body._url,
      user: body.userId,
      likes: body.likes
    })
  }
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, blog, { new: true }
  )
  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter