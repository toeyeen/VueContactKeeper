<template>
  <div>
  <input type="text" v-model="filteredText" @keyup="onTextChange" />
</template>

<script>
import { mapState, mapActions } from 'vuex'

  export default {
     data() {
    return {
      filteredText: '',
    }
  },
    methods: {
    ...mapActions(['filterContacts', 'clearFilter']),
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
    }),
    filteredView() {
      if (this.filteredText === '') {
        return this.contacts
      } else {
        return this.filtered
      }
    },
  },
  }
</script>

<style lang="scss" scoped>

</style>