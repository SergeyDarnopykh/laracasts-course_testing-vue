import { mount } from 'vue-test-utils'
import { describe, it, beforeEach, afterEach } from 'mocha';
import Countdown from '../src/components/Countdown.vue'
import expect from 'expect'
import moment from 'moment'
import sinon from 'sinon'

const time = {
    DAY: 1000 * 60 * 60 * 24,
    HOUR: 1000 * 60 * 60,
    MINUTE: 1000 * 60,
    SECOND: 1000
}

describe('Countdown', () => {
    let wrapper, vm, clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers()
        wrapper = mount(Countdown)
        vm = wrapper.vm

        wrapper.setProps({ until: moment().add(10, 'seconds') })
    })

    afterEach(() => {
        clock.restore()
    })

    it ('renders a countdown time', () => {
        see('0 Days')
        see('0 Hours')
        see('0 Minutes')
        see('10 Seconds')
    })

    it ('reduces the countdown every second', (done) => {
        see('10 Seconds')

        clock.tick(time.SECOND)

        assertOnNextTick(() => {
            see('9 Seconds')
        }, done)
    })

    it ('shows an expired message when the countdown has completed', (done) => {
        clock.tick(10 * time.SECOND)

        assertOnNextTick(() => {
            see('Now expired')
        }, done)
    })

    it ('shows a custom expired message when the countdown has completed', (done) => {
        wrapper.setProps({ expiredText: 'Custom expired message'})

        clock.tick(10 * time.SECOND)

        assertOnNextTick(() => {
            see('Custom expired message')
        }, done)
    })

    it ('broadcasts when the countdown is finished', (done) => {
        clock.tick(10 * time.SECOND)

        assertOnNextTick(() => {
            expectEvent('finished')
        }, done)
    })

    it ('clears the interval while completed', (done) => {
        clock.tick(10 * time.SECOND)

        expect(wrapper.vm.now.getSeconds()).toBe(10)

        assertOnNextTick(() => {
            clock.tick(5 * time.SECOND)

            expect(wrapper.vm.now.getSeconds()).toBe(10)
        }, done)
    })

    let assertOnNextTick = (cb, done) => {
        vm.$nextTick(() => {
            try {
                cb()

                done()
            } catch(err) {
                done(err)
            }
        })
    }

    let expectEvent = (event) => {
        expect(wrapper.emitted()[event]).toBeTruthy()
    }

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrap.html()).toContain(text)
    }

    let type = (text, selector) => {
        const node = wrapper.find(selector)

        node.element.value = text
        node.trigger('input')
    }

    let click = selector => {
        wrapper.find(selector).trigger('click')
    }
})