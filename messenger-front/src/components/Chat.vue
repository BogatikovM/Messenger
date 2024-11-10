<script setup>
import { reactive, onMounted, compile, inject } from 'vue'
import axios from 'axios'
import Message from './Message.vue';

const form = reactive({
    content:''
})

const state = reactive({
  messages: []
})

const { currentChat, updateCurrentChat } = inject('currentChat')

const emitter = inject('emitter');   // Inject `emitter`

emitter.on('chatChanged', async () => {   // *Listen* for event
  try {
    const response = await axios.get(`/api/chat/messages?chat=${currentChat.value}`);
    state.messages = response.data.data;
  } catch (error) {
    console.log('Error fetching messages', error);
  }
});
/*
onMounted(async () => {
  try {
    const response = await axios.get(`/api/chat/messages?chat=def`);
    state.messages = response.data.data;
  } catch (error) {
    console.log('Error fetching messages', error);
  }
})
*/
/*
const handleChatChanged = async () => {
  try {
    const response = await axios.get(`/api/chat/messages?chat=def`);
    state.messages = response.data.data;
  } catch (error) {
    console.log('Error fetching messages', error);
  }
}
*/
const handleMessage = async () => {
    const messageData = {
        content: form.content,
        chat: currentChat.value
    }
    try {
    const response = await axios.post('/api/chat/send', messageData)
    } catch (error) {
    console.error('Sending failure', error)
    }
}
</script>

<template>
    <section>
        <div>
            <div>
            <Message v-for="message in state.messages" :key="message.id" :message="message"/>
            </div>
        </div>
        <div>
            <form @submit.prevent="handleMessage">
            <input type="text" v-model="form.content" name="message" placeholder="Type here..."/>
            <button type="submit">Send</button>
            </form>
        </div>
    </section>
</template>