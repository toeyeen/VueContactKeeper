<template>
  <div class="container w-full mx-auto">
    <h1 class="m-10 text-3xl text-center ">Create Your Account</h1>
    <form class="w-1/3 mx-auto form-class" @submit.prevent="register">
      <div class="mt-4 form-group">
        <input
          type="text"
          placeholder="Enter Name"
          class="w-full p-2 border rounded-md focus:bsorder-gray-500"
          v-model="name"
          :class="[$v.name.$error ? 'border-red-500' : 'border-gray-400']"
          @blur="$v.name.$touch()"
        />
        <template v-if="$v.name.$error">
          <p v-if="!$v.name.required" class="text-red-500">
            Name is required
          </p>
        </template>
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
          <p v-if="!$v.password.minLength" class="text-red-500">
            Password must have at least
            {{ $v.password.$params.minLength.min }} letters.
          </p>
        </template>
      </div>
      <div class="mt-8 form-group">
        <input
          type="password"
          placeholder="Confirm Password"
          class="w-full p-2 border border-gray-400 rounded-md focus:border-gray-500 "
          v-model="confirmPassword"
          :class="[
            $v.confirmPassword.$error ? 'border-red-500' : 'border-gray-400',
          ]"
          @blur="$v.confirmPassword.$touch()"
        />
        <template v-if="$v.confirmPassword.$error">
          <p v-if="!$v.confirmPassword.sameAsPassword" class="text-red-500">
            Passwords must be identical.
          </p>
        </template>
      </div>

      <input
        type="submit"
        value="Register"
        class="w-full px-3 py-2 mt-6 mr-2 text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-400"
        :class="[$v.$anyError ? 'cursor-not-allowed' : '']"
        :disabled="$v.$anyError"
      />
    </form>
    <div class="mt-3 text-center">
      Already have an account?
      <router-link :to="{ name: 'Login' }" class="text-indigo-900">
        Login
      </router-link>
    </div>
  </div>
</template>

<script>
// import { use } from 'vue/types/umd'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  methods: {
    ...mapActions(['registerUser']),
    register() {
      if (!this.$v.$invalid) {
        const userdata = {
          name: this.name,
          email: this.email,
          password: this.password,
        }
        this.registerUser(userdata).then(() => {
          let message = this.notifications.map(
            (notification) => notification.message
          )
          if (message[0] !== 'The User already exist') {
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

<style lang="scss" scoped></style>
