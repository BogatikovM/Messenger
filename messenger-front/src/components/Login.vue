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
  <section>
    <div>
      <form @submit.prevent="handleLogin">
        <h2>Login</h2>
        <div>
          <label for="login">Login</label>
          <input type="text" v-model="form.login" name="login" id="login" placeholder="" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="form.password" name="password" id="password" placeholder="" />
        </div>
        <div type="submit">
          <button>Login</button>
        </div>
        <div v-if="form.failedAttempt">
          <p>Incorrect data</p>
        </div>
        <div>
          <RouterLink to="/registration"> Register </RouterLink>
        </div>
      </form>
    </div>
  </section>
</template>