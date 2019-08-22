import React from 'react';
import { mount, shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Card from './card.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import smallTheme from '../../style/themes/small';
import mediumTheme from '../../style/themes/medium';
import largeTheme from '../../style/themes/large';
import 'jest-styled-components';

const defaultThemes = [
  ['small', smallTheme],
  ['medium', mediumTheme],
  ['large', largeTheme]
];

describe('Card', () => {
  describe('default themes', () => {
    describe.each(defaultThemes)('when the Card is rendered', (name, theme) => {
      describe(`${name} theme`, () => {
        describe('when border is not enabled', () => {
          it(`matches the expected styles for a default ${name} Card`, () => {
            const wrapper = TestRenderer.create(
              <Card
                border={ false }
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              border: 'none'
            }, wrapper);
          });
        });

        describe('when border is passed as a prop', () => {
          it(`matches the expected styles for a default ${name} Card`, () => {
            const wrapper = TestRenderer.create(
              <Card
                border
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              border: `1px solid ${theme.colors.border}`
            }, wrapper);
          });
        });

        describe('when width is not passed as a prop', () => {
          const wrapper = shallow(
            <Card
              theme={ theme }
            />
          );
          const elem = wrapper.find('[data-element="card"]');
          it('width fills containing element', () => {
            expect(elem).not.toHaveStyleRule('width');
          });
        });

        describe('when width is passed as a percentage value', () => {
          const widthPct = '50%';
          const wrapper = TestRenderer.create(
            <Card
              cardWidth={ widthPct }
              theme={ theme }
            />
          ).toJSON();

          it(`Card has style rule of width: ${widthPct}`, () => {
            assertStyleMatch({
              width: widthPct
            }, wrapper);
          });
        });

        describe('when width is passed as a pixel value', () => {
          const widthPx = '500px';
          const wrapper = TestRenderer.create(
            <Card
              cardWidth={ widthPx }
              theme={ theme }
            />
          ).toJSON();

          it(`Card has style rule of width: ${widthPx}`, () => {
            assertStyleMatch({
              width: widthPx
            }, wrapper);
          });
        });

        describe('when a header is not passed as a prop', () => {
          const wrapper = mount(
            <Card
              theme={ theme }
            />
          );

          it('does not renders a header', () => {
            const elem = wrapper.find('[data-element="header"]');
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when a header is passed as a prop', () => {
          const wrapper = mount(
            <Card
              header
              headerPrimary='header is passed as a prop'
              theme={ theme }
            />
          );
          const elem = wrapper.find('[data-element="header"]');

          it('renders a header', () => {
            expect(elem.exists()).toEqual(true);
          });
        });

        describe('when middle is not passed as a prop', () => {
          const wrapper = mount(
            <Card
              theme={ theme }
            />
          );

          it('does not render any middle', () => {
            const elem = wrapper.find('[data-element="middle"]');
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when middle is passed as a prop', () => {
          const primary = 'primary description text';
          const wrapper = mount(
            <Card
              middle
              theme={ theme }
              middlePrimary={ primary }
            />
          );
          const elem = wrapper.find('[data-element="middle"]');

          it('renders a middle', () => {
            expect(elem.exists()).toEqual(true);
          });
        });

        describe('when footer is not passed as a prop', () => {
          const wrapper = mount(
            <Card
              theme={ theme }
            />
          );

          it('does not render a footer', () => {
            const elem = wrapper.find('[data-element="footer"]');
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when footer is passed as a prop', () => {
          const primary = 'footer is passed as a prop';
          const wrapper = mount(
            <Card
              footer
              theme={ theme }
              footerPrimary={ primary }
            />
          );
          const elem = wrapper.find('[data-element="footer"]');

          it('renders a footer', () => {
            expect(elem.exists()).toEqual(true);
          });
        });
      });
    });
  });
});
