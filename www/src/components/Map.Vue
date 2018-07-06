<template>
  <div class="map">
    <template v-if="destinations.length > 0">
      <div class="google-map" :id="mapName"></div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'map',
    props: {
      name: {
        type: String,
        required: true
      }
    },
    mounted() {
      const bounds = new google.maps.LatLngBounds();
      
      var centerLat = 0
      var centerLong = 0
      if (this.name == "destination") {
        this.markers = this.destinations
      } else if (this.name == "todos") {
        this.markers = this.todos
      }
      // this.markers.forEach(mark => {
      //   centerLat += mark.latitude
      //   centerLong += mark.longitude
      // })

      const element = document.getElementById(this.mapName)
      // const options = {
      //   zoom: 3,
      //   center: new google.maps.LatLng(centerLat / this.destinations.length, centerLong / this.destinations.length)
      // }
      const map = new google.maps.Map(element);

      this.markers.forEach((coord) => {
        const position = new google.maps.LatLng(coord.latitude, coord.longitude);
        const marker = new google.maps.Marker({
          position,
          map
        });
        
        map.setCenter(bounds.getCenter())
        map.fitBounds(bounds.extend(position))
        map.setZoom(10)
        console.log(zoom)
      });
    },
    data() {
      return {
        mapName: this.name + "-map",
        markers: []
      }
    },
    computed: {
      destinations() {
        var coords = []
        var dests = this.$store.state.destinations.forEach(dest => {
          coords.push({
            latitude: dest.lat,
            longitude: dest.long
          })
        });
        return coords
      },
      todos() {
        var coords = []
        var todos = this.$store.state.userTodos.forEach(todo => {
          coords.push({
            latitude: todo.lat,
            longitude: todo.long
          })
        });
        return coords
      }
    },
    methods: {}
  }

</script>

<style>
  .google-map {
    width: 80%;
    height: 50vh;
    margin: 0 auto;
    background: gray;
  }
</style>