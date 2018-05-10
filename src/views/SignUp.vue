<template>
  <div class="container">
    <div class="form">
      <div class="form-group">
        <input type="text" class="form-control" v-model="name" placeholder="name">
      </div>
      <div class="form-group">
        <input type="email" class="form-control" v-model="email" placeholder="email">
        <span v-if="email.length > 0">{{ emailmsg }}</span>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="username" placeholder="username">
        <span v-if="username.length > 0">{{ usernamemsg }}</span>
      </div>
      <div class="form-group">
        <input type="password" class="form-control" v-model="password" placeholder="password">
        <span v-if="password.length > 0">{{ passwordmsg }}</span>
      </div>
      <div class="form-group">
        <input type="password" class="form-control" v-model="confirmPassword" placeholder="confirm password">
        <span v-if="confirmPassword.length > 0">{{ confirmpasswordmsg }}</span>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-info" @click="signup" :disabled="allOk">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'signup',
  data () {
    return {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      namemsg: '',
      emailmsg: '',
      usernamemsg: '',
      passwordmsg: '',
      confirmpasswordmsg: '',
      nameStatus: false,
      emailStatus: false,
      usernameStatus: false,
      passwordStatus: false,
      confirmPasswordStatus: false
    }
  },
  watch: {
    name: function (val) {
      this.validateName()
    },
    email: function (val) {
      if (this.email.length > 0) {
        this.emailmsg = '...'
        this.validateEmail()
      }
    },
    username: function (val) {
      if (this.username.length > 0) {
        this.usernamemsg = '...'
        this.validateUsername()
      }
    },
    password: function (val) {
      this.passwordmsg = '...'
      this.validatePassword()
    },
    confirmPassword: function (val) {
      this.confirmpasswordmsg = '...'
      this.validateConfirmPassword()
    }
  },
  computed: {
    allOk: function () {
      if (this.nameStatus === true && this.emailStatus === true && this.usernameStatus === true && this.passwordStatus === true && this.confirmPasswordStatus === true) {
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
          // this.$http.post('http://localhost:3000/api/foremailvalidate', {
          //   email: this.email
          // })
          //   .then(response => {
          //     this.emailmsg = ''
          //     this.emailStatus = true
          //   })
          //   .catch(err => {
          //     console.log(err)
          //     this.emailmsg = 'ga aman bos, ganti email gih'
          //     this.emailStatus = false
          //   })
        } else {
          this.emailmsg = 'wrong email format'
          this.emailStatus = false
        }
      },
      500
    ),
    validateUsername: _.debounce(
      function () {
        if (this.username.length > 6) {
          // this.$http.post('http://localhost:3000/api/forusernamevalidate', {
          //   username: this.username
          // })
          //   .then(response => {
          //     this.usernamemsg = ''
          //     this.usernameStatus = true
          //   })
          //   .catch(err => {
          //     console.log(err)
          //     this.usernamemsg = 'ga aman bos, ganti username gih'
          //     this.usernameStatus = false
          //   })
        } else {
          this.usernamemsg = 'karakter username harus lebih dari 6'
          this.usernameStatus = false
        }
      },
      500
    ),
    validateName () {
      if (this.name.length > 0) {
        this.namemsg = ''
        this.nameStatus = true
      } else {
        this.nameStatus = false
      }
    },
    validatePassword: _.debounce(
      function () {
        if (this.validPassword(this.password) === true) {
          this.passwordmsg = ''
          this.passwordStatus = true
        } else {
          this.passwordmsg = 'Your password must contain at least 8 character, one letter, one number and one special character'
          this.passwordStatus = false
        }
      },
      500
    ),
    validateConfirmPassword: _.debounce(
      function () {
        if (this.confirmPassword === this.password) {
          this.confirmpasswordmsg = ''
          this.confirmPasswordStatus = true
        } else {
          this.confirmpasswordmsg = 'password ga match'
          this.confirmPasswordStatus = false
        }
      },
      500
    ),
    signup () {
      axios.post('http://localhost:3000/api/signup', {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('status', 'connected')
          this.$router.push('dashboard')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
</style>
