import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import App from '../views/app/App.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/app',
    name: 'App',
    component: App
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')

  if (!token && to.name !== 'Login') {
    next({ name: 'Login' })
    return
  }
  if (token && to.name !== 'App') {
    next({ name: 'App' })
    return
  }
  next()
})

export default router
