<script setup>
import { RouterLink } from 'vue-router';
import ChatPreview from './ChatPreview.vue';
import ChatAdding from './ChatAdding.vue';
import { reactive, onMounted, inject } from 'vue';
import axios from 'axios';

const state = reactive({
  chats: [],
  isAdding: false
})

const toggleAdding = () => {
  state.isAdding = !state.isAdding;
};

const { currentChat, updateCurrentChat } = inject('currentChat')

const emitter = inject('emitter'); // Inject `emitter`
const changeChat = () => {
  emitter.emit('chatChanged', 100);
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/chat');
    state.chats = response.data.data;
  } catch (error) {
    console.log('Error fetching chats', error);
  }
})

</script>

<template>
    <section>
        <div>
            <h2>Chats</h2>
            <button @click="toggleAdding">{{ state.isAdding ? 'Cancel' : 'Add' }}</button>
            <ChatAdding v-if="state.isAdding"/>
        </div>
        <div>
            <ChatPreview @click="updateCurrentChat(chat.name); changeChat()" v-for="chat in state.chats" :key="chat.id" :chat="chat"/>
        </div>
    </section>
</template>