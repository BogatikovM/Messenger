<script setup>
import { provide, ref } from 'vue'
import { RouterLink } from 'vue-router'
import Logout from '@/components/Logout.vue'
import Chats from '@/components/Chats.vue'
import Chat from '@/components/Chat.vue'

const currentChat = ref('')
function updateCurrentChat(chat) {
  currentChat.value = chat
}

provide('currentChat', { currentChat, updateCurrentChat })
</script>

<template>
  <main class="h-screen flex flex-col">
    <div class="flex justify-between items-center p-4 bg-emerald-500">
      <RouterLink
        to="/profile"
        class="bg-emerald-500 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-600 transition duration-200"
        >Профиль</RouterLink
      >
      <Logout />
    </div>
    <div class="flex flex-1 w-screen overflow-hidden">
      <div class="w-1/5 border-r border-gray-300 p-4 overflow-y-auto">
        <Chats @click="$emit('chatChanged')" />
      </div>
      <div class="w-4/5 p-4 overflow-y-auto">
        <Chat />
      </div>
    </div>
  </main>
</template>
