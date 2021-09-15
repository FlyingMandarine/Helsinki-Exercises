export const filterChange = (filter) => {
    return {
        type: 'FILTER',
        filter: filter
    }
}

const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'FILTER':
            return action.filter
        default:
            return ''
    }
}

export default filterReducer