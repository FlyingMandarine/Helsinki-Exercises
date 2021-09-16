let timeout

export const setNotification = (string, seconds) => {
    return async dispatch => {
        await dispatch({
            type: 'NOTIFICATION',
            content: string
        })
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch({
                type: ''
            })
        }, seconds * 1000)
    }
}

const notificationReducer = (state = undefined, action) => {
    switch(action.type) {
        case 'NOTIFICATION':
            return action.content
        default:
            return ''
    }
}

export default notificationReducer