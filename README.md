# Testing Vue

## Mocha framework

### Test structure
```js
import { mount } from 'vue-test-utils'
import { describe, it, beforeEach, afterEach } from 'mocha';
import Component from '../src/components/Component.vue'
import expect from 'expect'
    
describe('Component name', () => {
    let wrapper, vm;

        // Called before each test
    beforeEach(() => {
        wrapper = mount(Countdown)
        vm = wrapper.vm
    })

        // Called after each test
    afterEach(() => {
        // do smth
    })

    it ('does something', () => {
        // code that tests a feature
    })
})
```
    

### Common helpers (can be put in setup.js)
```js
// Check if event is emitted
let expectEvent = (event) => {
    expect(wrapper.emitted()[event]).toBeTruthy()
}

// Check if given text is visible inside the given selector 
// (or just inside the component)
let see = (text, selector) => {
    let wrap = selector ? wrapper.find(selector) : wrapper;

    expect(wrap.html()).toContain(text)
}

// Simulate user input
let type = (text, selector) => {
    const node = wrapper.find(selector)

    node.element.value = text
    node.trigger('input')
}

// Simulate click
let click = selector => {
    wrapper.find(selector).trigger('click')
}
```
    

## Main ideas

Because of writing this kind of tests:

- You can be less afraid to do the refactoring. If you break something

You need to decide how close will your tests be binded to your implementation.

You can test how your code works (what is set in the data of the component) or what the user sees (how is your data represented to the user). Usually the second approach is preferred, but it depends.
