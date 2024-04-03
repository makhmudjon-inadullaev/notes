import { mount } from '@vue/test-utils'
import NoteComponent from '../Note.vue'
import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useNoteStore } from '../../store/note.store'

describe('NoteComponent', () => {
  it('renders properly', () => {
    const note = {
      author: {
        picture: 'path/to/picture.jpg',
        name: 'John Doe',
        email: 'john@example.com'
      },
      moodId: 1,
      text: 'Test note',
      id: 1,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    const wrapper = mount(NoteComponent, {
      props: {
        note,
        editingNoteId: undefined
      },
      global: {
        plugins: [createTestingPinia({
            initialState: {
                AuthStore: {},
                NoteStore: {}
            },
            stubActions: false,
            createSpy: vi.fn
        })],
    },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays author information', () => {
    const note = {
      author: {
        picture: 'path/to/picture.jpg',
        name: 'John Doe',
        email: 'john@example.com'
      },
      moodId: 1,
      text: 'Test note',
      id: 1,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    const wrapper = mount(NoteComponent, {
      props: {
        note,
        editingNoteId: undefined
      },
      global: {
            plugins: [createTestingPinia({
                initialState: {
                    AuthStore: {},
                    NoteStore: {}
                },
                createSpy: vi.fn
            })],
        },
    })

    const authorName = wrapper.find('span#author-name')
    const authorEmail = wrapper.find('span#author-email')

    expect(authorName.text()).toBe(note.author.name)
    expect(authorEmail.text()).toBe(note.author.email)
  })

  it('emits "edit" event when edit button is clicked', async () => {
    const note = {
      author: {
        picture: 'path/to/picture.jpg',
        name: 'John Doe',
        email: 'john@example.com'
      },
      moodId: 1,
      text: 'Test note',
      id: 1,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    const pinia = createTestingPinia({
        initialState: {
            AuthStore: {},
            NoteStore: {}
        },
        createSpy: vi.fn
    })
    const noteStore = useNoteStore(pinia)
    vi.mocked(noteStore.isMine).mockReturnValue(true)
    const wrapper = mount(NoteComponent, {
      props: {
        note,
        editingNoteId: undefined
      },
      global: {
            plugins: [pinia],
        },
    })
    const editButton = wrapper.find('button#edit')
    await editButton.trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')!.length).toBe(1)
    expect(wrapper.emitted('edit')![0]).toEqual([note.id])
  })

  it('emits "delete" event when delete button is clicked', async () => {
    const note = {
      author: {
        picture: 'path/to/picture.jpg',
        name: 'John Doe',
        email: 'john@example.com'
      },
      moodId: 1,
      text: 'Test note',
      id: 1,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
    
    const pinia = createTestingPinia({
        initialState: {
            AuthStore: {},
            NoteStore: {}
        },
        createSpy: vi.fn
    })

    const noteStore = useNoteStore(pinia)
    vi.mocked(noteStore.isMine).mockReturnValue(true)
    const wrapper = mount(NoteComponent, {
      props: {
        note,
        editingNoteId: undefined
      },
      global: {
        plugins: [pinia]
      }
    })

    const deleteButton = wrapper.find('button#delete')
    await deleteButton.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')!.length).toBe(1)
    expect(wrapper.emitted('delete')![0]).toEqual([note.id])
  })
})
