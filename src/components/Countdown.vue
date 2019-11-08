<template>
    <div>
        <div v-if="remaining > 0">
            <div class="days">{{ remaining.days() }} Days, </div>
            <div class="hours">{{ remaining.hours() }} Hours, </div>
            <div class="minutes">{{ remaining.minutes() }} Minutes, </div>
            <div class="seconds">{{ remaining.seconds() }} Seconds </div>
        </div>
        <div v-else>
            {{ expiredText }}
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        props: {
            until: null,
            expiredText: { default: 'Now expired' }
        },

        data () {
            return {
                now: new Date(),
                interval: null
            }
        },

        computed: {
            remaining() {
                const remaining = moment.duration(Date.parse(this.until) - this.now)

                if (remaining <= 0) {
                    this.$emit('finished')
                }

                return remaining
            },
        },

        mounted() {
            this.interval = setInterval(() => {
                this.now = new Date()
            }, 1000)

            this.$on('finished', ()=> clearInterval(this.interval))
        },

        destroyed() {
            clearInterval(this.interval)
        }
    }
</script>