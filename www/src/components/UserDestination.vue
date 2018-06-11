<template>
  <div class="user-destination">
    <div class="container-fluid">
      <div class="row">
        <div class="col-4">
          <todos></todos>
        </div>
        <div class="col-4"></div>
        <div class="col-4"></div>
      </div>
      <div class="row">
        <div class="col-4">
          <create-todo v-if="displayCreate"></create-todo>
          <add-todo v-if=""></add-todo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import todos from "./ToDos"
  import addTodo from "./AddTodo";
  import createTodo from "./CreateTodo"

  export default {
    mounted() {
      this.$store.dispatch("getDestTodos", this.$route.params.id);
    },
    name: "userDestination",
    components: {
      todos,
      addTodo,
      createTodo
    },
    data() {
      return {};
    },
    computed: {},
    methods: {}
  };
</script>

<style>
  .toDo {
    background-color: lightseagreen;
  }
</style>