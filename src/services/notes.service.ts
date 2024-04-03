import { App, ref, Ref } from "vue";
import { GistsService } from "./storages/gists.service";

export const NotesServiceToken = 'notesService'

export class NotesService {
    public static _instance: NotesService
    private _cache: Ref<app.NoteType[]> = ref([])

    constructor(private readonly storage: app.storage.IKeyValueStorage) {}

    static getInstance(storage?: app.storage.IKeyValueStorage) {
        if(!this._instance && storage) {
            this._instance = new NotesService(storage)
        }
        return this._instance
    }

    async initialize() {
        this._cache.value = await this.storage.getData()
    }

    getNotes(email?: string): Ref<app.NoteType[]> {
        if(email) {
            this._cache.value = this._cache.value.filter(note => note.author.email === email)
        }
        return this._cache;
    }
    async delete(id: number) {
        const index = this._cache.value.findIndex(note => note.id === id)
        this._cache.value.splice(index, 1)
        await this.storage.setData(this._cache.value)
    }
    async update(id: number, text: string) {
        const note = this._cache.value.find((note) => note.id === id)
        if(note) {
            note.text = text
            note.updatedAt = new Date().toISOString()
            await this.storage.setData(this._cache.value)
        }
    }
    async create(note: app.NoteType): Promise<app.NoteType[]> {
        this._cache.value.push(note)
        await this.storage.setData(this._cache.value)
        return this._cache.value
    }
}

export default {
    async install(app: App) {
        const service = NotesService.getInstance(
            new GistsService({
                id: import.meta.env.VITE_GISTS_ID,
                name: import.meta.env.VITE_GISTS_NAME,
                token: import.meta.env.VITE_GISTS_TOKEN,
            })
        )
        await service.initialize()
        app.provide(NotesServiceToken, service)
    },
}