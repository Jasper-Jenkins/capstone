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
        return this.$store.state.userModule.userResults;
      },
      apiResults() {
        return this.$store.state.destModule.apiResults;
      },
      trips() {
        var trips = this.$store.state.userModule.userTrips;
        return trips;
      },
      currentDest() {
        return this.$store.state.destModule.activeDest
      }
    },
    mounted() {
      debugger
      if (!this.$store.state.userModule.user._id) {
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
      },
      selectDest(dest) {
        this.$store.dispatch("selectActiveDest", dest)
      }
    }
  };
</script>



<template>
  <div class="home">
    <!-- <h1>/test</h1> -->

    <section class="search vertical-center jumbotron bghome">
      <div class="container-fluid">
        <div class="textcolor mgmenu">
          <div class="row justify-content-center mx-auto bgmenu">
            <!-- create trip-->
            <div class="col-sm-2 justify-content-center">
              <create-trip></create-trip>
            </div>

            <div class="col-sm-2 mt-2 mb-2">
              <h5>Select Existing Trip</h5>
            
            </div>

            <div class="col-sm-2 mt-2 ml-4">
              <form @submit.prevent="getResults">
                <input type="text" name="destination" id="destination" placeholder=" Where To?" v-model="destination.title">
                <button class="btn btn-primary btn-success btn-sm mt-2 mb-2" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
        <!-- EVERYTHING BELOW IS THE SEARCH RESULT LAYOUT -->
        <!-- USER RESULTS -->
        <div class="rowing ur mt-2">

          <div class="column userResults" v-for="userResult in userResults" :key="userResult._id">
            <img :src="userResult.photo" alt="">
            <div class="test">
              <a @click="selectActiveDest(userResult)">
                <strong>{{userResult.title}}</strong>
              </a>
            </div>
            <p>Author: {{userResult.author}}</p>
          </div>
        </div>

        <!-- GOOGLE RESULTS -->
        <div class="rowing gr mt-2">
          <div class="column googleResults d-flex flex-row flex-wrap">
            <div v-for="result in apiResults" :key="result._id">
              <img :src="result.photo" alt="">
              <div class="test">
                <strong>{{result.name}}</strong>
                <button class="btn btn-primary btn-success btn-sm"  type="button" data-toggle="modal" data-target="#destModal" @click="selectDest(result)">Add To Trip</button>
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


      </div>
    </section>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .rowing {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
  }

  column {
    flex: 25%;
    max-width: 25%;
    padding: 0 4px;
  }

  @media screen and (max-width: 800px) {
    .column {
      flex: 50%;
      max-width: 50%;
    }
  }

  @media screen and (max-width: 600px) {
    .column {
      flex: 100%;
      max-width: 100%;
    }
  }

  .userResults img {
    margin-top: 8px;
    vertical-align: top;
    float: top;
  }

  .googleResults img {
    margin-top: 8px;
    vertical-align: middle;
    display: inline-block;
  }

  .bghome {
    background: url(../assets/tresting.jpg);
    margin-top: 2em;
  }

  .textcolor {
    color: black;
  }

  .jumbotron {
    min-height: 600px;
  }


  .bgmenu {
    background: rgba(247, 247, 247, 0.589);
    border-color: rgba(0, 0, 0, 0.479);
    border-width: 0.2mm;
    border-style: solid;
  }

  .results {
    background: url(../assets/tresting.jpg);
  }
</style>