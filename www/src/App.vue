<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary top-header format">
      <div class="navbar-left">
        <router-link :to="{ name: 'Home'}" class="navbar-brand">
          <a>Home</a>
        </router-link>
        <router-link :to="{ name: 'myTrips'}" class="navbar-brand">
          <a>My Trips</a>
        </router-link>
      </div>

      <img src="./assets/whitelogo.png" width="280px">

      <a class="navbar-brand" @click="login" v-if="!(user._id)">
        <button type="button" class="btn btn-outline-light">Sign In/Login</button>
      </a>
      <div v-if="user._id" class="d-flex flex-column">
        <a class="navbar-brand">User: {{user.displayName}}</a>
        <a class="navbar-brand btn btn-outline-light" @click="signOut">Sign out</a>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      user() {
        return this.$store.state.userModule.user
      }
    },
    mounted() {
      this.$store.dispatch("authenticate")
      window.addEventListener('beforeunload', () => {
        if (this.$store.state.userModule.user.email == 'demo@demo.com') {
          this.$store.dispatch('endDemo')
          this.$store.dispatch('signOut')
        }
      })
    },
    methods: {
      login() {
        this.$router.push({ name: 'User' })
      },
      signOut() {
        this.$store.dispatch('signOut')
      }
    },
    destroyed() {
      this.$store.dispatch('endDemo')
      this.$store.dispatch('signOut')
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;

  }
</style>