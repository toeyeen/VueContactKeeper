<template>
  <div class="container w-full mx-auto text-center">
    <h1 class="m-10 text-3xl text-center ">Login</h1>
    <form class="w-1/3 mx-auto form-class" @submit.prevent="login">
      <div class="mt-4 form-group">
        <div class="mt-8 form-group">
          <input
            type="text"
            placeholder="Enter Email Address"
            class="w-full p-2 border rounded-md focus:border-gray-500 "
            v-model="email"
            :class="[$v.email.$error ? 'border-red-500' : 'border-gray-400']"
            @blur="$v.email.$touch()"
          />
          <template v-if="$v.email.$error">
            <p v-if="!$v.email.email" class="text-red-500">
              Please enter a valid Email
            </p>
            <p v-if="!$v.email.required" class="text-red-500">
              Email is required
            </p>
          </template>
        </div>
      </div>
      <div class="mt-8 form-group">
        <input
          type="password"
          placeholder="Enter Password"
          class="w-full p-2 border border-gray-400 rounded-md focus:border-gray-500 "
          v-model="password"
          :class="[$v.password.$error ? 'border-red-500' : 'border-gray-400']"
          @blur="$v.password.$touch()"
        />
        <template v-if="$v.password.$error">
          <p v-if="!$v.password.required" class="text-red-500">
            Password is required
          </p>
        </template>
      </div>

      <input
        type="submit"
        value="Login"
        class="w-full px-3 py-2 mt-6 mr-2 text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-400"
        :class="[$v.$anyError ? 'cursor-not-allowed' : '']"
        :disabled="$v.$anyError"
      />
    </form>
    <div class="mt-3">
      New to Contact Keeper?
      <router-link :to="{ name: 'Register' }" class="text-indigo-900">
        Register
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions(['loginUser']),
    login() {
      if (!this.$v.$invalid) {
        const logindata = {
          email: this.email,
          password: this.password,
        }
        this.loginUser(logindata).then(() => {
          let message = this.notifications.map(
            (notification) => notification.message
          )
          if (message[0] !== 'Invalid Credentials') {
            this.$router.push({ name: 'Dashboard' })
          }
        })
      } else {
        this.$v.$touch()
      }
    },
  },
  computed: { ...mapState(['notifications']) },
}
</script>

<style scoped></style>
