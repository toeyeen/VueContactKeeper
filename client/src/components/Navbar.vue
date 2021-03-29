<template>
  <nav class="relative bg-white border-b-2 shadow-sm ">
    <div class="container flex items-center justify-between mx-auto">
      <router-link :to="{ name: 'Home' }">
        <div class="relative block p-4 text-xl font-bold cursor-pointer lg:p-6">
          <i :class="icon"></i>
          {{ title }}
        </div>
      </router-link>
      <ul class="flex">
        <li v-if="loggedIn">
          <p
            class="relative block px-2 py-6 text-sm font-bold lg:p-6 lg-text-base"
          >
            Hello {{ user && user.name.split(' ')[0] }}
          </p>
        </li>
        <li class="hover:bg-blue-800 hover:text-white" v-if="loggedIn">
          <router-link :to="{ name: 'Dashboard' }">
            <a
              href="#"
              class="relative block px-2 py-6 text-sm font-bold lg:p-6 lg-text-base"
              >Dashboard</a
            >
          </router-link>
        </li>
        <li class="hover:bg-blue-800 hover:text-white">
          <router-link :to="{ name: 'About' }">
            <a
              href="#"
              class="relative block px-2 py-6 text-sm font-bold lg:p-6 lg-text-base"
            >
              About</a
            >
          </router-link>
        </li>

        <li class="hover:bg-blue-800 hover:text-white" v-if="!loggedIn">
          <router-link :to="{ name: 'Register' }">
            <a
              href="#"
              class="relative block px-2 py-6 text-sm font-bold lg:p-6 lg-text-base"
            >
              Register</a
            >
          </router-link>
        </li>

        <li class="hover:bg-blue-800 hover:text-white" v-if="!loggedIn">
          <router-link :to="{ name: 'Login' }">
            <a
              href="#"
              class="relative block px-2 py-6 text-sm font-bold lg:p-6 lg-text-base"
            >
              Login</a
            >
          </router-link>
        </li>

        <li class="hover:bg-blue-800 hover:text-white" v-else @click="logout">
          <a
            href="#"
            class="relative block px-2 py-6 text-sm font-bold lg:p-6 lg-text-base"
          >
            <i class="fas fa-sign-out-alt"></i> Logout</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'Navbar',
  props: {
    icon: {
      type: [String],
      default: 'fas fa-id-card-alt',
    },
    title: {
      type: [String],
      required: true,
      default: 'Contatct Keeper',
    },
  },
  computed: {
    ...mapGetters(['loggedIn']),
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['logoutUser']),
    logout() {
      this.logoutUser()
    },
  },
}
</script>

<style scoped></style>
