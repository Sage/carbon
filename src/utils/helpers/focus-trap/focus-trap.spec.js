import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import focusTrap from './focus-trap';

// eslint-disable-next-line
const TestComponent = ({ children }) => {
  useEffect(() => {
    const removeFocusTrap = focusTrap(document.getElementById('myComponent'));

    return () => removeFocusTrap();
  });

  return (
    <a
      href='test'
      id='myComponent'
    >
      {children}
    </a>
  );
};

describe('focusTrap', () => {
  const element = document.createElement('div');
  const htmlElement = document.body.appendChild(element);
  const tabKey = new KeyboardEvent('keydown', { keyCode: 9 });
  const shiftKey = new KeyboardEvent('keydown', { shiftKey: true });
  const shiftTabKey = new KeyboardEvent('keydown', { keyCode: 9, shiftKey: true });
  const otherKey = new KeyboardEvent('keydown', { keyCode: 32 });

  describe('when focusTrap is used to an element', () => {
    describe('and element has focusable items inside', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(
          <TestComponent>
            <button type='button'>Test button One</button>
            <button type='button'>Test button Two</button>
          </TestComponent>,
          { attachTo: htmlElement }
        );
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it('should focus first focusable item', () => {
        expect(document.activeElement).toMatchObject(wrapper.find('button').at(0));
      });

      it('should not move if different key than TAB is pressed', () => {
        document.querySelectorAll('button')[1].focus();
        document.dispatchEvent(otherKey);
        expect(document.activeElement).toMatchObject(wrapper.find('button').at(1));
      });

      it('should back to the last item when use `shift + tab` on first focusable item', () => {
        document.querySelectorAll('button')[0].focus();
        expect(document.activeElement).toMatchObject(wrapper.find('button').at(0));
        document.dispatchEvent(shiftTabKey);
        expect(document.activeElement).toMatchObject(wrapper.find('button').at(1));
      });

      it('should back to the first item when use `shift + tab`', () => {
        document.querySelectorAll('button')[1].focus();
        document.dispatchEvent(shiftTabKey);
        expect(document.activeElement).toMatchObject(wrapper.find('button').at(0));
      });

      it('should go to the second item when use TAB', () => {
        expect(document.activeElement).toMatchObject(wrapper.find('button').at(0));
        document.dispatchEvent(tabKey);
        expect(document.activeElement).toMatchObject(wrapper.find('button').at(1));
      });

      it('should move to the first focusable item if TAB pressed on last focusable item', () => {
        document.querySelectorAll('button')[1].focus();
        expect(document.activeElement).toMatchObject(wrapper.find('button').at(1));
        document.dispatchEvent(tabKey);
        expect(document.activeElement).toMatchObject(wrapper.find('button').at(0));
      });
    });

    describe('and element does not have focusable items', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(
          <TestComponent>
            <p>Test content</p>
          </TestComponent>,
          { attachTo: htmlElement }
        );
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it('should block tabbing if `tab` pressed', () => {
        document.getElementById('myComponent').focus();
        document.dispatchEvent(tabKey);
        expect(document.activeElement).toMatchObject(wrapper);
      });

      it('should block shift tabbing if `shift + tab` is pressed', () => {
        document.getElementById('myComponent').focus();
        document.dispatchEvent(shiftKey);
        expect(document.activeElement).toMatchObject(wrapper);
      });
    });
  });
});
