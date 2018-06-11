<template>
  <div class="current-todos">
    <!-- This will be the display for a users current todos at each destination -->
    <div>ToDos Component</div>
    <p>This will end up displaying the users current todos for the destination they clicked on!</p>
    <div v-for="todo in todos" :key="todo._id">
        {{todo.title}}
        <button @click="deleteDest(todo)">Delete</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Todos',
    data() {
      return {
      }
    },
    mounted() {
      this.$store.dispatch('getDestTodos', this.$store.state.activeDest._id)
    },
    computed: {
      todos() {
        var todos = this.$store.state.todos
        console.log(todos, "todos are computing and should be empty for now")
        return todos
      }
    },
    methods: {
      deleteDest(todo){
        this.$state.dispatch('deleteDest', todo)
      }
    }
  }

</script>

<style scoped>
</style>