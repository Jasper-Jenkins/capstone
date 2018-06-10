<template>
  <div class="my-trip">
    <div>First trip?  <button @click="newTrip">Click here</button> to begin your first trip</div>
    
    <div class="create-trip" v-if="toggleForm"> 
      <form v-on:submit.prevent="createTrip" class="form">
        <input class="input" type="text" name="title" placeholder=" title" id="email" v-model="trip.title">
        <input class="input" type="text" name="description" placeholder=" description" id="name" v-model="trip.description">
        <button class="btn btn-primary btn-success" type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
    name: 'myTrip',
    data() {
      return {
        trip: {
          title: "",
          description: ""
        },
        toggleForm: false
      }
    },
    computed: {
  
    },
    methods: {
      createTrip() {
        this.$store.dispatch("createTrip", this.trip);
        this.toggleForm = !this.toggleForm
      },
      newTrip() {
        this.toggleForm = !this.toggleForm
      },
    
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
