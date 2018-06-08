<template>
  <div class="trips">
    <div class="row">
      <div class="col-md-10 offset-1 card" v-for="trip in trips">
        <router-link :to="{ name: 'Trip', params: { id: trip._id }}">
          <h2>{{trip.title}}</h2>
          <p>{{trip.description}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'trips',
    data() {
      return {

      }
    },
    computed: {
      trips() {
        return this.$store.state.userTrips
      }
    },
    methods: {}
  }

</script>

<style>


</style>
