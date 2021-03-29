<template>
  <div class="mx-auto ">
    <input
      type="text"
      v-model="filteredText"
      @keyup="onTextChange"
      class="container flex justify-between w-full max-w-md p-2 mx-auto mb-2 border border-gray-500 rounded-lg focus:border-gray-500"
      placeholder="Seach by name or email"
    />

    <p
      v-if="contacts !== null && contacts.length === 0"
      class="justify-center mt-16 text-center"
    >
      Add a new contact
    </p>
    <p
      v-if="filtered !== null && filtered.length === 0"
      class="justify-center mt-16 text-center"
    >
      No Contact with the name or email
      <span class="text-xl font-bold"> {{ filteredText }}</span>
    </p>

    <Spinner v-if="loading" class="" />

    <transition-group name="slide-up" tag="div">
      <ContactItem
        v-for="contact in filteredView"
        :key="contact._id"
        :contact="contact"
      />
    </transition-group>
  </div>
</template>

<script>
import ContactItem from '@/components/ContactItem.vue'
import Spinner from '@/components/Spinner.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Contacts',
  components: {
    ContactItem,
    Spinner,
  },
  data() {
    return {
      filteredText: '',
    }
  },
  methods: {
    ...mapActions(['filterContacts', 'clearFilter', 'fetchContacts']),
    onTextChange() {
      if (this.filteredText !== '') {
        this.filterContacts(this.filteredText)
      } else {
        this.clearFilter()
      }
    },
  },
  computed: {
    ...mapState({
      contacts: (state) => state.contacts,
      filtered: (state) => state.filtered,
      loading: (state) => state.loading,
      filtered: (state) => state.filtered,
    }),
    filteredView() {
      if (this.filteredText === '') {
        return this.contacts
      } else {
        return this.filtered
      }
    },
  },
  created() {
    this.fetchContacts()
  },
}
</script>

<style scoped>
.slide-up-enter {
  transform: translateY(10px);
  opacity: 0;
}
.slide-up-enter-active {
  transition: all 0.5s ease;
}

.slide-up-leave-active {
  opacity: 0;
  /* transform: translateY(30px); */
  transition: all 0.5s ease;
}

.slide-up-leave-to {
  transform: translateX(-10px);
  /* opacity: 0; */
}
</style>
