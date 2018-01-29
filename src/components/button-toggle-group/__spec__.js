import React from 'react';
import { shallow, mount } from 'enzyme';

import { rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Portal from './../portal';
import Icon from './../icon';

import ButtonToggleGroup from './button-toggle-group';
import ButtonToggle from './../button-toggle';

describe('ButtonToggleGroup', () => {
  let wrapper, instance;

  beforeEach(() => {
    jest.useFakeTimers();
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

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
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

  describe('_handleGroupBlur', () => {

    describe('when blur is not blocked', () => {
      it('calls validate on blur of the input', () => {
        spyOn(instance, 'validate');
        instance._handleGroupBlur();
        jest.runTimersToTime(100);
        expect(instance.validate).toHaveBeenCalled();
      });
    });

    describe('when blur is blocked', () => {
      it('does nothing', () => {
        instance.blockBlur = true;
        spyOn(instance, 'validate');
        instance._handleGroupBlur();
        jest.runTimersToTime(100);
        expect(instance.validate).not.toHaveBeenCalled();
      });
    });

    describe('when message is locked', () => {
      it('unlocks it', () => {
        instance.setState({ messageLocked: true });
        spyOn(instance, 'setState');
        instance._handleGroupBlur();
        jest.runTimersToTime(100);
        expect(instance.setState).toHaveBeenCalledWith({ messageLocked: false });
      });
    });

    describe('when message is not locked', () => {
      it('does nothing', () => {
        instance.setState({ messageLocked: false });
        spyOn(instance, 'setState');
        instance._handleGroupBlur();
        expect(instance.setState).not.toHaveBeenCalled();
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
        wrapper = mount(
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

    describe('when has input-validation error ', () => {
      beforeEach(() => {
        wrapper = mount(
          <ButtonToggleGroup
            label={ 'Label' }
            value={ 'foo' }
          >
            <ButtonToggle>Foo</ButtonToggle>
          </ButtonToggleGroup>
        );
      });

      it('is decorated with a validation if a error is present', () => {
        wrapper.setState({ errorMessage: 'Error', valid: false });
        wrapper.instance().showMessage();

        jest.runOnlyPendingTimers();

        const errorMessage = wrapper.instance().validationHTML[1]
                                .props.children.props.children.props.children.props.children;
        expect(errorMessage).toEqual('Error');
      });
    });

    it('renders a parent div when mounted', () => {
      wrapper = mount(
          <ButtonToggleGroup
            label={ 'Label' }
            value={ 'foo' }
          >
            <ButtonToggle>Foo</ButtonToggle>
          </ButtonToggleGroup>
        );
      const node = wrapper.find('.carbon-button-toggle-group');
      expect(node.length).toEqual(1);
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
