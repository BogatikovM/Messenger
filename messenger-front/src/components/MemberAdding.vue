<script setup>
import { reactive, defineEmits } from 'vue'
import axios from 'axios'

const form = reactive({
  memberName: ''
})

const props = defineProps({
  chatName: String
})

const emit = defineEmits(['updateMembers'])

const handleAddingMember = async () => {
  const addingData = {
    name: form.memberName,
    chat: props.chatName
  }
  try {
    const response = await axios.post('/api/chat/user/add', addingData)
    emit('updateMembers')
    form.memberName = ''
  } catch (error) {
    console.error('Adding failure', error)
  }
}
</script>

<template>
  <div class="mb-4">
    <form @submit.prevent="handleAddingMember" class="flex">
      <input
        type="text"
        v-model="form.memberName"
        name="memberName"
        placeholder="Member name"
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
