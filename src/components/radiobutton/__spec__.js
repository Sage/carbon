
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Radiobutton from './radiobutton';

describe('Radiobutton', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Radiobutton
        name='radiobutton'
        label='radiobutton'
      />
    )
  });

  describe('render', () => {
    it('renders a parent div with a pod CSS class', () => {
      let radioButtonNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(radioButtonNode.classList[0]).toEqual('ui-radiobutton');
    });

    it('renders a input with type radiobutton and a value of 1', () => {
      let radiobutton = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1];
      expect(radiobutton.type).toEqual('radio');
      expect(radiobutton.value).toEqual('');
    });

   it('renders a radiobuttonSprite to be used as the visible input', () => {
      let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[2];
      let sprite = div.firstChild;
      let radio = sprite.getElementsByTagName('path')[0]

      expect(sprite.getAttribute('viewBox')).toEqual('0 0 15 15');
      expect(radio.className.baseVal).toEqual('radiobutton-outline');
    });

    it('renders a hidden input with a value of 0', () => {
      let radiobutton = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
      expect(radiobutton.type).toEqual('hidden');
      expect(radiobutton.value).toEqual('0');
    });
  });

  describe('mainClasses', () => {
    it('returns ui-radiobutton and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('ui-radiobutton common-input');
    });
  });

  describe('inputClasses', () => {
    it('returns ui-radiobutton__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('ui-radiobutton__input common-input__input');
    });
  });

  describe('handleOnChange', () => {
    beforeEach(() => {
      spyOn(instance, '_handleOnChange')
    });

    it('passes the checked value', () => {
      let radiobutton = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1];
      TestUtils.Simulate.change(radiobutton, {target: { checked: true }});
      expect(instance._handleOnChange).toHaveBeenCalledWith({ target: { value: true }});
    });
  });
});