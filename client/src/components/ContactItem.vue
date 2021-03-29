<template>
  <div>
    <div
      class="container flex justify-between w-full max-w-md p-6 mx-auto mb-2 text-white bg-red-200 border rounded-lg"
    >
      <div class="left">
        <div class="text-xl font-bold text-gray-500">
          {{ contact.name | firstLetterCap }}
        </div>
        <div class="text-lg text-gray-500">
          <i class="text-gray-500 fas fa-at"></i> {{ contact.email }}
        </div>
        <div class="text-lg text-gray-500">
          <i class="text-gray-600 fas fa-phone"></i> {{ contact.phone }}
        </div>
        <div class="buttons">
          <button
            class="px-3 py-1 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
            @click="setContact(contact)"
          >
            Edit
          </button>
          <button
            class="px-3 py-1 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
            @click="removeContact(contact)"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="right">
        <div>
          <span
            class="px-3 py-1 mr-2 text-white rounded-lg"
            :class="[
              contact.type === 'personal' ? 'bg-blue-600' : 'bg-green-500',
            ]"
          >
            {{ contact.type | firstLetterCap }}</span
          >
        </div>
      </div>
    </div>
    <!-- <EditModal v-if="showModal" @modalClose="closeModal" /> -->
  </div>
</template>

<script>
import { bus } from '../main'
import { mapActions, mapState } from 'vuex'
// import EditModal from '../components/EditModal'
export default {
  components: {
    // EditModal,
  },
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
  filters: {
    firstLetterCap(text) {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    },
  },
  methods: {
    ...mapActions(['deleteContact', 'updateContact', 'setCurrentContact']),
    removeContact(contact) {
      this.deleteContact(contact._id)
    },
    setContact(contact) {
      this.setCurrentContact(contact)
      this.showModal = true
      bus.$emit('fillFields', this.currentContact)
      if (this.currentContact !== null) {
        ;(this.name = this.currentContact.name),
          (this.email = this.currentContact.email),
          (this.phone = this.currentContact.phone),
          (this.type = this.currentContact.type),
          (this.id = this.currentContact.id)
      }
    },
    closeModal() {
      this.showModal = false
    },
  },
  computed: {
    ...mapState(['currentContact']),
  },
}
</script>

<style scoped></style>
