<template>
  <div class="edit-trip mb-2">
    <div class="card-body">
      <router-link @click.native="selectActiveTrip(trip)" :to="{ name: 'Trip', params: { id: trip._id }}">
        <h2 class="card-title">{{trip.title}}</h2>
        <p class="card-text">{{trip.description}}</p>
      </router-link>
      <div class="mb-2">
        <button class="btn btn-success" @click="toggleEdit(trip)">Edit</button>
        <form v-on:submit.prevent="editTrip(trip)" class="form bgform" v-if="editBool">
          <input class="input" type="text" name="title" placeholder=" Title" id="title" v-model="trip.title">
          <input class="input mt-2" type="text" name="description" placeholder=" Description" id="name" v-model="trip.description">
          <button class="btn btn-primary btn-success mb-2 mt-2" type="submit">Create</button>
        </form>
        <button type="button" class="btn btn-danger" @click="deleteTrip(trip)">Cancel Trip</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'edit trip',
    props: {
      trip: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        editBool: false,
        trip: {
          title: '',
          description: '',
          author: '',
          userId: ''
        }
      }
    },
    computed: {},
    methods: {
      selectActiveTrip(trip) {
        this.$store.dispatch('selectActiveTrip', trip)
      },
      deleteTrip(trip) {
        this.$store.dispatch('deleteTrip', trip)
      },
      editTrip(trip) {
        var tripEdit = {
          title: trip.title,
          description: trip.description,
          author: trip.author,
          userId: trip.userId,
          _id: trip._id
        }
        this.$store.dispatch("editTrip", tripEdit);
        this.editBool = !this.editBool
      },
      toggleEdit(trip) {
        this.editBool = !this.editBool
        this.trip = {
          title: trip.title,
          description: trip.description,
          author: trip.author,
          userId: trip.userId,
          _id: trip._id
        }
      }
    }
  }

</script>

<style>
</style>