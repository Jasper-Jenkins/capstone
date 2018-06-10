<template>
  <div class="user">
    <div class="login" v-if="showLogin">
      <h1>Loginz</h1>
      <form v-on:submit.prevent="login" class="form">
        <input class="input" type="email" name="email" placeholder=" email" id="email" v-model="user.email">
        <input class="input" type="password" name="password" placeholder=" pazzword" id="name" v-model="user.password">
        <button class="btn btn-primary btn-success" type="submit">Loginz</button>
      </form>
      <br>
      <div>
      </div>
      <br>
      <p class="user">Not a uzer ?
        <em @click="toggle">Regizer</em>
      </p>
    </div>
    <div class="register" v-if="!showLogin">
      <h1>Regizer</h1>
      <form v-on:submit.prevent="register">
        <input class="input" type="email" name="email" placeholder=" email" id="email" v-model="user.email">
        <input class="input" type="text" name="name" placeholder="nam" id="name" v-model="user.displayName">
        <input class="input" type="password" name="password" placeholder="pazzword" id="name" v-model="user.password">
        <button class="btn btn-primary btn-success" type="submit">Regizer</button>
      </form>
      <br>
      <div>
      </div>
      <br>
      <p>Alredy uzer?
        <em @click="toggle">Loginz</em>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    mounted(){
      this.$store.dispatch('authenticate')
    },
    data() {
      return {
        user: {
          email: '',
          displayName: '',
          password: ''
        }, 
        showLogin: true
      }
    },
    computed: {},
    methods: {
      login() {
        this.$store.dispatch('login', this.user)
      },
      register() {
        this.$store.dispatch('register', this.user)
      },
      toggle() {
        this.showLogin = !this.showLogin
      }
    }
  }
</script>

<style scoped>
</style>