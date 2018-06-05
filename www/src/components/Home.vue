<template>
  <div class="home">
    <!-- <h1>/test</h1> -->
     <div>
       <form @submit.prevent="findDestination">
            <input type="text" name="destination" id="destination" placeholder="Enter destination" v-model="destination.title">
       
            <button type="submit">Find your slice of heaven</button>
        </form>    
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
      }
    };
  },
  components: {
    destination
  },
  mounted() {
    if (!this.$store.state.user._id) {
      // if no user id kick to the Login page
      router.push({ name: "User" });
    }
  },
  methods: {
    findDestination() {
      console.log(this.destination)
      this.$store.dispatch("findDestination", this.destination.title); // incomplete only has a title at the moment
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
