<template>
    <div>
        <input class="new-reminder" v-model="newReminder" />

        <button class="add-reminder" @click="add">Add reminder</button>

        <ul class="reminders" v-if="reminders.length">
            <li v-for="reminder in reminders" :key="reminder">
                {{ reminder }}
                <button class="remove" @click="remove(reminder)">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newReminder: '',
                reminders: []
            }
        },

        methods: {
            add() {
                this.reminders.push(this.newReminder)

                this.newReminder = ''
            },

            remove(reminderToRemove) {
                this.reminders = this.reminders.filter(reminder => reminder !== reminderToRemove)
            }
        }
    }
</script>