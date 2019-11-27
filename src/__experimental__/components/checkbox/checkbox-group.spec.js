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
});
