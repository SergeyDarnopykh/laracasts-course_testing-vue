import { mount } from 'vue-test-utils'
import { describe, it, beforeEach } from 'mocha';
import Question from '../src/components/Question.vue'
import expect from 'expect'

describe('Question', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        })
    })

    it ('presents the title and the body', () => {
        see('The title')
        see('The body')
    })

    it ('can be edited', () => {
        expect(wrapper.contains('input[name=title')).toBe(false)

        click('#edit')

        expect(wrapper.find('input[name=title]').element.value).toBe('The title')
        expect(wrapper.find('textarea[name=body]').element.value).toBe('The body')
    })

    it ('hides the edit button during edit mode', () => {
        click('#edit')

        expect(wrapper.contains('#edit')).toBe(false)
    })

    it ('updates the question after being edited', () => {
        click('#edit')

        type('input[name=title]', 'Changed title')
        type('textarea[name=body]', 'Changed body')

        click('#update')

        see('Changed title')
        see('Changed body')
    })

    it ('can cancel out of edit mode', () => {
        click('#edit')

        type('input[name=title]', 'Changed title')
        type('textarea[name=body]', 'Changed body')

        click('#cancel')

        see('The title')
        see('The body')
    })

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrap.html()).toContain(text)
    }

    let type = (selector, text) => {
        const node = wrapper.find(selector)

        node.element.value = text
        node.trigger('input')
    }

    let click = selector => {
        wrapper.find(selector).trigger('click')
    }
})