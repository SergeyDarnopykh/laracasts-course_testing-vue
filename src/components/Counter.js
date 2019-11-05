export default {
    template: `
        <div>
            <span class="count">{{ count }}</span>
            <button @click="count++"></button>
        </div>
    `,
    data() {
        return {
            count: 0
        }
    }
}