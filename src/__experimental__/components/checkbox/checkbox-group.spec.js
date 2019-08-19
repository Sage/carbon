import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { css } from 'styled-components';
import TestRenderer from 'react-test-renderer';
import CheckboxGroup from './checkbox-group.component';
import Checkbox from './checkbox.component';
import { StyledCheckboxGroup } from './checkbox.style';
import Label from '../label';
import LabelStyle from '../label/label.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

const checkboxValues = ['required', 'optional'];
const groupName = 'my-checkbox-group';

function render(renderer = TestRenderer.create) {
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
      groupName={ groupName }
      label='Test CheckboxGroup Label'
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
    const wrapper = render(mount);
    const checkboxes = getCheckboxes(wrapper);
    const checkboxArray = checkboxes.getElements();

    describe.each(checkboxArray)('buttons[%#]', (checkbox) => {
      const index = checkboxArray.indexOf(checkbox);

      describe('key / value (both derived from value prop)', () => {
        const expectedValue = checkboxValues[index];
        const expectedKey = `cKey-${index}/.$cKey-${expectedValue}`;

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
  });
});
