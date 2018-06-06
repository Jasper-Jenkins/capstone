<template>
  <div class="user-destinations">
    <h2>Destinations</h2>
    <div>
      <a @click="selectActiveDest"><p v-for="destination in destinations">{{destination.title}}</p></a>
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
      selectActiveDest() {
        this.$store.dispatch()
      }
    }
  }

</script>

<style>


</style>
