<template>
  <div class="trip">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col add-destination mb-2">
          <add-destination></add-destination>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center mb-5">
          <google-map name="destination" :coords="destinations"></google-map>
        </div>
      </div>
      <div class="row grid mt-2">
        <div class="col-3 grid-item" v-for="destination in destinations" :key="destination._id">
          <div class="result">
              <edit-destination v-on:setDest="setDest" :destination="destination"></edit-destination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import addDestination from './AddDestination'
  import editDestination from "./EditDestination"
  import googleMap from "./Map"

  export default {
    name: 'Trip',
    mounted() {
      this.$store.dispatch('clearResults')
      this.masonry(false)
    },
    components: {
      addDestination,
      editDestination,
      googleMap
    },
    data() {
      return {

      }
    },
    computed: {
      destinations() {
        return this.$store.state.destModule.destinations
      }
    },
    watch: {
      destinations: function () {
        this.$nextTick(() => {
          setTimeout(() => {
            this.masonry(true);
          }, 500);
          setTimeout(() => {
            this.masonry(true);
          }, 3000)
        });
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
      },
      setDest(dest) {
        var index = this.destinations.findIndex(d => {
          return d._id == dest._id
        })
        this.destinations.splice(index, 1, dest);
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
  }


</script>

<style scoped>
  .trip {
    background-image: url(../assets/travel2.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .add-destination {
    background-color: rgba(247, 247, 247, 0.589);
  }

  .card-columns {
    display: inline-block;
    column-count: 4;
  }

  .user-destinations {
    background-color: rgba(247, 247, 247, 0.589);
  }

  .dest-card {
    margin: 3vh;
  }

  .grid-item {
    width: 33%;
  }
</style>