<template>
  <div class="create-trip">
    <button class="btn btn-primary btn-success" data-toggle="modal" data-target="#createTripModal" @click="checkLogin">Start New Trip</button>
    <div class="modal fade" id="createTripModal" tabindex="-1" role="dialog" aria-labelledby="createTripModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createTripModalTitle">Create a Trip!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="createTrip" class="form bgform">
              <input class="input" type="text" name="title" placeholder=" Title" id="email" v-model="trip.title">
              <input class="input mt-2" type="text" name="description" placeholder=" Description" id="name" v-model="trip.description">
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button v-if="trip.title.length > 0" class="btn btn-primary btn-primary" data-dismiss="modal" @click="addDestination(currentDest)">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'CreateTrip',
    data() {
      return {
        trip: {
          title: "",
          description: ""
        },
        toggleForm: false
      }
    },
    mounted() {
    },
    computed: {},
    methods: {
      createTrip() {
        this.$store.dispatch("createTrip", this.trip);
        this.toggleForm = !this.toggleForm
      },
      checkLogin() {
        if (!this.$store.state.userModule.user._id) {
          this.$router.push({ name: "User" }); //
        }
      },
    }
  }

</script>

<style scoped>
</style>