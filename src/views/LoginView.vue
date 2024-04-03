<template>
    <h1>Login Page</h1>
    <button id="login" @click="authService.login()">Login</button>
</template>
<script setup lang="ts">
import { useAuthStore } from '../store/auth.store';
const { authService } = useAuthStore()
</script>
