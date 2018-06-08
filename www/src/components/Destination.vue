<template>
  <div class="destination">
    <div>
      {{destinationResults.title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Destination',
  data () {
    return {
      destination:{

      }
    }
  },
  computed:{
    destinationResults(){
      return this.$store.state.activeDest
    },
    
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
