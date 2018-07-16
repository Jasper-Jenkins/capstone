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
    apiResults: [],
    userResults: [],
    destinations: [],
    activeDest: {},
  },
  mutations: {
    setApiResults(state, results) {
      state.apiResults = results
    },
    setUserResults(state, results) {
      state.userResults = results
    },
    setDestinations(state, destinations) {
      state.destinations = destinations
    },
    setActiveDest(state, destination) {
      state.activeDest = destination
    },
    setEditDestination(state, destination){
      var index = state.destinations.findIndex(t => {
        return t._id == destination._id
      })
      state.destinations.splice(index, 1, destination)                  
    },
  },
  actions: {
    findDestination({ commit, dispatch }, destination) {
      server.get('/api/locations/' + destination)
        .then(res => {
          console.log(res)
          commit('setApiResults', res.data)
          dispatch('getUserResults', res.data)
        })
        .catch(res => {
          console.log(res)
        })
    },
    getUserResults({ commit, dispatch }, searchResults) {
      console.log(searchResults, 'search')
      var search = searchResults[0]
      server.get('/api/destinations/' + search.place_id + "/place")
        .then(res => {
          console.log(res.data)
          commit('setUserResults', res.data)
        })
        .catch(res => {
          console.log(res)
        })
    },
    addDestination({ dispatch, commit, rootState }, destination) {
      if (destination['geometry']) {
        var newDestination = {
          title: destination.name,
          place_id: destination.place_id,
          tripId: rootState.tripModule.activeTrip._id,
          long: destination.geometry.location.lng,
          lat: destination.geometry.location.lat,
          photo: destination.photo,
          author: rootState.userModule.user.displayName
        }
      }
      else {
        var newDestination = {
          title: destination.title,
          place_id: destination.place_id,
          tripId: rootState.tripModule.activeTrip._id,
          long: destination.long,
          lat: destination.lat,
          photo: destination.photo,
          author: rootState.userModule.user.displayName
        }
      }
      server.post('/api/destinations', newDestination)
        .then(res => {
          dispatch('getTripDestinations', res.data.tripId)
        })
        .catch(res => {
          console.log(res)
        })
    },
    deleteDest({ commit, dispatch}, dest) {
      server.delete('/api/destinations/' + dest._id)
        .then(res => {
          console.log(res)
          dispatch('getTripDestinations', dest.tripId)
        })
        .catch(res => {
          console.log(res)
        })
    },
    getTripDestinations({ dispatch, commit }, id) {
      server.get('/api/trips/' + id + '/destinations')
        .then(res => {
          commit('setDestinations', res.data)
        })
        .catch(res => {
          console.log(res)
        })
    },
    editDest({commit, dispatch}, dest){
      debugger
      server.put('/api/destinations/'+ dest._id, dest)
      .then(res=> {
        commit('setEditDestination', res.data.destination)
      })
    },
    selectActiveDest({ dispatch, commit }, dest) {
      console.log('works', dest)
      commit('setActiveDest', dest)
    },
  }
}