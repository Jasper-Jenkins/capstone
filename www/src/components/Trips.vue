<template>
  <div class="trips mt-2">
    <div class="row justify-content-center">
      <div class="col-md-3 ml-2 mt-3 card" style="width: 18rem;" v-for="trip in trips">
          <div class="card-body">
        <router-link @click.native="selectActiveTrip(trip)" :to="{ name: 'Trip', params: { id: trip._id }}">
            <h2 class="card-title">{{trip.title}}</h2>
            <p class="card-text">{{trip.description}}</p>
        </router-link>
        <div class="mb-2">
            <button type="button" class="btn btn-danger" @click="deleteTrip(trip)">Cancel Trip</button>
          </div>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>


<!-- <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div> -->

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
    methods: {
      selectActiveTrip(trip) {
        this.$store.dispatch('selectActiveTrip', trip)
      },
      deleteTrip(trip){
        this.$store.dispatch('deleteTrip', trip)
      }
    }
  }

</script>

<style scoped>

.card {
    background-color: rgba(244, 246, 247, 0.904);
    color: white;
    background-repeat: repeat
  }
  .jumbotron {
  min-height: 600px; 
}
  
</style>
