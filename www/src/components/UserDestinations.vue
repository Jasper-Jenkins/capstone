<template>
  <div class="user-destinations tracking">
<<<<<<< HEAD
    <!-- <h2>Destinations</h2> -->
    <div class="row justify-content-center">

      <!-- <div class="card-colums"> -->
        <div class="" v-for="destination in destinations" :key="destination._id">
          <div class="card">
          <!-- deleted within the above div class style="width: 88rem" -->
          <img class="card-img-top" :src="destination.photo" alt="Card image cap">
          <div class="card-body">
          <router-link @click.native="selectActiveDest(destination)" :to="{ name: 'myDestination', params: { id: destination._id }}"
            :key="destination._id">
            <h5 class="card-title">{{destination.title}}</h5>
            <!-- <img :src="destination.photo" style="max-width:250em" alt="">  -->
          </router-link>
          <button type="button" class="btn btn-danger" @click="deleteDest(destination)">Cancel Destination</button>
          </div>
          <!-- <div class="mb-2 mt-2"><button type="button" class="btn btn-danger" @click="deleteDest(destination)">Cancel Destination</button></div> -->
          <!-- </div> -->
        </div>
=======
    <h8>UserDestinations component</h8>
    <h2>Destinations</h2>
    <div class="row justify-content-center">
      <div class="wrapborder mt-2 col-md-3 ml-2 mt-3 card" style="width: 18rem" v-for="destination in destinations" :key="destination._id">
        <edit-destination :destination="destination"></edit-destination>
>>>>>>> a5d380a932ca7516ab6cd88df6a178f5786b23df
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
<<<<<<< HEAD
      destinations() {
=======
      destinations() { 
>>>>>>> a5d380a932ca7516ab6cd88df6a178f5786b23df
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
<<<<<<< HEAD
  /* .tracking {
    background-color: rgba(247, 247, 247, 0.589);
  } */

  /* .wrapborder {
    border: 5px solid rgba(145, 145, 165, 0.459);
  } */

  
=======
  .tracking {
    background-color: rgba(87, 84, 60, 0.719);
  }

  .wrapborder {
    border: 5px solid rgba(145, 145, 165, 0.459);
  }

  img {
    width: 50px;

  }
>>>>>>> a5d380a932ca7516ab6cd88df6a178f5786b23df
</style>