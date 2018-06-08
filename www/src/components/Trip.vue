<template>
  <div class="trip">
    <add-destination></add-destination>
  </div>
</template>

<script>
  import addDestination from './AddDestination'

  export default {
    name: 'Trip',
    mounted() {
      this.$store.dispatch('getTripDestinations', this.$route.params.id)
    },
    components: {
      addDestination
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