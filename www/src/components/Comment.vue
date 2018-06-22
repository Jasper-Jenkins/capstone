<template>
  <div class="comment">
    <button @click="toggleComment">Add Comment</button>
    <form v-on:submit.prevent="addComment(todo)" class="form" v-if="newComment">
      <input class="input" type="text" name="comment" placeholder=" comment" id="comment" v-model="comment.comment">
      <input class="input" type="url" name="image" placeholder=" image" id="image" v-model="comment.photo">
      <button class="btn btn-primary btn-success" type="submit">Add</button>
    </form>
    <button @click="deleteComment">Delete Comment</button>
  </div>
</template>

<script>
  export default {
    name: 'Comment',
    props: {
      todo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        newComment: false,
        comment: {
          comment: '',
          photo: ''
        }
      }
    },
    computed: {},
    methods: {
      addComment(todo) {
        todo.comments.unshift(this.comment)
        this.$store.dispatch('addComment', todo)
      },
      toggleComment() {
        this.newComment = !this.newComment
      },
      deleteComment(todo){
        console.log(todo.comments)
        todo.comments.splice(todo.comments._id, 1)
        console.log(todo.comments)
        //this.$store.disp
      },
    }
  }

</script>

<style>
</style>