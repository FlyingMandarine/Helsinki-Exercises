import React, { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'

import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const Notify = ({errorMessage}) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const authorsQuery = useQuery(ALL_AUTHORS)
  const booksQuery = useQuery(ALL_BOOKS)

  const storageToken = localStorage.getItem('library-user-token')
  if (token === null && storageToken) {
    setToken(storageToken)
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (authorsQuery.loading) {
    return <div>loading...</div>
  }

  const changePage = (newPage) => {
    setPage(newPage)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token === null ?
          <button onClick={() => setPage('login')}>login</button> :
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>log out</button>
          </>
        }
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorsQuery.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        booksQuery={booksQuery}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        changePage={changePage}
      />

      <NewBook
        show={page === 'add'}
      />
    </div>
  )
}

export default App