import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { css } from 'styled-components';
import { RadioButton, RadioButtonGroup } from '.';
import { StyledRadioButtonGroup } from './radio-button.style';
import Label from '../label';
import LabelStyle from '../label/label.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import StyledFormField from '../form-field/form-field.style';

const buttonValues = ['test-1', 'test-2'];
const groupName = 'test-group';

function render(renderer = TestRenderer.create) {
  const children = buttonValues.map((value, index) => (
    <RadioButton
      id={ `rId-${index}` }
      key={ `radio-key-${value}` }
      name={ `radio-name-${value}` }
      onChange={ jest.fn() }
      value={ value }
    />
  ));
  const trueBool = true;

  return renderer(
    <RadioButtonGroup
      groupName={ groupName }
      label='Test RadioButtonGroup Label'
      name='radio-button-group'
      onChange={ jest.fn() }
      useValidationIcon={ trueBool }
    >
      {children}
    </RadioButtonGroup>
  );
}

function getButtons(wrapper) {
  return wrapper.find(RadioButton);
}

function getInputWrapper(button) {
  return button.find('input');
}

describe('RadioButtonGroup', () => {
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });

  describe('child RadioButton prop / key mapping', () => {
    const wrapper = render(mount);
    const buttons = getButtons(wrapper);
    const buttonArray = buttons.getElements();

    describe.each(buttonArray)('buttons[%#]', (button) => {
      const index = buttonArray.indexOf(button);

      describe('key / value (both derived from value prop)', () => {
        const expectedValue = buttonValues[index];
        const expectedKey = `.$radio-key-${expectedValue}`;

        it(`sets the value to ${expectedValue}`, () => {
          expect(button.props.value).toEqual(expectedValue);
        });

        it(`sets the key to ${expectedKey}`, () => {
          expect(button.key).toEqual(expectedKey);
        });
      });

      describe('name', () => {
        it('is set using the RadioButtonGroup groupName prop', () => {
          const buttonWrapper = buttons.at(buttonArray.indexOf(button));
          const input = getInputWrapper(buttonWrapper).instance();

          expect(input.name).toEqual(`radio-name-${input.value}`);
        });
      });
    });

    describe('selected button state', () => {
      describe('initial', () => {
        it('sets checked to false for both buttons', () => {
          buttonArray.forEach((button) => {
            expect(button.props.checked).toBe(false);
          });
        });
      });

      describe.each(buttonArray)('when buttons[%#] has changed', (button) => {
        const index = buttonArray.indexOf(button);
        const otherIndex = index ? 0 : 1;
        let buttonWrapper = buttons.at(index);
        let otherButtonWrapper = buttons.at(otherIndex);
        const inputWrapper = getInputWrapper(buttonWrapper);
        const target = inputWrapper.instance();

        inputWrapper.simulate('change', { target });
        wrapper.update();

        buttonWrapper = getButtons(wrapper).at(index);
        otherButtonWrapper = getButtons(wrapper).at(otherIndex);

        it('sets checked === true when it is changed', () => {
          expect(buttonWrapper.props().checked).toBe(true);
          expect(otherButtonWrapper.props().checked).toBe(false);
        });

        it('sets checked === false when the other button is selected', () => {
          const otherInputWrapper = getInputWrapper(otherButtonWrapper);
          const otherTarget = otherInputWrapper.instance();

          otherInputWrapper.simulate('change', { target: otherTarget });
          wrapper.update();

          buttonWrapper = getButtons(wrapper).at(index);
          otherButtonWrapper = getButtons(wrapper).at(otherIndex);

          expect(buttonWrapper.props().checked).toBe(false);
          expect(otherButtonWrapper.props().checked).toBe(true);
        });
      });
    });

    describe('group label', () => {
      const expectedLabelId = `${groupName}-label`;

      it('sets an appropriate label id (derived from groupname)', () => {
        const label = wrapper.find(Label)
          .first()
          .find('label');

        expect(label.prop('id')).toEqual(expectedLabelId);
      });

      it('sets the aria-labelledby attribute to the labelId', () => {
        const buttonGroup = wrapper.find(StyledRadioButtonGroup).first();

        expect(buttonGroup.props()['aria-labelledby']).toEqual(expectedLabelId);
      });
    });
  });

  describe('styles', () => {
    it('applies the correct Label styles', () => {
      assertStyleMatch(
        {
          cursor: 'default',
          marginBottom: '16px',
          padding: '0'
        },
        render().toJSON(),
        { modifier: css`${`> ${StyledFormField} > ${LabelStyle}`}` }
      );
    });
  });
});
