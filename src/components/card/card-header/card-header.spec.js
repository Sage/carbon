import React from 'react';
import { mount } from 'enzyme';
import CardHeader from './card-header.component';
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

describe('CardHeader', () => {
  describe('default themes', () => {
    describe.each(defaultThemes)('when the CardHeader is rendered', (name, theme) => {
      describe(`${name} theme`, () => {
        describe('when a header is passed as a prop', () => {
          const headerText = 'header is passed as a prop';
          const wrapper = mount(
            <CardHeader
              header={ headerText }
              theme={ theme }
            />
          );

          it('matches the styles for a rendered header', () => {
            assertStyleMatch({
              padding: '32px 32px 0',
              marginBottom: '24px'
            }, wrapper);
          });
        });
      });
    });
  });
});
