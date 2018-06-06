import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//kanban-ramsey-maddy.herokuapp.com/' : '//localhost:3000';

vue.use(vuex)

// Google places API Key: AIzaSyA2l-r77x24uatF20-TRoAEceNL_fRKjcg

var server = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})

export default new vuex.Store({
  state: {
    user: {},
    apiResults: [],
    userResults: [{
      title: "Grand Canyon",
      formatted_address: "1234 Easy Street"
    }],
    
    activeTrip: {},
    destinations: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setActiveTrip(state, trip) {
      state.activeTrip = trip
    },
    setApiResults(state, results) {
      state.apiResults = results
    },
    setUserResults(state, results) {
      state.userResults = results
    },
    setDestinations(state, destinations) {
      state.destinations = destinations
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
    findDestination({ commit, dispatch }, destination) {
      server.get('/api/locations/' + destination)
        .then(res => {
          console.log(res)
          commit('setApiResults', res.data.results)
          dispatch('getUserResults', res.data)
        })
        .catch(res => {
          console.log(res)
        })
    },
    // findUserDestination({commit, dispatch}, destination){
    //   server.get('/')
    // },
    getUserResults({ commit, dispatch }, searchResults) {
      console.log(searchResults, 'search')
      var search = searchResults.results[0]
      server.get('/api/destinations/' + search.place_id + "/place")
        .then(res => {
          console.log(res.data)
          commit('setUserResults', res.data)
        })
        .catch(res => {
          console.log(res)
        })
    },
    createTrip({ dispatch, commit }, trip) {
      server.post('/api/trips', trip)
        .then(res => {
          commit('setActiveTrip', res.data)
        })
        .catch(res => {
          console.log(res)
        })
    },
    addDestination({ dispatch, commit, state }, destination) {
      var newDestination = {
        title: destination.name,
        place_id: destination.place_id,
        tripId: state.activeTrip._id
      }
      server.post('/api/destinations', newDestination)
        .then(res => {
          dispatch('getTripDestinations', res.data.tripId)
        })
    },
    getTripDestinations({ dispatch, commit }, id) {
      server.get('/api/trips/' + id + '/destinations')
        .then(res => {
          commit('setDestinations', res.data)
        })
    }
  }
})