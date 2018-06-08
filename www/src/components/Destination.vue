<template>
  <div class="destination">
    <div>
      {{activeDest.title}}
      
      {{activeDest.description}}
    </div>
    <select v-model="trip">
      <option disabled value=''>Add Destinatio to Trip: </option>
      <option v-for="trip in trips" :key="trip._id" :value="trip">{{trip.title}}</option>
    </select>
    <button @click="addDestination(activeDest)">Add destination to trip: </button>
  <!-- <router-link :to="{name: 'Home'}">Go Home</router-link> -->
  </div>
 
</template>

<script>
  export default {
    name: 'Destination',
    data() {
      return {
        destination: {

        },
        trip: {}
      }
    },
    computed: {
      activeDest() {
        return this.$store.state.activeDest
      },
      trips() {
        return this.$store.state.userTrips
      },

    },
    methods: {
       addDestination(result) {
        this.$store.dispatch('selectActiveTrip', this.trip)
        this.$store.dispatch('addDestination', result)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>