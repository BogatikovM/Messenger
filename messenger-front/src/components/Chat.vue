<script setup>
import { reactive, onMounted, compile, inject } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'
import Message from './Message.vue';
import ChatInfo from './ChatInfo.vue'

const form = reactive({
  content:''
})

const state = reactive({
  messages: [],
  isActive: false,
  currentChat: '',
  isInfo: false
})

const { currentChat, updateCurrentChat } = inject('currentChat')

const emitter = inject('emitter');   // Inject `emitter`

emitter.on('chatChanged', async () => {   // *Listen* for event
  try {
    const response = await axios.get(`/api/chat/messages?chat=${currentChat.value}`);
    state.messages = response.data.data;
    state.isActive = true;
    state.currentChat = currentChat.value;
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

const toggleInfo = () => {
  state.isInfo = !state.isInfo
}
</script>

<template>
  <section class="h-full flex flex-raw">
      <div class="w-full flex flex-col px-2">
          <div class="flex justify-center">
            <h2 @click="toggleInfo()" class="text-2xl font-bold text-emerald-500 hover:text-emerald-700 hover:cursor-pointer">{{ state.currentChat }}</h2>
        </div>
        <div class="flex-1 overflow-y-auto">
            <Message 
                v-for="message in state.messages" 
                :key="message.id" 
                :message="message" 
                class="mb-2"
            />
        </div>
        <div v-if="state.isActive" class="mt-4">
            <form @submit.prevent="handleMessage" class="flex">
                <input 
                    type="text" 
                    v-model="form.content" 
                    name="message" 
                    placeholder="Type here..." 
                    class="border border-gray-300 rounded p-2 flex-1 mr-2"
                />
                <button type="submit" class="bg-emerald-500 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-600 transition duration-200">Send</button>
            </form>
        </div>
      </div>
      <div v-if="state.isActive && state.isInfo" class="flex px-2">
        <ChatInfo :chatName="state.currentChat"></ChatInfo>
      </div>
  </section>
</template>