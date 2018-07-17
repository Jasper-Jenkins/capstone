<template>
  <div class="current-todos">
    <!-- This will be the display for a users current todos at each destination -->
    <div class="row">
      <div class="col-12">
        <google-map name="todos" :coords="todos"></google-map>
      </div>
    </div>
    <div class="row mt-3 d-flex justify-content-center">
      <div class="col-3 todo-card card" v-for="(todo, todoIndex) in todos" :key="todo._id">
        <div v-if="todo.gallery.length > 0">
          <carousel :gallery="todo.gallery"></carousel>
        </div>
        <h4>{{todo.title}}</h4>
        <h5>{{todo.description}}</h5>
        <p>Author: {{todo.author}}</p>
        <div class="card-btn d-flex flex-row">
          <button class="btn btn-success mr-1" type="button" data-toggle="modal" data-target="#editTodoModal" @click="selectTodo(todo)">Update</button>
          <button class="btn btn-danger ml-1" @click="deleteTodo(todo)">Remove</button>
        </div>
        <div class="modal fade" id="editTodoModal" tabindex="-1" role="dialog" aria-labelledby="editTodoModalTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editTodoModalTitle">Update Todo!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form v-on:submit.prevent="editTodo()" class="form d-flex flex-column">
                  <input class="input" type="text" name="comment" placeholder=" comment" id="comment" v-model="newTodo.title">
                  <input class="input" type="text" name="description" placeholder="description" id="descroption" v-model="newTodo.description">
                  <input class="input" type="url" name="image" placeholder=" image" id="image" v-model="img">
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button class="btn btn-primary btn-primary" data-dismiss="modal" @click="editTodo">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <comment :todo="todo"></comment>
      </div>
    </div>
  </div>
</template>

<script>
  import Comment from "./Comment"
  import googleMap from "./Map"
  import carousel from "./Carousel"

  export default {
    name: 'Todos',
    components: {
      Comment,
      googleMap,
      carousel
    },
    data() {
      return {
        isActive: true,
        toggle: false,
        img: '',
        newTodo: {}
      }
    },
    mounted() {
      if (!this.$store.state.userModule.user._id) {
        // if no user id kick to the Login page
        this.$router.push({ name: "User" }); //
      }
      this.$store.dispatch('getDestTodos', this.$store.state.destModule.activeDest._id)
    },
    computed: {
      todos() {
        return this.$store.state.todoModule.userTodos
      },
      currentTodo() {
        return this.$store.state.todoModule.activeTodo
      }
    },
    methods: {
      deleteTodo(todo) {
        this.$store.dispatch('deleteTodo', todo)
      },
      editTodo() {
        if (this.img.length > 0) {
          this.newTodo.gallery.unshift(this.img)
        }
        this.$store.dispatch('editTodo', this.newTodo)
      },
      toggleEdit() {
        this.toggle = !this.toggle;
      },
      selectTodo(todo) {
        this.$store.dispatch("selectTodo", todo)
        this.newTodo = todo
      }
    }
  }

</script>

<style scoped>
  .formatCarousel {
    width: 100%;
    margin: auto;
  }

  .todo-card {
    margin: 10px;
    border: 1px solid black;
    padding: 5px;
  }

  .card-btn {
    margin: auto;
  }
</style>