<template>
  <div class="current-todos">
    <!-- This will be the display for a users current todos at each destination -->
    <div>ToDos Component</div>
    <p>This will end up displaying the users current todos for the destination they clicked on!</p>
    <div v-for="todo in todos" :key="todo._id">
      {{todo.title}}
      <button @click="toggleComment">Add Comment</button>
      <form v-on:submit.prevent="addComment(todo)" class="form" v-if="newComment">
        <input class="input" type="text" name="comment" placeholder=" comment" id="comment" v-model="comment.comment">
        <input class="input" type="url" name="image" placeholder=" image" id="image" v-model="comment.photo">
        <button class="btn btn-primary btn-success" type="submit">Add</button>
      </form>
      <button @click="deleteTodo(todo)">Delete todo</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Todos',
    data() {
      return {
        newComment: false,
        comment: {
          comment: '',
          photo: ''
        }
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
      deleteTodo(todo) {
        this.$store.dispatch('deleteTodo', todo)
      },
      toggleComment() {
        this.newComment = !this.newComment
      },
      addComment(todo) {
        todo.comments.unshift(this.comment)
        this.$store.dispatch('addComment', todo)
      }
    }
  }

</script>

<style scoped>
</style>