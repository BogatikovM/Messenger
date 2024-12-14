<script setup>
import Profile from '@/components/Profile.vue'
import Logout from '@/components/Logout.vue'
</script>

<template>
  <main class="h-screen flex flex-col">
    <div class="flex justify-between items-center p-4 bg-emerald-500">
      <RouterLink
        to="/"
        class="bg-emerald-500 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-600 transition duration-200"
        >На главную</RouterLink
      >
      <Logout />
    </div>
    <Profile />
  </main>
</template>
