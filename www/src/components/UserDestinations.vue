<template>
  <div class="user-destinations tracking">
    
    <!-- trash -->
    <p>UserDestinations component</p>
    <h2>Destinations</h2>
    <!-- trash -->

      <div class="row justify-content-center">
          <div class="row justify-content-center">

  
    <div class="wrapborder mt-2" v-for="destination in destinations" :key="destination._id">
      <router-link @click.native="selectActiveDest(destination)" :to="{ name: 'myDestination', params: { id: destination._id }}" :key="destination._id"><p><h5>{{destination.title}}</h5></p></router-link>
      <div class="mb-2"><button type="button" class="btn btn-danger" @click="deleteDest(destination)">Cancel Destination</button></div>
    </div>

    </div>
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
      },
      deleteDest(dest){
        this.$store.dispatch('deleteDest', dest)
      }
    }
  }

</script>

<style scoped>
.tracking {
  background-color:rgba(87, 84, 60, 0.719);
}
.wrapborder {
  border: 5px solid rgba(145, 145, 165, 0.459);
}
</style>
