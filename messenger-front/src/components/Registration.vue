<script setup>
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import router from '@/router'
import axios from 'axios'

const form = reactive({
  login: '',
  password: '',
  passwordConfirm: '',
  username: '',
  failedAttempt: false
})

const handleRegistration = async () => {
  const registrationData = {
    login: form.login,
    password: form.password,
    username: form.username
  }
  try {
    const response = await axios.post('/api/registration', registrationData)
    if (response.data.result === 'success') {
      form.failedAttempt = false
      router.push('/login')
    } else {
      form.failedAttempt = true
    }
  } catch (error) {
    console.error('Login failure', error)
  }
}
</script>
<template>
  <section class="bg-gray-100 h-screen flex justify-center items-center">
    <div class="max-w-md mx-auto p-4 pt-6 md:p-6 md:pt-0">
      <form
        @submit.prevent="handleRegistration"
        class="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
      >
        <h2 class="text-3xl font-bold text-emerald-500">Registration</h2>
        <div class="mb-4">
          <label class="block text-gray-700" for="login">Login</label>
          <input
            type="text"
            v-model="form.login"
            name="login"
            id="login"
            placeholder=""
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700" for="password">Password</label>
          <input
            type="password"
            v-model="form.password"
            name="password"
            id="password"
            placeholder=""
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700" for="passwordConfirm">Confirm password</label>
          <input
            type="password"
            v-model="form.passwordConfirm"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder=""
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700" for="username">Username</label>
          <input
            type="text"
            v-model="form.username"
            name="username"
            id="username"
            placeholder=""
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 w-full rounded"
            type="submit"
          >
            Register
          </button>
        </div>
        <div v-if="form.failedAttempt" class="text-red-500">
          <p>Incorrect data</p>
        </div>
        <div class="text-emerald-600">
          <RouterLink to="/login"> Login </RouterLink>
        </div>
      </form>
    </div>
  </section>
</template>
