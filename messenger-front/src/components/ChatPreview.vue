<script setup>
const props = defineProps({
  chat: Object
})
</script>

<template>
  <div class="p-2 border-b border-gray-200">
    <p class="font-medium">{{ chat.name }}</p>
  </div>
</template>
