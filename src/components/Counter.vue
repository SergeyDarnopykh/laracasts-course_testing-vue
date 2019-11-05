<template>
    <div>
        <span class="count">{{ count }}</span>
        <button class="increment" @click="count++"></button>
        <button v-show="count > 0" class="decrement" @click="decreaseCount"></button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        },

        methods: {
            decreaseCount() {
                this.count > 0 && this.count--
            },
        }
    }
</script>