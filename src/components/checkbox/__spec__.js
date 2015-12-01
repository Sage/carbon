import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Checkbox from './index';

describe('Checkbox', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Checkbox
        name='checkbox'
        label='checkbox'
      />
    )
  });

  describe('render', () => {
    it('renders a parent div with a pod CSS class', () => {
      let checkboxNode = TestUtils.findRenderedDOMComponentWithTag(instance, 'div')
      expect(checkboxNode.classList[0]).toEqual('ui-checkbox');
    });

    it('renders a input with type checkbox and a value of 1', () => {
      let checkbox = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
      expect(checkbox.type).toEqual('checkbox');
      expect(checkbox.value).toEqual('1');
    });

    it('renders a checkbox_sprite to be used as the visible input', () => {
      let sprite = TestUtils.findRenderedDOMComponentWithTag(instance, 'svg');
      let check = TestUtils.findRenderedDOMComponentWithTag(instance, 'path');
      expect(sprite.getAttribute('viewBox')).toEqual('0 0 15 15');
      expect(check.className.baseVal).toEqual('checkbox-check');
    });

    it('renders a hidden input with a value of 0', () => {
      let checkbox = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1];
      expect(checkbox.type).toEqual('hidden');
      expect(checkbox.value).toEqual('0');
    });
  });

  describe('mainClasses', () => {
    it('returns ui-checkbox and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('ui-checkbox base-input');
    });
  });

  describe('inputClasses', () => {
    it('returns ui-checkbox__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('ui-checkbox__input base-input__input');
    });
  });

  describe('handleOnChange', () => {
    beforeEach(() => {
      spyOn(instance, '_handleOnChange')
    });

    it('passes the checked value', () => {
      let checkbox = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
      TestUtils.Simulate.change(checkbox, {target: { checked: true }});
      expect(instance._handleOnChange).toHaveBeenCalledWith({ target: { value: true }});
    });
  });
});
