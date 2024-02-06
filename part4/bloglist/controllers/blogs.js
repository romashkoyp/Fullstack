const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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
  console.log('Token in request:', request.token)
  const body = request.body
  let blog

  if (!request.token) {
    console.log('Token missing')
    return response.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    console.log('Invalid token')
    return response.status(401).json({ error: 'token invalid' })
  }
  console.log('Token verified successfully')

  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.author || !body._url || !body.userId) {
    return response.status(400).json({
      error: 'The title, author, number or userID is missing'
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
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' })
  }

  if (blog.user && blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndDelete(request.params.id)
    console.log('Blog was deleted')
    return response.status(204).end()
  } else {
    return response.status(403).json({
      error: 'Permission denied, you can delete only your own blogs'
    })
  }
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