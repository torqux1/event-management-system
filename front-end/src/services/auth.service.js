export default {
  parsed: JSON.parse(window.sessionStorage.getItem('auth')),
  getToken: function () {
    if (!this.isLoggedIn()) {
      throw new Error('Accessing token without logged in user')
    }

    return this.parsed.token
  },
  isLoggedIn: function () {
    return this.parsed ? this.parsed.isLoggedIn : false
  },
  logout: function () {
    this.parsed = null
    window.sessionStorage.removeItem('auth')
  },
}
