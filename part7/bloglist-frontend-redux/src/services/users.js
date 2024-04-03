import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

export default {
    getAllUsers
}
