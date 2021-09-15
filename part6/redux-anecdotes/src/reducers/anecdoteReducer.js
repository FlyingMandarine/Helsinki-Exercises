import anecdoteService from '../services/anecdotes'

export const increaseVote = anecdote => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.update(anecdote)
        dispatch({
            type: 'INCREASE_VOTE',
            data: updatedAnecdote
        })
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote,
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
}

const anecdoteReducer = (state = [], action) => {
    function compare(a, b) {
        if (a.votes < b.votes) {
            return 1
        } else if (a.votes > b.votes) {
            return - 1
        }
        return 0
    }

    switch(action.type) {
        case 'INCREASE_VOTE':

            const nearlyAllAnecdotes = state.filter(a => a.id !== action.data.id)
            const allAnecdotes = nearlyAllAnecdotes.concat(action.data)
            const allSortedAnecdotes = allAnecdotes.sort(compare)
            return allSortedAnecdotes

        case 'NEW_ANECDOTE':
            const newAnecdote = {
                content: action.data.content,
                id: action.data.id,
                votes: 0
            }
            const newState = state.concat(newAnecdote)
            return newState

        case 'INIT_ANECDOTES':
            return action.data.sort(compare)

        default:
            return state
    }
}

export default anecdoteReducer