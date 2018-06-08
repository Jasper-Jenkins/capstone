import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import User from '@/components/Login'
import Plan from '@/components/Plan'
import Destination from '@/components/Destination'
import Trip from '@/components/Trip'
import MyTrips from '@/components/MyTrips'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'User',
      component: User
    },
    {
      path: '/plan-trip',
      name: 'Plan',
      component: Plan
    },
    {
      path:'/destination',
      name: 'Destination',
      component: Destination
    },
    {
      path: '/trip/:id',
      name: 'Trip',
      component: Trip
    },
    {
      path: '/mytrips',
      name: 'myTrips',
      component: MyTrips
    }
  ]
})
