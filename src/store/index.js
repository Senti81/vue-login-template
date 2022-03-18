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
    },
    START: process.env.VUE_APP_TIME_START,
    END: process.env.VUE_APP_TIME_END,
    mock: {
      day: null,
      hour: null
    },
    admin: false,
    started: false
  },
  getters: {
    getToken: state => state.token,
    isAuthenticated: state => !!state.token,
    isLoading: state => state.loading,
    getHeader(state) {
      return { headers: { 'Authorization': 'Bearer ' + state.token }}
    },
    getUser: state => state.user,
    getMock: state => state.mock,
    isAdmin: state => state.admin,
    isStarted: state => state. started
  },
  mutations: {
    login: (state, token) => state.token = token,
    logout: state => state.token = null,
    toggleLoading: state => state.loading = !state.loading,
    setUser: (state, user) => state.user = user,
    showSnackbar: (state, text) => {
      state.snackbar.show = true
      state.snackbar.text = text
    },
    setMock: (state, payload) => state.mock = payload,
    setAdmin: (state, admin) => state.admin = admin,
    setGameStarted: state => state.started = true
  },
  actions: {
    async verifyLogin ({ commit }, credentials) {
      try {
        const response = await axios.post(process.env.VUE_APP_BASEURL + '/users/login', credentials)
        if (response.data.token) {
          localStorage.setItem('user-token', response.data.token);
          commit('login', response.data.token)
          commit('setUser', response.data.user)
          commit('setAdmin', response.data.user.role === 'ADMIN')
        }
        return response
      } catch (e) {
        localStorage.removeItem('user-token');
      }
    },
    async validateToken ({commit}, token) {
      try {
        const response = await axios.post(process.env.VUE_APP_BASEURL + '/users/me', {token})
        commit('setUser', response.data)
        commit('setAdmin', response.data.role === 'ADMIN')
      } catch (error) {
        console.error(error)
        commit('logout')
        localStorage.removeItem('user-token')
      }
    },
    async registerUser({commit}, payload) {
      try {
        await axios.post(process.env.VUE_APP_BASEURL + '/users', payload)
        commit('showSnackbar', `Benutzer ${payload.username} angelegt!`)
      } catch (error) {
        console.error(error)
      }
    },
    async updateUser({commit}, payload) {
      try {
        const response = await axios.put(process.env.VUE_APP_BASEURL + '/users/me', payload, this.getters.getHeader)
        commit('setUser', response.data)        
      } catch (error) {
        console.error(error)
      }
    },
    async startGame({commit}) {
      const result = await axios.post(process.env.VUE_APP_BASEURL + '/scores/start', {}, this.getters.getHeader)
      commit('showSnackbar', result.data)
    },
    async stopGame({commit}) {
      const result = await axios.delete(process.env.VUE_APP_BASEURL + '/scores/', this.getters.getHeader)
      commit('showSnackbar', result.data)
    },
    async submitSolution({ commit }, payload) {
      try {
        commit('toggleLoading')
        await axios.post(process.env.VUE_APP_BASEURL + `/tasks/${payload.day}`, payload.data, this.getters.getHeader)        
        commit('showSnackbar', 'Antwort abgegeben')

      } catch (error) {
        console.error(error)
        commit('showSnackbar', 'Hoppla...Da ist was schief gelaufen')

      } finally {
        commit('toggleLoading')
      }
    },
    async isInProgress({ commit }) {
      const res = await axios.get(process.env.VUE_APP_BASEURL + '/scores/', this.getters.getHeader)
      if (res.data.length !== 0) {
        commit('setGameStarted', true)
        console.log('Game started')
      }
    },
    logout: ({ commit }) => {
      commit('logout')
      localStorage.removeItem('user-token')
    }
  }
})
