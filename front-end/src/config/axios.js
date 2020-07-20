import axios from 'axios'
import auth from './../services/auth.service.js'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
})

function updateHeaders() {
  api.defaults.headers.common['Authorization'] = `Bearer ${
    auth && auth.isLoggedIn() ? auth.getToken() : ''
  }`
}

updateHeaders()

export { api, updateHeaders }


