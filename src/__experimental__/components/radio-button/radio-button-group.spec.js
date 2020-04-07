import React from 'react';
import TestRenderer from 'react-test-renderer';
import { css } from 'styled-components';
import { mount } from 'enzyme';
import { RadioButton, RadioButtonGroup } from '.';
import { LegendContainerStyle } from '../fieldset/fieldset.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import RadioButtonGroupStyle from './radio-button-group.style';
import Fieldset from '../fieldset';

const buttonValues = ['test-1', 'test-2'];
const name = 'test-group';

function render(renderer = TestRenderer.create, props) {
  const children = buttonValues.map((value, index) => (
    <RadioButton
      id={ `rId-${index}` } key={ `radio-key-${value}` }
      onChange={ jest.fn() } value={ value }
    />
  ));

  return renderer(
    <RadioButtonGroup
      name={ name }
      legend='Test RadioButtonGroup Legend'
      onBlur={ jest.fn() }
      onChange={ jest.fn() }
      { ...props }
    >
      {children}
    </RadioButtonGroup>
  );
}

describe('RadioButtonGroup', () => {
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });

  describe('styles', () => {
    it('applies the correct Legend Container styles', () => {
      assertStyleMatch(
        {
          height: '26px',
          marginBottom: '16px'
        },
        render().toJSON(),
        { modifier: css`${LegendContainerStyle}` }
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

    it('applies the correct Legend Container styles', () => {
      assertStyleMatch(
        {
          display: 'flex'
        },
        mount(<RadioButtonGroupStyle inline />)
      );
    });
  });

  describe('style overrides', () => {
    let wrapper;
    const customStyleObject = {
      backgroundColor: 'red',
      display: 'flex',
      fontSize: '200px'
    };
    const styleOverride = {
      root: customStyleObject,
      content: customStyleObject,
      legend: customStyleObject
    };

    beforeEach(() => {
      wrapper = render(mount, { styleOverride });
    });

    it('renders root element with properly assigned styles', () => {
      assertStyleMatch(customStyleObject, wrapper.find(Fieldset));
    });

    it('renders content wrapper with properly assigned styles', () => {
      assertStyleMatch(customStyleObject, wrapper.find(RadioButtonGroupStyle));
    });

    it('renders legend element with properly assigned styles', () => {
      assertStyleMatch(customStyleObject, wrapper.find(LegendContainerStyle));
    });
  });
});
