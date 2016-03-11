import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import RadioButton from './radio-button';

describe('RadioButton', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <RadioButton
        name='radiobutton'
        label='radiobutton'
      />
    )
  });

  describe('render', () => {
    it('renders a parent div with a pod CSS class', () => {
      let radioButtonNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(radioButtonNode.classList[0]).toEqual('ui-radio-button');
    });

    it('renders a input with type radiobutton and a value of 1', () => {
      debugger
      let radiobutton = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
      expect(radiobutton.type).toEqual('radio');
      expect(radiobutton.value).toEqual('');
    });

   it('renders a radiobuttonSprite to be used as the visible input', () => {
      let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[2];
      let sprite = div.firstChild;
      let radio = sprite.getElementsByTagName('path')[0]

      expect(sprite.getAttribute('viewBox')).toEqual('0 0 15 15');
      expect(radio.className.baseVal).toEqual('radio-button-outline');
    });
  });

  describe('mainClasses', () => {
    it('returns ui-radio-button and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('ui-radio-button common-input');
    });
  });

  describe('inputClasses', () => {
    it('returns ui-radio-button__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('ui-radio-button__input common-input__input');
    });
  });
});
