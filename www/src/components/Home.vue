<template>
  <div class="home">
    <!-- <h1>/test</h1> -->
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <mytrip></mytrip>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <form @submit.prevent="getResults">
            <input type="text" name="destination" id="destination" placeholder="Enter destination" v-model="destination.title">
            <button type="submit">Find your slice of heaven</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
         <h4> Looking for destination ideas? Here are some ideas from other travelers.</h4>
        </div>
        <div class="col userResults text-center" v-for="userResult in userResults" :key="userResult._id">
          
          <a @click="selectActiveDest(userResult)"> <img :src="userResult.photo" alt=""> <strong>{{userResult.title}}</strong></a>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
        <h4>Find a destination for your trip on the web!</h4>
        </div>
        <div class="col googleResults text-center" v-for="result in apiResults" :key="result._id">
          <img :src="result.photo" alt="">
          <strong>{{result.name}}</strong> 
          
            <select v-model="trip">
              <option disabled value=''>Add Destination to Trip: </option>
              <option v-for="trip in trips" :key="trip._id" :value="trip">{{trip.title}}</option>
            </select>
         
          <button @click="addDestination(result)">+</button>
        </div>      
      </div>

   </div>
  </div>
</template>

<script>
import router from "../router";
import destination from "./Destination";
import mytrip from "./MyTrip";

export default {
  name: "Home",

  data() {
    return {
      destination: {
        title: ""
      },
      trip: {}
    };
  },
  components: {
    destination,
    mytrip
  },
  computed: {
    userResults() {
      return this.$store.state.userResults;
    },
    apiResults() {
      return this.$store.state.apiResults;
    },
    trips() {
      var trips = this.$store.state.userTrips;
      console.log(trips, "this trips");
      return trips;
    }
  },

  mounted() {
    if (!this.$store.state.user._id) {
      // if no user id kick to the Login page
      router.push({ name: "User" });
    }
    this.$store.dispatch("getUsersTrips");
  },
  methods: {
    getResults() {
      console.log(this.destination);
      this.$store.dispatch("findDestination", this.destination.title); // incomplete only has a title at the moment
      this.title = "";
    },
    addDestination(result) {
      this.$store.dispatch("selectActiveTrip", this.trip);
      this.$store.dispatch("addDestination", result);
    },
    selectActiveDest(userResult) {
      this.$store.dispatch("selectActiveDest", userResult);
      this.$router.push("Destination");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
.userResults {
background-color: lightseagreen;
border: 1px solid black;
margin:5px;
}
.userResults img{
  height:100px;
  width:auto;
}
.googleResults {
background-color: lightseagreen;
border: 1px solid black;
margin:5px;
}
.googleResults img {
  height: 100px;
  width: auto;
}
</style>