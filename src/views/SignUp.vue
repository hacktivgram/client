<template>
  <div class="container">
    <div class="form">
      <div class="form-group">
        <input type="text" class="form-control" v-model="username" placeholder="username">
        <span v-if="username.length > 0">{{ usernamemsg }}</span>
      </div>
      <div class="form-group">
        <input type="email" class="form-control" v-model="email" placeholder="email">
        <span v-if="email.length > 0">{{ emailmsg }}</span>
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
        <input type="password" class="form-control" v-model="biography" placeholder="biography">
        <span v-if="biography.length > 0">{{ biographymsg }}</span>
      </div>
      <div class="form-group">
        <input type="file" class="form-control" @change="getPhoto">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-info" @click="signup" :disabled="allOk">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'signup',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      biography: '',
      photo: null,
      usernamemsg: '',
      emailmsg: '',
      passwordmsg: '',
      confirmpasswordmsg: '',
      biographymsg: '',
      usernameStatus: false,
      emailStatus: false,
      passwordStatus: false,
      confirmPasswordStatus: false,
      biographyStatus: false,
      photoStatus: false
    }
  },
  watch: {
    username: function (val) {
      if (this.username.length > 0) {
        this.usernamemsg = '...'
        this.validateUsername()
      }
    },
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
    confirmPassword: function (val) {
      this.confirmpasswordmsg = '...'
      this.validateConfirmPassword()
    },
    biography: function (val) {
      this.biographymsg = '...'
      this.validateBiography()
    }
  },
  computed: {
    allOk: function () {
      if (this.usernameStatus === true && this.emailStatus === true && this.passwordStatus === true && this.confirmPasswordStatus === true && this.biographyStatus === true && this.photoStatus === true) {
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
          axios.post('http://localhost:3000/users/foremailvalidate', {
            email: this.email
          })
            .then(response => {
              this.emailmsg = ''
              this.emailStatus = true
            })
            .catch(err => {
              console.log(err)
              this.emailmsg = 'ga aman bos, ganti email gih'
              this.emailStatus = false
            })
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
          axios.post('http://localhost:3000/users/forusernamevalidate', {
            username: this.username
          })
            .then(response => {
              this.usernamemsg = ''
              this.usernameStatus = true
            })
            .catch(err => {
              console.log(err)
              this.usernamemsg = 'ga aman bos, ganti username gih'
              this.usernameStatus = false
            })
        } else {
          this.usernamemsg = 'karakter username harus lebih dari 6'
          this.usernameStatus = false
        }
      },
      500
    ),
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
    validateBiography: _.debounce(
      function () {
        if (this.biography.length >= 30) {
          this.biographymsg = ''
          this.biographyStatus = true
        } else {
          this.biographymsg = 'masukin biography minimal 30 karakter'
          this.biographyStatus = false
        }
      },
      500
    ),
    getPhoto (event) {
      this.photo = event.target.files[0]
    },
    signup () {
      let formData = new FormData()
      formData.append('username', this.username)
      formData.append('email', this.email)
      formData.append('password', this.password)
      formData.append('biography', this.biography)
      formData.append('image', this.photo)
      axios.post('http://localhost:3000/users/signup', formData)
        .then(response => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('status', 'connected')
          this.$router.push('home')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  justify-content: center;
}
.container .form {
  align-self: center;
  width: 400px;
}
.container .form label {
  text-align: left;
}
span {
  color: red;
}
</style>
