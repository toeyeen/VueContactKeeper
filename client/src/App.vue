<template>
  <div id="app" class="h-screen">
    <Navbar title="Contact Keeper" />
    <router-view />
    <NotificationContainer />
  </div>
</template>

<script>
import NotificationContainer from '@/components/NotificationContainer.vue'
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar,
    NotificationContainer,
  },
}
</script>

<style>
body {
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
