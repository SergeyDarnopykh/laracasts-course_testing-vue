<template>
    <div>
        <div v-if="!editing">
            <!-- Viewing the question-->
            <h1>{{ question.title }}</h1>
            <div class="body">
                {{ question.body }}
            </div>
            <button id="edit" @click="editing = true">Edit</button>
        </div>

        <div v-if="editing">
            <!-- Editing the question-->
            <input type="text" name="title" v-model="form.title" />
            <textarea name="body" v-model="form.body" />

            <button id="cancel" @click="cancel">Cancel</button>
            <button id="update" @click="update">Update</button>
        </div>

        <div v-if="feedback">Your question has been updated</div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        props: ['dataQuestion'],

        data() {
            return {
                question: this.dataQuestion,
                form: {
                    title: this.dataQuestion.title,
                    body: this.dataQuestion.body
                },
                feedback: false,
                editing: false
            }
        },

        methods: {
            cancel() {
                this.editing = false
            },

            async update() {
                this.question.title = this.form.title
                this.question.body = this.form.body
                this.editing = false

                const { data } = await axios.post('/questions/1', this.form)

                this.feedback = true
            }
        }
    }
</script>