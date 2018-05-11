<template>
    <div>
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button
                        type="button"
                        class="navbar-toggle"
                        data-toggle="collapse"
                        data-target="#myNavbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Hacktivgram</a>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <a href="#">Home</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="#">
                                <span class="glyphicon glyphicon-log-in"></span>
                                Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="jumbotron">
            <div class="container text-center">
                <h1>My Profil</h1>
                {{ user.biography }}
            </div>
        </div>
        <profilPhoto
          :photos = 'photos'
        ></profilPhoto>
        <footer class="container-fluid text-center">
        <div style="width: 20%; margin: auto" class="input-group">
                <span class="input-group-btn">
                <button class="btn btn-default btn-file" type="file" v-on:click="uploadClick">Upload</button>
                </span>
                <input type="file" class="form-control" v-on:change="getfile">
            </div>
        </footer>
    </div>
</template>

<script>
import profilPhoto from '../components/profilPhoto.vue'
import axios from 'axios'
export default {
  name: 'profil',
  data: function () {
    return {
      file: null,
      photos: [],
      user: {}
    }
  },
  components: {
    profilPhoto
  },
  methods: {
    getfile (event) {
      let file = event.target.files
      this.file = file[0]
    },
    uploadClick () {
      let formData = new FormData()
      formData.append('image', this.file)
      axios.post('http://localhost:3000/users/upload', formData,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created: function () {
    axios.get('http://localhost:3000/users/', {
      headers: {token: localStorage.getItem('token')}
    })
      .then(response => {
        this.user = response.data.data
      })
      .catch(err => {
        console.log(err)
      })
    axios.get('http://localhost:3000/users/get-photo', {
      headers: {token: localStorage.getItem('token')}
    })
      .then(response => {
        this.photos = response.data.photo
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
/* Remove the navbar's default margin-bottom and rounded borders */
.navbar {
    margin-bottom: 0;
    border-radius: 0;
}

/* Add a gray background color and some padding to the footer */
footer {
    background-color: #f2f2f2;
    padding: 25px;
}
</style>
