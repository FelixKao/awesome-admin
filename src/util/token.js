import Cookie from 'js-cookie'

const TOKEN_KEY = 'token'

export function getToken () {
  return Cookie.get(TOKEN_KEY)
}

export function setToken (token) {
  return Cookie.set(TOKEN_KEY, token)
}

export function removeToken () {
  return Cookie.remove(TOKEN_KEY)
}
