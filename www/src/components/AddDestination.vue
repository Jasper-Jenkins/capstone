<template>
  <div class="add-destination tracker">
      <div class="row">
        <div class="col">
          <h1> {{currentTrip.title}}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div>Add Destination Component</div>
        </div>
        <div class="col">

          <div>
            <button @click="toggleCreate">+</button>
          </div>
          <div v-if="toggleForm">
            <form v-on:submit.prevent="getDestination" class="form">
              <input class="input" type="text" name="title" placeholder=" Where to?" id="email" v-model="query">
              <button class="btn btn-primary btn-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col addDestination text-center" v-for="result in apiResults" :key="result._id">
          <div class="width-holder"></div>
          <strong>{{result.name}}</strong>
          <span>- {{result.formatted_address}} </span>
          <button @click="addDestination(result)">+</button>
        </div>
      </div>

  </div>
</template>

<script>
  import usersDestinations from "./UserDestinations"
  export default {
    name: "addDestination",
    mounted() {
      this.$store.dispatch('getTripDestinations', this.$route.params.id)
    },
    components: {
      usersDestinations
    },
    data() {
      return {
        toggleForm: false,
        query: ''
      };
    },
    computed: {
      apiResults() {
        return this.$store.state.apiResults
      },
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
      },
      addDestination(result) {
        this.$store.dispatch('addDestination', result)
      }
    }
  };
</script>

<style scoped>
  .addDestination {
    border: 1px solid black;
    background-color: turquoise;
    margin: 5px;

  }

  .width-holder {
    width: 300px;
  }
</style>