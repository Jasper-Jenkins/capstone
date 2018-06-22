<template>
  <div class="trip jumbotron">
    <div class="container-fluid">
      <div class="row justify-content-center mb-2">
        <div class="col-9 toDo">
          <users-destinations></users-destinations>
        </div> 
      </div>
      <div class="row justify-content-center">
        <div class="col-9 add-destination">
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

 .trip {
    background-image: url(../assets/travel2.jpg);
  }

.add-destination {
    background-color: lightcoral;
  }
</style>