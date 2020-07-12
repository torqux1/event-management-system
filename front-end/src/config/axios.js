import axios from 'axios'
import auth from './../services/auth.service.js'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
})

api.defaults.headers.common['Authorization'] = `Bearer ${
  auth.isLoggedIn() ? auth.getToken() : ''
}`

export default api
