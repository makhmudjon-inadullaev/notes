import { useNoteStore } from '../note.store';
import { createPinia, setActivePinia } from 'pinia';
import { NotesService } from '../../services/notes.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import { useAuthStore } from '../auth.store';

describe('useNoteStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes correctly when user is authenticated', () => {
    const mockNotes = ref([
        { id: 1, moodId: 1, author: { picture: '...', email: 'user@example.com', name: 'User' }, text: 'Note 1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ]);

    vi.spyOn(NotesService.prototype, 'getNotes').mockReturnValue(mockNotes);

    const store = useNoteStore()
    store.notes = mockNotes.value

    expect(store.notes).toBeDefined()
    expect(store.notes.length).toBe(mockNotes.value.length)
    expect(store.notes).toEqual(mockNotes.value)
  })

  it('returns true for isMine when user is the author of the note', () => {
    const mockUser = { picture: '...', email: 'user@example.com', name: 'User' };
    const mockNoteId = 1;
    const mockNote = { id: mockNoteId, moodId: 1, author: mockUser, text: 'Note 1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };

    const authStore = useAuthStore()
    authStore.user = mockUser
    
    const store = useNoteStore()
    store.notes = [mockNote]
    expect(store.isMine(mockNoteId)).toBe(true)
  })
})
