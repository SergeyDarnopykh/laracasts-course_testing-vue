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
            <input type="text" name="title" v-model="form.title" />
            <textarea name="body" v-model="form.body" />

            <button id="cancel" @click="cancel">Cancel</button>
            <button id="update" @click="update">Update</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['dataQuestion'],

        data() {
            return {
                question: this.dataQuestion,
                form: {
                    title: this.dataQuestion.title,
                    body: this.dataQuestion.body
                },
                editing: false
            }
        },

        methods: {
            cancel() {
                this.editing = false
            },

            update() {
                this.question.title = this.form.title
                this.question.body = this.form.body

                this.editing = false
            }
        }
    }
</script>