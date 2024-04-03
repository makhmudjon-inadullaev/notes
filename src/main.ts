import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './style.css'
import notesService from './services/notes.service'
import { createPinia } from 'pinia';
import { useAuthStore } from './store/auth.store'
import Vue3Lottie from 'vue3-lottie'
// import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App)

app.use(router)
app.use(notesService)
app.use(createPinia()) //.use(piniaPluginPersistedstate))
const { authService } = useAuthStore();
app.use(authService)
app.use(Vue3Lottie, { name: 'LottieAnimation' })

app.mount('#app')
