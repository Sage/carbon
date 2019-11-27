import React from 'react';
import { mount, shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import Select from './select.component';
import { StyledSelect } from './select.style';
import guid from '../../../utils/helpers/guid';
import Events from '../../../utils/helpers/events';
import classic from '../../../style/themes/classic';
import StyledIcon from '../../../components/icon/icon.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import TextBox from '../textbox';

jest.mock('../../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

describe('Select', () => {
  const renderWrapper = ({ props, type = mount } = {}) => (
    type(
      <Select { ...props }>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Select>
    )
  );

  // an example of a single value
  const singleValue = {
    value: '1',
    text: 'Orange'
  };

  // an example of a multi value
  const multiValue = [{
    value: '1',
    text: 'Orange'
  }, {
    value: '2',
    text: 'Blue'
  }, {
    value: '3',
    text: 'Red'
  }];

  // utility functions to fetch various elements from the wrapper
  const listOf = wrapper => wrapper.find('SelectList');
  const textboxOf = wrapper => wrapper.find(TextBox);
  const pillsOf = wrapper => wrapper.find('Pill');

  // open the list for the select component and returns the wrapper
  const openList = (wrapper) => {
    wrapper.find('input').simulate('focus');
    return wrapper;
  };

  /**
   * Begin tests
   */

  it('renders only the Textbox when closed', () => {
    expect(renderWrapper({ type: shallow })).toMatchSnapshot();
  });

  it('renders the SelectList with any given children when in an open state', () => {
    const wrapper = renderWrapper();

    let list = listOf(wrapper);
    expect(list.exists()).toBe(false);

    list = listOf(openList(wrapper));
    expect(list.exists()).toBe(true);
    expect(list.props()).toMatchSnapshot();
  });

  it('applies custom data-* attributes at the right level', () => {
    const wrapper = renderWrapper({
      props: { 'data-role': 'custom-role', 'data-element': 'custom-element' }
    });
    expect(wrapper.find('Textbox').first().prop('data-role')).toEqual('custom-role');
    expect(wrapper.find('Textbox').first().prop('data-element')).toEqual('custom-element');
  });

  it('triggers an onOpen callback if provided, but not if already open', () => {
    const onOpen = jest.fn();
    const wrapper = renderWrapper({ props: { onOpen } });
    openList(wrapper);
    openList(wrapper);
    expect(onOpen).toHaveBeenCalled();
    expect(onOpen.mock.calls.length).toEqual(1);
  });

  it('opens the list on click', () => {
    const wrapper = renderWrapper();
    wrapper.find('input').simulate('click');
    expect(wrapper.state().open).toEqual(true);
  });

  it('does not apply any events if disabled or readonly', () => {
    [{ disabled: true }, { readOnly: true }].forEach((state) => {
      expect(renderWrapper({ state, type: shallow })).toMatchSnapshot();
    });
  });

  describe('when multi-value', () => {
    it(`renders the the textbox with the following:
        * formattedValue is empty
        * value contains the array of values
        * leftChildren contains the pills
        * inputIcon is disabled`, () => {
      const props = { value: multiValue, placeholder: 'placeholder' };
      const textbox = textboxOf(renderWrapper({ props }));
      const {
        formattedValue,
        value, inputIcon,
        leftChildren
      } = textbox.props();

      expect(formattedValue).toEqual('');
      expect(value).toEqual(multiValue);
      expect(leftChildren.length).toEqual(3);
      expect(leftChildren[0].props.children.props.title).toEqual('Orange');
      expect(inputIcon).toEqual(undefined);
    });

    it('triggers onChange with the item added when choosing an item', () => {
      const props = { value: multiValue, onChange: jest.fn() };
      const list = listOf(openList(renderWrapper({ props })));
      const newValue = { value: 'new!' };
      list.props().onSelect(newValue);
      expect(props.onChange).toHaveBeenCalledWith({
        target: { value: [...multiValue, newValue] }
      });
    });

    it('does not allow the same item to be selected twice', () => {
      const props = { value: multiValue, onChange: jest.fn() };
      const list = listOf(openList(renderWrapper({ props })));
      list.props().onSelect(multiValue[0]);
      expect(props.onChange).not.toHaveBeenCalled();
    });

    it('triggers onChange with the item removed when clicking delete on the pill', () => {
      const props = { value: multiValue, onChange: jest.fn() };
      const pill = pillsOf(renderWrapper({ props })).at(1);
      pill.props().onDelete();
      expect(props.onChange).toHaveBeenCalledWith({
        // we deleted the item at index 1
        target: { value: [multiValue[0], multiValue[2]] }
      });
    });

    it('supports leftChildren property', () => {
      const props = {
        value: multiValue,
        enableMultiSelect: true,
        leftChildren: <span className='my-test-element'>Text</span>
      };

      const wrapper = renderWrapper({ props });
      // Check left children
      expect(wrapper.find('.my-test-element')).toHaveLength(1);
      expect(wrapper.find('.my-test-element').text()).toEqual('Text');

      // Check pills
      expect(pillsOf(wrapper)).toHaveLength(3);
    });

    describe('when backspace is pressed and is single select', () => {
      const setupTest = (additionalSetup) => {
        spyOn(Events, 'isBackspaceKey').and.returnValue(true);
        const props = { value: singleValue, onChange: jest.fn() };
        const wrapper = renderWrapper({ props });
        const textbox = textboxOf(openList(wrapper));
        if (additionalSetup) additionalSetup(wrapper);
        textbox.find('input').simulate('keydown');
        return { props, wrapper };
      };

      it('triggers onChange with the item removed when typing backspace in the filter', () => {
        const { props } = setupTest();
        expect(props.onChange).toHaveBeenCalled();
      });

      it('does not trigger onChange if there is a filter in effect', () => {
        const { props } = setupTest(wrapper => wrapper.setState({ filter: 'x' }));
        expect(props.onChange).not.toHaveBeenCalled();
      });

      it('does not trigger onChange if there is no values left to delete', () => {
        const { props } = setupTest(wrapper => wrapper.setProps({ value: [] }));
        expect(props.onChange).not.toHaveBeenCalled();
      });
    });

    it('does not render onDelete action when disabled or readonly', () => {
      [{ disabled: true }, { readOnly: true }].forEach((state) => {
        const props = { value: multiValue, ...state };
        const pill = pillsOf(renderWrapper({ props })).first();
        expect(pill.props().onDelete).toEqual(null);
      });
    });
  });

  describe('when backspace is pressed and is multi select', () => {
    const setupTest = (additionalSetup) => {
      spyOn(Events, 'isBackspaceKey').and.returnValue(true);
      const props = { value: multiValue, onChange: jest.fn() };
      const wrapper = renderWrapper({ props });
      const textbox = textboxOf(openList(wrapper));
      if (additionalSetup) additionalSetup(wrapper);
      textbox.find('input').simulate('keydown');
      return { props, wrapper };
    };

    it('triggers onChange with the item removed when typing backspace in the filter', () => {
      const { props } = setupTest();
      expect(props.onChange).toHaveBeenCalledWith({
        target: { value: [multiValue[0], multiValue[1]] }
      });
    });

    it('does not trigger onChange if there is a filter in effect', () => {
      const { props } = setupTest(wrapper => wrapper.setState({ filter: 'x' }));
      expect(props.onChange).not.toHaveBeenCalled();
    });

    it('does not trigger onChange if there is no values left to delete', () => {
      const { props } = setupTest(wrapper => wrapper.setProps({ value: [] }));
      expect(props.onChange).not.toHaveBeenCalled();
    });
  });

  describe('when single value', () => {
    it(`renders the the textbox with the following:
        * formattedValue is the text of the object
        * value is the value of the object
        * leftChildren is empty
        * inputIcon is dropdown
        * placeholder is the value given as a prop`, () => {
      const props = { value: singleValue, placeholder: 'placeholder' };
      const textbox = textboxOf(renderWrapper({ props }));
      expect(textbox.props().formattedValue).toEqual(singleValue.text);
      expect(textbox.props().value).toEqual(singleValue.value);
      expect(textbox.props().leftChildren).toBeFalsy();
      expect(textbox.props().inputIcon).toEqual('dropdown');
      expect(textbox.props().placeholder).toEqual('placeholder');
    });

    it('triggers onChange with the new item when choosing an item', () => {
      const props = { value: singleValue, onChange: jest.fn() };
      const list = listOf(openList(renderWrapper({ props })));
      const newValue = { value: 'new!' };
      list.props().onSelect(newValue);
      expect(props.onChange).toHaveBeenCalledWith({
        target: { value: newValue }
      });
    });

    it('does not throw an error on change if no callback is provided', () => {
      const props = { value: singleValue };
      const list = listOf(openList(renderWrapper({ props })));
      expect(() => list.props().onSelect({ value: 'new!' })).not.toThrowError();
    });

    it('supports leftChildren property', () => {
      const props = { leftChildren: <span className='my-test-element'>Text</span> };
      const wrapper = renderWrapper({ props });
      expect(wrapper.find('.my-test-element')).toHaveLength(1);
      expect(wrapper.find('.my-test-element').text()).toEqual('Text');
    });
  });

  describe('blur / focus events', () => {
    it('triggers custom on focus prop if provided', () => {
      const onFocus = jest.fn();
      openList(renderWrapper({ props: { onFocus } }));
      expect(onFocus).toHaveBeenCalled();
    });

    it('blocks blur on mouse enter of the list and unblocks on leaving the list', () => {
      const wrapper = openList(renderWrapper());
      const list = listOf(wrapper);
      expect(wrapper.instance().blurBlocked).toEqual(false);
      list.find('div').first().simulate('mouseEnter');
      expect(wrapper.instance().blurBlocked).toEqual(true);
      list.find('div').first().simulate('mouseLeave');
      expect(wrapper.instance().blurBlocked).toEqual(false);
    });

    describe('onBlur', () => {
      const setupTest = (blocked, props) => {
        const wrapper = openList(renderWrapper({ props }));
        wrapper.instance().blurBlocked = blocked;
        wrapper.setState({ open: true, filter: 'x' });
        expect(wrapper.state().open).toEqual(true);
        expect(wrapper.state().filter).toEqual('x');
        textboxOf(wrapper).find('input').simulate('blur');
        return wrapper;
      };

      it('resets the state on blur on the input', () => {
        const wrapper = setupTest(false);
        expect(wrapper.state().open).toEqual(false);
        expect(wrapper.state().filter).toEqual(undefined);
      });

      it('calls custom blur prop is passed', () => {
        const onBlur = jest.fn();
        setupTest(false, { onBlur });
        expect(onBlur).toHaveBeenCalled();
      });

      it('does not reset the state if blur is blocked', () => {
        const wrapper = setupTest(true);
        expect(wrapper.state().open).toEqual(true);
        expect(wrapper.state().filter).toEqual('x');
      });
    });
  });

  describe('key events', () => {
    it('unblocks blur on tab', () => {
      spyOn(Events, 'isTabKey').and.returnValue(true);
      const wrapper = renderWrapper();
      wrapper.instance().blurBlocked = true;
      textboxOf(wrapper).find('input').simulate('keydown');
      expect(wrapper.instance().blurBlocked).toEqual(false);
    });

    it('opens the list on any key if it is closed (but not if it is already open)', () => {
      const wrapper = renderWrapper();
      expect(listOf(wrapper).exists()).toEqual(false);
      textboxOf(wrapper).find('input').simulate('keydown');
      expect(listOf(wrapper).exists()).toEqual(true);
      textboxOf(wrapper).find('input').simulate('keydown');
      expect(listOf(wrapper).exists()).toEqual(true);
    });

    it('closes the list on esc', () => {
      spyOn(Events, 'isEscKey').and.returnValue(true);
      const wrapper = openList(renderWrapper());
      expect(listOf(wrapper).exists()).toEqual(true);
      textboxOf(wrapper).find('input').simulate('keydown');
      expect(listOf(wrapper).exists()).toEqual(false);
    });

    it('allows key inputs when the component is filterable', () => {
      const props = { filterable: true };
      const wrapper = renderWrapper({ props });
      const mockEvent = { which: 67, preventDefault: jest.fn() };
      openList(wrapper);
      textboxOf(wrapper).find('input').simulate('keydown', mockEvent);
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });

    it('prevents key inputs when the component is not filterable', () => {
      const props = { filterable: false };
      const wrapper = renderWrapper({ props });
      const mockEvent = { which: 67, preventDefault: jest.fn() };
      openList(wrapper);
      textboxOf(wrapper).find('input').simulate('keydown', mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('filter', () => {
    it('updates the filter value when the textbox value is updated', () => {
      const wrapper = openList(renderWrapper());
      expect(listOf(wrapper).props().filterValue).toEqual(undefined);
      textboxOf(wrapper).find('input').simulate('change', { target: { value: 'x' } });
      expect(listOf(wrapper).props().filterValue).toEqual('x');
    });

    it('triggers custom onFilter event if one is passed', () => {
      const props = { onFilter: jest.fn() };
      const wrapper = renderWrapper({ props });
      textboxOf(wrapper).find('input').simulate('change', { target: { value: 'x' } });
      expect(props.onFilter).toHaveBeenCalledWith('x');
    });
  });

  describe('typeAhead', () => {
    it('only renders the select list when there is a search term greater or equal to three characters', () => {
      const props = { typeAhead: true };
      const wrapper = openList(renderWrapper({ props }));
      expect(listOf(wrapper).length).toEqual(0);
      textboxOf(wrapper).find('input').simulate('change', { target: { value: 'x' } });
      expect(listOf(wrapper).length).toEqual(0);
      textboxOf(wrapper).find('input').simulate('change', { target: { value: 'xxx' } });
      expect(listOf(wrapper).length).toEqual(1);
    });
  });

  describe('when in classic theme', () => {
    it('it applies expected icon styling', () => {
      const styleWrapper = TestRenderer.create(
        <StyledSelect theme={ classic }><StyledIcon type='dropdown' /></StyledSelect>
      );
      assertStyleMatch({ color: '#FFFFFF' }, styleWrapper.toJSON(), { modifier: `&:hover ${StyledIcon}` });
    });
  });
});
