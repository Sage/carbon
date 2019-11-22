import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import CheckboxGroup from './checkbox-group.component';
import { Checkbox } from '.';
import Icon from '../../../components/icon';
import Label from '../label';

const checkboxValues = ['required', 'optional'];
const id = 'my-checkbox-group';

function render(props, childProps, renderer = mount) {
  const children = checkboxValues.map(value => (
    <Checkbox
      id={ `cId-${value}` }
      key={ `cKey-${value}` }
      name={ `check-${value}` }
      onChange={ jest.fn() }
      value={ value }
      unblockValidation
      { ...childProps }
    />
  ));

  return renderer(
    <CheckboxGroup
      id={ id }
      label='Test CheckboxGroup Label'
      name={ id }
      { ...props }
    >
      {children}
    </CheckboxGroup>
  );
}

describe('CheckboxGroup', () => {
  it('renders as expected', () => {
    expect(render({}, {}, TestRenderer.create)).toMatchSnapshot();
  });

  describe('group label', () => {
    it('should have the correct text', () => {
      const labelText = 'My Label';
      const wrapper = render({ label: labelText });
      const label = wrapper.find(Label).first();

      expect(label.text()).toEqual(labelText);
    });
  });

  describe('group icon messsage', () => {
    it('should have the correct text', () => {
      const wrapper = render();
      const text = 'Choose an option';

      wrapper.setProps({
        labelHelp: text
      });

      const icon = wrapper.find(Icon);

      expect(icon.prop('tooltipMessage')).toEqual(text);
    });
  });

  describe('controlled vs uncontrolled input', () => {
    it('supports being used as an controlled input via passing of a value prop', () => {
      const wrapper = render({ value: ['one', 'three'] });
      const checkboxGroup = wrapper.find(CheckboxGroup).first().childAt(0);
      expect(checkboxGroup.getDOMNode().getAttribute('value')).toEqual('one,three');
    });
  });

  describe('onChange', () => {
    describe('when checkboxes are unchecked', () => {
      const fakeFunction = jest.fn();
      const wrapper = render({ onChange: fakeFunction });

      it.each(checkboxValues)(
        'validates that checkbox with id: cId-%s is unchecked',
        (checkbox) => {
          expect(wrapper.find(`#cId-${checkbox}`).first().find('input').first()
            .prop('checked')).toBe(false);
        }
      );

      it('should check the first checkbox', () => {
        expect(wrapper.find('input').first().prop('checked')).toBe(false);
        expect(wrapper.find('input').last().prop('checked')).toBe(false);
        const input = wrapper.find('input').first();
        input.simulate('change', { target: { checked: true } });
        expect(wrapper.find('input').first().prop('checked')).toBe(true);
        expect(wrapper.find('input').last().prop('checked')).toBe(false);
      });
    });

    describe('when checkboxes are checked', () => {
      it('should uncheck the first checkbox', () => {
        const fakeFunction = jest.fn();
        const wrapper = render({ defaultValue: checkboxValues }, { onChange: fakeFunction });
        expect(wrapper.find('input').first().prop('checked')).toBe(true);
        expect(wrapper.find('input').first().prop('defaultChecked')).toBe(undefined);
        expect(wrapper.find('input').last().prop('checked')).toBe(true);
        const input = wrapper.find('input').first();
        input.simulate('change', { target: { checked: false } });
        expect(fakeFunction).toHaveBeenCalledTimes(1);
        expect(wrapper.find('input').first().prop('checked')).toBe(false);
        expect(wrapper.find('input').last().prop('checked')).toBe(true);
        expect(wrapper.find('input').last().prop('defaultChecked')).toBe(undefined);
      });
    });
  });
});
