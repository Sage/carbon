import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';

import RadioButtonMapper from './radio-button-mapper.component';
import { RadioButton } from '.';
import Button from '../../../components/button';

const buttonValues = ['test-1', 'test-2'];
const name = 'test-group';

function render(renderer = TestRenderer.create, props) {
  const children = buttonValues.map((value, index) => (
    <RadioButton
      id={ `rId-${index}` }
      key={ `radio-key-${value}` }
      onChange={ jest.fn() }
      value={ value }
    />
  ));

  return renderer(
    <RadioButtonMapper
      name={ name }
      legend='Test RadioButtonGroup Legend'
      onBlur={ jest.fn() }
      onChange={ jest.fn() }
      { ...props }
    >
      {children}
    </RadioButtonMapper>
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

describe('RadioButtonMapper', () => {
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
        it('is set using the RadioButtonMapper name prop', () => {
          const buttonWrapper = buttons.at(buttonArray.indexOf(button));
          const input = getInputWrapper(buttonWrapper).instance();

          expect(input.name).toEqual(name);
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
            <RadioButtonMapper
              name={ name }
              legend='Test RadioButtonGroup Legend'
            >
              <RadioButton defaultChecked value='foo' />
            </RadioButtonMapper>
          );

          const button = radioGroup.find(RadioButton);
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

  describe('defaultChecked', () => {
    it('sets a child radio button to checked when the prop is set programatically', () => {
      const radioGroup = mount(
        <RadioButtonMapper
          name={ name }
          legend='Test RadioButtonGroup Legend'
        >
          <RadioButton
            defaultChecked
            name='foo'
            value='foo'
          />
          <RadioButton
            name='bar'
            value='bar'
          />
        </RadioButtonMapper>
      );

      const button = getRadioButtons(radioGroup).at(0);
      expect(button.prop('checked')).toBe(true);
    });
  });

  const renderUncontrolled = (groupProps, radioProps) => mount(
    <RadioButtonMapper
      legend='Test RadioButtonGroup Legend'
      name='radio-button-group'
      onChange={ jest.fn() }
      { ...groupProps }
    >
      <RadioButton
        name='one'
        value='one'
      />
      <RadioButton
        name='two'
        value='two'
        { ...radioProps }
      />
      <RadioButton
        name='three'
        value='three'
      />
    </RadioButtonMapper>
  );

  const Controller = (props) => {
    const [value, setValue] = useState(null);
    return (
      <>
        <RadioButtonMapper
          name={ name }
          legend='Test RadioButtonGroup Legend'
          onBlur={ (e) => {
            setValue(e.target.value);
          } }
          onChange={ (e) => {
            setValue(e.target.value);
          } }
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
        </RadioButtonMapper>
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


  describe.each([
    ['controlled', renderControlled],
    ['uncontrolled', renderUncontrolled]
  ])('%s', (type, renderer) => {
    it('none of the radio buttons are checked by default', () => {
      const wrapper = renderer();
      const radio = getRadioButtons(wrapper);
      expect(radio.at(0).prop('checked')).toBe(false);
      expect(radio.at(1).prop('checked')).toBe(false);
      expect(radio.at(2).prop('checked')).toBe(false);
    });

    it('onBlur handler is called when a radio button is blurred', () => {
      const onBlur = jest.fn();
      const wrapper = renderer({ onBlur });

      const radio = getRadioButtons(wrapper);

      act(() => {
        radio.at(0).props().onBlur({ target: radio.at(0).getDOMNode() });
      });

      expect(onBlur).toHaveBeenCalled();
    });

    it('onChange handler is called when a radio button is clicked', () => {
      const onChange = jest.fn();
      const wrapper = renderer({ onChange });

      const radio = getRadioButtons(wrapper);

      act(() => {
        radio.at(0).props().onChange({ target: radio.at(0).getDOMNode() });
      });

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('controlled', () => {
    it('changing the value checks the appropraite radio button', () => {
      const wrapper = renderControlled();
      const buttons = getButtons(wrapper);

      buttons.at(0).simulate('click');

      const radio = getRadioButtons(wrapper);
      expect(radio.at(0).prop('checked')).toBe(true);
      expect(radio.at(1).prop('checked')).toBe(false);
      expect(radio.at(2).prop('checked')).toBe(false);
    });
  });

  describe('uncontrolled', () => {
    it('clicking a value checks the appropraite radio button', () => {
      const wrapper = renderUncontrolled();
      let radio = getRadioButtons(wrapper);

      radio.at(0).find('input').simulate('change');

      radio = getRadioButtons(wrapper);
      expect(radio.at(0).prop('checked')).toBe(true);
      expect(radio.at(1).prop('checked')).toBe(false);
      expect(radio.at(2).prop('checked')).toBe(false);
    });
  });
});
