<template>
  <div class="destination">

    <div class="row">
      <div class="col-12">
        <div class="top-bar">
          <div>
            <h2>{{activeDest.title}}</h2>
            <img :src="activeDest.photo" alt="">
            <p>Author: {{activeDest.author}}</p>
          </div>
          <select v-model="selectTrip">
            <option hidden value='Add Destination to Trip: '>Add Destination to Trip: </option>
            <option v-for="trip in trips" :key="trip._id" :value="trip">{{trip.title}}</option>
          </select>
          <button @click="addDestination(activeDest)" class="btn btn-success">Add destination to trip</button>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-around mt-3">
      <div class="col-3 todo-card card" v-for="(todo, todoIndex) in todos" :key="todo._id">
        <div v-if="todo.gallery.length > 0">
          <carousel :gallery="todo.gallery"></carousel>
        </div>
        <h4>{{todo.title}}</h4>
        <h5>{{todo.description}}</h5>
        <p>Categories: </p>
        <div class="d-flex flex-row flex-wrap">
          <p v-for="(category, i) in todo.categories" class="ml-2">{{category}}
            <span v-if="i < todo.categories.length - 1">,</span>
          </p>
        </div>
        <p>Author: {{todo.author}}</p>
        <comment :todo="todo"></comment>
      </div>
    </div>
    <!-- <router-link :to="{name: 'Home'}">Go Home</router-link> -->
  </div>
</template>

<script>
  import Comment from "./Comment"
  import carousel from "./Carousel"

  export default {
    name: 'Destination',
    components: {
      Comment,
      carousel
    },
    data() {
      return {
        destination: {},
        selectTrip: {}
      }
    },
    mounted() {
      if (!this.$store.state.userModule.user._id) {
        // if no user id kick to the Login page
        this.$router.push({ name: "User" }); //
      }
    },
    computed: {
      activeDest() {
        return this.$store.state.destModule.activeDest
      },
      trips() {
        return this.$store.state.tripModule.userTrips
      },
      todos() {
        return this.$store.state.todoModule.userTodos
      }

    },
    methods: {
      addDestination(result) {
        this.$store.dispatch('selectActiveTrip', this.selectTrip)
        this.$store.dispatch('addDestination', result)
        alert("Destination added to your trip")
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .destination {
    background-image: url(../assets/7BMcmF.jpg);
    min-height: 100vh;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .todo-card {
    margin: 10px;
    border: 1px solid black;
    padding: 5px;
    box-shadow: 5px 5px rgb(43, 42, 42);
  }

  .top-bar {
    width: 60%;
    background-color: white;
    margin: 3vh auto;
    padding: 5px;
    box-shadow: 5px 5px 5px rgb(43, 42, 42);
  }
</style>