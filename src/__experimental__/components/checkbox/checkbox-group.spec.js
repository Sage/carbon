import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { css } from 'styled-components';
import TestRenderer from 'react-test-renderer';
import CheckboxGroup from './checkbox-group.component';
import Checkbox from './checkbox.component';
import { StyledCheckboxGroup } from './checkbox.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import Label from '../label';
import LabelStyle from '../label/label.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import baseTheme from '../../../style/themes/base';
import Help from '../../../components/help';

const checkboxValues = ['required', 'optional'];
const groupName = 'my-checkbox-group';

function render(props, renderer = TestRenderer.create) {
  const children = checkboxValues.map(value => (
    <Checkbox
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
  describe('child RadioButton prop / key mapping', () => {
    const wrapper = render({}, mount);
    const checkboxes = getCheckboxes(wrapper);
    const checkboxArray = checkboxes.getElements();

    describe.each(checkboxArray)('buttons[%#]', (checkbox) => {
      const index = checkboxArray.indexOf(checkbox);

      describe('key / value (both derived from value prop)', () => {
        const expectedValue = checkboxValues[index];
        const expectedKey = `.$cKey-${expectedValue}`;

        it(`sets the value to ${expectedValue}`, () => {
          expect(checkbox.props.value).toEqual(expectedValue);
        });

        it(`sets the key to ${expectedKey}`, () => {
          expect(checkbox.key).toEqual(expectedKey);
        });
      });

      describe('name', () => {
        it('is set using the RadioButtonGroup groupName prop', () => {
          const buttonWrapper = checkboxes.at(checkboxArray.indexOf(checkbox));
          const input = getInput(buttonWrapper).instance();
          const expectedValue = checkboxValues[index];

          expect(input.name).toEqual(`check-${expectedValue}`);
        });
      });

      describe('checkbox initial state', () => {
        it('checked === false', () => {
          expect(checkbox.props.checked).toBe(false);
        });
      });
    });

    describe('change state', () => {
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

    describe('group label', () => {
      const expectedLabelId = `${groupName}-label`;

      it('sets an appropriate label id (derived from groupname)', () => {
        const label = wrapper.find(Label).first();

        expect(label.props().id).toEqual(expectedLabelId);
      });

      it('sets the aria-labelledby attribute to the labelId', () => {
        const buttonGroup = wrapper.find(StyledCheckboxGroup).first();

        expect(buttonGroup.props()['aria-labelledby']).toEqual(expectedLabelId);
      });
    });

    describe('group help label', () => {
      const text = 'Choose an option';

      wrapper.setProps({
        labelHelp: text
      });

      const help = wrapper.find(Help);

      expect(help.prop('children')).toEqual(text);
    });
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

        it(`${type}=true`, () => {
          expect(wrapper.prop(type)).toBe(true);
        });

        it('has correct color', () => {
          assertStyleMatch({
            border: `1px solid ${validationTypes[type].color}`
          }, wrapper, { modifier: `${StyledCheckableInputSvgWrapper} svg` });
        });
      });
    });
  });
});
