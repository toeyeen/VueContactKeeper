<template>
  <div
    class="w-1/5 p-4 mt-4 text-center text-white"
    :class="[notification.type === 'success' ? 'bg-green-500' : 'bg-red-700']"
  >
    <h1>
      {{ notification.message }}
    </h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    }
  },
  methods: {
    ...mapActions([
      'removeNotification', //also supports payload `this.nameOfAction(amount)`
    ]),
  },
  mounted() {
    this.timeout = setTimeout(
      () => this.removeNotification(this.notification),
      5000
    )
  },
}
</script>

<style lang="scss" scoped></style>
