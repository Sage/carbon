import React from 'react';
import { shallow } from 'enzyme';

import { rootTagTest } from '../../utils/helpers/tags/tags-specs';

import ButtonToggleGroup from './button-toggle-group';
import ButtonToggle from './../button-toggle';

describe('ButtonToggleGroup', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(
      <ButtonToggleGroup
        label={ 'Label' }
        value={ 'foo' }
      >
        <ButtonToggle id={ 'test' }>Foo</ButtonToggle>
      </ButtonToggleGroup>
    );
    instance = wrapper.instance();
  });

  describe('componentWillReceiveProps', () => {
    describe('when the next value matches the current value', () => {
      it('does not call _handleContentChange', () => {
        spyOn(instance, '_handleContentChange');
        instance.componentWillReceiveProps({ value: instance.props.value });
        expect(instance._handleContentChange).not.toHaveBeenCalled();
      });
    });

    describe('when the next value does not match the current value', () => {
      it('calls _handleContentChange', () => {
        spyOn(instance, '_handleContentChange');
        instance.componentWillReceiveProps({ value: 'bar' });
        expect(instance._handleContentChange).toHaveBeenCalled();
      });
    });
  });

  describe('mainClasses', () => {
    describe('when no additional classes are passed through', () => {
      it('returns carbon-button-toggle-group and additional decorated classes', () => {
        expect(instance.mainClasses).toEqual('carbon-button-toggle-group common-input');
      });
    });

    describe('when additional classes are passed through', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ButtonToggleGroup
            className={ 'test-class' }
            label={ 'Label' }
            value={ 'foo' }
          >
            <ButtonToggle id={ 'test' }>Foo</ButtonToggle>
          </ButtonToggleGroup>
        );
        instance = wrapper.instance();
      });

      it('returns carbon-button-toggle-group and additional decorated classes', () => {
        expect(instance.mainClasses).toEqual('carbon-button-toggle-group test-class common-input');
      });
    });
  });

  describe('render', () => {
    it('renders a parent div', () => {
      const node = wrapper.find('.carbon-button-toggle-group');
      expect(node.length).toEqual(1);
    });

    describe('when the child components have an id prop', () => {
      it("is decorated with a label that references the first child's id", () => {
        const label = wrapper.find('.common-input__label');
        expect(label.prop('htmlFor')).toEqual('test');
      });
    });

    describe('when the child components do not have an id prop', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ButtonToggleGroup
            label={ 'Label' }
            value={ 'foo' }
          >
            <ButtonToggle>Foo</ButtonToggle>
          </ButtonToggleGroup>
        );
      });

      it('is decorated with a label', () => {
        const label = wrapper.find('.common-input__label');
        expect(label.prop('htmlFor')).toBeUndefined();
      });
    });

    it('is decorated with a validation if a error is present', () => {
      wrapper.setState({ errorMessage: 'Error', valid: false });
      const errorDiv = wrapper.find('.common-input__message--error');
      expect(errorDiv.prop('children')).toEqual('Error');
    });
  });

  describe('tags on component', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ButtonToggleGroup
          className={ 'test-class' }
          label={ 'Label' }
          value={ 'foo' }
          data-element={ 'bar' }
          data-role={ 'baz' }
        >
          <ButtonToggle id={ 'test' }>Foo</ButtonToggle>
        </ButtonToggleGroup>
      );
    });

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'button-toggle-group', 'bar', 'baz');
    });
  });
});
