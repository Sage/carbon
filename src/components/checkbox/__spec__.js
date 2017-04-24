import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import Checkbox from './checkbox';
import Help from './../help';

describe('Checkbox', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Checkbox
        name='checkbox'
        label='checkbox'
      />
    );
  });

  describe('render', () => {
    it('renders a parent div with a pod CSS class', () => {
      let checkboxNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(checkboxNode.classList[0]).toEqual('carbon-checkbox');
    });

    it('renders a input with type checkbox and a value of 1', () => {
      let checkbox = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1];
      expect(checkbox.type).toEqual('checkbox');
      expect(checkbox.value).toEqual('1');
    });

    it('renders a checkboxSprite to be used as the visible input', () => {
      let sprite = TestUtils.findRenderedDOMComponentWithTag(instance, 'svg');
      let check = TestUtils.findRenderedDOMComponentWithTag(instance, 'path');
      expect(sprite.getAttribute('viewBox')).toEqual('0 0 15 15');
      expect(check.className.baseVal).toEqual('checkbox-check');
    });

    it('renders a hidden input with a value of 0', () => {
      let checkbox = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
      expect(checkbox.type).toEqual('hidden');
      expect(checkbox.value).toEqual('0');
    });
  });

  describe('mainClasses', () => {
    it('returns carbon-checkbox and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('carbon-checkbox common-input');
    });
  });

  describe('inputClasses', () => {
    it('returns carbon-checkbox__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('carbon-checkbox__input common-input__input');
    });
  });

  describe('handleOnChange', () => {
    beforeEach(() => {
      spyOn(instance, '_handleOnChange')
    });

    it('passes the checked value', () => {
      let checkbox = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1];
      TestUtils.Simulate.change(checkbox, {target: { checked: true }});
      expect(instance._handleOnChange).toHaveBeenCalledWith({ target: { value: true }});
    });
  });

  describe('reverse set to false', () => {
    it('sets reverse to false by default', () => {
      expect(instance.props.reverse).toBeFalsy();
    });

    it('renders with the label on the right by default', () => {
      let label = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'label')[0];
      expect(label.previousSibling.className).toEqual('common-input__field');
      expect(label.nextSibling).toBe(null);
    });
  });

  describe('reverse set to true', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Checkbox
          name='checkbox'
          label='checkbox'
          reverse={ true }
        />
      )
    });

    it('renders with the label on the left', () => {
      let label = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'label')[0];
      expect(label.previousSibling).toBe(null);
      expect(label.nextSibling.name).toEqual('checkbox');
    });
  });

  describe('fieldHelperClasses', () => {
    it('returns the classNames to apply to the label help text', () => {
      instance = TestUtils.renderIntoDocument(
        <Checkbox
          name='checkbox'
          label='checkbox'
          fieldHelp='foo'
        />
      );
      expect(instance.fieldHelpClasses).toMatch('carbon-checkbox__help-text');
    });

    describe('when label is inline', () => {
      it('returns a modified inline class', () => {
        instance = TestUtils.renderIntoDocument(
          <Checkbox
            name='checkbox'
            label='checkbox'
            fieldHelp='foo'
            reverse={ true }
            fieldHelpInline={ true }
          />
        );
        expect(instance.fieldHelpClasses).toMatch('carbon-checkbox__help-text carbon-checkbox__help-text--reverse carbon-checkbox__help-text--inline');
      });
    });

    describe('when the label is reversed', () => {
      it('returns a modified reverse class', () => {
        instance = TestUtils.renderIntoDocument(
          <Checkbox
            name='checkbox'
            label='checkbox'
            fieldHelp='foo'
            reverse={ true }
          />
        );
        expect(instance.fieldHelpClasses).toMatch('carbon-checkbox__help-text carbon-checkbox__help-text--reverse');
      });
    });
  });
});
