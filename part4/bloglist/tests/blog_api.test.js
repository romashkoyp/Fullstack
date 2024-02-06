const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Blog API', () => {
  describe('Blog retrieval', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }, 100000)

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the first blog is about database', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body[0].title).toBe('Database')
    })
  })

  describe('Blog Modification', () => {
    describe('Blog validation', () => {
      test('a valid blog can be added', async () => {
        const newBlog = {
          title: 'async/await simplifies making async calls',
          author: 'Morgan Freeman',
          _url: 'https://cloud.mongodb.com/',
          likes: 1
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
          'async/await simplifies making async calls'
        )
      })

      test('blog without title is not added', async () => {
        const newBlog = {
          author: 'Morgan Freeman',
          _url: 'https://cloud.mongodb.com/'
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })

      test('blog without url is not added', async () => {
        const newBlog = {
          author: 'Morgan Freeman',
          title: 'New title'
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })

      test('blog posts have an id property', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        blogs.forEach((blog) => {
          expect(blog.id).toBeDefined()
          expect(blog._id).toBeUndefined()
        })
      })
    })
    describe('Blog insertion, deletion and update', () => {
      test('likes is equal to 0 if no likes in request', async () => {
        const newBlog = {
          title: 'new title',
          author: 'Morgan Freeman the Second',
          _url: 'https://cloud.mongodb.com/'
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const likes = blogsAtEnd.map(n => n.likes)
        expect(likes).toContain(0)
      })

      test('delete single blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
      })

      test('update the number of likes for a blog by id', async () => {
        const newBlog = {
          likes: 30
        }

        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[1]
        const updatedLikes = newBlog.likes

        await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send({ likes: updatedLikes })
          .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length
        )

        const likes = blogsAtEnd.map(r => r.likes)

        expect(likes).toContain(updatedLikes)
      })
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})