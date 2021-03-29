<template>
  <div class="sticky m-4 bottom-4 left-4">
    <NotificationBar
      v-show="notifications"
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar.vue'
import { mapState } from 'vuex'

export default {
  components: {
    NotificationBar,
  },
  data() {
    return {}
  },

  computed: {
    ...mapState(['notifications']),
  },
}
</script>

<style lang="scss" scoped></style>
