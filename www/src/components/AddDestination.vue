<template>
  <div class="add-destination tracker">
    <div class="row">
      <div class="col-12">
        <h1> {{currentTrip.title}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div>Add Destination Component</div>
      </div>
      <div class="col mb-2">
        <div>
          <button @click="toggleCreate">Add More Destinations</button>
        </div>
        <div v-if="toggleForm">
          <form v-on:submit.prevent="getDestination" class="form">
            <input class="input" type="text" name="title" placeholder=" Where to?" id="email" v-model="query">
            <button class="btn btn-primary btn-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
    <div class="results-container row d-flex justify-content-center">
        <div class="results col-12">
            <search-results></search-results>
        </div>
    </div>
  </div>
</template>

<script>
  import searchResults from "./SearchResults"
  import usersDestinations from "./UserDestinations"
  export default {
    name: "addDestination",
    mounted() {
      this.$store.dispatch('getTripDestinations', this.$route.params.id)
    },
    components: {
      usersDestinations,
      searchResults
    },
    data() {
      return {
        toggleForm: false,
        query: ''
      };
    },
    computed: {
      currentTrip() {
        return this.$store.state.activeTrip
      }
    },
    methods: {
      toggleCreate() {
        this.toggleForm = !this.toggleForm;
      },
      getDestination() {
        this.$store.dispatch('findDestination', this.query)
      }
    }
  };
</script>

<style scoped>
  .results {
    z-index: 1;
    position: absolute;
    display: block;
    width: 30vh;
    border: 1px black;
  }
  .results-container {
    width: 100%;
    margin: auto;
  }
</style>