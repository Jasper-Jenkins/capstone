<template>
  <div class="add-destination tracker">
    <div class="row">
      <div class="col">
        <h1>Current Trip</h1>
        <h1>"{{currentTrip.title}}"</h1>
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
    <div class="results-container">
      <div class="row results">
        <div class="col-12">
          <search-results></search-results>
        </div>
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
    display: inline;
  }
<<<<<<< HEAD

=======
  .results-container {
    width: 100%;
    margin: auto;
  }
>>>>>>> b92e3c2c225dd957d143d73c26a04d7c0402f121
</style>