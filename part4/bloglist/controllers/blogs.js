const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

let blogs = [
]

blogsRouter.get('/', async (request, response) => {
  if (blogs) {
    const blogs = await Blog.find({})
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  let blog

  if (!body.title || !body.author || !body._url) {
    return response.status(400).json({
      error: 'The title, author or number is missing'
    })
  } else if (!body.likes) {
    blog = new Blog({
      title: body.title,
      author: body.author,
      _url: body._url,
      likes: 0
    })
  } else {
    blog = new Blog({
      title: body.title,
      author: body.author,
      _url: body._url,
      likes: body.likes
    })
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter