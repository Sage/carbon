import React from 'react';
import TestUtils from 'react-dom/test-utils';
import RadioButton from './radio-button';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

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
      expect(radioButtonNode.classList[0]).toEqual('carbon-radio-button');
    });

    it('renders an input with type radiobutton and a checked value of false', () => {
      let radiobutton = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
      expect(radiobutton.type).toEqual('radio');
      expect(radiobutton.checked).toBeFalsy();
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
    it('returns carbon-radio-button and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('carbon-radio-button common-input');
    });
  });

  describe('inputClasses', () => {
    it('returns carbon-radio-button__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('carbon-radio-button__input common-input__input');
    });
  });

  describe('fieldHelpClasses', () => {
    it('returns carbon-radio-button__help-text', () => {
      expect(instance.fieldHelpClasses).toEqual('carbon-radio-button__help-text common-input__help-text');
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(<RadioButton data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'radio-button', 'bar', 'baz');
    });
  });
});
