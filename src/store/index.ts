import { createStore } from 'vuex'

const defaultState = {
  count: 0
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },

  mutations: {
    increment(state) { // 移除了类型注解
      state.count++
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
  getters: {
    double(state) { // 移除了类型注解
      return 2 * state.count
    }
  }
})
