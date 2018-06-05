 <template>
   <div class="add-destination">
    <div>
      <h3>Destinations</h3>
      <button @click="toggleCreate">+</button>
    </div>
    <div v-if="toggleForm">

    </div>
   </div>
 </template>
 
 <script>
   export default {
     name: '',
     data() {
       return {
        toggleForm: false
       }
     },
     computed: {},
     methods: {
       toggleCreate() {
         this.toggleForm =!this.toggleForm
       }
     }
   }
 
 </script>
 
 <style>
 
 
 </style>
 