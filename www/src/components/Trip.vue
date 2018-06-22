<template>
  <div class="trip">
    <div class="container-fluid">
      <div class="row">
        <div class="col toDo">
          <users-destinations></users-destinations>
        </div> 
        <div class="col add-destination">
          <add-destination></add-destination>
        </div>       
      </div>
    </div>
  </div>
</template>

<script>
  import addDestination from './AddDestination'
  import usersDestinations from "./UserDestinations"

  export default {
    name: 'Trip',
    mounted() {
      this.$store.dispatch('clearResults')
    },
    components: {
      addDestination,
      usersDestinations
    },
    data() {
      return {

      }
    },
    computed: {
    },
    methods: {}
  }

</script>

<style scoped>
  .toDo {
  background-color:khaki;
}

.add-destination {
    background-color: lightcoral;
  }
</style>