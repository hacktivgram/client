<template>
<div class="home">
  <div class="container">
    <div v-if="status == false">
      <button type="button" name="button"><router-link to="/login">Login</router-link></button>
      <button type="button" name="button"><router-link to="/signup">Sign Up</router-link></button>
    </div>
    <div v-for="(photo,index) in photos" :key="index" class="content" style="padding-top: 10px;">
      <p>{{photo.user.username}}</p>
      <img :src="photo.image" alt="image" style="max-width: 400px;">
      <div class="form-inline">
        <div class="">
          <button type="button" name="button" @click="addLike(photo._id)">Add Like</button>
        </div>
        <div class="">
          <p>{{photo.like.length}}</p>
        </div>
      </div>
      <p>{{photo.caption}}</p>
      <div v-for="(comment,index) in commentFromDB" :key="index">
        <div v-if="comment.photoId == photo._id">
          <p>{{ comment.comment }}</p>
        </div>
      </div>
      <input type="text" placeholder="comment" v-model="comment">
      <button type="submit" name="button" @click="addComment(photo._id)">add comment</button>
      <a href="http://www.facebook.com/sharer.php?u='photo.image'" target="_blank">
        Share
      </a>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      photos: [],
      commentFromDB: [],
      comment: '',
      status: true
    }
  },
  methods: {
    addLike (id) {
      axios.post(`http://localhost:3000/users/add-like/${id}`, {}, {
        headers: {token: localStorage.getItem('token')}
      })
        .then(response => {
          this.photos.map(photo => {
            if (photo._id === id) {
              let newArray = []
              let count = 0
              photo.like.map(onelike => {
                if (onelike === response.data.userId) {
                  count++
                }
              })
              if (count === 0) {
                photo.like.push(response.data.userId)
              } else {
                photo.like.map(onelike => {
                  if (onelike !== response.data.userId) {
                    newArray.push(onelike)
                  }
                })
              }
              photo.like = newArray
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    addComment (id) {
      axios.post(`http://localhost:3000/users/add-comment/${id}`, {
        comment: this.comment
      }, {
        headers: {token: localStorage.getItem('token')}
      })
        .then(response => {
          this.commentFromDB.push(response.data.data)
          this.comment = ''
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created: function () {
    axios.get('http://localhost:3000/users/get-all-photo')
      .then(response => {
        this.photos = response.data.photo
      })
      .catch(err => {
        console.log(err)
      })
    axios.get('http://localhost:3000/users/get-all-comment')
      .then(response => {
        this.commentFromDB  = response.data.comment
      })
      .catch(err => {
        console.log(err)
      })
    localStorage.getItem('status')
    if (status === 'connected') {
      this.status = false
    }
  }
}
</script>

<style scoped>
.container .content {
  align-items: center;
}
</style>
