<template>
  <div class="trip">
    <div class="container-fluid">

      <div class="row justify-content-center">
        <div class="col add-destination mb-2">
          <add-destination></add-destination>
        </div>       
      </div>

      <div class="row">
        <!-- <div class="col toDo"> -->
            <div class="card-columns">
          <users-destinations></users-destinations>
        <!-- </div> -->
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
  /* .toDo {
  /* background-color:khaki; */
/* } */ 

 .trip {
    background-image: url(../assets/travel2.jpg);
  }

.add-destination {
    background-color: rgba(247, 247, 247, 0.589);
  }

.card-columns {
  /* break-inside: avoid; */
    display: inline-block;
    column-count: 4;
    /* column-gap: 0; */
  }
  .user-destinations{
    background-color: rgba(247, 247, 247, 0.589);
  }
</style>