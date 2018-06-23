<template>
  <div class="user-destinations tracking">
    <!-- <h2>Destinations</h2> -->
    <!-- <h2>Destinations</h2> -->
    <h2>Destinations</h2>
    <div class="row justify-content-center">
      <div v-for="destination in destinations" :key="destination._id">
        <edit-destination v-on:setDest="setDest" :destination="destination"></edit-destination>
      </div>
    </div>
  </div>
</template>

<script>
  import editDestination from "./EditDestination"
  export default {
    name: 'userDestinations',
    components: {
      editDestination
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
    methods: {
      selectActiveDest(dest) {
        this.$store.dispatch('selectActiveDest', dest)
      },
      deleteDest(dest) {
        this.$store.dispatch('deleteDest', dest)
      },
      publishDest(dest) {
        dest.published = !dest.published;
        this.$store.dispatch("editDest", dest)
      },
      setDest(dest) {
        var index = this.destinations.findIndex(d => {
          return d._id == dest._id
        })
        this.destinations.splice(index, 1, dest);
      }
    }
  }

</script>

<style scoped>
  /* .tracking {
    background-color: rgba(247, 247, 247, 0.589);
  } */

  /* .wrapborder {
    border: 5px solid rgba(145, 145, 165, 0.459);
  } */
</style>