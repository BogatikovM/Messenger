<script setup>
    import { reactive, onMounted } from 'vue';
    import axios from 'axios';
    import Member from './Member.vue';

    const state = reactive({
        chatInfo: {}
    })

    const props = defineProps({
        chatName: String,
    });

    onMounted(async () => {
        try {
            const response = await axios.get(`/api/chat/info?chat=${props.chatName}`);
            state.chatInfo = response.data.data[0];
        } catch (error) {
            console.log('Error fetching info', error);
        }
        })
</script>

<template>
    <section class="p-4 bg-gray-100 rounded-lg shadow-md text-center">
        <h2 class="text-xl font-bold mb-4">{{ state.chatInfo.name }}</h2>
        <div class="space-y-2">
            <Member 
                v-for="member in state.chatInfo.members" 
                :key="member" 
                :memberName="member"
            />
        </div>
    </section>
</template>