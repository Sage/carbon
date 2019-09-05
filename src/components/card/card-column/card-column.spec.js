import React from 'react';
import { mount } from 'enzyme';
import CardColumn from './card-column.component';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import 'jest-styled-components';

const contentTypeVariants = [
  ['header', ['primary', 'secondary']],
  ['middle', ['primary', 'secondary', 'tertiary']],
  ['footer', ['primary']]
];

const expectedStyle = {
  header: {
    primary: {
      fontSize: '22px',
      fontWeight: '700',
      lineHeight: '26px',
      margin: '0'
    },
    secondary: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '21px',
      margin: '0'
    }
  },
  middle: {
    primary: {
      color: 'rgba(0,0,0,0.74)',
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '10px'
    },
    secondary: {
      color: 'rgba(0,0,0,0.65)',
      fontSize: '14px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    tertiary: {
      color: 'rgba(0,0,0,0.55)',
      fontSize: '12px'
    }
  },
  footer: {
    lineHeight: '30px',
    margin: '0',
    color: '#008200',
    fontWeight: '600',
    padding: '12px 0'
  }
};

describe('CardColumn', () => {
  describe.each(contentTypeVariants)('each row renders', (position, contentStyles) => {
    describe.each(contentStyles)('to match the expected style', (style) => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(
          <CardColumn
            type={ { position, contentStyle: style } }
          />
        );
      });

      it(`for ${position} ${style} content`, () => {
        assertStyleMatch({ ...expectedStyle[position][style] }, wrapper);
      });
    });
  });
});
