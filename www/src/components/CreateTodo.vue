<template>
  <div class="create-todo">
    <form v-on:submit.prevent="addTodo" class="form">
      <input class="input" type="text" name="title" placeholder=" title" id="email" v-model="todo.title">
      <input class="input" type="text" name="description" placeholder=" description" id="email" v-model="todo.description">
      <input class="input" type="text" name="title" placeholder=" Where to?" id="email" v-model="todo.description">
      <button class="btn btn-primary btn-success" type="submit">Add</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'createTodo',
    data() {
      return {
        todo: {
          title: '',
          description: '',

        }
      }
    },
    computed: {},
    methods: {}
  }

</script>

<style>


</style>
