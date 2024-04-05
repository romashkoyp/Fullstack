const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1 })
  response.json(blogs)
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
  const blog = new Blog({ ...request.body, user: user._id })

  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.comments) {
    blog.comments = []
  }

  if (!blog.title || !blog.author || !blog._url) {
    return response.status(400).json({
      error: 'The title, author or number is missing'
    })
  } else {
    const savedBlog = await blog.save()

    const populatedBlog = await Blog
      .findById(savedBlog._id)
      .populate('user', { username: 1, name: 1, _id: 1 })

    user.blogs = user.blogs.concat(populatedBlog._id)
    await user.save()

    response.status(201).json(populatedBlog)
  }
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

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, { likes: body.likes }, { new: true })
    .populate('user', { username: 1, name: 1, _id: 1 })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blogId = request.params.id
  const comment = request.body.comments

  if (!comment) {
    console.log('Comment is necessary')
    return response.status(400).json({ error: 'Comment is missing' })
  }

  try {
    const blog = await Blog.findById(blogId)
    blog.comments.push(comment)
    await blog.save()
    response.status(201).json(blog)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = blogsRouter