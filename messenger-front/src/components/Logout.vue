<script setup>
import axios from 'axios'
import router from '@/router'

const handleLogout = async () => {
  try {
    const response = await axios.post('/api/logout')
    router.push('/login')
  } catch (error) {
    console.error('Logout failure', error)
  }
}
</script>

<template>
  <div>
    <button
      @click="handleLogout"
      class="bg-emerald-500 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-600 transition duration-200"
    >
      Log out
    </button>
  </div>
</template>
