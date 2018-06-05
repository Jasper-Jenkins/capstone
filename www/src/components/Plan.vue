<template>
  <div class="plan-trip">
    <div class="create-trip" v-if="!trip._id">
      <form v-on:submit.prevent="createTrip" class="form">
        <input class="input" type="text" name="title" placeholder=" title" id="email" v-model="trip.title">
        <input class="input" type="text" name="description" placeholder=" description" id="name" v-model="trip.description">
        <button class="btn btn-primary btn-success" type="submit">Create</button>
      </form>
    </div>
    <div v-if="trip._id">
      <h2>{{trip.title}}</h2>
      <h4>{{trip.description}}</h4>
    </div>
    <div>
      <add-destination></add-destination>
    </div>
  </div>
</template>

<script>
import addDestination from "./AddDestination";
export default {
  name: "Plan",
  components: {
    addDestination
  },
  data() {
    return {
      trip: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    trip() {
      return this.$store.state.activeTrip;
    }
  },
  methods: {
    createTrip() {
      this.$store.dispatch("createTrip", this.trip);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
