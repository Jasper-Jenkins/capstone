<template>
  <div class="search-destinations">
    <div class="result text-center" v-for="result in apiResults" :key="result._id">
      <a @click="addDestination(result)">
        <strong>{{result.name}}</strong>
        <span>- {{result.formatted_address}} </span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {

      }
    },
    computed: {
      apiResults() {
        return this.$store.state.apiResults
      },
    },
    methods: {
      addDestination(result) {
        this.$store.dispatch('addDestination', result)
      }
    }
  }

</script>

<style>
  .result {
    background: white;
  }
</style>