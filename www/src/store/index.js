import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//kanban-ramsey-maddy.herokuapp.com/' : '//localhost:3000';

vue.use(vuex)

// API Key: AIzaSyDwdoKeSFC0xUN1VI8Ud78ZfpadFV7jUwU


var api = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=',
    timeout: 3000,
    withCredentials: true
})

var server = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})

export default new vuex.Store({
  state: {
    user: {},
    apiResults: [],
    userResults: [],
    activeTrip: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setActiveTrip(state, trip) {
      state.activeTrip = trip
    },
    setApiResults(state, results){
       state.apiResults = results 
    },
    setUserResults(state, results){
        state.userResults = results
    }
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
          commit('setUser', res.data.data)
          router.push('/')
        })
        .catch(res => {
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
    findDestination({commit, dispatch}, destination){
        api.get(''+destination+ '&key=AIzaSyDwdoKeSFC0xUN1VI8Ud78ZfpadFV7jUwU')
        .then(res=>{
            commit('setApiResults', res.data)
            dispatch('getUserResults', res.data)
        })
        .catch(res=>{
            console.log(res)
        })
    },
    getUserResults({commit, dispatch}, searchResults){
        server.get('/api/destinations/'+searchResults._id+"/place")
        .then(res=>{
            commit('setUserResults', res.data)
            
        })
        .catch(res=>{
            console.log(res)
        })
    },
    createTrip({dispatch, commit}, trip) {
      server.post('/api/trips', trip) 
       .then(res => {
         commit('setActiveTrip', res.data)
       })
       .catch(res=>{
            console.log(res)
        })
    }
  }
})