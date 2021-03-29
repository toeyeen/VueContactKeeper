<template>
  <div>
    <h1 class="text-3xl font-bold text-center ">
      {{ this.currentContact === null ? 'Add Contact' : 'Edit Contact' }}
    </h1>
    <form class="w-3/5 mx-auto form-class">
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
          <p v-if="!$v.email.minLen" class="text-red-500 ">
            Name cannot be less than 6
          </p>
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
          type="text"
          placeholder="Enter Phone Number"
          class="w-full p-2 border border-gray-400 rounded-md focus:border-gray-500 "
          v-model="phone"
          :class="[$v.phone.$error ? 'border-red-500' : 'border-gray-400']"
          @blur="$v.phone.$touch()"
        />
        <template v-if="$v.phone.$error">
          <p v-if="!$v.phone.required" class="text-red-500">
            Phone Number is required
          </p>
        </template>
      </div>
      <div class="mt-6 text-xl">Contact Type</div>
      <div class="mt-4 form-group">
        <input type="radio" value="personal" id="personal" v-model="type" />
        <label class="ml-2 mr-4 text-md" for="">Personal</label>
        <input
          type="radio"
          value="professional"
          id="professional"
          v-model="type"
        />
        <label class="ml-2 mr-4 text-md " for="">Professional</label>
      </div>
      <input
        @click="createContact"
        v-if="this.currentContact === null"
        type="submit"
        value="Add Contact"
        class="w-full px-3 py-2 mt-6 mr-2 text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-400"
        :class="[$v.$anyError ? 'cursor-not-allowed' : '']"
        :disabled="$v.$anyError"
      />
      <div v-else>
        <input
          @click="updateContactFromForm"
          type="submit"
          value="Edit Contact"
          class="w-full px-3 py-2 mt-6 mr-2 text-white bg-yellow-500 rounded-md cursor-pointer hover:bg-yellow-400"
          :disabled="$v.$anyError"
        />
        <template v-if="$v.$anyError">
          <p class="text-red-500">
            Please fill out the required field(s)
          </p>
        </template>

        <input
          @click="clearCurrentContactState"
          type="submit"
          value="Cancel Edit"
          class="w-full px-3 py-2 mt-6 mr-2 text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-400"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { bus } from '../main'
import { v4 as uuidv4 } from 'uuid'
import { mapActions, mapState } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      type: 'personal',
      id: '',
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(6),
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
    },
  },

  methods: {
    ...mapActions(['addContact', 'clearCurrentContact', 'updateContact']),
    createContact(e) {
      e.preventDefault()
      if (!this.$v.$invalid) {
        const formData = {
          id: uuidv4(),
          name:
            this.name.charAt(0).toUpperCase() +
            this.name.slice(1).toLowerCase(),
          email: this.email,
          phone: this.phone,
          type: this.type,
        }
        this.addContact(formData)
        this.clearCurrentContactState()
        this.$v.$reset()
      } else {
        this.$v.$touch()
      }
    },
    clearCurrentContactState() {
      ;(this.name = ''),
        (this.email = ''),
        (this.phone = ''),
        (this.type = 'personal'),
        this.clearCurrentContact()
    },
    updateContactFromForm(e) {
      e.preventDefault()
      const newData = {
        _id: this.currentContact._id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        type: this.type,
      }

      console.log(newData)
      this.updateContact(newData)
      this.clearCurrentContactState()
      this.$v.$reset()
    },
  },
  computed: mapState(['currentContact']),

  created() {
    bus.$on('fillFields', (currentContact) => {
      return (
        (this.id = currentContact.id),
        (this.name = currentContact.name),
        (this.email = currentContact.email),
        (this.phone = currentContact.phone),
        (this.type = currentContact.type)
      )
    })
    this.editContact
  },
}
</script>

<style scoped>
.myborder {
  border: 2px solid red;
}
</style>
