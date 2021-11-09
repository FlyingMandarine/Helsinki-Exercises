import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_YEAR } from '../queries'

const Authors = ({ show, authors }) => {
  const [year, setYear] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  let options = []

  authors.forEach(author => {
    options.push({ value: author.name, label: author.name })
  })

  const [ editYear ] = useMutation(EDIT_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    const name = selectedOption.value
    const setBornTo = Number(year)

    editYear({ variables: { name, setBornTo } })

    setSelectedOption(null)
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
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
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
