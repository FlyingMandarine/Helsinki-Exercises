export const noteVotedNotification = (anecdote) => {
    return {
        type: 'NOTE_VOTED',
        content: anecdote.content
    }
}

export const noteVotedRemoveNotification = () => {
    return {
        type: ''
    }
}

export const noteCreatedNotification = (content) => {
    if (content === '') {
        return {
            type: ''
        }
    } else {
        return {
            type: 'NOTE_CREATED',
            content: content
        }
    }
}

export const noteCreatedRemoveNotification = () => {
    return {
        type: ''
    }
}

const notificationReducer = (state = undefined, action) => {
    switch(action.type) {
        case 'NOTE_VOTED':
            return `You voted for "${action.content}".`
        case 'NOTE_CREATED':
            return `You created the following note: ${action.content}.`
        default:
            return ''
    }
}

export default notificationReducer