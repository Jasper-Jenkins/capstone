<template>
  <div class="create-trip">
    <button @click="newTrip">Start New Trip</button>
    <div class="create-trip" v-if="toggleForm">
      <form v-on:submit.prevent="createTrip" class="form">
        <input class="input" type="text" name="title" placeholder=" title" id="email" v-model="trip.title">
        <input class="input" type="text" name="description" placeholder=" description" id="name" v-model="trip.description">
        <button class="btn btn-primary btn-success" type="submit">Create</button>
      </form>
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
    computed: {},
    methods: {
      createTrip() {
        this.$store.dispatch("createTrip", this.trip);
        this.toggleForm = !this.toggleForm
      },
      newTrip() {
        this.toggleForm = !this.toggleForm
      }
    }
  }

</script>

<style>
</style>