import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Profil from './views/Profil.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profil',
      name: 'profil',
      component: Profil
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
})
