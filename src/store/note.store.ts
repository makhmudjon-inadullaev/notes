import { defineStore } from "pinia";
import { useAuthStore } from "./auth.store";
import { NotesService } from "../services/notes.service";

function authenticate<T>(callBack: (authStore: app.AuthStoreType, notesService: NotesService) => T, defaultValue?: T): T {
    const authStore = useAuthStore()
    if(authStore.isLogged()) {
        const service = NotesService.getInstance()
        return callBack(authStore, service)
    }
    console.error('User is not authenticated')
    return defaultValue!
}

export const useNoteStore = defineStore('NoteStore', {
    state: (): app.NoteStoreType => {
        return authenticate<app.NoteStoreType>((_, service) => ({
            notes: service.getNotes().value
        }), { notes: [] })
    },
    actions: {
        isMine(noteId: number) {
            const { user } = useAuthStore()
            const note = this.notes.find(note => note.id === noteId)
            return user.email === note?.author?.email
        },
        isExist(text: string) {
            return !!this.notes.find(note => note.text === text)
        },
        async create(text: string, moodId: number) {
            await authenticate(async ({ user }, service) => {
                await service.create({
                    id: Date.now(),
                    moodId,
                    author: {
                        picture: user.picture,
                        email: user.email,
                        name: user.name,
                    },
                    text,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                })
            })
        },
        async update(id: number, text: string) {
            await authenticate(async (_, service) => {
                await service.update(id, text)
            })
        },
        async delete(id: number) {
            await authenticate(async (_, service) => {
                await service.delete(id)
            })
        }
    }
})