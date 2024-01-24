const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as an argument')
  process.exit(1)
} else if (process.argv.length === 3) {
  const password = process.argv[2]
  const url = `mongodb+srv://romashkoyp:${password}@cluster0.9iyubgl.mongodb.net/bloglistApp?retryWrites=true&w=majority`

  mongoose.connect(url)

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    _url: String,
    likes: Number
  })

  const Blog = mongoose.model('Blog', blogSchema)

  Blog.find({})
    .then(blogs => {
      blogs.forEach(blog => {
        console.log(blog.title, blog.author, blog._url, blog.likes)
      })
      mongoose.connection.close()
    })
} else if (process.argv.length > 3) {
  const password = process.argv[2]
  const url = `mongodb+srv://romashkoyp:${password}@cluster0.9iyubgl.mongodb.net/bloglistApp?retryWrites=true&w=majority`

  mongoose.connect(url)

  const title = process.argv[3]
  const author = process.argv[4]
  const _url = process.argv[5]
  const likes = process.argv[6]

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    _url: String,
    likes: Number
  })

  const Blog = mongoose.model('Blog', blogSchema)

  const blog = new Blog({
    title: title,
    author: author,
    _url: _url,
    likes: likes
  })

  blog.save().then(() => {
    console.log(`added ${title} ${author} ${_url} ${likes} to the blog list`)
    mongoose.connection.close()
  })
}
