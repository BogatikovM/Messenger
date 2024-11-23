<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';

const props = defineProps({
  message: Object,
  user: String
});

const isMine = computed(() => {
  return props.message.sender == props.user
})
const rawTime = new Date(props.message.time_created)
const hours = rawTime.getHours().toString()
const minutes = rawTime.getMinutes().toString()
const day = rawTime.getDate().toString()
const month = rawTime.getMonth().toString()
const time = `${hours.length == 2? hours: '0' + hours}:${minutes.length == 2? minutes: '0' + minutes} ${day.length == 2? day: '0' + day}.${month.length > 1? month: '0' + month}`

</script>

<template>
  <div :class="[ isMine ? 'bg-green-100' : 'bg-gray-100', 'p-4', 'rounded-lg', 'shadow-md', 'mb-2']">
    <div class="flex justify-between items-start mb-1">
      <p class="font-semibold text-lg">{{ message.sender }}</p>
      <p class="text-gray-500 text-sm">{{ time }}</p>
    </div>
    <p class="text-gray-800 break-words">{{ message.content }}</p>
  </div>
</template>