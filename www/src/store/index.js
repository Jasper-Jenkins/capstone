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
    destinations: [],
    activeDest: {},
    categories: [
      'airport',
      'amusement_park',
      'aquarium',
      'art_gallery',
      'bakery',
      'bank',
      'bar',
      'beauty_salon',
      'book_store',
      'bowling_alley',
      'cafe',
      'campground',
      'car_rental',
      'casino',
      'church',
      'city_hall',
      'clothing_store',
      'convenience_store',
      'department_store',
      'electronics_store',
      'embassy',
      'florist',
      'gas_station',
      'furniture_store',
      'gym',
      'hardware_store',
      'hindu_temple',
      'home_goods_store',
      'jewelry_store',
      'library',
      'liquor_store',
      'locksmith',
      'lodging',
      'meal_delivery',
      'meal_takeaway',
      'mosque',
      'movie_rental',
      'movie_theater',
      'museum',
      'night_club',
      'park',
      'pet_store',
      'pharmacy',
      'restaurant',
      'rv_park',
      'school',
      'shoe_store',
      'shopping_mall',
      'spa',
      'stadium',
      'store',
      'subway_station',
      'supermarket',
      'synagogue',
      'train_station',
      'travel_agency',
      'transit_station',
      'zoo',
      'food',
      'point_of_interest',
      'place_of_worship'
    ],
    userTodos: [],
    googleTodos: [],
    todos: []
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
    },
    setActiveDest(state, destination) {
      state.activeDest = destination
    },
    setUserTodos(state, todos) {
      state.userTodos = todos
    },
    setGoogleTodos(state, todos) {
      state.googleTodos = todos
    },
    setNewTodo(state, todo) {
      state.todos.push(todo)
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
        tripId: state.activeTrip._id,
        long: destination.geometry.location.lng,
        lat: destination.geometry.location.lat,
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
    },
    selectActiveDest({ dispatch, commit }, dest) {
      console.log('works', dest)
      commit('setActiveDest', dest)
    },
    findTodos({dispatch, commit, state}, category) {
      server.get('/api/thingstodo/'+state.activeDest.place_id+'/' + category)
        .then(res => {
          commit('setUserTodos', res.data)
          dispatch('getGoogleTodos', category)
        })
    },
    getGoogleTodos({dispatch, commit, state}, category) {
      var search = {
        categories: category,
        coords: state.activeDest.lat + ',' + state.activeDest.long
      }
      server.post('/api/nearby/places', search) 
       .then(res => {
         console.log(res.data.results)
         commit('setGoogleTodos', res.data.results)
       })
    },
    addTodo({dispatch, commit, state}, todo) {
      todo.destinationId = state.activeDest._id
      todo.tripId = state.activeTrip._id
      server.post('/api/thingstodo', todo)
       .then(res => {
         commit('setNewTodo', res.data)
       })
    },
    addGoogleTodo({dispatch,commit, state}, todo) {
      var newTodo = {
        place_id: todo.place_id,
        title: todo.name,
        categories: todo.types,
        destinationId: state.activeDest._id,
        tripId: state.activeTrip._id
      }
      debugger
      server.post('/api/thingstodo', newTodo)
       .then(res => {
         commit('setNewTodo', res.data)
       })
    } 
  }
})