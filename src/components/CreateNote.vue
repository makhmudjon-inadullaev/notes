<template>
    <div class="flex justify-center w-full">
        <div class="flex items-start min-w-[500px] space-x-4">
            <div class="flex-shrink-0">
                <img class="inline-block h-10 w-10 rounded-full" :src="user.picture" alt="">
            </div>
            <div class="min-w-0 flex-1">
                <form @submit.prevent="onCreateNote()">
                <div :class="{ 'focus-within:border-red-600': !!error }" class="border-b border-gray-200 focus-within:border-indigo-600">
                    <label for="comment" class="sr-only">Add your comment</label>
                    <textarea @blur="validate()" :class="{ 'border-red-500 focus:border-red-600': !!error }" v-model="content" rows="3" name="comment" id="comment" class="block bg-transparent dark:text-white w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Add your comment..."></textarea>
                </div>
                <span id="error-text" v-if="!!error" class="text-red-500">{{  error  }}</span>
                <div class="flex justify-between pt-2">
                    <div class="flex items-center space-x-5">
                    <div class="flow-root">
                        <div>
                        <label id="listbox-label" class="sr-only">Your mood</label>
                        <div class="relative">
                            <button @click="showSelectMood = !showSelectMood" type="button" class="relative -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                                <span class="flex items-center justify-center">
                                    <span>
                                        <span v-html="selectedMood?.icon" :class="selectedMood?.class" class="flex h-8 w-8 items-center justify-center rounded-full"></span>
                                        <span class="sr-only">{{  selectedMood?.title  }}</span>
                                    </span>
                                </span>
                            </button>
                            <ul :class="{ 'opacity-0': !showSelectMood, 'opacity-100 transition ease-in duration-100': showSelectMood }" class="absolute z-10 -ml-6 w-60 rounded-lg bg-white dark:bg-gray-500 py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-5">
                                <li v-for="mood in moods" @click="onSelectMood(mood.id)" class="bg-transparent cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 relative select-none px-3 py-2" id="listbox-option-0" role="option">
                                    <div class="flex items-center">
                                    <div v-html="mood.icon" :class="mood.class" class="flex h-8 w-8 items-center justify-center rounded-full" />
                                    <span class="ml-3 block truncate font-medium dark:text-white">{{  mood.title  }}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="flex-shrink-0">
                        <button :disabled="!!error || !content" type="submit" class="inline-flex items-center rounded-md bg-indigo-600 disabled:bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Post</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMoodStore } from '../store/mood.store.ts'
import { useAuthStore } from '../store/auth.store.ts'
import { useNoteStore } from '../store/note.store.ts'

const { moods } = useMoodStore()
const { user } = useAuthStore()
const { create, isExist } = useNoteStore()

const error = ref<string>('')

const content = ref<string>('')

const showSelectMood = ref<boolean>(false)

const moodId = ref<number>(1)

const selectedMood = computed(() => moods.find(mood => mood.id === moodId.value))

function validate() {
    const exists = isExist(content.value)
    if(exists) {
        error.value = 'Note with identical text, already exists'
        return false
    }
    if(!content.value) {
        error.value = 'Must not be empty'
        return false
    }
    error.value = ''
    return true
}

function onSelectMood(id: number) {
    moodId.value = id
    showSelectMood.value = false
}

function onCreateNote() {
    const isValid = validate()
    if(isValid) {
        console.log('validasasdfsafas')
        console.log(content.value)
        create(content.value, moodId.value)
        content.value = ''
        moodId.value = 2
    } else {
        console.log('Heyfsdfdsfsfd')
        console.log(content.value)
    }
}
</script> 