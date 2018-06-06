<template>
  <div class="add-destination">
    <div>
      <h3>Destinations</h3>
      <button @click="toggleCreate">+</button>
    </div>
    <div v-if="toggleForm">
      <form v-on:submit.prevent="getDestination" class="form">
        <input class="input" type="text" name="title" placeholder=" Where to?" id="email" v-model="query">
        <button class="btn btn-primary btn-success" type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "addDestination",
    data() {
      return {
        toggleForm: false,
        query: ''
      };
    },
    computed: {
      apiResults() {
        return this.$store.state.apiResults
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

<style>
</style>