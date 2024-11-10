<script setup>
    const props = defineProps({
        memberName: String,
    });
</script>

<template>
    <div class="flex items-center justify-between p-2 bg-white rounded-lg shadow hover:shadow-lg transition">
        <p class="text-gray-800 px-2 py-1">{{ memberName }}</p>
        <div class="flex space-x-2">
            <button class="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition">Promote</button>
            <button class="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition">Remove</button>
        </div>
    </div>
</template>