<template>
  <div class="user-destination">
    <div class="container-fluid">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4 toDo">
          <add-todo></add-todo>
        </div>
        <div class="col-4"></div>
        </div>
    </div>  
  </div>
</template>

<script>
import addTodo from "./AddTodo";

export default {
  mounted() {
    this.$store.dispatch("getDestTodos", this.$route.params.id);
  },
  name: "userDestination",
  components: {
    addTodo
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
