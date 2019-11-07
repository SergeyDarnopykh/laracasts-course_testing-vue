import { mount } from 'vue-test-utils'
import { describe, it, beforeEach } from 'mocha';
import CouponCode from '../src/components/CouponCode.vue'
import expect from 'expect'

describe('Reminders', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(CouponCode)

        wrapper.setData({
            coupons: [
                {
                    code: '50OFF',
                    message: '50% Off!',
                    discount: 50
                }
            ]
        })
    })

    it('accepts a coupon code', () => {
        wrapper.contains('input.coupon-code')
    })

    it ('validates a real coupon code', () => {
        enterCouponCode('50OFF')

        expect(wrapper.vm.valid).toBe(true)

        expect(wrapper.html()).toContain('Coupon Redeemed: 50% Off!')
    })

    it ('validates a fake coupon code', () => {
        enterCouponCode('NOTREAL')

        expect(wrapper.html()).toContain('Invalid coupon code')
    })

    it ('broadcasts the percentage discount when a valid coupon code is applied', () => {
       enterCouponCode('50OFF')
        //
        // wrapper.setData({
        //     code: '50OFF'
        // })
        //
        // wrapper.vm.validate()

        expect(wrapper.emitted().applied).toBeTruthy();
        expect(wrapper.emitted().applied[0]).toEqual([50]);
    })

    function enterCouponCode(code) {
        const couponCode = wrapper.find('input.coupon-code')

        couponCode.element.value = code
        couponCode.trigger('input')
    }
})