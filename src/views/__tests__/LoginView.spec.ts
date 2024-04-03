import { mount } from '@vue/test-utils'
import LoginView from '../LoginView.vue'
import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

describe('LoginView', () => {
  it('renders properly', () => {
    const wrapper = mount(LoginView, {
        global: {
            plugins: [
                createTestingPinia({
                    createSpy: vi.fn
                })
            ]
        }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('There is a login button', async () => {
    const wrapper = mount(LoginView, {
        global: {
            plugins: [
                createTestingPinia({
                    createSpy: vi.fn
                })
            ]
        }
    })
    const loginButton = wrapper.find('button#login')
    expect(loginButton.exists()).toBe(true)
  })
})
