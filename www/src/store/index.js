import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import userModule from './modules/userModule'
import tripModule from './modules/tripModule'
import destModule from './modules/destinationModule'
import todoModule from './modules/todoModule'
var production = !window.location.host.includes('localhost');
var baseUrl = production ? 'https://i-be-trippin.herokuapp.com' : '//localhost:3000';

vue.use(vuex)

// Google places API Key: AIzaSyA2l-r77x24uatF20-TRoAEceNL_fRKjcg

var server = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})

export default new vuex.Store({
  modules: {
    userModule,
    tripModule,
    destModule,
    todoModule
  },
  state: {
    categories: [
      'airport',
      'amusement park',
      'aquarium',
      'art gallery',
      'bakery',
      'bank',
      'bar',
      'beauty salon',
      'book store',
      'bowling alley',
      'cafe',
      'campground',
      'car rental',
      'casino',
      'church',
      'city hall',
      'clothing store',
      'convenience store',
      'department store',
      'electronics store',
      'embassy',
      'florist',
      'food',
      'gas station',
      'furniture store',
      'gym',
      'hardware store',
      'hindu temple',
      'home goods store',
      'jewelry store',
      'library',
      'liquor store',
      'locksmith',
      'lodging',
      'meal delivery',
      'mosque',
      'movie rental',
      'movie theater',
      'museum',
      'night club',
      'park',
      'pet store',
      'pharmacy',
      'point of interest',
      'place of worship',
      'restaurant',
      'rv park',
      'school',
      'shoe store',
      'shopping mall',
      'spa',
      'stadium',
      'store',
      'subway station',
      'supermarket',
      'synagogue',
      'train station',
      'travel agency',
      'transit station',
      'zoo'
    ]
  },
  mutations: {
    
  },
  actions: {   
    clearResults({ dispatch, commit }) {
      commit('setApiResults', [])
      commit('setUserResults', [])
      commit('setGoogleTodos', [])
      commit('setTodos', [])
    }
  }
})