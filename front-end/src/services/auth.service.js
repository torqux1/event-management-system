//import { } from './../config/axios'

export default {
  login: function (token) {
    window.localStorage.setItem(
      'auth',
      JSON.stringify({
        isLoggedIn: true,
        token,
      })
    )
  },
  parse: function () {
    return JSON.parse(window.localStorage.getItem('auth'))
  },
  getToken: function () {
    if (!this.isLoggedIn()) {
      throw new Error('Accessing token without logged in user')
    }

    return this.parse().token
  },
  isLoggedIn: function () {
    const parsed = this.parse()
    return parsed ? parsed.isLoggedIn : false
  },
  logout: function () {
    window.localStorage.removeItem('auth')
  },
}
