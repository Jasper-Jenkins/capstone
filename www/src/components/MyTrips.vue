<template>
  <div class="my-trips jumbotron">

    <create-trip></create-trip>
    <trips></trips>

  </div>
</template>

<script>
  import trips from './Trips'
  import createTrip from './CreateTrip'

  export default {
    name: 'myTrips',
    components: {
      trips,
      createTrip
    },
    mounted() {
      if (!this.$store.state.userModule.user._id) {
        this.$router.push({ name: "User" });
      }
      this.$store.dispatch('getUsersTrips')
    },
    data() {
      return {
      }
    },
    computed: {
      trips() {
        this.$store.state.tripModule.trips
      }
    },
    methods: {

    }
  }

</script>

<style scoped>
  .my-trips {
    background-image: url(../assets/travel2.jpg);
    height: 100vh;
  }
</style>