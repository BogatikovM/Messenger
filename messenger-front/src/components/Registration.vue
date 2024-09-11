<script setup>
import { reactive } from 'vue'
import router from '@/router'
import axios from 'axios';

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
    if (response.data.result === "success"){
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
  <section>
    <div>
      <form @submit.prevent="handleRegistration">
        <h2>Registration</h2>
        <div>
          <label for="login">Login</label>
          <input type="text" v-model="form.login" name="login" id="login" placeholder="" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="form.password" name="password" id="password" placeholder="" />
        </div>
        <div>
          <label for="password">Confirm password</label>
          <input
            type="password"
            v-model="form.passwordConfirm"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder=""
          />
        </div>
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            v-model="form.username"
            name="username"
            id="username"
            placeholder=""
          />
        </div>
        <div type="submit">
          <button>Register</button>
        </div>
        <div v-if="form.failedAttempt">
          <p>Incorrect data</p>
        </div>
      </form>
    </div>
  </section>
</template>
