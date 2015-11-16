import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Textbox from './index';

describe('Textbox', () => {
  let instance;
  let spy = jasmine.createSpy('spy')

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Textbox
      name="Dummy Box"
      value={ 'foo' }
      label={ 'Label' }
      onChange={ spy }
    />);
  });

  describe('render', () => {
    it('renders a parent div', () => {
      let textboxNode = TestUtils.findRenderedDOMComponentWithTag(instance, 'div')
      expect(textboxNode.classList[0]).toEqual('ui-textbox');
    });

    it('renders with a visible input', () => {
      let input = TestUtils.findRenderedDOMComponentWithTag(instance, 'input')
      expect(input.tagName).toEqual("INPUT");
      expect(input.getAttribute('label')).toBe('Label');
    });

    it('is decorated with a label', () => {
      let label = TestUtils.findRenderedDOMComponentWithTag(instance, 'label')
      expect(label.getAttribute('for')).toEqual('Dummy Box');
    });

    it('is decorated with a validation if a error is present', () => {
      instance.setState({errorMessage: 'Error'});
      let errorDiv = TestUtils.findRenderedDOMComponentWithClass(instance, 'base-input__message--error')
      expect(errorDiv.textContent).toEqual('Error')
    });
  });

  describe('mainClasses', () => {
    it('returns ui-textbox and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('ui-textbox base-input');
    });
  });

  describe('inputClasses', () => {
    it('returns ui-textbox__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('ui-textbox__input base-input__input');
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
