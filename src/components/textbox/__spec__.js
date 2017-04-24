import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Textbox from './textbox';

describe('Textbox', () => {
  let instance;
  let spy = jasmine.createSpy('spy')

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Textbox
      name="Dummy Box"
      id="Dummy Box"
      value={ 'foo' }
      label={ 'Label' }
      onChange={ spy }
      data-element="my textbox"
      data-member="my textbox member"
    />);
  });

  describe('render', () => {
    it('renders a parent div', () => {
      let textboxNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(textboxNode.classList[0]).toEqual('carbon-textbox');
    });

    it('renders with data-component, data-element and data-member tags', () => {
      let textboxNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(textboxNode.getAttribute('data-component')).toEqual('textbox');
      expect(textboxNode.getAttribute('data-element')).toEqual('my textbox');
      expect(textboxNode.getAttribute('data-member')).toEqual('my textbox member');
    });

    it('renders with a visible input', () => {
      let input = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
      expect(input.getAttribute('name')).toBe('Dummy Box');
    });

    it('is decorated with a label', () => {
      let label = TestUtils.findRenderedDOMComponentWithTag(instance, 'label')
      expect(label.getAttribute('for')).toEqual('Dummy Box');
    });

    it('is decorated with a validation if a error is present', () => {
      instance.setState({errorMessage: 'Error', valid: false});
      let errorDiv = TestUtils.findRenderedDOMComponentWithClass(instance, 'common-input__message--error')
      expect(errorDiv.textContent).toEqual('Error')
    });
  });

  describe('mainClasses', () => {
    it('returns carbon-textbox and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('carbon-textbox common-input');
    });
  });

  describe('inputClasses', () => {
    it('returns carbon-textbox__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('carbon-textbox__input common-input__input');
    });
  });

  describe('Passing a custom onChange', () => {
    it('triggers the custom function', () => {
      let input = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
      TestUtils.Simulate.change(input);
      expect(spy).toHaveBeenCalled();
    });
  });
});
