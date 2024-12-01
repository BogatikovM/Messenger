<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const form = reactive({
  chatName: ''
})

const emit = defineEmits(['updateChats'])

const handleAddingChat = async () => {
  const chatData = {
    name: form.chatName
  }
  try {
    const response = await axios.post('/api/chat/add', chatData)
    emit('updateChats')
  } catch (error) {
    console.error('Adding failure', error)
  }
}
</script>

<template>
  <div class="mb-4">
    <form @submit.prevent="handleAddingChat()" class="flex">
      <input
        type="text"
        v-model="form.chatName"
        name="chatName"
        placeholder="Chat name"
        class="border border-gray-300 rounded p-2 flex-1 mr-2"
      />
      <button
        type="submit"
        class="bg-emerald-500 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-600 transition duration-200"
      >
        Add
      </button>
    </form>
  </div>
</template>
