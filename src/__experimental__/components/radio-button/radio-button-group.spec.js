import React from 'react';
import TestRenderer from 'react-test-renderer';
import { css } from 'styled-components';
import { RadioButton, RadioButtonGroup } from '.';
import { LegendContainerStyle } from '../fieldset/fieldset.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

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
  });
});
