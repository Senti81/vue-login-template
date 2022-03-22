import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    token: localStorage.getItem('user-token') || null,
    loading: false,
    user: {},
    snackbar: {
      show: false,
      text: ''
    }
  },
  getters: {
    getToken: state => state.token,
    isAuthenticated: state => !!state.token,
    isLoading: state => state.loading,
    getHeader(state) {
      return { headers: { 'Authorization': 'Bearer ' + state.token }}
    },
    getUser: state => state.user
  },
  mutations: {
    login: (state, token) => state.token = token,
    logout: state => state.token = null,
    toggleLoading: state => state.loading = !state.loading,
    setUser: (state, user) => state.user = user,
    showSnackbar: (state, text) => {
      state.snackbar.show = true
      state.snackbar.text = text
    }
  },
  actions: {
    verifyLogin: async ({ commit }, credentials) => {
      try {
        const response = await axios.post(process.env.VUE_APP_BASEURL + '/users/login', credentials)
        if (response.data.token) {
          localStorage.setItem('user-token', response.data.token);
          commit('login', response.data.token)
          commit('setUser', response.data.user)
        }
        return response
      } catch (e) {
        localStorage.removeItem('user-token');
      }
    },
    validateToken: async({commit}, token) => {
      try {
        const response = await axios.post(process.env.VUE_APP_BASEURL + '/users/me', {token})
        commit('setUser', response.data)        
      } catch (error) {
        console.error(error)
        commit('logout')
        localStorage.removeItem('user-token')
      }
    },
    updateUser: async ({commit}, payload) => {
      try {
        const response = await axios.put(process.env.VUE_APP_BASEURL + '/users/me', payload, this.getters.getHeader)
        commit('setUser', response.data)        
      } catch (error) {
        console.error(error)
      }
    },
    logout: ({ commit }) => {
      commit('logout')
      localStorage.removeItem('user-token')
    }
  }
})
