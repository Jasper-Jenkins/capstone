<template>
  <div class="comment">
    <a @click="toggleComment" v-if="!newComment">Show Comments - {{todo.comments.length}}</a>
    <a @click="toggleComment" v-if="newComment">Hide Comments - {{todo.comments.length}}</a>
    <div v-if="newComment">
      <div class="card comments" v-for="comment in todo.comments" :key="comment._id">
        <img class="comment-img" :src="comment.photo" alt="">
        <p class="comment-text">{{comment.comment}}</p>
        <hr>
        <div class="d-flex flex-row justify-content-around">
          <p>Author: {{comment.author}}</p>
          <button class="btn btn-danger delete-btn" @click="deleteComment(todo)">Delete Comment</button>
        </div>
      </div>
      <form v-on:submit.prevent="addComment(todo)" class="form mt-2">
        <div class="form-vals d-flex flex-row">
          <div class="form-inputs">
            <input class="input" type="text" name="comment" placeholder=" comment" id="comment" v-model="comment.comment">
            <input class="input" type="url" name="image" placeholder=" image" id="image" v-model="comment.photo">
          </div>
          <div class="form-btn">
            <button class="btn btn-primary btn-success" type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
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
    mounted() {
      //   this.$store.dispatch('authenticate')
    },
    computed: {
      user() {
        return this.$store.state.userModule.user
      }
    },
    methods: {
      addComment(todo) {
        this.comment["author"] = this.user.displayName
        todo.comments.unshift(this.comment)
        this.$store.dispatch('editTodo', todo)
      },
      toggleComment() {
        this.newComment = !this.newComment
      },

      deleteComment(todo) {
        console.log(todo.comments)
        todo.comments.splice(todo.comments._id, 1)
        console.log(todo.comments)
        this.$store.dispatch('deleteComment', todo)
      },
    }
  }

</script>

<style scoped>
  .delete-btn {
    margin: auto;
  }

  .comments {
    padding: 5px;
    border: 1px solid black;
  }

  .comment-text {
    text-align: left;
  }

  .comment-img {
    width: 100%;
  }
</style>