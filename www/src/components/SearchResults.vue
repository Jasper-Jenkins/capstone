<template>
  <div class="search-destinations">
    <div class="result text-center" v-for="result in apiResults" :key="result._id">
      <a @click="addDestination(result)">
        <p class="result-name"><strong>{{result.name}}</strong> - {{result.formatted_address}}</p>
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
    mounted() {
     // this.$store.dispatch('authenticate')
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
    width: 100%;
    border: 2px black;
  }

  .result :hover {
    color: white;
    background: rgb(106, 106, 243);
    cursor: pointer;
  }

  .search-destinations {
    border: 1px solid;
  }

  .result-name {
    margin: 0;
  }
</style>