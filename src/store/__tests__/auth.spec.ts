import { useAuthStore } from '../auth.store';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes correctly', () => {
    const store = useAuthStore()
    expect(store.authService).toBeDefined()
  })

  it('returns correct isLoading state', () => {
    const store = useAuthStore()

    expect(store.isLoading).toBe(true)

    store.authService.isLoading = false

    expect(store.isLoading).toBe(false)
  })

  it('returns correct isAdmin state', () => {
    const store = useAuthStore()

    store.authService.idTokenClaims = {
      value: {
        [`${import.meta.env.VITE_AUTH0_DOMAIN}/roles`]: ['user']
      }
    }

    expect(store.isAdmin).toBe(false)

    store.authService.idTokenClaims.value = {
        [`${import.meta.env.VITE_AUTH0_DOMAIN}/roles`]: ['admin']
    }

    expect(store.isAdmin).toBe(true)
  })

  it('calls login() correctly', async () => {
    const store = useAuthStore()

    store.authService.loginWithRedirect = vi.fn()

    await store.login()

    expect(store.authService.loginWithRedirect).toHaveBeenCalled()
  })

  it('calls logout() correctly', async () => {
    const store = useAuthStore()
    store.authService.logout = vi.fn()

    await store.logout()
    expect(store.authService.logout).toHaveBeenCalled()
  })
})
