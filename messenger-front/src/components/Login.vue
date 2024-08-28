<script setup>
import { reactive, onMounted, defineComponent, inject } from 'vue';
import { RouterLink } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import router from '@/router';

const { cookies } = useCookies()

const form = reactive({
    login: '',
    password: ''
})

const handleLogin = async () => {
    console.log('login')
    cookies.set("token", "tok")
    const token = cookies.get('token')
    if (token) {
        router.push('/home')
    }
}

onMounted(() => {
    const token = cookies.get('token')
    if (token) {
        router.push('/home')
    }
})
</script>

<template>
<section>
    <div>
        <form @submit.prevent="handleLogin">
            <h2>Login</h2>
            <div>
                <label for="login">Login</label>
                <input type="text" v-model="login" name="login" id="login" placeholder="" >
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" v-model="password" name="password" id="password" placeholder="" >
            </div>
            <div type="submit">
                <button>Login</button>
            </div>
            <div>
                <RouterLink to="/register">
                    Register
                </RouterLink>
            </div>
        </form>
    </div>
</section>
</template>