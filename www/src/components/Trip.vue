<template>
  <div class="trip">
  
    <add-destination></add-destination>
    <!-- <users-destinations></users-destinations> -->
  </div>
</template>

<script>
  import addDestination from './AddDestination'
  // import usersDestinations from "./UserDestinations"

  export default {
    name: 'Trip',
    // mounted() {
    //   this.$store.dispatch('getTripDestinations', this.$route.params.id)
    // },
    components: {
      addDestination,
      // usersDestinations
    },
    data() {
      return {

      }
    },
    computed: {
    },
    methods: {}
  }

</script>

<style scoped>
</style>