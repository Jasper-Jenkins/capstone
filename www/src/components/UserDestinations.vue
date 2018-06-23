<template>
  <div class="user-destinations tracking">
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
      deleteDest(dest) {
        this.$store.dispatch('deleteDest', dest)
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