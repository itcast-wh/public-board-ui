import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: '',
    user: {},
    lastPage: 'list'
  },
  mutations: {
    setLogin (state, value) {
      state.isLogin = value
    },
    setToken (state, value) {
      state.token = value
      localStorage.setItem('it-token', value)
    },
    setUser (state, value) {
      state.user = value
      localStorage.setItem('it-user', JSON.stringify(value))
    },
    setLast (state, value) {
      state.lastPage = value
    }
  },
  actions: {
  },
  modules: {
  }
})
