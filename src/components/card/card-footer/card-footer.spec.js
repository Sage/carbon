import React from 'react';
import { mount } from 'enzyme';
import CardFooter from './card-footer.component';
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

describe('CardFooter', () => {
  describe('default themes', () => {
    describe.each(defaultThemes)('when the CardFooter is rendered', (name, theme) => {
      describe(`${name} theme`, () => {
        describe('when footer is passed as a prop', () => {
          const footerText = 'footer is passed as a prop';
          const wrapper = mount(
            <CardFooter
              theme={ theme }
              footer={ footerText }
            />
          );

          it('matches the styles for a rendered footer', () => {
            assertStyleMatch({
              backgroundColor: theme.card.footerBackground,
              borderTop: theme.card.footerBorder,
              height: '56px',
              lineHeight: '56px',
              padding: '0',
              textAlign: 'center'
            }, wrapper);
          });
        });
      });
    });
  });
});
