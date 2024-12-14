<script setup>
import ChatPreview from './ChatPreview.vue'
import ChatAdding from './ChatAdding.vue'
import { reactive, onMounted, inject, nextTick } from 'vue'
import axios from 'axios'

const state = reactive({
  chats: [],
  isAdding: false
})

const toggleAdding = () => {
  state.isAdding = !state.isAdding
}

const { currentChat, updateCurrentChat } = inject('currentChat')

const emitter = inject('emitter')
const changeChat = () => {
  emitter.emit('chatChanged', 100)
}

const updateChats = async () => {
  try {
    const response = await axios.get('/api/chat')
    state.chats = response.data.data
    state.isAdding = false
    await nextTick()
  } catch (error) {
    console.log('Error fetching chats', error)
  }
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/chat')
    state.chats = response.data.data
  } catch (error) {
    console.log('Error fetching chats', error)
  }
})
</script>

<template>
  <section class="h-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold">Чаты</h2>
      <button
        @click="toggleAdding"
        class="bg-emerald-500 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-600 transition duration-200"
      >
        {{ state.isAdding ? 'Отменить' : 'Добавить' }}
      </button>
    </div>
    <ChatAdding v-if="state.isAdding" @updateChats="updateChats" />
    <div class="overflow-y-auto h-[calc(100%-4rem)]">
      <ChatPreview
        @click="
          updateCurrentChat(chat.name);
          changeChat()
        "
        v-for="chat in state.chats"
        :key="chat.id"
        :chat="chat"
        class="cursor-pointer hover:bg-gray-100 p-2 rounded transition"
      />
    </div>
  </section>
</template>
