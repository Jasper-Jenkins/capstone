 <template>
   <div class="add-destination">
    <div>
      <h3>Destinations</h3>
      <button @click="toggleCreate">+</button>
    </div>
    <div v-if="toggleForm">
        <form v-on:submit.prevent="addDestination" class="form">
          <input class="input" type="text" name="title" placeholder=" title" id="email" v-model="trip.title">
          <input class="input" type="text" name="description" placeholder=" description" id="name" v-model="trip.description">
          <button class="btn btn-primary btn-success" type="submit">Add</button>
        </form>
    </div>
   </div>
 </template>
 
 <script>
export default {
  name: "addDestination",
  data() {
    return {
      toggleForm: false
    };
  },
  computed: {},
  methods: {
    toggleCreate() {
      this.toggleForm = !this.toggleForm;
    }
  }
};
</script>
 
 <style>
</style>
 