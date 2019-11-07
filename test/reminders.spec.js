import { mount } from 'vue-test-utils'
import { describe, it, beforeEach } from 'mocha';
import Reminders from '../src/components/Reminders.vue'
import expect from 'expect'

describe('Reminders', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(Reminders)
    })

    it ('hides the reminders list if there are none', () => {
        expect(wrapper.contains('ul')).toBe(false)
    })

    it ('can add reminders', () => {
        const body = 'Go to the store'

        addReminder(body)

        expect(remindersList()).toContain(body)
    })

    it ('can remove any reminder', () => {
        addReminder('Go to the store')
        addReminder('Finish screencasts')

        let deleteButton = wrapper.find('ul > li:first-child .remove')

        deleteButton.trigger('click')

        expect(remindersList()).not.toContain('Go to the store')
        expect(remindersList()).toContain('Finish screencasts')
    })

    function addReminder(body) {
        const newReminder = wrapper.find('.new-reminder')

        newReminder.element.value = body
        newReminder.trigger('input')

        wrapper.find('.add-reminder').trigger('click')
    }

    function remindersList() {
        return wrapper.find('.reminders').text()
    }
})