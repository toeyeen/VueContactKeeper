import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

Vue.use(Vuex)
let nextId = 0
const url = '//localhost:5000'

export default new Vuex.Store({
  state: {
    contacts: null,
    currentContact: null,
    filtered: null,
    notifications: [],
    user: null,
    isAuthenticated: null,
    loading: true,
    token: localStorage.getItem('token'),
    error: null,
  },

  mutations: {
    ADD_CONTACT(state, formData) {
      state.contacts.push(formData)
      state.loading = false
    },
    FETCH_CONTACTS(state, contacts) {
      state.contacts = contacts
      state.loading = false
    },
    CLEAR_CONTACTS(state) {},
    ADD_CONTACT_ERROR(state, errorMessage) {
      state.error = errorMessage
      state.loading = false
    },
    DELETE_CONTACT(state, contactToRemove) {
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== contactToRemove
      )
      state.loading = false
    },
    SET_CURRENT_CONTACT(state, contact) {
      state.currentContact = contact
    },
    CLEAR_CURRENT_CONTACT(state) {
      state.currentContact = null
    },

    UPDATE_CONTACT(state, contactToUpdate) {
      state.contacts = state.contacts.map((contact) => {
        return contact._id == contactToUpdate._id ? contactToUpdate : contact
      })
      console.log(state.contacts)
      state.loading = false
    },

    FILTER_CONTACT(state, textOrEmail) {
      state.filtered = state.contacts.filter((contact) => {
        const regex = new RegExp(`${textOrEmail}`, 'gi')
        return contact.name.match(regex) || contact.email.match(regex)
      })
    },

    CLEAR_FILTER(state) {
      state.filtered = null
    },
    REGISTER_SUCCESS(state, tokencredential) {
      localStorage.setItem('token', tokencredential.token)
      state.token = tokencredential.token
      state.isAuthenticated = true
      state.loading = false
    },
    REGISTER_FAILED(state, errorMessage) {
      localStorage.removeItem('token')
      state.token = null
      state.isAuthenticated = null
      state.user = null
      state.loading = false
      state.error = errorMessage
    },
    LOGIN_SUCCESS(state, tokencredential) {
      localStorage.setItem('token', tokencredential.token)
      state.token = tokencredential.token
      state.isAuthenticated = true
      state.loading = false
    },
    LOGIN_FAILED(state, errorMessage) {
      localStorage.removeItem('token')
      state.token = null
      state.isAuthenticated = null
      state.user = null
      state.loading = false
      state.error = errorMessage
    },
    USER_LOADED(state, user) {
      state.isAuthenticated = true
      state.loading = false
      state.user = user.data
    },
    AUTH_ERROR(state) {
      localStorage.removeItem('token')
      state.token = null
      state.isAuthenticated = null
      state.user = null
      state.loading = false
      state.error = errorMessage
    },
    PUSH_NOTIFICATION(state, notfication) {
      state.notifications.push({
        ...notfication,
        id: nextId++,
      })
    },
    DELETE_NOTIFICATION(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== notificationToRemove.id
      )
    },
    LOGOUT_USER(state) {
      localStorage.removeItem('token')
      location.reload()
    },
  },
  actions: {
    addContact({ commit, dispatch }, formData) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      return axios
        .post('//localhost:5000/api/contacts', formData, config)
        .then(({ data }) => {
          console.log(data.data)
          commit('ADD_CONTACT', data.data)
        })
        .then(() => {
          const notification = {
            type: 'success',
            message: 'Contact Added',
          }
          dispatch('addNotification', notification)
        })
        .catch((err) => {
          console.log(err.response.data)
          commit('ADD_CONTACT_ERROR', err.response.data.message)
          const notification = {
            type: 'error',
            message: err.response,
          }
          dispatch('addNotification', notification)
        })
      // commit('ADD_CONTACT', formData)
    },
    fetchContacts({ commit }) {
      return axios
        .get('//localhost:5000/api/contacts')
        .then(({ data }) => {
          commit('FETCH_CONTACTS', data.data)
        })
        .catch((err) => {
          commit('ADD_CONTACT_ERROR', err.response.message)
        })
    },
    deleteContact({ commit, dispatch }, contactToDelete) {
      return axios
        .delete(`//localhost:5000/api/contacts/${contactToDelete}`)
        .then(() => {
          commit('DELETE_CONTACT', contactToDelete)
          const notification = {
            type: 'success',
            message: 'Contact Deleted',
          }
          dispatch('addNotification', notification)
        })
    },
    setCurrentContact({ commit }, contact) {
      commit('SET_CURRENT_CONTACT', contact)
    },
    clearCurrentContact({ commit }) {
      commit('CLEAR_CURRENT_CONTACT')
    },
    updateContact({ commit, dispatch }, contactToUpdate) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      return axios
        .put(
          `//localhost:5000/api/contacts/${contactToUpdate._id}`,
          contactToUpdate,
          config
        )
        .then(() => {
          commit('UPDATE_CONTACT', contactToUpdate)
          const notification = {
            type: 'success',
            message: 'Contact Updated',
          }
          // dispatch('fetchContacts')
          dispatch('addNotification', notification)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    filterContacts({ commit }, textOrEmail) {
      commit('FILTER_CONTACT', textOrEmail)
    },
    clearFilter({ commit }) {
      commit('CLEAR_FILTER')
    },
    addNotification({ commit }, notification) {
      commit('PUSH_NOTIFICATION', notification)
    },
    removeNotification({ commit }, notificationToRemove) {
      commit('DELETE_NOTIFICATION', notificationToRemove)
    },
    async registerUser({ commit, dispatch }, credentials) {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }
      // return axios
      //   .post('//localhost:5000/api/users', credentials, config)
      //   .then((res) => console.log(res.data))
      try {
        const res = await axios.post(
          '//localhost:5000/api/users',
          credentials,
          config
        )
        commit('REGISTER_SUCCESS', res.data)
        dispatch('loadUser')
      } catch (error) {
        const notification = {
          type: 'error',
          message: error.response.data.message,
        }
        dispatch('addNotification', notification)
        commit('REGISTER_FAILED', error.response.data.message)
      }
    },
    async loadUser({ commit }) {
      // @ todo - load the token into global headeer
      if (localStorage.token) {
        setAuthToken(localStorage.token)
      }

      try {
        const res = await axios.get(`//localhost:5000/api/auth`)
        const user = res.data
        commit('USER_LOADED', user)
      } catch (error) {
        commit('AUTH_ERROR')
      }
    },
    async loginUser({ commit, dispatch }, credentials) {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }
      // return axios
      //   .post('//localhost:5000/api/users', credentials, config)
      //   .then((res) => console.log(res.data))
      try {
        const res = await axios.post(
          '//localhost:5000/api/auth',
          credentials,
          config
        )
        commit('LOGIN_SUCCESS', res.data)
        dispatch('loadUser')
      } catch (error) {
        const notification = {
          type: 'error',
          message: error.response.data.message,
        }
        dispatch('addNotification', notification)
        commit('LOGIN_FAILED', error.response.data.message)
      }
    },
    logoutUser({ commit, dispatch }) {
      commit('LOGOUT_USER')
      const notification = {
        type: 'success',
        message: 'Logged out successfully',
      }
      dispatch('addNotification', notification)
    },
  },
  modules: {},
  getters: {
    getContactCounts: (state) => {
      return state.contacts.filter((contact) => contact)
    },
    loggedIn: (state) => {
      return !!state.user
    },
  },
})
