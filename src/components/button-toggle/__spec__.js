import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import ButtonToggle from './button-toggle';

describe('ButtonToggle', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<ButtonToggle><span>Plus</span></ButtonToggle>);
  });

  describe('mainClasses', () => {
    it('returns the classes for the component', () => {
      expect(instance.mainClasses).toEqual('carbon-button-toggle common-input');
    });
  });

  describe('input classes', () => {
    it('returns the classes for the input', () => {
      expect(instance.inputClasses).toEqual('carbon-button-toggle__input hidden common-input__input');
    });
  });

  describe('buttonIcon', () => {
    describe('with no buttonIcon', () => {
      it('returns nothing', () => {
        expect(instance.buttonIcon).toBe(null);
      });
    });

    describe('with an buttonIcon', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <ButtonToggle buttonIcon='settings'><span>Plus</span></ButtonToggle>
        );
      });

      it('returns the buttonIcon', () => {
        expect(instance.buttonIcon.props.className).toEqual('carbon-button-toggle__button-icon');
      });
    });

    describe('with a large buttonIcon', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <ButtonToggle buttonIcon='settings' buttonIconSize='large'><span>Plus</span></ButtonToggle>
        );
      });

      it('returns a large buttonIcon', () => {
        expect(instance.buttonIcon.props.className).toEqual(
          'carbon-button-toggle__button-icon carbon-button-toggle__button-icon--large'
        );
      });
    });
  });

  describe('additionalInputContent', () => {
    it('returns the label', () => {
      expect(instance.additionalInputContent.props.className).toEqual('carbon-button-toggle__label');
    });

    describe('if it is disabled', () => {
      it('returns a disabled label', () => {
        instance = TestUtils.renderIntoDocument(
          <ButtonToggle disabled={ true }><span>Plus</span></ButtonToggle>
        );

        expect(instance.additionalInputContent.props.className).toEqual(
          'carbon-button-toggle__label carbon-button-toggle__label--disabled'
        );
      });
    });
  });

  describe('label id', () => {
    it('assigns the guid as the label id', () => {
      expect(instance.inputProps.id).toEqual(instance._guid);
    });

    it('assigns a custom id if one is given', () => {
      instance = TestUtils.renderIntoDocument(<ButtonToggle id='foo'><span>Plus</span></ButtonToggle>);
      expect(instance.inputProps.id).toEqual('foo');
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<ButtonToggle data-element='bar' data-role='baz'>Test</ButtonToggle>);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'button-toggle', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(<ButtonToggle>Test</ButtonToggle>);

      elementsTagTest(wrapper, [
        'input',
        'label'
      ]);
    });
  });
});
