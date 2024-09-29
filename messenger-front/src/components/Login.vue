<script setup>
import { reactive, onMounted, compile } from 'vue'
import { RouterLink } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import axios from 'axios'
import router from '@/router'

const { cookies } = useCookies()

const form = reactive({
  login: '',
  password: '',
  failedAttempt: false
})

const handleLogin = async () => {
  const loginData = {
    login: form.login,
    password: form.password,
  }
  try {
    const response = await axios.post('/api/login', loginData)
    if (response.data.result === "success"){
      form.failedAttempt = false
      router.push('/')
    } else {
      form.failedAttempt = true
    }
  } catch (error) {
    console.error('Login failure', error)
  }
}

onMounted(async () => {
  try {
    const response = await axios.post('/api/session')
    if (response.data.result === "success"){
      router.push('/')
    } else {
      console.log('No active session')
    }
  } catch (error) {
    console.error('Session check failure', error)
  }
})

</script>

<template>
<section class="bg-gray-100 h-screen flex justify-center items-center">
  <div class="max-w-md mx-auto">
    <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4">
      <h2 class="text-3xl font-bold text-emerald-500">Login</h2>
      <div class="mb-4">
        <label class="block text-gray-700" for="login">Login</label>
        <input type="text" v-model="form.login" name="login" id="login" placeholder="" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700" for="password">Password</label>
        <input type="password" v-model="form.password" name="password" id="password" placeholder="" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 w-full rounded" type="submit">Login</button>
      </div>
      <div v-if="form.failedAttempt" class="text-red-500">
        <p>Incorrect data</p>
      </div>
      <div class="text-emerald-600">
        <RouterLink to="/registration"> Register </RouterLink>
      </div>
    </form>
  </div>
</section>
</template>