<template>
  <div class="current-todos">
    <!-- This will be the display for a users current todos at each destination -->
    <div>ToDos Component</div>
    <p>Fun activities for your destination!</p>
    <div v-for="todo in todos" :key="todo._id">
      {{todo.title}}
      {{todo.description}}
      <div id="toggleSwitches" class="carousel slide formatCarousel" data-ride="carousel" data-interval="1000">  
        <ol class="carousel-indicators">
          <li v-for="(img, index) in todo.gallery" data-target="#toggleSwitches" v-bind:data-slide-to="index" v-bind:class="{active: index==0}"></li>
        </ol>
        <div class="carousel-inner">
          <div v-for="(img, index) in todo.gallery" v-bind:class="{active: index==0, 'carousel-item': true} ">
              <img class="d-block w-100 img-fluid" :src="img" alt="">
          </div>
        </div>
        <a class="carousel-control-prev" href="#toggleSwitches" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#toggleSwitches" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
       <button @click="toggleEdit">Edit</button>
          <form v-on:submit.prevent="editTodo(todo)" class="form" v-if="toggle">
            <input class="input" type="text" name="comment" placeholder=" comment" id="comment" v-model="todo.title">
            <input class="input" type="text" name="description" placeholder="description" id="descroption" v-model="todo.description">
            <input class="input" type="url" name="image" placeholder=" image" id="image" v-model="img">
            <button class="btn btn-primary btn-success" type="submit">Make Change</button>
          </form>
      </div>
      <comment :todo="todo"></comment>
      
      <button @click="deleteTodo(todo)">Delete todo</button>
    </div>
  </div>
</template>

<script>
  import Comment from "./Comment"

  export default {
    name: 'Todos',
    components: {
      Comment
    },
    data() {
      return {
        isActive: true,
        toggle: false,
        img: '',
        todo:{
          title:"",
          description:"",
          gallery: [],
        }
      }
    },
    mounted() {
      this.$store.dispatch('getDestTodos', this.$store.state.activeDest._id)
    },
    computed: {
      todos() {
        var todos = this.$store.state.userTodos
        console.log(this.$store.state.userTodos, "todos are computing and should be empty for now")
        return todos
      }
    },
    methods: {
      deleteTodo(todo) {
        this.$store.dispatch('deleteTodo', todo)
      },
      editTodo(todo){
        todo.gallery.unshift(this.img)
        debugger
        this.$store.dispatch('editTodo', todo)
        // this.todo.img = ''
      },
      toggleEdit(){
        this.toggle = !this.toggle;
      }
    }
  }

</script>

<style scoped>
.formatCarousel{
   width: 200px;
   height:auto;
 }
</style>