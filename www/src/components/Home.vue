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
        trip: {},
        msnry: null
      };
    },
    components: {
      destination,
      mytrip,
      createTrip
    },
    watch: {
      apiResults: function () {
        this.$nextTick(() => {
          setTimeout(() => {
            this.masonry(true);
          }, 500);
          setTimeout(() => {
            this.masonry(true);
          }, 3000);
        });
      }
    },
    computed: {
      userResults() {
        return this.$store.state.destModule.userResults;
      },
      apiResults() {
        return this.$store.state.destModule.apiResults;
      },
      trips() {
        var trips = this.$store.state.tripModule.userTrips;
        return trips;
      },
      currentDest() {
        return this.$store.state.destModule.activeDest
      }
    },
    mounted() {
      if (!this.$store.state.userModule.user._id) {
        router.push({ name: "User" });
      }
      this.$store.dispatch("getUsersTrips");
      this.masonry(false)
    },
    methods: {
      getResults() {
        this.$store.dispatch("findDestination", this.destination.title)
        this.title = "";
      },
      addDestination(result) {
        this.$store.dispatch("selectActiveTrip", this.trip);
        this.$store.dispatch("addDestination", result);
      },
      selectActiveDest(userResult) {
        this.$store.dispatch("selectActiveDest", userResult);
        this.$router.push("Destination");
      },
      selectDest(dest) {
        this.$store.dispatch("selectActiveDest", dest)
      },
      masonry(rebuild) {
        if (!rebuild) {
          var elem = document.querySelector('.grid');
          this.msnry = new Masonry(elem, {
            itemSelector: '.grid-item',
            columnWidth: '.home',
            percentPosition: true,
            horizontalOrder: true
          });
          this.msnry = new Masonry('.grid', {
          });
        } else {
          this.msnry.reloadItems()
          this.msnry.layout()
        }
      }
    }
  };
</script>



<template>
  <div class="home">
    <!-- <h1>/test</h1> -->
    <div class="row d-flex justify-content-center">
      <!-- create trip-->
      <div class="topbar col-6 d-flex flex-row justify-content-around">
        <div class="topbar-items">
          <create-trip></create-trip>
        </div>

        <div class="topbar-items">
          <form @submit.prevent="getResults">
            <input type="text" name="destination" id="destination" placeholder=" Where To?" v-model="destination.title">
            <button class="btn btn-primary btn-success btn-sm mt-2 mb-2" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
    <!-- EVERYTHING BELOW IS THE SEARCH RESULT LAYOUT -->
    <!-- USER RESULTS -->
    <div class="grid mt-2">
      <div class="grid-item" v-for="userResult in userResults" :key="userResult._id">
        <div class="card result">
          <img :src="userResult.photo">
          <div class="test">
            <a @click="selectActiveDest(userResult)">
              <strong>{{userResult.title}}</strong>
            </a>
          </div>
          <p>Author: {{userResult.author}}</p>
          <button class="btn btn-success card-btn" @click="selectActiveDest(userResult)">View</button>
        </div>
      </div>


      <!-- GOOGLE RESULTS -->
      <div class="grid-item" v-for="result in apiResults" :key="result._id">
        <div class="card result">
          <img id="img" :src="result.photo">
          <strong>{{result.name}}</strong>
          <p>Provided by Google</p>
          <button class="btn btn-success card-btn" type="button" data-toggle="modal" data-target="#destModal" @click="selectDest(result)">Add To Trip</button>
          <div class="modal fade" id="destModal" tabindex="-1" role="dialog" aria-labelledby="destModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="destModalTitle">{{currentDest.name}}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h4>Select a Trip!</h4>
                  <select v-model="trip">
                    <option disabled value=''>Add Destination to Trip: </option>
                    <option v-for="t in trips" :key="t._id" :value="t">{{t.title}}</option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  <button v-if="trip._id" class="btn btn-primary btn-primary" data-dismiss="modal" @click="addDestination(currentDest)">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <mytrip v-if="trips.length == 0"></mytrip>
      </div>
    </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grid-item {
    width: 30%;
  }

  .result {
    padding: 5px;
    border: 2px solid black;
    margin: 5px;
  }

  .home {
    background-image: url(../assets/tresting.jpg);
    min-height: 100vh;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .topbar {
    width: 70%;
    background-color: white;
    border: 2px double gray;
    box-shadow: 5px 5px rgb(43, 42, 42);
    margin-top: 2vh; 
  }

  .topbar-items {
    margin: auto;
  }

  .card-btn {
    width: 20%;
    margin: auto;
  }
</style>