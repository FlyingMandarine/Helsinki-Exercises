require('dotenv').config()
const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'INSERT_SECRET_HERE'

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
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

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
        me: User
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

        createUser(
            username: String!
            favoriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }

    type Subscription {
        bookAdded: Book!
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
        },
        me: (root, args, context) => {
            return context.currentUser
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
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('You must be logged in in order to do this action.')
            }

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
                    book = new Book({ ...args, author: savedAuthor._id })
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
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

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        },

        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('You must be logged in in order to do this action.')
            }

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
        },

        createUser: (root, args) => {
            const user = new User({ ...args })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
