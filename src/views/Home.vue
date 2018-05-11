<template>
<div class="home">
  <div class="container">
    <div v-for="(photo,index) in photos" :key="index">
      <p>{{photo.user}}</p>
      <img :src="photo.image" alt="image">
      <p>{{photo.like.length}}</p>
      <p>{{photo.caption}}</p>
      <div v-for="(comment,index) in photo.comment" :key="index">
        <p>{{comment}}</p>
      </div>
      <input type="text" placeholder="comment" v-model="comment">
      <button type="submit" name="button" @click="addComment">add comment</button>
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
      photos: [
        {
          user: 'asdasd',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Emperor-cold_hg.jpg/216px-Emperor-cold_hg.jpg',
          caption: 'apasih kambing',
          comment: ['kamu tu ya', 'apasih', 'kampret'],
          like: [123, 123, 123]
        }
      ],
      comment: ''
    }
  },
  methods: {
    addComment () {
      axios.post('http://localhost:3000/users/add-comment', {

      })
        .then(          )
    }
  },
  created: function () {
    axios.get('http://localhost:3000/users/get-photo')
      .then(response => {
        // this.photos = response.data.photo
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>

</style>
