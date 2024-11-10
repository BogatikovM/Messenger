<script setup>
import { provide,ref } from 'vue'
import Logout from '@/components/Logout.vue';
import Chats from '@/components/Chats.vue';
import Chat from '@/components/Chat.vue';

const currentChat = ref('')
function updateCurrentChat(chat) {
  currentChat.value = chat
  console.log(currentChat.value)
}

provide('currentChat', {currentChat, updateCurrentChat})
</script>

<template>
  <main>
    <div class="flex justify-between items-center p-4 bg-emerald-500">
      <Logout />
    </div>
    <div>
      <Chats @click="$emit('chatChanged')"/>
    </div>
    <div>
      <Chat />
    </div>
  </main>
</template>
