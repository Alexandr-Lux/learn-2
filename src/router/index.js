import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import App from '../views/App.vue'

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

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login') next({ name: 'Login' })
//   else next()
// })

export default router
