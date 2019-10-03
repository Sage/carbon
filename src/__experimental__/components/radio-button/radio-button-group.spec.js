import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { css } from 'styled-components';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from '.';
import { LegendStyle } from '../fieldset/fieldset.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import Button from '../../../components/button';

const buttonValues = ['test-1', 'test-2'];
const groupName = 'test-group';

function render(renderer = TestRenderer.create, props) {
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
      legend='Test RadioButtonGroup Legend'
      name='radio-button-group'
      onChange={ jest.fn() }
      useValidationIcon={ trueBool }
      { ...props }
    >
      {children}
    </RadioButtonGroup>
  );
}

function getRadioButtons(wrapper) {
  return wrapper.find(RadioButton);
}

function getButtons(wrapper) {
  return wrapper.find(Button);
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
    const buttons = getRadioButtons(wrapper);
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

      describe('defaultChecked', () => {
        it('sets a child radio button to checked when the prop is set programatically', () => {
          const radioGroup = shallow(
            <RadioButtonGroup
              groupName={ groupName }
              legend='Test RadioButtonGroup Legend'
            >
              <RadioButton checked value='foo' />
            </RadioButtonGroup>
          );

          const button = getButtons(radioGroup);
          expect(button.props().checked).toBe(true);
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

        buttonWrapper = getRadioButtons(wrapper).at(index);
        otherButtonWrapper = getRadioButtons(wrapper).at(otherIndex);

        it('sets checked === true when it is changed', () => {
          expect(buttonWrapper.props().checked).toBe(true);
          expect(otherButtonWrapper.props().checked).toBe(false);
        });

        it('sets checked === false when the other button is selected', () => {
          const otherInputWrapper = getInputWrapper(otherButtonWrapper);
          const otherTarget = otherInputWrapper.instance();

          otherInputWrapper.simulate('change', { target: otherTarget });
          wrapper.update();

          buttonWrapper = getRadioButtons(wrapper).at(index);
          otherButtonWrapper = getRadioButtons(wrapper).at(otherIndex);

          expect(buttonWrapper.props().checked).toBe(false);
          expect(otherButtonWrapper.props().checked).toBe(true);
        });
      });
    });
  });

  describe('initial value', () => {
    it('should check the revelant radio button', () => {
      const wrapper = render(mount, {
        initialValue: 'test-2'
      });
      const radioButton = wrapper.find(RadioButton).last();

      expect(radioButton.prop('checked')).toBe(true);
    });
  });

  describe('styles', () => {
    it('applies the correct Legend styles', () => {
      assertStyleMatch(
        {
          fontSize: '14px',
          lineHeight: '17px',
          marginBottom: '16px',
          marginLeft: '-2px'
        },
        render().toJSON(),
        { modifier: css`${LegendStyle}` }
      );
    });
  });

  describe('controlled', () => {
    const Controller = (props) => {
      const [value, setValue] = useState();
      return (
        <React.Fragment>
          <RadioButtonGroup
            groupName={ groupName }
            label='Test RadioButtonGroup Label'
            name='radio-button-group'
            onChange={ (e) => {
              setValue(e.target.value);
            } }
            useValidationIcon
            value={ value }
            { ...props.groupProps }
          >
            <RadioButton
              name='one'
              value='one'
            />
            <RadioButton
              name='two'
              value='two'
              { ...props.radioProps }
            />
            <RadioButton
              name='three'
              value='three'
            />
          </RadioButtonGroup>
          <Button onClick={ () => {
            setValue('one');
          } }
          >Set One
          </Button>
          <Button onClick={ () => {
            setValue('two');
          } }
          >Set Two
          </Button>
        </React.Fragment>
      );
    };
    Controller.propTypes = {
      groupProps: PropTypes.any,
      radioProps: PropTypes.any
    };
    const renderControlled = (groupProps = {}, radioProps = {}) => {
      return mount(<Controller { ...{ groupProps, radioProps } } />);
    };

    it('none of the radio buttons are checked by default', () => {
      const wrapper = renderControlled();
      const radio = getRadioButtons(wrapper);
      expect(radio.at(0).prop('checked')).toBe(false);
      expect(radio.at(1).prop('checked')).toBe(false);
      expect(radio.at(2).prop('checked')).toBe(false);
    });

    it('changing the value checks the appropraite radio button', () => {
      const wrapper = renderControlled();
      const buttons = getButtons(wrapper);

      buttons.at(0).simulate('click');

      const radio = getRadioButtons(wrapper);
      expect(radio.at(0).prop('checked')).toBe(true);
      expect(radio.at(1).prop('checked')).toBe(false);
      expect(radio.at(2).prop('checked')).toBe(false);
    });

    it('onChange handler is called when a radio button is clicked', () => {
      const onChange = jest.fn();
      const wrapper = renderControlled({ onChange });

      const radio = getRadioButtons(wrapper);

      act(() => {
        radio.at(0).props().onChange({ target: radio.at(0).getDOMNode() });
      });

      expect(onChange).toHaveBeenCalled();
    });

    it('setting a radio button as checked, checks the radio button', () => {
      const onChange = jest.fn();
      const wrapper = renderControlled({ onChange }, { checked: true });

      const radio = getRadioButtons(wrapper);

      expect(radio.at(1).prop('checked')).toBe(true);

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
