import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { css } from 'styled-components';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from '.';
import { StyledRadioButtonGroup } from './radio-button.style';
import Label from '../label';
import LabelStyle from '../label/label.style';
import { simulate, assertStyleMatch } from '../../../__spec_helper__/test-utils';
import StyledFormField from '../form-field/form-field.style';
import Button from '../../../components/button';
import HiddenCheckableInput from '../checkable-input/hidden-checkable-input.component';

const buttonValues = ['test-1', 'test-2'];
const groupName = 'test-group';

function render(renderer = TestRenderer.create, props, button = buttonValues) {
  const children = button.map((value, index) => (
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

  describe('defaultChecked', () => {
    it('sets a child radio button to checked when the prop is set programatically', () => {
      const radioGroup = mount(
        <RadioButtonGroup
          groupName={ groupName }
          name={ groupName }
          label='Test RadioButtonGroup Label'
        >
          <RadioButton
            checked
            name='foo'
            value='foo'
          />
        </RadioButtonGroup>
      );

      const button = getRadioButtons(radioGroup);
      expect(button.prop('checked')).toBe(true);
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

  describe('handleKeyDown', () => {
    const wrapper = render(mount, {}, ['test-1', 'test-2', 'test-3']);
    const buttonGroup = wrapper.find(StyledRadioButtonGroup).first();
    let inputs;

    beforeEach(() => {
      inputs = buttonGroup.find(HiddenCheckableInput);
    });

    it('then first radio button should not be focused after render', () => {
      const focusedElement = document.activeElement;
      simulate.keydown.pressDownArrow(buttonGroup);
      expect(inputs.at(0).getDOMNode()).not.toBe(focusedElement);
    });

    describe('when document has focus', () => {
      it('then first radio button should be focused after render', () => {
        inputs.at(0).find('input').getDOMNode().focus();
        const focusedElement = document.activeElement;
        expect(inputs.at(0).find('input').getDOMNode()).toBe(focusedElement);
      });
    });

    describe('keyboard events change radio button selection', () => {
      it('first radio button is selected', () => {
        expect(inputs.at(1).props('checked')).toBeTruthy();
      });

      describe('on spacebar key press', () => {
        it('should change radio button selection to the second radio button', () => {
          inputs.at(0).find('input').getDOMNode().focus();
          simulate.keydown.pressDownArrow(buttonGroup);
          expect(inputs.at(1).find('input')).toBeFocused();
          simulate.keydown.pressSpace(buttonGroup);
          expect(inputs.at(1).find('input').props('checked')).toBeTruthy();
        });
      });
    });

    describe('keyboard events change radio buttons focus', () => {
      describe('keyboard events change radio buttons focus', () => {
        describe('when first radio button is in focus', () => {
          inputs = buttonGroup.find(HiddenCheckableInput);
          beforeEach(() => {
            inputs.at(0).find('input').getDOMNode().focus();
          });

          describe('when down arrow key is pressed twice', () => {
            describe('on one down arrow key press', () => {
              it('should change the focus to the second radio button', () => {
                simulate.keydown.pressDownArrow(buttonGroup);
                expect(inputs.at(1).find('input')).toBeFocused();
              });
            });
            describe('on two down arrow key presses', () => {
              it('should change the focus to the last radio button', () => {
                simulate.keydown.pressDownArrow(buttonGroup);
                simulate.keydown.pressDownArrow(buttonGroup);
                expect(inputs.at(2).find('input')).toBeFocused();
              });
            });
          });

          describe('when right arrow key is pressed', () => {
            describe('on one right arrow key press', () => {
              it('should change the focus to the second radio button', () => {
                simulate.keydown.pressRightArrow(buttonGroup);
                expect(inputs.at(1).find('input')).toBeFocused();
              });
            });

            describe('on two right arrow key presses', () => {
              it('should change the focus to the last radio button', () => {
                simulate.keydown.pressRightArrow(buttonGroup);
                simulate.keydown.pressRightArrow(buttonGroup);
                expect(inputs.at(2).find('input')).toBeFocused();
              });
            });
          });

          describe('when up arrow key is pressed', () => {
            describe('on one up arrow key press', () => {
              it('should change the focus to the second radio button', () => {
                simulate.keydown.pressUpArrow(buttonGroup);
                expect(inputs.at(2).find('input')).toBeFocused();
              });
            });

            describe('on two up arrow key presses', () => {
              it('should change the focus to the first radio button', () => {
                simulate.keydown.pressUpArrow(buttonGroup);
                simulate.keydown.pressUpArrow(buttonGroup);
                expect(inputs.at(1).find('input')).toBeFocused();
              });
            });
          });

          describe('when left arrow key is pressed', () => {
            describe('on one left arrow key press', () => {
              it('should change the focus to the second radio button', () => {
                simulate.keydown.pressLeftArrow(buttonGroup);
                expect(inputs.at(2).find('input')).toBeFocused();
              });
            });

            describe('on two left arrow key press', () => {
              it('should change the focus to the first radio button', () => {
                simulate.keydown.pressLeftArrow(buttonGroup);
                simulate.keydown.pressLeftArrow(buttonGroup);
                expect(inputs.at(1).find('input')).toBeFocused();
              });
            });
          });
        });

        describe('when second radio button is in focus', () => {
          inputs = buttonGroup.find(HiddenCheckableInput);
          beforeEach(() => {
            inputs.at(1).find('input').getDOMNode().focus();
          });

          describe('when down arrow key is pressed twice', () => {
            describe('on one down arrow key press', () => {
              it('should change the focus to the last radio button', () => {
                simulate.keydown.pressDownArrow(buttonGroup);
                expect(inputs.at(2).find('input')).toBeFocused();
              });
            });

            describe('on two down arrow key presses', () => {
              it('should change the focus to the first radio button', () => {
                simulate.keydown.pressDownArrow(buttonGroup);
                simulate.keydown.pressDownArrow(buttonGroup);
                expect(inputs.at(0).find('input')).toBeFocused();
              });
            });
          });

          describe('when right arrow key is pressed twice', () => {
            describe('on one right arrow key press', () => {
              it('should change the focus to the last radio button', () => {
                simulate.keydown.pressRightArrow(buttonGroup);
                expect(inputs.at(2).find('input')).toBeFocused();
              });
            });

            describe('on two right arrow key presses', () => {
              it('should change the focus to the first radio button', () => {
                simulate.keydown.pressRightArrow(buttonGroup);
                simulate.keydown.pressRightArrow(buttonGroup);
                expect(inputs.at(0).find('input')).toBeFocused();
              });
            });
          });

          describe('when up arrow key is pressed twice', () => {
            describe('on one up arrow key press', () => {
              it('should change the focus to the first radio button', () => {
                simulate.keydown.pressUpArrow(buttonGroup);
                expect(inputs.at(0).find('input')).toBeFocused();
              });
            });

            describe('on two up arrow key presses', () => {
              it('should change the focus to the last radio button', () => {
                simulate.keydown.pressUpArrow(buttonGroup);
                simulate.keydown.pressUpArrow(buttonGroup);
                expect(inputs.at(2).find('input')).toBeFocused();
              });
            });
          });

          describe('when left arrow key is pressed twice', () => {
            describe('on one left arrow key press', () => {
              it('should change the focus to the first radio button', () => {
                simulate.keydown.pressLeftArrow(buttonGroup);
                expect(inputs.at(0).find('input')).toBeFocused();
              });
            });

            describe('on two left arrow key presses', () => {
              it('should change the focus to the last radio button', () => {
                simulate.keydown.pressLeftArrow(buttonGroup);
                simulate.keydown.pressLeftArrow(buttonGroup);
                expect(inputs.at(2).find('input')).toBeFocused();
              });
            });
          });
        });
      });
    });
  });

  describe('controlled', () => {
    const Controller = (props) => {
      const [value, setValue] = useState();
      return (
        <>
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
        </>
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
