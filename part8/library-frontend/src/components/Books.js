import React, { useEffect, useState } from 'react'

const Books = ({ show, booksQuery }) => {
  const [bookGenres, setBookGenres] = useState(null)
  const [genre, setGenre] = useState('all genres')
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    if (bookGenres) {
      const booksToFilter = (genre) === 'all genres' ?
        books :
        books.filter(b => b.genres.includes(genre))

      setFilteredBooks(booksToFilter)
    }
  }, [genre, bookGenres])

  if (!show) {
    return null
  }

  if (booksQuery.loading) {
    return <div>loading...</div>
  }

  const books = booksQuery.data.allBooks

  if (bookGenres === null) {
    const allBookGenres = []
    const bookGenresArray = books.map(b => b.genres)

    bookGenresArray.forEach(genreArray => {
      genreArray.forEach(genre => {
        if (!allBookGenres.includes(genre)) {
          allBookGenres.push(genre)
        }
      })
    })

    setBookGenres(allBookGenres)
    return (null)
  }

  const filterGenre = (e) => {
    setGenre(e.target.value)
  }

  return (
    <div>
      <h2>books</h2>

      {genre !== 'all genres' &&
        <div>in genre <strong>{genre}</strong></div>
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>

          {filteredBooks.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
          )}

        </tbody>
      </table>
      <div>
        {bookGenres.map(g =>
          <button
            key={g}
            value={g}
            onClick={(e) => filterGenre(e)}
            >{g}
          </button>
        )}
        <button
          value={'all genres'}
          onClick={(e) => filterGenre(e)}
          >all genres
        </button>
      </div>
    </div>
  )
}

export default Books