<template>
<template v-if="authService.isLoading">
    <div class="div h-[100vh] box-border grid place-items-center">
        <LottieAnimation id="lottie-loading" :animationData="lottieLoading" :height="400" :width="400"/>
    </div>
</template>
<template v-else>
    <header class="border-b dark:border-gray-400 border-gray-800 gap-6 py-4 px-8 flex justify-end">
        <button id="theme-button" @click="changeTheme()" class="dark:text-white">
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
        </button>
        <button id="logout" class="text-red-500 hover:opacity-50" v-if="!authService.isLoading && authService.isAuthenticated" @click="authService.logout()">Logout</button>
    </header>
    <div class="mx-auto container py-20 px-6">
        <transition-group tag="div" name="notes" class="grid sm:grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <NoteComponent v-for="note in notes" :key="note.id" @edit="noteId => editingNoteId = noteId" @delete="id => deleteNote(id)" @save="text => updateNote(note.id, text)" :editingNoteId="editingNoteId" :note="note"/>
        </transition-group>
    </div>
    <CreateNoteComponent />
</template>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import lottieLoading from '../assets/lottie-loading.json'
import NoteComponent from '../components/Note.vue'
import CreateNoteComponent from '../components/CreateNote.vue'
import { useAuthStore } from '../store/auth.store.ts'
import { useNoteStore } from '../store/note.store.ts';
const { authService } = useAuthStore()

const editingNoteId = ref()
const isDark = ref(false)

const { notes: allNotes, update, delete: deleteNote } = useNoteStore()

const notes = computed(() => allNotes.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1))

function changeTheme() {
    if(document.body.classList.contains('dark')) {
        document.body.classList.remove('dark')
        localStorage.removeItem('theme')
        isDark.value = false
    } else {
        document.body.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        isDark.value = true
    }
}

function updateNote(id: number, text: string) {
    update(id, text)
    editingNoteId.value = undefined
}

onMounted(() => {
    isDark.value = document.body.classList.contains('dark')
})
</script>

