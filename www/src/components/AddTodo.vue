<template>
  <div class="add-tado">
    <div class="find">
      
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addTado',
    data() {
      return {

      }
    },
    computed: {
      categories() {
        return this.$store.state.categories
      }
    },
    methods: {}
  }

</script>

<style>


</style>
