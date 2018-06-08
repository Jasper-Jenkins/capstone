<template>
  <div class="user-destinations">
    <h2>Destinations</h2>
    <div>
      <router-link v-for="destination in destinations" @click.native="selectActiveDest(destination)" :to={ name: 'myDestination', params: { id: destination._id }}><p>{{destination.title}}</p></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'userDestinations',
    data() {
      return {

      }
    },
    computed: {
      destinations() {
        return this.$store.state.destinations
      }
    },
    methods: {
      selectActiveDest(dest) {
        this.$store.dispatch('selectActiveDest', dest)
      }
    }
  }

</script>

<style>

</style>
