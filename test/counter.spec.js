import { mount } from 'vue-test-utils'
import { describe, it, beforeEach } from 'mocha';
import Counter from '../src/components/Counter.vue'
import expect from 'expect'

describe('Counter', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Counter)
    }),

    // To trigger only one test use
    // it.only

    it ('defaults to a count of 0', () => {
        expect(wrapper.vm.count).toBe(0)
    })

    it ('increments the count when the increment button is clicked', () => {
        expect(wrapper.vm.count).toBe(0)

        wrapper.find('.increment').trigger('click')

        expect(wrapper.vm.count).toBe(1)
    })

    it ('decrements the count when the increment button is clicked', () => {
        wrapper.setData({ count: 5 })

        wrapper.find('.decrement').trigger('click') // 1

        expect(wrapper.vm.count).toBe(4)
    })

    it ('never goes below zero', ()=> {
        expect(wrapper.vm.count).toBe(0)

        expect(wrapper.find('.decrement').hasStyle('display', 'none')).toBe(true)

        wrapper.setData({ count: 1 })

        expect(wrapper.find('.decrement').hasStyle('display', 'none')).toBe(false)

        // expect(wrapper.vm.count).toBe(0)
    })

    it('presents the current count', () => {
        expect(wrapper.vm.count).toBe(0)

        wrapper.find('.increment').trigger('click')

        expect(wrapper.find('.count').html()).toContain(1)
    })
})