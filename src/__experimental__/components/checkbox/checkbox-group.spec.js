import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import CheckboxGroup from './checkbox-group.component';
import { Checkbox } from '.';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import baseTheme from '../../../style/themes/base';
import Icon from '../../../components/icon';
import Label from '../label';

const checkboxValues = ['required', 'optional'];
const groupName = 'my-checkbox-group';

function render(props, childProps, renderer = mount) {
  const children = checkboxValues.map(value => (
    <Checkbox
      id={ `cId-${value}` }
      key={ `cKey-${value}` }
      name={ `check-${value}` }
      onChange={ jest.fn() }
      value={ value }
      { ...childProps }
    />
  ));

  return renderer(
    <CheckboxGroup
      name='group-radio-buttons'
      groupName={ groupName }
      label='Test CheckboxGroup Label'
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

  describe('onChange', () => {
    it('should be called', () => {
      const onChange = jest.fn();
      const wrapper = render({ onChange });
      const checkbox = wrapper.find(Checkbox).first();

      act(() => {
        checkbox.props().onChange({ target: checkbox.getDOMNode() });
      });

      expect(onChange).toHaveBeenCalled();
    });

    describe('when value is undefined', () => {
      it('confirms that the isController is false', () => {
        const wrapper = render({ value: undefined });
        const checkboxGroup = wrapper.find(CheckboxGroup).first();
        expect(checkboxGroup.props().value).toEqual(undefined);
        expect(checkboxGroup.props().isControled).toEqual(undefined);
      });
    });

    describe('when isControled is true', () => {
      it('confirms that the isController is true', () => {
        const onChange = jest.fn();
        const wrapper = render({ value: 'one', onChange });
        const checkboxGroup = wrapper.find(CheckboxGroup).first();
        const checkbox = wrapper.find(Checkbox).first();

        act(() => {
          checkbox.props().onChange({ target: checkbox.getDOMNode() });
        });

        expect(onChange).toHaveBeenCalled();
        expect(checkboxGroup.props().value).toEqual('one');
      });
    });  
  });

  describe('styles', () => {
    describe('checkbox group', () => {
      const validationTypes = {
        hasError: { color: baseTheme.colors.error },
        hasWarning: { color: baseTheme.colors.warning },
        hasInfo: { color: baseTheme.colors.info }
      };
      const validationTypesArr = Object.keys(validationTypes);

      describe.each(validationTypesArr)('group[%s]', (type) => {
        const wrapper = render({
          labelHelp: 'Text for tooltip',
          tooltipMessage: 'Custom tooltip message'
        });

        beforeEach(() => {
          const props = {
            hasError: false,
            hasWarning: false,
            hasInfo: false
          };
          props[type] = true;

          wrapper.setProps(props);
        });

        it('has correct color', () => {
          const checkboxWrapper = wrapper.find(Checkbox).first();

          assertStyleMatch({
            border: `1px solid ${validationTypes[type].color}`
          }, checkboxWrapper, { modifier: 'svg' });
        });
      });
    });
  });
});
