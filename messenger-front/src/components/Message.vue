<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';

const props = defineProps({
  message: Object,
});

</script>

<template>
  <div class="p-2 bg-gray-100 rounded shadow-sm">
       <p class="font-semibold">{{ message.sender }}</p>
       <p>{{ message.content }}</p>
       <p class="text-gray-500 text-sm">{{ message.time_created }}</p>
  </div>
</template>