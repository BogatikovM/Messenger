<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';

const props = defineProps({
  message: Object,
});

</script>

<template>
   <div>
    <p>{{ message.sender }}</p>
    <p>{{ message.content }}</p>
    <p>{{ message.time_created }}</p>
   </div>
</template>