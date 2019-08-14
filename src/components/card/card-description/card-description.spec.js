import React from 'react';
import { mount } from 'enzyme';
import CardDescription from './card-description.component';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import smallTheme from '../../../style/themes/small';
import mediumTheme from '../../../style/themes/medium';
import largeTheme from '../../../style/themes/large';
import 'jest-styled-components';

const defaultThemes = [
  ['small', smallTheme],
  ['medium', mediumTheme],
  ['large', largeTheme]
];

describe('CardDescription', () => {
  describe('default themes', () => {
    describe.each(defaultThemes)('when the CardDescription is rendered', (name, theme) => {
      describe(`${name} theme`, () => {
        describe('when description is passed as a prop', () => {
          const descText = 'description is passed as a prop';
          const wrapper = mount(
            <CardDescription
              description={ descText }
              theme={ theme }
            />
          );

          it('matches the styles for a rendered description', () => {
            assertStyleMatch({
              textAlign: 'center',
              marginBottom: '32px'
            }, wrapper);
          });
        });
      });
    });
  });
});
