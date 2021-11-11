require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genres: String): [Book]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            if (!args.genres) {
                return Book.find({})
            }

            return Book.find({ genres: { $in: [ args.genres ] } })
        },
        allAuthors: () => {
            return Author.find({})
        }
    },

    Author: {
        bookCount: async (root) => {
            const author = await Author.findOne({ name: root.name })

            const booksByAuthor = await Book.find({ author: author._id })
            
            return booksByAuthor.length
        }
    },

    Book: {
        author: async (root) => {
            const author = await Author.findOne({ _id: root.author })

            return {
                name: author.name,
                born: author.born
            }
        }
    },

    Mutation: {
        addBook: async (root, args) => {
            const author = await Author.findOne({ name: args.author })
            let book

            if (args.author.length < 4) {
                throw new UserInputError('The author\'s name should be at least 4 characters long.')
            }

            if (args.title.length < 4) {
                throw new UserInputError('The book\'s name should be at least 4 characters long.')
            }

            if (!author) {
                const newAuthor = new Author({ name: args.author })

                try {
                    const savedAuthor = await newAuthor.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }

                book = new Book({ ...args, author: savedAuthor._id })
            } else {
                book = new Book({ ...args, author: author })
            }

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return book
        },

        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return author
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
