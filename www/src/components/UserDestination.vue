<template>
  <div class="user-destination">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h3>{{currentDest.title}}</h3>
          <p>Author: {{currentDest.author}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#todoModal">Create New Todo</button>
          <button @click="toggleAdd" class="btn btn-success">Add Todo</button>
          <div class="modal fade" id="todoModal" tabindex="-1" role="dialog" aria-labelledby="todoModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="todoModalTitle">Create a Todo!</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form v-on:submit.prevent="addTodo" class="form">
                    <input class="input" type="text" name="title" placeholder=" Title" id="title" v-model="todo.title">
                    <input class="input" type="text" name="description" placeholder=" Description" id="description" v-model="todo.description">
                  </form>
                  <div class="d-flex flex-row mt-3">
                    <select name="Category" class="form-control" v-model="category">
                      <option selected disabled>Select a Category</option>
                      <option v-for="category in categories" :value="category">{{category}}</option>
                    </select>
                    <button @click="addCatergory" class="btn btn-success">Add</button>
                  </div>
                  <div class="d-flex align-items-row mt-3">
                    <p class="ml-3" v-for="(cat, index) in todo.categories" style="color: blue;">{{cat}}
                      <a style="color: red;" @click="removeCategory(index)">x</a>
                    </p>
                  </div>
                  <div class="row">
                    <carousel class="col" v-if="todo.gallery.length > 0" :gallery="todo.gallery"></carousel>
                  </div>
                  <form v-on:submit.prevent="addImg">
                    <input type="url" name="img" placeholder="Image Url" id="img" v-model="todo.img">
                    <button class="btn btn-primary btn-success" v-if="todo.img.length > 0" type="submit">Add</button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  <button v-if="todo.title.length > 0" class="btn btn-primary btn-primary" data-dismiss="modal" @click="addTodo">Submit</button>
                </div>
              </div>
            </div>
          </div>
          <div class="todos">
            <add-todo v-if="displayAdd"></add-todo>
          </div>
          <todos></todos>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import todos from "./ToDos"
  import addTodo from "./AddTodo";
  import carousel from "./Carousel";

  export default {
    mounted() {
      //  this.$store.dispatch('authenticate')
      this.$store.dispatch("getDestTodos", this.$route.params.id);
      this.$store.dispatch('clearResults')
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getPos);
      }
    },
    name: "userDestination",
    components: {
      todos,
      addTodo,
      carousel
    },
    data() {
      return {
        displayAdd: false,
        displayCreate: false,
        category: '',
        todo: {
          title: '',
          description: '',
          img: '',
          gallery: [],
          categories: []
        },
        lat: 0,
        long: 0
      };
    },
    computed: {
      categories() {
        return this.$store.state.categories
      },
      currentDest() {
        return this.$store.state.destModule.activeDest
      }
    },
    methods: {
      toggleCreate() {
        this.displayCreate = !this.displayCreate
        this.displayAdd = false
      },
      toggleAdd() {
        this.displayAdd = !this.displayAdd
        this.displayCreate = false
      },
      addTodo() {
        var newTodo = {
          title: this.todo.title,
          description: this.todo.description,
          gallery: this.todo.gallery,
          categories: this.todo.categories,
          lat: this.lat,
          long: this.long
        }
        this.$store.dispatch('addTodo', newTodo)
        this.todo = {
          title: '',
          description: '',
          img: '',
          gallery: [],
          categories: []
        }
      },
      addImg() {
        if(this.todo.img.length > 0) {
          this.todo.gallery.unshift(this.todo.img)
        }
        this.todo.img = ''
      },
      getPos(position) {
        this.lat = position.coords.latitude
        this.long = position.coords.longitude
      },
      addCatergory() {
        if (this.category && !this.todo.categories.includes(this.category)) {
          this.todo.categories.push(this.category);
        }
      },
      removeCategory(i) {
        this.todo.categories.splice(i, 1)
      }
    }
  };
</script>

<style scoped>
  .toDo {
    background-color: lightseagreen;
  }

  .todos {
    width: 50vh;
    margin: auto;
  }

  .add-img {
    width: 25vh;
  }
</style>