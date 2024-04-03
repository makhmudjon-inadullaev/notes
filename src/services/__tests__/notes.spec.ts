import { NotesService } from '../notes.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('NotesService', () => {
    let testNotes: app.NoteType[];
    let mockStorage: app.storage.IKeyValueStorage
    let service: NotesService

    beforeEach(() => {
        testNotes = [
            {
                id: 1,
                author: {
                    email: 'example@example.com',
                    name: 'example',
                    picture: 'https://example.com/example.png'
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                moodId: 6,
                text: 'test text',
            }
        ]
        mockStorage = {
            getData: vi.fn().mockResolvedValue(testNotes),
            setData: vi.fn(),
        }
        service = new NotesService(mockStorage)
    })
    
  it('Testing initialization and getNotes', async () => {
        expect(service.getNotes().value).toEqual([])
        await service.initialize()
        expect(service.getNotes().value).toEqual(testNotes)
  })
  it('Testing delete', async () => {
        await service.initialize()
        await service.delete(testNotes[0].id)
        expect(service.getNotes().value).toEqual([])
  })
  it('Testing update', async () => {
        await service.initialize()
        await service.update(testNotes[0].id, 'helloworld')
        expect(service.getNotes().value[0].text).toEqual('helloworld')
    })
    it('Testing create', async () => {
        await service.initialize()
        await service.create({ ...testNotes[0], id: 55 })
        expect(service.getNotes().value.length).toEqual(2)
        expect(service.getNotes().value[1].id).toEqual(55)
    })
})
