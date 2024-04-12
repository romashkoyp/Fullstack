/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args
      let books = await Book.find({}).populate('author')

      if (author) {
        books = books.filter(book => book.author.name === author)
      }

      if (genre) {
        books = books.filter(book => book.genres.includes(genre))
      }

      return books
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { author, title, published, genres } = args
      const currentUser = context.currentUser
      let authorDoc = await Author.findOne({ name: author })

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (!authorDoc) {
        authorDoc = new Author({ name: author })
        await authorDoc.save()
      }

      if (title.length < 6 || author.length < 6) {
        throw new GraphQLError('too short title or author`s name', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const book = new Book({
        title,
        published,
        author: authorDoc._id,
        genres
      })
      const savedBook = await book.save()

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return await Book.findById(savedBook._id).populate('author')
    },
    editAuthor: async (root, args, context) => {
      const { name, setBornTo } = args
      const currentUser = context.currentUser
      let authorDoc = await Author.findOne({ name })

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (!authorDoc) {
        return null
      }

      if (setBornTo) {
        authorDoc.born = setBornTo
      }

      await authorDoc.save()
      return authorDoc
    },
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args
      const user = new User({ username })

      if (favoriteGenre) {
        const books = await Book.find({ genres: { $in: [favoriteGenre] } })
        user.favoriteGenre = books.map(book => book._id)
      }

      try {
        return await user.save()
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
    },

    login: async (root, args) => {
      const { username, password } = args
      const user = await User.findOne({ username })

      if (!user || password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers
