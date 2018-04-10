import * as types from '../mutation-types'

const state = {
  isSidebarCollapse: false,
  visitedViews: []
}

const NUM_OF_VISITED_VIEWS_TO_DISPLAY = 6
const getters = {
  isSidebarCollapse: state => state.isSidebarCollapse,
  visitedViews: state =>
    state.visitedViews.slice(-NUM_OF_VISITED_VIEWS_TO_DISPLAY)
}

const actions = {
  toggleSidebar ({ commit }) {
    commit(types.TOGGLE_SIDEBAR)
  },
  addVisitedViews ({ commit }, view) {
    commit(types.ADD_VISITED_VIEWS, view)
  },
  delVisitedViews ({ commit, state }, view) {
    return new Promise((resolve) => {
      commit(types.DEL_VISITED_VIEWS, view)
      resolve([...state.visitedViews])
    })
  },
  clearVisitedViews ({ commit }) {
    commit(types.CLEAR_VISITED_VIEWS)
  }
}

const mutations = {
  [types.TOGGLE_SIDEBAR] (state) {
    state.isSidebarCollapse = !state.isSidebarCollapse
  },
  [types.ADD_VISITED_VIEWS] (state, view) {
    let views = state.visitedViews
    const isVisited = views.some(v => v.path === view.path)
    if (!isVisited) {
      views.push({
        name: view.name,
        path: view.path
      })
    }
    state.visitedViews =
      views.slice(-NUM_OF_VISITED_VIEWS_TO_DISPLAY)
  },
  [types.DEL_VISITED_VIEWS] (state, view) {
    let views = state.visitedViews
    for (let i = 0, len = views.length; i < len; i++) {
      if (views[i].path === view.path) {
        views.splice(i, 1)
        break
      }
    }
  },
  [types.CLEAR_VISITED_VIEWS] (state) {
    state.visitedViews = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
