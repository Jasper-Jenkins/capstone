<template>
  <div class="home">
    <!-- <h1>/test</h1> -->
    <div class="container-fluid jumbotron bghome">

      
    
  <div class="textcolor mgmenu">
          <div class="row justify-content-center bgmenu">
      
            
            <div class="col-3 justify-content-center">
              <create-trip></create-trip>
              </div>

            <div class="col-3">
                <h4>Select Existing Trip</h4>
                <select v-model="trip">
                    <option disabled value=''>Add Destination to Trip: </option>
                    <option v-for="trip in trips" :key="trip._id" :value="trip">{{trip.title}}</option>
                  </select>
                  </div>
               
            <div class="col-3 mt-2 justify-content-center">
                <form @submit.prevent="getResults">
                  <input type="text" name="destination" id="destination" placeholder=" Where To?" v-model="destination.title">
                  <button class="btn btn-primary btn-success btn-sm" type="submit">Search</button>
                </form>
                </div>
             
              
              </div>
    </div>





      <!-- EVERYTHING BELOW IS THE SEARCH RESULT LAYOUT -->
      <div class="row">
        <div class="col-12 mt-2">
          <h4>Looking for destination ideas? Here are some ideas from other travelers.</h4>
          <h4>Add new destinations below! </h4>
        </div>
      </div>

      <!-- USER RESULTS -->
        <div class="col userResults text-center" v-for="userResult in userResults" :key="userResult._id">=
          <img :src="userResult.photo" alt="">
          <a @click="selectActiveDest(userResult)">
            <strong>{{userResult.title}}</strong>
          </a>
        </div>

        
      
      <!-- THE DIV BELOW IS END OF CARD -->
      </div>


      <!-- GOOGLE RESULTS -->
      <div class="row">
        <div class="col-12 mt-2">
        </div>
        <div class="col googleResults text-center" v-for="result in apiResults" :key="result._id">
          <img :src="result.photo" alt="">
          <strong>{{result.name}}</strong>
          <!-- <strong>{{result.description}}</strong> // default hardcode != provdided by google || user
          <strong>{{place.id_reviews}}</strong> -->
          <!-- then a button, modal pop up google map for location -->
          <!-- <select v-model="trip">
            <option disabled value=''>Add Destination to Trip: </option>
            <option v-for="trip in trips" :key="trip._id" :value="trip">{{trip.title}}</option>
          </select> -->
          <button class="btn btn-primary btn-success btn-sm" @click="addDestination(result)" v-if="trips.length != 0">Add To Trip</button>
          <mytrip v-if="trips.length == 0"></mytrip>
        </div>
      </div>

    </div>
  </div>
</template>









<script>
  import router from "../router";
  import destination from "./Destination";
  import mytrip from "./MyTrip";
  import createTrip from "./CreateTrip"

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
      mytrip,
      createTrip
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
      this.$store.dispatch('clearResults')
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
.textcolor{
  color: black;
}

.card {
  background-color: rgba(248, 248, 248, 0.795);
  color: black;
}
.bghome {
  background: url(../assets/tresting.jpg);
  background-repeat: no-repeat;
} 
.jumbotron {
  min-height: 600px; 
}
.userResults {
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    border: 1px solid black;
    margin: 5px;
    padding: 10px;
    /* float: left; */
}
.googleResults {
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    border: 1px solid black;
    margin: 5px;
    padding: 10px;
    /* float: left; */
}

.userResults img {
    height: 100px;
    width: auto;
    /* float: right; */
}

.googleResults img {
    height: 100px;
    width: auto;
    /* float: right; */
}

.bgmenu {
  background: rgba(248, 248, 248, 0.815);
  margin-top: 10em;
  margin-bottom: 45em;
}

/* h1,h2 {
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
} */
  /* select active destination */
</style>

<!-- Image Gallery Link https://www.w3schools.com/css/css_image_gallery.asp -->