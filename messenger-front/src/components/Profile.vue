<script setup>
import { reactive, onMounted } from 'vue'
import axios from 'axios'

const userInfo = reactive({
  username: String,
  failedAttempt: false
})

const PasswordInfo = reactive({
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
  failedAttempt: false
})

let currentUsername = ''

const handleChangeUserInfo = async () => {
  const userData = {
    username: userInfo.username
  }

  if (currentUsername === userInfo.username) {
    userInfo.failedAttempt = true
    return
  }

  try {
    const response = await axios.post('/api/user/info', userData)
    if (response.data.result === 'success') {
      userInfo.failedAttempt = false
    } else {
      userInfo.failedAttempt = true
    }
  } catch (error) {
    console.error('Change failed', error)
  }
}

const handleChangePassword = async () => {
  const passwordData = {
    oldPassword: PasswordInfo.oldPassword,
    newPassword: PasswordInfo.newPassword
  }

  if (!PasswordInfo.newPassword === PasswordInfo.repeatPassword) {
    PasswordInfo.failedAttempt = true
    return
  }

  try {
    const response = await axios.post('/api/user/password', passwordData)
    if (response.data.result === 'success') {
      PasswordInfo.failedAttempt = false
    } else {
      PasswordInfo.failedAttempt = true
    }
  } catch (error) {
    console.error('Change failed', error)
  }
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/user')
    const userData = response.data.data[0]
    userInfo.username = userData.username
    currentUsername = userData.username
  } catch (error) {
    console.log('Error fetching info', error)
  }
})
</script>

<template>
  <section class="bg-gray-100 h-screen flex flex-col justify-center items-center">
    <h2 class="text-3xl font-bold text-emerald-500">User information</h2>
    <div class="flex">
      <form
        @submit.prevent="handleChangeUserInfo"
        class="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label class="block text-gray-700" for="username">Username</label>
          <input
            type="text"
            v-model="userInfo.username"
            name="username"
            id="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 w-full rounded"
            type="submit"
          >
            Change
          </button>
        </div>
        <div v-if="userInfo.failedAttempt" class="text-red-500">
          <p>Incorrect data</p>
        </div>
      </form>
    </div>
    <div class="flex">
      <form
        @submit.prevent="handleChangePassword"
        class="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label class="block text-gray-700" for="username">Old password</label>
          <input
            type="password"
            v-model="PasswordInfo.oldPassword"
            name="oldPassword"
            id="oldPassword"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700" for="newPassword">New password</label>
          <input
            type="password"
            v-model="PasswordInfo.newPassword"
            name="newPassword"
            id="newPassword"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700" for="repeatPassword">Repeat new Password</label>
          <input
            type="password"
            v-model="PasswordInfo.repeatPassword"
            name="repeatPassword"
            id="repeatPassword"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 w-full rounded"
            type="submit"
          >
            Change
          </button>
        </div>
        <div v-if="PasswordInfo.failedAttempt" class="text-red-500">
          <p>Incorrect data</p>
        </div>
      </form>
    </div>
  </section>
</template>
