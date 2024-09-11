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
      <button @click="handleLogout">Log out</button>
    </div>
</template>