<template>
  <div class="user-destinations">
    <h2>Destinations</h2>
    <div>
      <a v-for="destination in destinations" @click="selectActiveDest(destination)"><p>{{destination.title}}</p></a>
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
