<template>
  <div>
    <div style="margin: auto;margin-top: 270px; width: 20%">
        <h2 style="text-align: center">HACKTIVGRAM</h2>
        <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
            <input v-model="email" id="email" type="text" class="form-control" name="email" placeholder="Email">
        </div>
        <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input v-model="password" id="password" type="password" class="form-control" name="password" placeholder="Password">
        </div>
        <button style="margin-top: 10px" type="button" class="btn btn-primary" v-on:click="login">Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let user = {
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:3000/users/login', user)
        .then(response => {
          console.log(response)
          let token = response.data
          localStorage.setItem('token', token)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
