<script setup>
import { reactive, onMounted, compile } from 'vue'
import axios from 'axios'

const form = reactive({
    chatName:''
})

const handleAdd = async () => {
    const chatData = {
    name: form.chatName,
    }
    try {
    const response = await axios.post('/api/chat/add', chatData)
    } catch (error) {
    console.error('Adding failure', error)
    }
}
</script>

<template>
    <div class="mb-4">
        <form @submit.prevent="handleAdd" class="flex">
            <input 
                type="text" 
                v-model="form.chatName" 
                name="chatName" 
                placeholder="Chat name" 
                class="border border-gray-300 rounded p-2 flex-1 mr-2"
            />
            <button type="submit" class="bg-emerald-500 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-600 transition duration-200">Add</button>
        </form>
    </div>
</template>