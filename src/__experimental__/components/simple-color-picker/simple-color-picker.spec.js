import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { css } from 'styled-components';
import PropTypes from 'prop-types';
import { SimpleColor, SimpleColorPicker } from '.';
import { LegendContainerStyle } from '../fieldset/fieldset.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import Button from '../../../components/button';

const colorValues = ['#00A376', '#0073C1'];
const name = 'test-group';

function render(renderer = TestRenderer.create, props) {
  const children = colorValues.map((color, index) => (
    <SimpleColor
      id={ `rId-${index}` }
      key={ `radio-key-${color}` }
      onChange={ jest.fn() }
      color={ color }
    />
  ));

  return renderer(
    <SimpleColorPicker
      name={ name }
      legend='SimpleColorPicker Legend'
      onChange={ jest.fn() }
      { ...props }
    >
      {children}
    </SimpleColorPicker>
  );
}

function getSimpleColors(wrapper) {
  return wrapper.find(SimpleColor);
}

function getButtons(wrapper) {
  return wrapper.find(Button);
}

function getInputWrapper(button) {
  return button.find('input');
}

describe('SimpleColorPicker', () => {
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });

  describe('child SimpleColor prop / key mapping', () => {
    const wrapper = render(mount);
    const colors = getSimpleColors(wrapper);
    const colorsArray = colors.getElements();

    describe.each(colorsArray)('colors[%#]', (color) => {
      const index = colorsArray.indexOf(color);

      describe('key / color (both derived from color prop)', () => {
        const expectedColor = colorValues[index];
        const expectedKey = `.$radio-key-${expectedColor}`;

        it(`sets the color to ${expectedColor}`, () => {
          expect(color.props.color).toEqual(expectedColor);
        });

        it(`sets the key to ${expectedKey}`, () => {
          expect(color.key).toEqual(expectedKey);
        });
      });

      describe('name', () => {
        it('is set using the SimpleColorPicker name prop', () => {
          const buttonWrapper = colors.at(colorsArray.indexOf(color));
          const input = getInputWrapper(buttonWrapper).instance();

          expect(input.name).toEqual(name);
        });
      });
    });

    describe('selected input state', () => {
      describe('initial', () => {
        it('sets checked to false for simple color inputs', () => {
          colorsArray.forEach((color) => {
            expect(color.props.checked).toBe(false);
          });
        });
      });

      describe('defaultChecked', () => {
        it('sets a child radio input to checked when the prop is set programatically', () => {
          const radioGroup = shallow(
            <SimpleColorPicker name={ name } legend='SimpleColorPicker Legend'>
              <SimpleColor defaultChecked color='#00A376' />
            </SimpleColorPicker>
          );

          const button = radioGroup.find(SimpleColor);
          expect(button.props().checked).toBe(true);
        });
      });

      describe.each(colorsArray)('when colors[%#] has changed', (color) => {
        const index = colorsArray.indexOf(color);
        const otherIndex = index ? 0 : 1;
        let buttonWrapper = colors.at(index);
        let otherButtonWrapper = colors.at(otherIndex);
        const inputWrapper = getInputWrapper(buttonWrapper);
        const target = inputWrapper.instance();

        inputWrapper.simulate('change', { target });
        wrapper.update();

        buttonWrapper = getSimpleColors(wrapper).at(index);
        otherButtonWrapper = getSimpleColors(wrapper).at(otherIndex);

        it('sets checked === true when it is changed', () => {
          expect(buttonWrapper.props().checked).toBe(true);
          expect(otherButtonWrapper.props().checked).toBe(false);
        });

        it('sets checked === false when the other color is selected', () => {
          const otherInputWrapper = getInputWrapper(otherButtonWrapper);
          const otherTarget = otherInputWrapper.instance();

          otherInputWrapper.simulate('change', { target: otherTarget });
          wrapper.update();

          buttonWrapper = getSimpleColors(wrapper).at(index);
          otherButtonWrapper = getSimpleColors(wrapper).at(otherIndex);

          expect(buttonWrapper.props().checked).toBe(false);
          expect(otherButtonWrapper.props().checked).toBe(true);
        });
      });
    });
  });

  describe('defaultChecked', () => {
    it('sets a child radio input to checked when the prop is set programatically', () => {
      const radioGroup = mount(
        <SimpleColorPicker name={ name } legend='SimpleColorPicker Legend'>
          <SimpleColor
            defaultChecked
            name='#00A376'
            color='#00A376'
          />
          <SimpleColor name='#0073C1' color='#0073C1' />
        </SimpleColorPicker>
      );

      const button = getSimpleColors(radioGroup).at(0);
      expect(button.prop('checked')).toBe(true);
    });
  });

  describe('styles', () => {
    it('applies the correct Legend Container styles', () => {
      assertStyleMatch(
        {
          height: '26px',
          marginBottom: '16px'
        },
        render().toJSON(),
        {
          modifier: css`
            ${LegendContainerStyle}
          `
        }
      );
    });

    it('applies the correct legend styles', () => {
      assertStyleMatch(
        {
          fontSize: '14px',
          marginLeft: '-2px'
        },
        render().toJSON(),
        { modifier: css`${LegendContainerStyle} legend` }
      );
    });
  });

  const renderUncontrolled = (groupProps, radioProps) => mount(
    <SimpleColorPicker
      legend='SimpleColorPicker Legend'
      name='radio-button-group'
      onChange={ jest.fn() }
      { ...groupProps }
    >
      <SimpleColor name='#00A376' color='#00A376' />
      <SimpleColor
        name='#0073C1'
        color='#0073C1'
        { ...radioProps }
      />
      <SimpleColor name='#582C83' color='#582C83' />
    </SimpleColorPicker>
  );

  const Controller = (props) => {
    const [value, setValue] = useState(null);
    return (
      <>
        <SimpleColorPicker
          name={ name }
          legend='SimpleColorPicker Legend'
          onChange={ (e) => {
            setValue(e.target.value);
          } }
          value={ value }
          { ...props.groupProps }
        >
          <SimpleColor name='#00A376' color='#00A376' />
          <SimpleColor
            name='#0073C1'
            color='#0073C1'
            { ...props.radioProps }
          />
          <SimpleColor name='#582C83' color='#582C83' />
        </SimpleColorPicker>
        <Button
          onClick={ () => {
            setValue('#00A376');
          } }
        >
          Set One
        </Button>
        <Button
          onClick={ () => {
            setValue('#582C83');
          } }
        >
          Set Two
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

  describe.each([['controlled', renderControlled], ['uncontrolled', renderUncontrolled]])('%s', (type, renderer) => {
    it('none of the radio buttons are checked by default', () => {
      const wrapper = renderer();
      const radio = getSimpleColors(wrapper);
      expect(radio.at(0).prop('checked')).toBe(false);
      expect(radio.at(1).prop('checked')).toBe(false);
      expect(radio.at(2).prop('checked')).toBe(false);
    });

    it('onChange handler is called when a radio button is clicked', () => {
      const onChange = jest.fn();
      const wrapper = renderer({ onChange });

      const radio = getSimpleColors(wrapper);

      act(() => {
        radio
          .at(0)
          .props()
          .onChange({ target: radio.at(0).getDOMNode() });
      });

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('controlled', () => {
    it('changing the value checks the appropriate radio button', () => {
      const wrapper = renderControlled();
      const buttons = getButtons(wrapper);

      buttons.at(0).simulate('click');

      const radio = getSimpleColors(wrapper);
      expect(radio.at(0).prop('checked')).toBe(true);
      expect(radio.at(1).prop('checked')).toBe(false);
      expect(radio.at(2).prop('checked')).toBe(false);
    });
  });

  describe('uncontrolled', () => {
    it('clicking a value checks the appropriate radio button', () => {
      const wrapper = renderUncontrolled();
      let radio = getSimpleColors(wrapper);

      radio
        .at(0)
        .find('input')
        .simulate('change');

      radio = getSimpleColors(wrapper);
      expect(radio.at(0).prop('checked')).toBe(true);
      expect(radio.at(1).prop('checked')).toBe(false);
      expect(radio.at(2).prop('checked')).toBe(false);
    });
  });
});

describe('propTypes', () => {
  it('validates the incorrect children prop', () => {
    jest.spyOn(global.console, 'error');

    mount(
      <SimpleColorPicker name={ name } legend='SimpleColorPicker Legend'>
        <p>Invalid children</p>
        <p>Invalid children</p>
      </SimpleColorPicker>
    );

    const expected = 'Warning: Failed prop type: `SimpleColorPicker` only accepts children of'
      + ' type `SimpleColor`.\n    in SimpleColorPicker';

    expect(console.error).toHaveBeenCalledWith(expected);
  });
});
