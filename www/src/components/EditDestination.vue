<template>
  <div class="edit-destination">
    <div class="card-body">
      <router-link @click.native="selectActiveDest(destination)" :to="{ name: 'myDestination', params: { id: destination._id }}"
        :key="destination._id">
        <p>
          <h5>{{destination.title}}</h5>
        </p>
        <img :src="destination.photo" style="min-width:25em" alt="">
      </router-link>
    </div>
    <div class="mb-2">
      <button class="btn btn-danger" @click="editDest(destination)">Edit</button>
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

<style>
</style>