import axios from 'axios'
import router from '../../router'
var production = !window.location.host.includes('localhost');
var baseUrl = production ? 'https://i-be-trippin.herokuapp.com' : '//localhost:3000';

var server = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})

export default {
  state: {
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    login({ dispatch, commit }, payload) {
      server.post('/login', payload)
        .then(user => {
          router.push('/')
          commit('setUser', user)
        })
        .catch(res => {
          console.log(res.data)
        })
    },
    register({ dispatch, commit }, payload) {
      server.post('/register', payload)
        .then(newUser => {
          router.push('/')
          commit('setUser', newUser)
        })
        .catch(res => {
          console.log(res.data)
        })
    },
    authenticate({ commit, dispatch }) {
      server.get('/authenticate')
        .then(res => {
          if(res.data.data.email == "demo@demo.com") {
            dispatch("endDemo")
          }
          if(res.data.data._id) {
            router.push({name: "User"})
          }
          commit('setUser', res.data.data)
          router.push("/")
        })
        .catch(res => {
          router.push({name: "User"})
          console.log(res)
        })
    },
    signOut({ commit, dispatch, state }) {
      server.delete('/logout')
        .then(res => {
          commit('setUser', {})
          router.push({ name: 'User' })
        })
        .catch(res => {
          console.log(res.data)
        })
    },
    endDemo({ dispatch, commit, state }) {
      if(state.user._id == "5b3fa93e552b6145d8d3be17") {
        server.delete('/end-demo/' + state.user._id)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
  }
}

