<script setup>
import { provide,ref } from 'vue'
import Logout from '@/components/Logout.vue';
import Chats from '@/components/Chats.vue';
import Chat from '@/components/Chat.vue';

const currentChat = ref('')
function updateCurrentChat(chat) {
  currentChat.value = chat
}

provide('currentChat', {currentChat, updateCurrentChat})
</script>

<template>
  <main class="h-screen flex flex-col">
    <div class="flex justify-between items-center p-4 bg-emerald-500">
      <Logout />
    </div>
    <div class="flex flex-1 overflow-hidden">
      <div class="w-1/4 border-r border-gray-300 p-4 overflow-y-auto">
        <Chats @click="$emit('chatChanged')" />
      </div>
      <div class="flex-1 p-4 overflow-y-auto">
        <Chat />
      </div>
    </div>
  </main>
</template>
