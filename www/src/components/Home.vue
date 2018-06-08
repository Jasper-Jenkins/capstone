<template>
  <div class="home">
    <!-- <h1>/test</h1> -->
    <div>
      <form @submit.prevent="getResults">
        <input type="text" name="destination" id="destination" placeholder="Enter destination" v-model="destination.title">
        <button type="submit">Find your slice of heaven</button>
      </form>
      <div>
        <p v-for="userResult in userResults" :key="userResult._id">
          <strong>{{userResult.name}}</strong> - {{userResult.formatted_address}}

          <!-- <button @click="addDestination(userResult)">+</button> -->
          <a @click="selectActiveDest(userResult)">
            {{userResult.title}}
          </a>
        </p>
      </div>
      <div>
        <p v-for="result in apiResults">
          <strong>{{result.name}}</strong> - {{result.formatted_address}}
          <select v-model="trip">
            <option disabled value=''>Add Destination to Trip: </option>
            <option v-for="trip in trips" :key="trip._id" :value="trip">{{trip.title}}</option>
          </select>
          <button @click="addDestination(result)">+</button>
        </p>
      </div>

      <!-- <button @click='logout'>Logout</button>      -->
      <!-- <ul>
    <li v-for="destination in destinations" :key="destination.id">
     <router-link :to="{name: 'Destination', params:{destinationId: destination._id}}">
       {{destination.title}}
      </router-link>
    </li>
  </ul> -->
      <!-- <ul>
    <li v-for="destination in destinations" :key="destination.id">
     <router-link :to="{name: 'Destination', params:{place_id: destination._id}}">
       {{destination.title}}
      </router-link>
 
    </li>
  </ul> -->
    </div>
  </div>
</template>

<script>
  import router from "../router";
  import destination from "./Destination";

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
      destination
    },
    computed: {
      userResults() {
        return this.$store.state.userResults
      },
      apiResults() {
        return this.$store.state.apiResults
      },
       trips() {
       
         var trips = this.$store.state.userTrips
         console.log(trips, "this trips")
        return trips
        },
    },

    mounted() {
      if (!this.$store.state.user._id) {
        // if no user id kick to the Login page
        router.push({ name: "User" });
      }
       this.$store.dispatch('getUsersTrips')
    },
    methods: {
      getResults() {
        console.log(this.destination)
        this.$store.dispatch("findDestination", this.destination.title); // incomplete only has a title at the moment
      },
      addDestination(result) {
        this.$store.dispatch('selectActiveTrip', this.trip)
        this.$store.dispatch('addDestination', result)
      },
      selectActiveDest(userResult) {
        this.$store.dispatch('selectActiveDest', userResult)
        this.$router.push('Destination')
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
</style>