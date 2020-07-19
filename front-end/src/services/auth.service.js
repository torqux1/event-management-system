export default {
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
