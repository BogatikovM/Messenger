<script setup>
import { reactive } from 'vue';
import router from '@/router';

const form = reactive({
    login: '',
    password: '',
    passwordConfirm: '',
    username: ''
})

const handleRegister = async () => {
    console.log('register')
    router.push('/')
}
</script>
<template>
<section>
    <div>
        <form @submit.prevent="handleRegister">
            <h2>Register</h2>
            <div>
                <label for="login">Login</label>
                <input type="text" v-model="login" name="login" id="login" placeholder="" >
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" v-model="password" name="password" id="password" placeholder="" >
            </div>
            <div>
                <label for="password">Confirm password</label>
                <input type="password" v-model="passwordConfirm" name="passwordConfirm" id="passwordConfirm" placeholder="" >
            </div>
            <div>
                <label for="username">Username</label>
                <input type="text" v-model="passwordConfirm" name="username" id="username" placeholder="" >
            </div>
            <div type="submit">
                <button>Register</button>
            </div>
        </form>
    </div>
</section>
</template>