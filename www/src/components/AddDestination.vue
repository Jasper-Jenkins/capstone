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
      <div class="col mb-2 search-box">
        <div>
          <button @click="toggleCreate">Add More Destinations</button>
        </div>
        <div class="d-flex flex-row justify-content-center" v-if="toggleForm">
          <div>
            <form v-on:submit.prevent="getDestination" class="form">
              <input class="input" type="text" name="title" placeholder=" Where to?" id="email" v-model="query">
            </form>
              <div class="results">
                <search-results></search-results>
              </div>
            </div>
          <button class="btn btn-primary btn-success submit-btn" @click="getDestination">Search</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import searchResults from "./SearchResults"

  export default {
    name: "addDestination",
    mounted() {
      this.$store.dispatch('getTripDestinations', this.$route.params.id)
    },
    components: {
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
    height: 50vh;
    overflow: auto;
  }

  .search-box {
    width: 100%;
  }

  input {
    width: 30vh;
  }
</style>