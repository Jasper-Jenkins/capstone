<template>
  <div class="user-destinations tracking">
    <h8>UserDestinations component</h8>
    <h2>Destinations</h2>
    <div class="row justify-content-center">
      <div class="wrapborder mt-2 col-md-3 ml-2 mt-3 card" style="width: 18rem" v-for="destination in destinations" :key="destination._id">
        <edit-destination :destination="destination"></edit-destination>
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
      publishDest(dest){
        dest.published = !dest.published;
        this.$store.dispatch("editDest", dest)
      }
    }
  }

</script>

<style scoped>
  .tracking {
    background-color: rgba(87, 84, 60, 0.719);
  }

  .wrapborder {
    border: 5px solid rgba(145, 145, 165, 0.459);
  }

  img {
    width: 50px;

  }
</style>