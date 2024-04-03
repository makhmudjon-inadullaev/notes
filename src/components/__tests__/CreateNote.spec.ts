import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount, VueWrapper } from '@vue/test-utils'
import CreateNote from '../CreateNote.vue'

describe('CreateNoteComponent', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(CreateNote, {
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        AuthStore: {
                            user: { picture: 'path/to/test-picture.jpg' }
                        }
                    },
                    createSpy: vi.fn
                })],
            },
        })
    })

    it('renders properly', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays user picture', () => {
        const picture = 'path/to/test-picture.jpg'
        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)
        expect(img.attributes('src')).toBe(picture)
      })

      it('emits create event when form is submitted with invalid content', async () => {
        const form = wrapper.find('form')
        await form.trigger('submit.prevent')
        console.log(wrapper.html())
        const errorText = wrapper.find('#error-text')
        expect(wrapper.emitted('create')).toBeFalsy()
        expect(errorText.exists()).toBe(true)
        expect(errorText.element.innerHTML).toBe('Must not be empty')
      })

      it('does not emit create event when form is submitted with invalid content', async () => {
        const wrapper = mount(CreateNote)
        const form = wrapper.find('form')
        await form.trigger('submit.prevent')
        expect(wrapper.emitted('create')).toBeFalsy()
      })
})
