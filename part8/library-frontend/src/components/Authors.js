import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_YEAR } from '../queries'

const Authors = ({ show, authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ editYear ] = useMutation(EDIT_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    const setBornTo = Number(year)

    editYear({ variables: { name, setBornTo } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          born <input value={year}
            onChange={({ target }) => setYear(target.value)} />
        </div>
        <div>
          <button>update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
