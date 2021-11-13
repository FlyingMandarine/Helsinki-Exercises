import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, USER_DETAILS } from '../queries'

const Recommendations = ({ show, token }) => {
    const [favoriteGenre, setFavoriteGenre] = useState(null)
    const [favoriteBooks, setFavoriteBooks] = useState(null)

    const [getUser, resultUser] = useLazyQuery(USER_DETAILS)
    const [getBooks, resultBooks] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        if (show) {
            getUser()
        }
    }, [show, token]) // eslint-disable-line

    useEffect(() => {
        if (show && resultUser.data) {
            setFavoriteGenre(resultUser.data.me.favoriteGenre)
        }
    }, [token, resultUser.data]) // eslint-disable-line

    useEffect(() => {
        if (show && favoriteGenre) {
            getBooks({ variables: { genres: favoriteGenre } })
        }
    }, [show, token, favoriteGenre]) // eslint-disable-line

    useEffect(() => {
        if (show && resultBooks.data) {
            setFavoriteBooks(resultBooks.data.allBooks)
        }
    }, [token, resultBooks.data]) // eslint-disable-line

    if (!show) {
        return null
    }

    return (
        <>
            <h2>recommendations</h2>
            <div>books in your favorite genre <strong>{favoriteGenre}</strong></div>

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

                {favoriteBooks && favoriteBooks.map(b =>
                    <tr key={b.title}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                    </tr>
                )}

                </tbody>
            </table>
        </>
    )
}

export default Recommendations