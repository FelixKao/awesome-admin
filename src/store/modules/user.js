import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/util/token'
import * as types from '../mutation-types'

const state = {
  token: getToken()
}

const getters = {
  token: state => state.token
}

const actions = {
  Login ({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      login(loginForm).then(response => {
        const token = response.data.token
        setToken(token)
        commit(types.SET_TOKEN, token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  Logout ({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken()
        commit(types.SET_TOKEN, '')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
