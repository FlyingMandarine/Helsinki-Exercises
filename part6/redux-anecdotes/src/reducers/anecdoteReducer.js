const getId = () => (100000 * Math.random()).toFixed(0)

export const increaseVote = (anecdote) => {
    return {
        type: 'INCREASE_VOTE',
        content: anecdote.content,
        id: anecdote.id,
        votes: anecdote.votes + 1
    }
}

export const createAnecdote = (data) => {
    return {
        type: 'NEW_ANECDOTE',
        data,
    }
}

export const initializeAnecdotes = (anecdotes) => {
    return {
        type: 'INIT_ANECDOTES',
        data: anecdotes,
    }
}

const anecdoteReducer = (state = [], action) => {
    switch(action.type) {
        case 'INCREASE_VOTE':
            function compare(a, b) {
                if (a.votes < b.votes) {
                    return 1
                } else if (a.votes > b.votes) {
                    return - 1
                }
                return 0
            }

            const unsortedState = state.map(a => a.id !== action.id ? a : action)
            return unsortedState.sort(compare)

        case 'NEW_ANECDOTE':
            const newAnecdote = {
                content: action.data.content,
                id: getId(),
                votes: 0
            }
            const newState = state.concat(newAnecdote)
            return newState

        case 'INIT_ANECDOTES':
            return action.data

        default:
            return state
    }
}

export default anecdoteReducer