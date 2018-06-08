<template>
  <div class="user-destination">
    <add-todo></add-todo>
  </div>
</template>

<script>
  import addTodo from './AddTodo'

  export default {
    mounted() {
      this.$store.dispatch('getDestTodos', this.$route.params.id)
    },
    name: 'userDestination',
    components: {
      addTodo
    },
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {

    }
  }

</script>

<style>


</style>
