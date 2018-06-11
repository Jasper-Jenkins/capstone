<template>
  <div class="current-todos"> <!-- This will be the display for a users current todos at each destination -->
    <div>ToDos Component</div>
    <p>This will end up displaying the users current todos for the destination they clicked on!</p>
    <div v-for="todo in todos" :key="todo._id">

    </div>
    
    <!-- <form v-on:submit.prevent="addTodo" class="form">
      <input class="input" type="text" name="title" placeholder=" title" id="email" v-model="todo.title">
      <input class="input" type="text" name="description" placeholder=" description" id="email" v-model="todo.description">
      <input class="input" type="text" name="title" placeholder=" Where to?" id="email" v-model="todo.description">
      <button class="btn btn-primary btn-success" type="submit">Add</button>
    </form> -->
  </div>
</template>

<script>
  export default {
    name: 'Todos',
    data() {
      return {
        todo: {
          title: '',
          description: '',

        }
      }
    },
    computed: {
        todos(){
            var todos = this.$store.state.todos
            console.log(todos, "todos are computing and should be empty for now")
        }
    },
    methods: {}
  }

</script>

<style scoped>


</style>
