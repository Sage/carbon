import React from 'react';
import TestRenderer from 'react-test-renderer';
import { css } from 'styled-components';
import { mount } from 'enzyme';

import { SimpleColor, SimpleColorPicker } from '.';
import { LegendContainerStyle } from '../fieldset/fieldset.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

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

describe('SimpleColorPicker', () => {
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
});
