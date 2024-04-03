import { mount } from '@vue/test-utils'
import CallbackView from '../CallbackView.vue'
import { describe, expect, it } from 'vitest'


describe('CallbackView', () => {
  it('renders properly', () => {
    const wrapper = mount(CallbackView)
    expect(wrapper.exists()).toBe(true)
  })
  it('there is an animation', () => {
    const wrapper = mount(CallbackView)
    const animation = wrapper.find('#lottie-animation')
    expect(animation.exists()).toBe(true)
  })
})
