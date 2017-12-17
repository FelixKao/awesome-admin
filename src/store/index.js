import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_KEY !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    app
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
