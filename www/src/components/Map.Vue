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
      debugger
      if (this.name == "destination") {
        this.markers = this.destinations
      } else if (this.name == "todos") {
        markers = this.todos
      }
      this.markers.forEach(mark => {
        centerLat += mark.latitude
        centerLong += mark.longitude
      })

      const element = document.getElementById(this.mapName)
      const options = {
        zoom: 14,
        center: new google.maps.LatLng(centerLat / this.destinations.length, centerLong / this.destinations.length)
      }
      const map = new google.maps.Map(element, options);

      this.markers.forEach((coord) => {
        const position = new google.maps.LatLng(coord.latitude, coord.longitude);
        const marker = new google.maps.Marker({
          position,
          map
        });

        map.fitBounds(bounds.extend(position))
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
        console.log(coords)
        return coords
      }
    },
    methods: {}
  }

</script>

<style>
  .google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>