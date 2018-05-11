<template>
  <div>
    <div style="margin: auto;margin-top: 270px; width: 20%">
        <h2 style="text-align: center">HACKTIVGRAM</h2>
        <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
            <input v-model="email" id="email" type="text" class="form-control" name="email" placeholder="Email"><br>
        </div>
        <span class="input-group-addon" v-if="email.length > 0">{{ emailmsg }}</span>
        <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input v-model="password" id="password" type="password" class="form-control" name="password" placeholder="Password"><br>
        </div>
        <span class="input-group-addon" v-if="password.length > 0">{{ passwordmsg }}</span>
        <button style="margin-top: 10px" type="button" class="btn btn-primary" v-on:click="login" :disabled="ready">Login</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: '',
      isEmail: false,
      isPassword: false,
      emailmsg: '',
      passwordmsg: ''
    }
  },
  watch: {
    email: function (val) {
      if (this.email.length > 0) {
        this.emailmsg = '...'
        this.validateEmail()
      }
    },
    password: function (val) {
      this.passwordmsg = '...'
      this.validatePassword()
    },
  },
  computed: {
    ready: function () {
      if (this.isEmail === true && this.isPassword === true) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    validEmail (email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validPassword (password) {
      let re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
      return re.test(password)
    },
    validateEmail: _.debounce(
      function () {
        if (this.validEmail(this.email) === true) {
          this.isEmail = true
          this.emailmsg = ''
        } else {
          this.emailmsg = 'wrong email format'
          this.emailStatus = false
        }
      },
      500
    ),
    validatePassword: _.debounce(
      function () {
        if (this.validPassword(this.password) === true) {
          this.passwordmsg = ''
          this.isPassword = true
        } else {
          this.passwordmsg = 'Your password must contain at least 8 character, one letter, one number and one special character'
          this.passwordStatus = false
        }
      },
      500
    ),
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
span {
  color: red;
}
</style>
