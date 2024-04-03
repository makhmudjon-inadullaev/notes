import { useMoodStore } from '../mood.store';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

describe('useMoodStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes correctly', () => {
    const store = useMoodStore()

    expect(store.moods).toBeDefined()
    expect(store.moods.length).toBeGreaterThan(0)
  })

  it('contains correct mood data', () => {
    const store = useMoodStore()

    store.moods.forEach(mood => {
      expect(mood.id).toBeDefined()
      expect(mood.class).toBeDefined()
      expect(mood.icon).toBeDefined()
      expect(mood.title).toBeDefined()
    })
  })
})
