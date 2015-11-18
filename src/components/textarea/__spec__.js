import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Textarea from './index';

describe('Textarea', () => {
  let instance;
  let spy = jasmine.createSpy('spy')

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Textarea
      name="Dummy Area"
      value={ 'foo' }
      label={ 'Label' }
      cols={10}
      rows={10}
      onChange={ spy }
    />);
  });

  describe('render', () => {
    it('renders a parent div', () => {
      let textareaNode = TestUtils.findRenderedDOMComponentWithTag(instance, 'div')
      expect(textareaNode.classList[0]).toEqual('ui-textarea');
    });

    it('renders with a visible input with rows and columns', () => {
      let input = TestUtils.findRenderedDOMComponentWithTag(instance, 'textarea')
      expect(input.tagName).toEqual("TEXTAREA");
      expect(input.getAttribute('label')).toBe('Label');
      expect(input.rows).toBe(10);
      expect(input.cols).toBe(10);
    });

    it('is decorated with a label', () => {
      let label = TestUtils.findRenderedDOMComponentWithTag(instance, 'label')
      expect(label.getAttribute('for')).toEqual('Dummy Area');
    });

    it('is decorated with a validation if a error is present', () => {
      instance.setState({errorMessage: 'Error'});
      let errorDiv = TestUtils.findRenderedDOMComponentWithClass(instance, 'base-input__message--error')
      expect(errorDiv.textContent).toEqual('Error')
    });
  });

  describe('mainClasses', () => {
    it('returns ui-textarea and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('ui-textarea base-input');
    });
  });

  describe('inputClasses', () => {
    it('returns ui-textarea__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('ui-textarea__input base-input__input');
    });
  });

  describe('Passing a custom onChange', () => {
    it('triggers the custom function', () => {
      let input = TestUtils.findRenderedDOMComponentWithTag(instance, 'textarea');
      TestUtils.Simulate.change(input);
      expect(spy).toHaveBeenCalled();
    });
  });
});
