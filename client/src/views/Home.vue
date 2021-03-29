<template>
  <div
    class="container flex items-center justify-center mx-auto border h-5/6 home"
  >
    <div class="text-center">
      <p class="text-4xl font-bolds">
        Welcome to the App
      </p>
      <p class="block pt-2 text-xl">
        To use this app you'll need to
        <router-link :to="{ name: 'Login' }" class="text-indigo-900 underline">
          Login
        </router-link>
        or
        <router-link
          :to="{ name: 'Register' }"
          class="text-indigo-900 underline"
        >
          Register
        </router-link>
      </p>
    </div>
    <!-- <ContactForm class="flex-1" />
    <Contacts class="flex-1" />
    <div>
      <button class="p-2 text-black bg-yellow-300 border" @click="openModal">
        Pop up Modal
      </button>
      <EditModal v-if="showModal" @modalClose="closeModal" />
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import Contacts from '@/components/Contacts.vue'
// import ContactForm from '@/components/ContactForm.vue'
// import EditModal from '@/components/EditModal.vue'

import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    // EditModal,
    // ContactForm,
    // Contacts,
  },
  data() {
    return {
      showModal: false,
    }
  },
  computed: mapState({
    contacts: (state) => state.contacts,
  }),
  methods: {
    closeModal() {
      this.showModal = false
    },
    openModal() {
      this.showModal = true
    },
    pressEnter() {
      if (e.keyCode === 13) {
        console.log(123)
      }
    },
  },
}
</script>

<style></style>
