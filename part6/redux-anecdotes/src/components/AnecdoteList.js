import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Filter from './Filter'
import { increaseVote } from '../reducers/anecdoteReducer'
import { noteVotedNotification, noteVotedRemoveNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === '') {
            return anecdotes
        } else {
            return anecdotes.filter(a => a.content.toLowerCase().includes(filter) === true)
        }
    })

    const vote = (anecdote) => {
        dispatch(increaseVote(anecdote))
        dispatch(noteVotedNotification(anecdote))
        setTimeout(() => {
            dispatch(noteVotedRemoveNotification())
        }, 5000)
    }

    return(
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotes