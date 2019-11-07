<template>
    <div>
        <input type="text" class="coupon-code" v-model="code" @input="validate" />

        <div v-if="valid">
            Coupon Redeemed: {{ message }}
        </div>
        <div v-else>
            Invalid coupon code
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                code: '',
                coupons: [
                    {
                        code: '10OFF',
                        message: '10% Off!',
                        discount: 10
                    },
                    {
                        code: 'Free',
                        message: 'Entirely Free!',
                        discount: 100
                    }
                ],
                valid: false
            }
        },

        methods: {
            validate() {
                this.valid = Boolean(this.selectedCoupon)

                if (this.valid) {
                    this.$emit('applied', this.selectedCoupon.discount)
                }
            },
        },

        computed: {
            selectedCoupon() {
                return this.coupons.find(coupon => coupon.code === this.code)
            },

            message() {
                return this.selectedCoupon && this.selectedCoupon.message
            }
        }
    }
</script>