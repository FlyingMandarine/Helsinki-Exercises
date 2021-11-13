import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
    }
}
`

export const ALL_BOOKS = gql`
query allBooks($genres: String) {
    allBooks(genres: $genres) {
        title
        published
        author {
            name
            born
            bookCount
        }
        genres
    }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        author {
            name
            born
            bookCount
        }
        published
        genres
        id
    }
}
`

export const EDIT_YEAR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
            bookCount
            id
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const USER_DETAILS = gql`
    query {
        me {
            username
            favoriteGenre
            id
        }
    }
`