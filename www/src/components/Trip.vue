<template>
  <div class="trip">
    <add-destination></add-destination>
    <users-destinations></users-destinations>
  </div>
</template>

<script>
  import addDestination from './AddDestination'
  import usersDestinations from "./UserDestinations"

  export default {
    name: 'Trip',
    components: {
      addDestination,
      usersDestinations
    },
    mounted() {
      this.$store.dispatch('getTripDestinations', this.$route.params.id)
    },
    data() {
      return {

      }
    },
    computed: {
      destinations() {
        return this.$store.state.destinations
      }
    },
    methods: {}
  }

</script>

<style>
</style>