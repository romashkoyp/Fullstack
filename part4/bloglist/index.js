require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const Blog = require('./models/blog')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

let blogs = [
]

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data', {
  stream: process.stdout
}))

app.get('/api/blogs/', (request, response) => {
  if (blogs) {
    Blog.find({})
      .then(blogs => {
        response.json(blogs)
      })
  } else {
    response.status(404).end()
  }
})

app.post('/api/blogs', (request, response, next) => {
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

morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})