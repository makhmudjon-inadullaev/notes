<template>
<div>
    <div class="flex-shrink-0 gap-2 flex mb-2">
        <img class="inline-block h-10 w-10 rounded-full" :src="note.author.picture" alt="Loading">
        <div class="flex flex-col">
            <span id="author-name" class="font-normal text-gray-600 dark:text-white">{{ note.author.name }}</span>
            <span id="author-email" class="text-xs text-gray-400">{{ note.author.email }}</span>
        </div>
    </div>
    <div :class="className" class="w-full min-h-64 flex flex-col justify-between rounded-lg border border-gray-300 mb-6 py-5 px-4">
        <div>
            <div @keypress.enter="emit('save', content)" @input="e => content = (<HTMLDivElement>e.target).innerHTML" :ref="ref => setupRef(ref as HTMLDivElement)" :contenteditable="isEditable"  :class="{ 'opacity-60': isEditable, 'dark:text-white': note.moodId === 6}" class="select-none !bg-transparent leading-7 font-semibold w-11/12 resize-none outline-none h-full">{{ text }}</div>
        </div>
        <div>
            <div class="flex items-end justify-between text-gray-800">
                <p class="text-xs">{{  date  }}</p>
                <div class="flex gap-2">
                    <button id="delete" v-if="isAdmin || isMine(note.id)" @click="removeNote()" class="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-red-300 focus:ring-black" aria-label="edit note" role="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                    <button id="save" v-if="isEditable" @click="emit('save', content)" :class="{ 'bg-green-600': isEditable }" class="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-red-300 focus:ring-black" aria-label="edit note" role="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </button>
                    <button id="edit" v-else-if="isMine(note.id)" @click="emit('edit', note.id)" :class="{ 'bg-gray-600': isEditable }" class="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-red-300 focus:ring-black" aria-label="edit note" role="button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import { ref, computed, onUnmounted} from 'vue'
import { useMoodStore } from '../store/mood.store.ts'
import { useAuthStore } from '../store/auth.store.ts'
import { useNoteStore } from '../store/note.store.ts'

const props = defineProps<{
    editingNoteId: number | undefined
    note: app.NoteType
}>()

const { moods } = useMoodStore()
const { isMine } = useNoteStore()
const { isAdmin } = useAuthStore()

const content = ref<string>(props.note.text)

const isEditable = computed(() => props.editingNoteId === props.note.id)

const emit = defineEmits<{
   (e: 'edit', id: number): void
   (e: 'delete', id: number): void
   (e: 'save', text: string): void
}>()

function focusOnLastChar(editorDiv: HTMLDivElement) {
  const selection = window.getSelection();
  const range = document.createRange();

  if (!editorDiv.textContent) {
    return;
  }

  const textNode = editorDiv.lastChild!;
  const textLength = textNode.textContent!.length;

  range.setStart(textNode, textLength);
  range.setEnd(textNode, textLength);
  selection?.removeAllRanges();
  selection?.addRange(range);
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'contenteditable') {
        (<HTMLDivElement>mutation.target).focus();
        focusOnLastChar(<HTMLDivElement>mutation.target)
    }
  });
});

function removeNote() {
    observer.disconnect()
    emit('delete', props.note.id)
}

function setupRef(ref: HTMLDivElement) {
    if(ref) {
        observer.observe(ref, { attributes: true })
    }
}

onUnmounted(() => {
    observer.disconnect()
})

const className = computed(() => {
    const mood = moods.find(mood => mood.id === props.note.moodId)
    return mood?.class || ''
})

const text = ref(props.note.text)
const date = computed(() => new Date(props.note.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', year: 'numeric' }))
</script>

