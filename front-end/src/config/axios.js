import axios from 'axios'
import auth from './../services/auth.service.js'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
})

api.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer ${
      auth && auth.isLoggedIn() ? auth.getToken() : ''
    }`
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// function updateHeaders() {
//   api.defaults.headers.common['Authorization'] = `Bearer ${
//     auth && auth.isLoggedIn() ? auth.getToken() : ''
//   }`
// }

// updateHeaders()

export { api }
