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
    <div>
        <form @submit.prevent="handleAdd">
            <input type="text" v-model="form.chatName" name="chatName" placeholder="chat name"/>
            <button type="submit">Add</button>
        </form>
    </div>
</template>