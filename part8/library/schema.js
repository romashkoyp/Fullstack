/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

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
  type Subscription {
    bookAdded: Book!
  }    

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

  type User {
    username: String!
    favoriteGenre: [String!]
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`
module.exports = typeDefs
