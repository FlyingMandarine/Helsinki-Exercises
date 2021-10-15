import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getComments = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/comments`)
    return response.data.comments
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, changedBlog) => {
    const request = axios.put(`${baseUrl}/${id}`, changedBlog)
    return request.then(response => response.data)
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
    }

    await axios.delete(`${baseUrl}/${id}`, config)
}

const exports = { setToken, getAll, getComments, create, update, remove }

export default exports