const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

let blogs = [
]

blogsRouter.get('/', (request, response) => {
  if (blogs) {
    Blog.find({})
      .then(blogs => {
        response.json(blogs)
      })
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body.title || !body.author || !body._url) {
    return response.status(400).json({
      error: 'The title, author or number is missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    _url: body._url,
    likes: body.likes
  })

  blog.save().then(savedBlog => {
    response.json(savedBlog)
  })
    .catch(error => next(error))
})

module.exports = blogsRouter