<template>
  <div class="add-todo todo">
    <div id="category-drop" class="find d-flex flex-row">
      <select name="Category" class="form-control" v-model="category">
        <option value="Search by Category" hidden>Search by Category</option>
        <option v-for="category in categories" :value="category">{{category}}</option>
      </select>
      <button class="btn btn-success" @click="searchTodos">Search</button>
    </div>
    <div class="results" v-if="usersTodos.length + googleTodos.length > 0">
      <div class="userResults">
        <a v-for="todo in usersTodos" @click="addTodo(todo)">
          <p class="todo-result">{{todo.title}}</p>
        </a>
      </div>
      <div class="googleResults">
        <a v-for="todo in googleTodos" @click="addGoogleTodo(todo)">
          <p class="todo-result">{{todo.name}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addTodo',
    data() {
      return {
        category: 'Search by Category'
      }
    },
    mounted(){
  
    },
    computed: {
      categories() {
        return this.$store.state.categories
      },
      usersTodos() {
        return this.$store.state.todoModule.todos
      },
      googleTodos() {
        return this.$store.state.todoModule.googleTodos
      }
    },
    methods: {
      searchTodos() {
        this.$store.dispatch('findTodos', this.category)
        this.$store.dispatch('clearResults')
      },
      addTodo(todo) {
        this.$store.dispatch('addTodo', todo)
        this.$store.dispatch('clearResults')
      },
      addGoogleTodo(todo) {
        this.$store.dispatch('addGoogleTodo', todo)
        this.$store.dispatch('clearResults')
      }
    }
  }

</script>

<style scoped>

  .results {
    z-index: 1;
    position: absolute;
    display: block;
    max-height: 50vh;
    overflow: auto;
  }
  .userResults {
    background: white;
    margin-bottom: 0; 
    opacity: 0.9;
  }

  .googleResults {
    background: white;
    opacity: 0.9;
  }

  .todo-result {
    margin: 0;
    width: 20vh;
  }

  .googleResults :hover {
    color: white;
    background: rgb(106, 106, 243);
    cursor: pointer;
  }

  .userResults :hover {
    color: white;
    background: rgb(106, 106, 243);
    cursor: pointer;
  }

  label{
  vertical-align:top;
  }
</style>