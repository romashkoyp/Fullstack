/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const mongoose = require('mongoose')
const Book = require('./models/book')
const { GraphQLError } = require('graphql')
const Author = require('./models/author')
mongoose.set('strictQuery', false)

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// const authors = [
//   { name: "Robert Martin", born: 1952 },
//   { name: "Martin Fowler", born: 1963 },
//   { name: "Fyodor Dostoevsky", born: 1821 },
//   { name: "Joshua Kerievsky" },
//   { name: "Sandi Metz" }
// ]
//
// const books = [
//   { title: "Clean Code", published: 2008, author: "Robert Martin", genres: ["refactoring"] },
//   { title: "Agile software development", published: 2002, author: "Robert Martin", genres: ["agile", "patterns", "design"] },
//   { title: "Refactoring, edition 2", published: 2018, author: "Martin Fowler", genres: ["refactoring"] },
//   { title: "Refactoring to patterns", published: 2008, author: "Joshua Kerievsky", genres: ["refactoring", "patterns"] },
//   { title: "Practical Object-Oriented Design, An Agile Primer Using Ruby", published: 2012, author: "Sandi Metz", genres: ["refactoring", "design"] },
//   { title: "Crime and punishment", published: 1866, author: "Fyodor Dostoevsky", genres: ["classic", "crime"] },
//   { title: "The Demon ", published: 1872, author: "Fyodor Dostoevsky", genres: ["classic", "revolution"] }
// ]
//
// authors.forEach(authorData => {
//   const author = new Author({
//     name: authorData.name,
//     born: authorData.born
//   })
//
//   author.save().then(savedAuthor => {
//     books.forEach(bookData => {
//       if (bookData.author === savedAuthor.name) {
//         const book = new Book({
//           title: bookData.title,
//           published: bookData.published,
//           author: savedAuthor._id,
//           genres: bookData.genres
//         })
//
//         book.save().then(savedBook => {
//           console.log('Book saved:', savedBook.title)
//         })
//       }
//     })
//   })
// })
//
// let authors = [
//   {
//     name: "Robert Martin",
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952
//   },
//   {
//     name: "Martin Fowler",
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   {
//     name: "Joshua Kerievsky",
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e"
//   },
//   {
//     name: "Sandi Metz",
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e"
//   }
// ]
//
// let books = [
//   {
//     title: "Clean Code",
//     published: 2008,
//     author: "Robert Martin",
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"]
//   },
//   {
//     title: "Agile software development",
//     published: 2002,
//     author: "Robert Martin",
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ["agile", "patterns", "design"]
//   },
//   {
//     title: "Refactoring, edition 2",
//     published: 2018,
//     author: "Martin Fowler",
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"]
//   },
//   {
//     title: "Refactoring to patterns",
//     published: 2008,
//     author: "Joshua Kerievsky",
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "patterns"]
//   },
//   {
//     title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//     published: 2012,
//     author: "Sandi Metz",
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "design"]
//   },
//   {
//     title: "Crime and punishment",
//     published: 1866,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "crime"]
//   },
//   {
//     title: "The Demon ",
//     published: 1872,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "revolution"]
//   }
// ]

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ) : Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`

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
    }
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const { author, title, published, genres } = args
      let authorDoc = await Author.findOne({ name: author })

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
      return await Book.findById(savedBook._id).populate('author')
    },
    editAuthor: async (root, args) => {
      const { name, setBornTo } = args
      let authorDoc = await Author.findOne({ name })

      if (!authorDoc) {
        return null
      }

      if (setBornTo) {
        authorDoc.born = setBornTo
      }

      await authorDoc.save()
      return authorDoc
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
