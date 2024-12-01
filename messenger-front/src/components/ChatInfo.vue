<script setup>
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import Member from './Member.vue'
import MemberAdding from './MemberAdding.vue'

const state = reactive({
  chatInfo: {},
  isAdmin: false
})

const props = defineProps({
  chatName: String,
  user: String
})

const handleLeave = async () => {
  const leaveData = {
    chat: props.chatName
  }
  try {
    const response = await axios.post('/api/chat/user/leave', leaveData)
  } catch (error) {
    console.error('Leaving failure', error)
  }
}

const updateMembers = async () => {
  try {
    const response = await axios.get(`/api/chat/info?chat=${props.chatName}`)
    state.chatInfo = response.data.data
    state.chatInfo.members.splice(state.chatInfo.members.indexOf(props.user), 1)
    state.isAdmin = response.data.isAdmin
  } catch (error) {
    console.log('Error fetching info', error)
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(`/api/chat/info?chat=${props.chatName}`)
    state.chatInfo = response.data.data
    state.chatInfo.members.splice(state.chatInfo.members.indexOf(props.user), 1)
    state.isAdmin = response.data.isAdmin
  } catch (error) {
    console.log('Error fetching info', error)
  }
})
</script>

<template>
  <section class="p-4 bg-gray-100 rounded-lg shadow-md text-center">
    <h2 class="text-xl font-bold mb-2">{{ state.chatInfo.name }}</h2>
    <div>
      <MemberAdding @updateMembers="updateMembers" :chatName="chatName" />
    </div>
    <button
      @click="handleLeave"
      class="bg-red-500 text-white font-semibold py-2 px-4 mb-4 w-full rounded hover:bg-red-600 transition duration-200"
    >
      Leave
    </button>
    <div class="space-y-2">
      <div
        class="flex items-center justify-between p-2 bg-white rounded-lg shadow hover:shadow-lg transition"
      >
        <p class="text-gray-800 px-2 py-1">{{ user }}</p>
      </div>
      <Member
        @updateMembers="updateMembers"
        v-for="member in state.chatInfo.members"
        :key="member"
        :memberName="member"
        :isAdmin="state.isAdmin"
        :isMemberAdmin="state.chatInfo.admins.includes(member)"
        :chatName="chatName"
      />
    </div>
  </section>
</template>
