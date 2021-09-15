const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = anecdotesAtStart.map(asObject)

export const increaseVote = (anecdote) => {
    return {
        type: 'INCREASE_VOTE',
        content: anecdote.content,
        id: anecdote.id,
        votes: anecdote.votes + 1
    }
}

export const createAnecdote = (content) => {
    return {
        type: 'NEW_ANECDOTE',
        content: content
    }
}

const anecdoteReducer = (state = initialState, action) => {
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
                content: action.content,
                id: getId(),
                votes: 0
            }
            const newState = state.concat(newAnecdote)
            return newState

        default:
            return state
    }
}

export default anecdoteReducer