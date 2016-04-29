import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
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
    />);
  });

  describe('render', () => {
    it('renders a parent div', () => {
      let textboxNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(textboxNode.classList[0]).toEqual('ui-textbox');
    });

    it('renders with a visible input', () => {
      let input = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
      expect(input.tagName).toEqual("INPUT");
      expect(input.getAttribute('label')).toBe('Label');
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
    it('returns ui-textbox and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('ui-textbox common-input');
    });
  });

  describe('inputClasses', () => {
    it('returns ui-textbox__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('ui-textbox__input common-input__input');
    });
  });

  describe('fieldHelperClasses', () => {
    it('returns the classNames to apply to the label help text', () => {
      expect(instance.fieldHelpClasses).toMatch('ui-textbox__help-text');
    });

    describe('when label is inline', () => {
      it('returns a modified inline class', () => {
        instance = TestUtils.renderIntoDocument(
          <Textbox
            name="Dummy Box"
            id="Dummy Box"
            value={ 'foo' }
            label={ 'Label' }
            labelInline='true'
            onChange={ spy }
          />
        );
        expect(instance.fieldHelpClasses).toMatch('ui-textbox__help-text ui-textbox__help-text--inline');
      });
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
