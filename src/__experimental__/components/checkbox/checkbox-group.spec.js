import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { css } from 'styled-components';
import TestRenderer from 'react-test-renderer';
import CheckboxGroup from './checkbox-group.component';
import Checkbox from './checkbox.component';
import LabelStyle from '../label/label.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import baseTheme from '../../../style/themes/base';
import Icon from '../../../components/icon';
import ValidationIconStyle from '../../../components/validations/validation-icon.style';
import Label from '../label';

const checkboxValues = ['required', 'optional'];
const groupName = 'my-checkbox-group';

function render(props, renderer = TestRenderer.create) {
  const children = checkboxValues.map(value => (
    <Checkbox
      id={ `cId-${value}` }
      key={ `cKey-${value}` }
      name={ `check-${value}` }
      onChange={ jest.fn() }
      value={ value }
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

function getCheckboxes(wrapper) {
  return wrapper.find(Checkbox);
}

function getInput(wrapper) {
  return wrapper.find('input');
}

describe('CheckboxGroup', () => {
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });

  describe('group label', () => {
    const labelText = 'My Label';
    const wrapper = render({ label: labelText }, mount);
    const label = wrapper.find(Label).first();

    expect(label.text()).toEqual(labelText);
  });

  describe('change state', () => {
    const wrapper = render({}, mount);
    let checkboxOne = getCheckboxes(wrapper).at(0);
    let checkboxTwo = getCheckboxes(wrapper).at(1);

    const input = getInput(checkboxOne);
    const target = input.instance();

    input.simulate('change', { target });
    wrapper.update();

    checkboxOne = getCheckboxes(wrapper).at(0);
    checkboxTwo = getCheckboxes(wrapper).at(1);

    it('sets checked === true when it is changed', () => {
      expect(checkboxOne.prop('checked')).toBe(true);
      expect(checkboxTwo.prop('checked')).toBe(false);
    });

    it('sets checked === false when the other button is selected', () => {
      const otherInput = getInput(checkboxTwo);
      const otherTarget = otherInput.instance();

      otherInput.simulate('change', { target: otherTarget });
      wrapper.update();

      checkboxOne = getCheckboxes(wrapper).at(0);
      checkboxTwo = getCheckboxes(wrapper).at(1);

      expect(checkboxOne.prop('checked')).toBe(false);
      expect(checkboxTwo.prop('checked')).toBe(true);
    });
  });

  describe('group icon messsage', () => {
    const wrapper = render({}, mount);
    const text = 'Choose an option';

    wrapper.setProps({
      labelHelp: text
    });

    const icon = wrapper.find(Icon);

    expect(icon.prop('tooltipMessage')).toEqual(text);
  });

  describe('styles', () => {
    it('applies the correct Label styles', () => {
      const wrapper = render().toJSON();

      assertStyleMatch(
        {
          cursor: 'default',
          marginBottom: '16px',
          padding: '0'
        },
        wrapper,
        { modifier: css`${`> ${LabelStyle}`}` }
      );
    });

    describe('checkbox group', () => {
      const wrapper = render({}, mount);
      const validationTypes = {
        hasError: { color: baseTheme.colors.error },
        hasWarning: { color: baseTheme.colors.warning },
        hasInfo: { color: baseTheme.colors.info }
      };
      const validationTypesArr = Object.keys(validationTypes);

      describe.each(validationTypesArr)('group[%s]', (type) => {
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

        it('check icon type', () => {
          const icon = wrapper.find(ValidationIconStyle);
          const iconType = type.replace('has', '').toLowerCase();

          expect(icon.prop('type')).toEqual(iconType);
        });
      });
    });
  });
});
