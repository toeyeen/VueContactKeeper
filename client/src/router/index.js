import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token')
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
})
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token')
  if (
    (to.name === 'Home' && loggedIn) ||
    (to.name === 'Login' && loggedIn) ||
    (to.name === 'Register' && loggedIn)
  ) {
    next({ name: 'Dashboard' })
  } else next()
})

export default router
