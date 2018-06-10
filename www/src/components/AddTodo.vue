<template>
  <div class="add-todo toDo">
    <div class="find">
      <select name="Category" class="form-control" id="" v-model="category">
        <option disabled>Select a Category</option>
        <option v-for="category in categories" :value="category">{{category}}</option>
      </select>
      <button @click="searchTodos">Find</button>
    </div>
    <div class="userResults">
      <p v-for="todo in userTodos">{{todo.title}}<button @click="addTodo(todo)">Other users todo</button></p>
    </div>
    <div class="googleResults">
      <p v-for="todo in googleTodos">{{todo.name}} <button @click="addGoogleTodo(todo)">Googles to do</button></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addTodo',
    data() {
      return {
        category: ''
      }
    },
    computed: {
      categories() {
        return this.$store.state.categories
      },
      userTodos() {
        return this.$store.state.userTodos
      },
      googleTodos() {
        return this.$store.state.googleTodos
      }
    },
    methods: {
      searchTodos() {
        this.$store.dispatch('findTodos', this.category)
      },
      addTodo(todo) {
        this.$store.dispatch('addTodo', todo)
      },
      addGoogleTodo(todo) {
        this.$store.dispatch('addGoogleTodo', todo)
      }
    }
  }

</script>

<style scoped>
toDo {
  background-color: lightseagreen;
}

</style>
