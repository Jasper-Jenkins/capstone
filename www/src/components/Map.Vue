<template>
  <div class="">
    <template v-if="coords.length > 0">
      <div class="google-map" :id="mapName"></div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'googleMap',
    props: {
      coords: {
        type: Array,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    mounted() {
      debugger
      this.buildMap()
    },
    data() {
      return {
        mapName: this.name + "-map",
        coordinates: this.coords,
        markers: [],
        bounds: null,
        map: null
      }
    },
    computed: {

    },
    methods: {
      buildMap() {
        this.bounds = new google.maps.LatLngBounds();
        const element = document.getElementById(this.mapName)
        debugger
        this.map = new google.maps.Map(element);
        this.coords.forEach((coord) => {
          const position = new google.maps.LatLng(coord.lat, coord.long);
          const marker = new google.maps.Marker({
            position,
            map: this.map
          });
          this.markers.push(marker)
          this.map.fitBounds(this.bounds.extend(position))
          
        });
        this.map.setCenter(this.bounds.getCenter())
        if (this.coords.length == 1) {
          debugger
          this.map.setZoom(10)
        }
      }
    },
    watch: {
      coords() {    
        this.buildMap()
      }
    }
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