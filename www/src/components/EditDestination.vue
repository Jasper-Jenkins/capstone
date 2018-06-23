<template>
  <div class="edit-destination card">
    <img class="card-img-top" :src="destination.photo" alt="Card image cap">
    <div class="card-body">
      <router-link @click.native="selectActiveDest(destination)" :to="{ name: 'myDestination', params: { id: destination._id }}"
        :key="destination._id">
        <p>
          <h5 class="card-title">{{destination.title}}</h5>
        </p>
      </router-link>
    </div>
    <div class="mb-2">
      <button class="btn btn-danger" @click="toggleEdit">Edit</button>
    </div>
    <div class="mb-2">
      <button type="button" class="btn btn-danger" @click="deleteDest(destination)">Cancel Destination</button>
    </div>
    <div class="mb-2">
      <button type="button" class="btn btn-danger" @click="publishDest(destination)">Publish Destination</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'edit-destination',
    props: {
      destination: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.edit = {
        title: this.destination.title,
        photo: this.destination.photo,
        place_id: this.destination.place_id,
        published: this.destination.published,
        tripId: this.destination.tripId,
        userId: this.destination.userId,
        lat: this.destination.lat,
        long: this.destination.long
      }
    },
    data() {
      return {
        editBool: false,
        edit: {
          title: "",
          photo: "",
          place_id: "",
          published: "",
          tripId: "",
          userId: "",
          lat: "",
          long: ""
        }
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
      toggleEdit() {
        this.editBool = !this.editBool
      }
    }
  }

</script>

<style>
</style>