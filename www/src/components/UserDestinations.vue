<template>
  <div class="user-destinations tracking">
    <!-- <h2>Destinations</h2> -->
    <!-- <h2>Destinations</h2> -->
    <div class="row justify-content-center">
        <div class="card" v-for="destination in destinations" :key="destination._id">
          
                <img class="card-img-top" :src="destination.photo" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">{{destination.title}}</h5> 
                  <router-link @click.native="selectActiveDest(destination)" :to="{ name: 'myDestination', params: { id: destination._id }}">
                      <!-- <img :src="destination.photo" style="min-width:25em" alt=""> -->
                   </router-link>

                    <!-- <img :src="destination.photo" style="max-width:250em" alt="">  -->
                <!-- </div> -->
                </router-link>
                <button type="button" class="btn btn-danger" @click="deleteDest(destination)">Cancel Destination</button>
                <!-- <div class="mb-2">
                  <button type="button" class="btn btn-danger" @click="deleteDest(destination)">Cancel Destination</button> -->
                </div>
              </div>
            </div>
            <!-- <div class="mb-2 mt-2"><button type="button" class="btn btn-danger" @click="deleteDest(destination)">Cancel Destination</button></div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>

        <!-- <h8>UserDestinations component</h8>
        <h2>Destinations</h2>
        <div class="row justify-content-center">
          <div class="wrapborder mt-2 col-md-3 ml-2 mt-3 card" style="width: 18rem" v-for="destination in destinations" :key="destination._id">
            <edit-destination :destination="destination"></edit-destination>
          </div>
        </div> -->
</template>

<script>
  import editDestination from "./EditDestination"
  export default {
    name: 'userDestinations',
    components: {
      editDestination
    },
    data() {
      return {

      }
    },
    computed: {
      destinations() {
        return this.$store.state.destinations
      }
    },
    methods: {
      selectActiveDest(dest) {
        this.$store.dispatch('selectActiveDest', dest)
      },
      deleteDest(dest) {
        this.$store.dispatch('deleteDest', dest)
      },
      publishDest(dest) {
        dest.published = !dest.published;
        this.$store.dispatch("editDest", dest)
      }
    }
  }

</script>

<style scoped>
  /* .tracking {
    background-color: rgba(247, 247, 247, 0.589);
  } */

  /* .wrapborder {
    border: 5px solid rgba(145, 145, 165, 0.459);
  } */
</style>