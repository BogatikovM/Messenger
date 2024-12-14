<script setup>
import { reactive, inject, ref, nextTick } from 'vue'
import axios from 'axios'
import Message from './Message.vue'
import ChatInfo from './ChatInfo.vue'

const form = reactive({
  content: '',
  messageId: '',
  isUpdate: false
})

const state = reactive({
  messages: [],
  isActive: false,
  currentChat: '',
  user: '',
  isInfo: false
})

const bottom = ref(null)

const goToBottom = async () => {
  await nextTick()
  bottom.value?.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest' })
}

const { currentChat, updateCurrentChat } = inject('currentChat')
const emitter = inject('emitter')

emitter.on('chatChanged', async () => {
  try {
    const response = await axios.get(`/api/chat/messages?chat=${currentChat.value}`)
    state.messages = response.data.data
    state.user = response.data.user
    state.isActive = true
    state.isInfo = false
    state.currentChat = currentChat.value
  } catch (error) {
    console.log('Error fetching messages', error)
  }
  goToBottom()
})

const handleMessage = async () => {
  if (form.content.trim() == '') {
    return
  }
  try {
    if (form.isUpdate) {
      const messageData = {
        newContent: form.content,
        messageId: form.messageId,
        chat: currentChat.value
      }
      const response = await axios.post('/api/chat/message/update', messageData)
    } else {
      const messageData = { content: form.content, chat: currentChat.value }
      const response = await axios.post('/api/chat/send', messageData)
    }
    updateMessages()
  } catch (error) {
    console.error('Sending failure', error)
  }
}

const toggleInfo = () => {
  state.isInfo = !state.isInfo
}

const setContent = (oldContent, messageId) => {
  form.content = oldContent
  form.messageId = messageId
  form.isUpdate = true
}

const updateMessages = async () => {
  try {
    const response = await axios.get(`/api/chat/messages?chat=${currentChat.value}`)
    state.messages = response.data.data
    state.user = response.data.user
    state.isActive = true
    state.isInfo = false
    state.currentChat = currentChat.value
    form.content = ''
  } catch (error) {
    console.log('Error fetching messages', error)
  }
  goToBottom()
}
</script>
<template>
  <section class="h-full flex flex-raw">
    <div :class="[state.isInfo ? 'w-3/4' : 'w-full', 'flex', 'flex-col', 'px-2']">
      <div class="flex justify-center">
        <h2
          @click="toggleInfo()"
          class="text-2xl font-bold mb-4 text-emerald-500 hover:text-emerald-700 hover:cursor-pointer"
        >
          {{ state.currentChat }}
        </h2>
      </div>
      <div ref="messageContainer" class="flex-1 overflow-y-auto">
        <Message
          v-for="message in state.messages"
          :key="message.id"
          :message="message"
          :user="state.user"
          :chat="currentChat"
          @updateMessage="setContent"
          class="mb-2"
        />
        <div ref="bottom"></div>
      </div>
      <div v-if="state.isActive" class="mt-4">
        <form @submit.prevent="handleMessage()" class="flex">
          <input
            type="textarea"
            v-model="form.content"
            name="message"
            placeholder="Начните ввод..."
            class="border border-gray-300 rounded p-2 flex-1 mr-2"
          />
          <button
            @click="goToBottom"
            v-if="form.content.trim() !== ''"
            type="submit"
            class="bg-emerald-500 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-600 transition duration-200"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
    <div v-if="state.isActive && state.isInfo" :class="[{ 'w-1/4': state.isInfo }, 'flex', 'px-2']">
      <ChatInfo :chatName="state.currentChat" :user="state.user"></ChatInfo>
    </div>
  </section>
</template>
