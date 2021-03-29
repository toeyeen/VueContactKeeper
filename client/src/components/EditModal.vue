<template>
  <div
    class="fixed top-0 left-0 flex items-center justify-center w-full h-full "
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
    ></div>
    <div
      class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-lg"
    >
      <div
        class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
        @click="close"
      >
        <svg
          class="text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          ></path>
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>

      <div class="px-6 py-4 text-left modal-content">
        <!--Title-->
        <div class="flex items-center justify-between pb-3">
          <p class="text-2xl font-bold">Edit Contact</p>
          <div class="z-50 cursor-pointer modal-close" @click="close">
            <svg
              class="text-black fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              ></path>
            </svg>
          </div>
        </div>

        <!--Body-->
        <form class="w-4/5 mx-auto form-class">
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
                :class="[
                  $v.email.$error ? 'border-red-500' : 'border-gray-400',
                ]"
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
              v-model.number="phone"
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
        <!--Footer-->
        <!-- <div class="flex justify-end pt-2">
          <button
            class="p-3 px-4 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400"
          >
            Action
          </button>
          <button
            class="p-3 px-4 text-white bg-indigo-500 rounded-lg modal-close hover:bg-indigo-400"
            @click="close"
          >
            Close
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      type: 'personal',
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
    close() {
      this.$emit('modalClose' )
    },
  },
}
</script>

<style lang="scss" scoped></style>
