<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';

const props = defineProps({
  chat: Object,
});

</script>

<template>
   <div>
        <p>{{ chat.name }}</p>
   </div>
</template>