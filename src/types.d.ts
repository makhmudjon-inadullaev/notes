namespace app {
    import { User } from '@auth0/auth0-spa-js';

    type NoteStoreType = {
        notes: NoteType[]
    }
    type MoodStoreType = {
        moods: {
            id: number
            class: string
            icon: string
            title: string
        }[]
    }
    type AuthStoreType = {
        authService: Auth0Plugin,
        isLoading: Ref<boolean>,
        roles: ('user' | 'admin')[],
        isAdmin:  Ref<boolean>
        user: Ref<User>
    }
    type NoteType = {
        id: number,
        author: {
            picture: string
            email: string
            name: string
        },
        moodId: number
        text: string
        createdAt: string
        updatedAt: string
    }

    namespace storage {
        interface IKeyValueStorage {
            getData(): Promise<app.NoteType[]>
            setData(data: app.NoteType[]): Promise<void>
        }
        type GistsConfigType = {
            id: string
            token: string
            name: string
        } 
    }
}