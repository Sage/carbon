import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ButtonToggle from './button-toggle';

describe('ButtonToggle', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<ButtonToggle />);
  });

  describe('mainClasses', () => {
    it('returns the classes for the component', () => {
      expect(instance.mainClasses).toEqual('ui-button-toggle common-input');
    });
  });

  describe('input classes', () => {
    it('returns the classes for the input', () => {
      expect(instance.inputClasses).toEqual('ui-button-toggle__input hidden common-input__input');
    });
  });

  describe('icon', () => {
    describe('with no icon', () => {
      it('returns nothing', () => {
        expect(instance.icon).toBe(null);
      });
    });

    describe('with an icon', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(<ButtonToggle icon="settings" />);
      });

      it('returns the icon', () => {
        expect(instance.icon.props.className).toEqual('ui-button-toggle__icon');
      });
    });

    describe('with a large icon', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(<ButtonToggle icon="settings" iconSize="large" />);
      });

      it('returns a large icon', () => {
        expect(instance.icon.props.className).toEqual('ui-button-toggle__icon ui-button-toggle__icon--large');
      });
    });
  });

  describe('additionalInputContent', () => {
    it('returns the label', () => {
      expect(instance.additionalInputContent.props.className).toEqual('ui-button-toggle__label');
    });

    describe('if it is disabled', () => {
      it('returns a disabled label', () => {
        instance = TestUtils.renderIntoDocument(<ButtonToggle disabled={ true } />);
        expect(instance.additionalInputContent.props.className).toEqual('ui-button-toggle__label ui-button-toggle__label--disabled');
      });
    });
  });
});
