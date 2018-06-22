<template>
  <div class="current-todos">
    <!-- This will be the display for a users current todos at each destination -->
    <div>ToDos Component</div>
    <p>Fun activities for your destination!</p>
    <div v-for="todo in todos" :key="todo._id">
      {{todo.title}}
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
      }
    }
  }

</script>

<style scoped>
 
</style>