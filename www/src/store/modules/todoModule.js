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
    userTodos: [],
    googleTodos: [],
    todos: []
  },
  mutations: {
    setUserTodos(state, todos) {
      state.userTodos = todos
    },
    setGoogleTodos(state, todos) {
      state.googleTodos = todos
    },
    setNewTodo(state, todo) {
      state.userTodos.unshift(todo)
    },
    setComment(state, todo) {
      var index = state.userTodos.findIndex(item => {
        return item._id == todo._id
      })
      state.userTodos.splice(index, 1)
      state.userTodos.unshift(todo)
    },
    setRemoveTodo(state, todo) {
      var index = state.userTodos.findIndex(item => {
        return item._id == todo._id
      })
      state.userTodos.splice(index, 1);
    },
    setTodos(state, todos) {
      state.todos = todos
    },

  },
  actions: {
    findTodos({ dispatch, commit, rootState }, category) {
      server.get('/api/thingstodo/' + rootState.destModule.activeDest.place_id + '/' + category)
        .then(res => {
          commit('setTodos', res.data)
          dispatch('getGoogleTodos', category)
        })
        .catch(res => {
          console.log(res)
        })
    },
    getGoogleTodos({ dispatch, commit, rootState }, category) {
      var search = {
        categories: category.replace(" ", "_"),
        coords: rootState.destModule.activeDest.lat + ',' + rootState.activeDest.long
      }
      server.post('/api/nearby/places', search)
        .then(res => {
          console.log(res.data.results)
          commit('setGoogleTodos', res.data.results)
        })
        .catch(res => {
          console.log(res)
        })
    },
    addTodo({ dispatch, commit, rootState }, todo) {
      todo.destinationId = rootState.destModule.activeDest._id
      todo.tripId = rootState.tripModule.activeTrip._id
      todo["author"] = rootState.userModule.user.displayName
      todo.place_id = rootState.destModule.activeDest.place_id
      server.post('/api/thingstodo', todo)
        .then(res => {
          commit('setNewTodo', res.data)
        })
        .catch(res => {
          console.log(res)
        })
    },
    addGoogleTodo({ dispatch, commit, rootState }, todo) {
      var newTodo = {
        place_id: rootState.destModule.activeDest.place_id,
        title: todo.name,
        categories: todo.types,
        destinationId: rootState.destModule.activeDest._id,
        tripId: rootState.tripModule.activeTrip._id,
        lat: todo.geometry.location.lat,
        long: todo.geometry.location.lng
      }
      newTodo["author"] = rootState.userModule.user.displayName
      server.post('/api/thingstodo', newTodo)
        .then(res => {
          commit('setNewTodo', res.data)
        })
        .catch(res => {
          console.log(res)
        })
    },
    getDestTodos({ dispatch, commit }, id) {
      server.get('/api/destinations/' + id + '/thingstodo')
        .then(res => {
          commit('setUserTodos', res.data)
        })
        .catch(res => {
          console.log(res)
        })
    },
    deleteTodo({ commit, dispatch }, todo) {
      var temp = todo
      server.delete('/api/thingstodo/' + todo._id)
        .then(res => {
          commit('setRemoveTodo', temp)
        })
        .catch(res => {
          console.log(res)
        })
    },
    editTodo({ dispatch, commit }, todo) {
      server.put('/api/thingstodo/' + todo._id, todo)
        .then(res => {
          commit('setComment', res.data.thingtodo)
        })
        .catch(res => {
          console.log(res)
        })
    },
    deleteComment({ dispatch, commit }, todo) {
      server.put('/api/thingstodo/' + todo._id, todo)
        .then(res => {
          console.log(res.data.thingtodo)
        })
    },
  }
}