import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/style/index.css'
import Vuelidate from 'vuelidate'
import setAuthToken from './utils/setAuthToken'

Vue.use(Vuelidate)

export const bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    const getToken = localStorage.getItem('token')
    if (getToken) {
      this.$store.dispatch('loadUser', getToken)
    }

    setTimeout(() => {
      console.log(1)
    }, 10000)
  },
  render: (h) => h(App),
}).$mount('#app')
