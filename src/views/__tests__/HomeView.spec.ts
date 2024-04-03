import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'
import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { reactive } from 'vue'

describe('HomeView', () => {
  it('renders properly', () => {
    const authServiceMock = { isLoading: true, isAuthenticated: false, login: vi.fn(), logout: vi.fn() }
    const notesMock = reactive([])

    const wrapper = mount(HomeView, {
        global: {
            plugins: [
                createTestingPinia({
                    initialState: {
                        AuthStore: {
                            authService: authServiceMock,
                            notes: notesMock
                        }
                    },
                    createSpy: vi.fn
                })
            ]
        }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('displays loading animation when authService.isLoading is true', async () => {
    const authServiceMock = { isLoading: true, isAuthenticated: false, login: vi.fn(), logout: vi.fn() }
    const notesMock = reactive([])

    const wrapper = mount(HomeView, {
      global: {
        plugins: [
            createTestingPinia({
                initialState: {
                    AuthStore: {
                        authService: authServiceMock,
                        notes: notesMock
                    }
                },
                createSpy: vi.fn
            })
        ]
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#lottie-loading').exists()).toBe(true)
  })

  it('toggles theme when theme button is clicked', async () => {
    const authServiceMock = { isLoading: false, isAuthenticated: false, login: vi.fn(), logout: vi.fn() }
    const notesMock = reactive([])

    const wrapper = mount(HomeView, {
      global: {
        plugins: [
            createTestingPinia({
                initialState: {
                    AuthStore: {
                        authService: authServiceMock,
                        notes: notesMock
                    }
                },
                createSpy: vi.fn
            })
        ]
      }
    })

    const themeButton = wrapper.find('button#theme-button')
    await themeButton.trigger('click')

    expect(document.body.classList.contains('dark')).toBe(true)

    await themeButton.trigger('click')

    expect(document.body.classList.contains('dark')).toBe(false)
  })

  it('displays logout button when authService.isAuthenticated is true', async () => {
    const authServiceMock = { isLoading: false, isAuthenticated: true, login: vi.fn(), logout: vi.fn() }
    const notesMock = reactive([])

    const wrapper = mount(HomeView, {
      global: {
        plugins: [
            createTestingPinia({
                initialState: {
                    AuthStore: {
                        authService: authServiceMock,
                        notes: notesMock
                    }
                },
                createSpy: vi.fn
            })
        ]
      }
    })

    expect(wrapper.find('button#logout').exists()).toBe(true)
  })

  it('calls authService.logout() when logout button is clicked', async () => {
    const authServiceMock = { isLoading: false, isAuthenticated: true, login: vi.fn(), logout: vi.fn() }
    const notesMock = reactive([])

    const wrapper = mount(HomeView, {
      global: {
        plugins: [
            createTestingPinia({
                initialState: {
                    AuthStore: {
                        authService: authServiceMock,
                        notes: notesMock
                    }
                },
                createSpy: vi.fn
            })
        ]
      }
    })

    const logoutButton = wrapper.find('button#logout')
    await logoutButton.trigger('click')

    expect(authServiceMock.logout).toHaveBeenCalled()
  })
})
