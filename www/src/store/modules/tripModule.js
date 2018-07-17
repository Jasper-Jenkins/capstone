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
    userTrips: [],
    activeTrip: {}
  },
  mutations: {
    addTrip(state, trip) {
      state.userTrips.unshift(trip)
    },
    setUserTrips(state, trips) {
      state.userTrips = trips
    },
    setActiveTrip(state, trip) {
      state.activeTrip = trip
    },
    setEditTrip(state, trip) {
      var index = state.userTrips.findIndex(t => {
        return t._id == trip._id
      })
      state.userTrips.splice(index, 1, trip)
    }
  },
  actions: {
    createTrip({ dispatch, commit, rootState }, trip) {
      trip["author"] = rootState.userModule.user.displayName
      server.post('/api/trips', trip)
        .then(res => {
          commit('addTrip', res.data)
        })
        .catch(res => {
          console.log(res)
        })
    },
    deleteTrip({ commit, dispatch }, trip) {
      server.delete('/api/trips/' + trip._id)
        .then(res => {
          dispatch('getUsersTrips')
        })
        .catch(res => {
          console.log(res)
        })
    },
    getUsersTrips({ dispatch, commit, rootState }) {
      server.get('/api/trips/user/' + rootState.userModule.user._id)
        .then(res => {
          commit('setUserTrips', res.data)
        })
        .catch(res => {
          console.log(res)
        })
    },
    selectActiveTrip({ dispatch, commit }, trip) {
      commit("setActiveTrip", trip)
    },
    editTrip({commit, dispatch}, trip) {
      server.put("/api/trips/" + trip._id, trip)
       .then(res => {
         commit("setEditTrip", res.data.trip)
       })
    },
    publishTrip({dispatch, commit}, trip) {
      var pub = {
        published: !trip.published
      }
      server.put('/api/trip/publish/' + trip._id, pub)
        .then(res => {
          commit('setEditTrip', trip)
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}