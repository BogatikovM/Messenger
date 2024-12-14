<script setup>
import axios from 'axios'

const props = defineProps({
  memberName: String,
  isAdmin: Boolean,
  isMemberAdmin: Boolean,
  chatName: String
})

const emit = defineEmits(['updateMembers'])

const handleMemberPromote = async () => {
  const memberData = {
    name: props.memberName,
    chat: props.chatName
  }
  try {
    const response = await axios.post('/api/chat/user/promote', memberData)
    emit('updateMembers')
  } catch (error) {
    console.error('Promoting failure', error)
  }
}

const handleMemberDemote = async () => {
  const memberData = {
    name: props.memberName,
    chat: props.chatName
  }
  try {
    const response = await axios.post('/api/chat/user/demote', memberData)
    emit('updateMembers')
  } catch (error) {
    console.error('Demoting failure', error)
  }
}

const handleMemberDelete = async () => {
  const memberData = {
    name: props.memberName,
    chat: props.chatName
  }
  try {
    const response = await axios.post('/api/chat/user/delete', memberData)
    emit('updateMembers')
  } catch (error) {
    console.error('Deleting failure', error)
  }
}
</script>

<template>
  <div
    class="flex items-center justify-between p-2 bg-white rounded-lg shadow hover:shadow-lg transition"
  >
    <p class="text-gray-800 px-2 py-1">{{ memberName }}</p>
    <div class="flex space-x-2">
      <button
        v-if="isAdmin && !isMemberAdmin"
        @click="handleMemberPromote"
        class="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition"
      >
        Повысить
      </button>
      <button
        v-if="isAdmin && isMemberAdmin"
        @click="handleMemberDemote"
        class="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
      >
        Понизить
      </button>
      <button
        v-if="isAdmin"
        @click="handleMemberDelete"
        class="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
      >
        Удалить
      </button>
    </div>
  </div>
</template>
