<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const props = defineProps({
  message: Object,
  user: String,
  chat: String
})

const isMine = computed(() => {
  return props.message.sender == props.user
})
const rawTime = new Date(props.message.time_created)
const hours = rawTime.getHours().toString()
const minutes = rawTime.getMinutes().toString()
const day = rawTime.getDate().toString()
const month = rawTime.getMonth().toString()
const time = `${hours.length == 2 ? hours : '0' + hours}:${minutes.length == 2 ? minutes : '0' + minutes} ${day.length == 2 ? day : '0' + day}.${month.length > 1 ? month : '0' + month}`
const contextMenuVisible = ref(false)

const contextMenuX = ref(0)
const contextMenuY = ref(0)

const showContextMenu = (event) => {
  contextMenuX.value = event.clientX
  contextMenuY.value = event.clientY
  contextMenuVisible.value = true
}

const hideContextMenu = () => {
  contextMenuVisible.value = false
}

const deleteMessage = async () => {
  const deleteData = {
    messageId: props.message._id,
    chat: props.chat
  }

  try {
    const response = await axios.post('/api/chat/message/delete', deleteData)
  } catch (error) {
    console.error('Deleting failure', error)
  }
}
</script>

<template>
  <div
    :class="[isMine ? 'bg-green-100' : 'bg-gray-100', 'p-4', 'rounded-lg', 'shadow-md', 'mb-2']"
    @contextmenu.prevent="showContextMenu"
    @click="hideContextMenu"
  >
    <div class="flex justify-between items-start mb-1">
      <p class="font-semibold text-lg">{{ message.sender }}</p>
      <p class="text-gray-500 text-sm">{{ time }}</p>
    </div>
    <p class="text-gray-800 break-words">{{ message.content }}</p>

    <div
      v-if="contextMenuVisible"
      :style="{ top: `${contextMenuY}px`, left: `${contextMenuX}px` }"
      class="absolute bg-white border rounded shadow-lg z-10"
    >
      <ul class="py-1">
        <li
          @click="$emit('updateMessage', message.content, message._id)"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          Update
        </li>
        <li @click="deleteMessage()" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
      </ul>
    </div>
  </div>
</template>
