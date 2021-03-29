<template>
  <div class="container flex justify-between w-full mx-auto mt-6 border home">
    <ContactForm class="flex-1" />
    <Contacts class="flex-1" />
    <div>
      <button class="p-2 text-black bg-yellow-300 border" @click="openModal">
        Pop up Modal
      </button>
      <EditModal v-if="showModal" @modalClose="closeModal" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Contacts from '../components/Contacts'
import ContactForm from '../components/ContactForm.vue'
import EditModal from '../components/EditModal.vue'

import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    EditModal,
    ContactForm,
    Contacts,
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
