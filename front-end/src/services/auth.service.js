import { updateHeaders } from './../config/axios'

export default {
  login: function (token) {
    window.sessionStorage.setItem(
      'auth',
      JSON.stringify({
        isLoggedIn: true,
        token,
      })
    )

    updateHeaders()
  },
  parse: function () {
    return JSON.parse(window.sessionStorage.getItem('auth'))
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
    window.sessionStorage.removeItem('auth')
  },
}
