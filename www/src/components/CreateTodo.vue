<template>
  <div class="create-todo">
    <div>CreateToDo Component</div>
    <form v-on:submit.prevent="addTodo" class="form">
      <input class="input" type="text" name="title" placeholder=" title" id="email" v-model="todo.title">
      <input class="input" type="text" name="description" placeholder=" description" id="email" v-model="todo.description">
      <button class="btn btn-primary btn-success" type="submit">Add</button>
    </form>
    <button @click=toggleImg>Add image</button>
    <div class="row">
      <div class="col" v-for="img in todo.gallery">
        <img :src="img" alt="">
      </div>
    </div>
    <form v-if="newImg" v-on:submit.prevent="addImg">
      <input type="url" name="img" placeholder="Image Url" id="img" v-model="todo.img">
      <button class="btn btn-primary btn-success" type="submit">Add</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'createTodo',
    data() {
      return {
        newImg: false,
        todo: {
          title: '',
          description: '',
          img: '',
          gallery: []
        }
      }
    },
    computed: {},
    methods: {
      toggleImg() {
        this.newImg = !this.newImg
      },
      addImg() {
        this.todo.gallery.unshift(this.todo.img)
        this.todo.img = ''
      },
      addTodo() {
        var newTodo = {
          title: this.todo.title,
          description: this.todo.description,
          gallery: this.todo.gallery
        }
        this.$store.dispatch('addTodo', newTodo)
        this.todo = {
          title: '',
          description: '',
          img: '',
          gallery: []
        }
      }
    }
  }

</script>

<style scoped>

</style>