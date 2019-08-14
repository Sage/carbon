import React from 'react';
import { mount } from 'enzyme';
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
        describe('when a header is not passed as a prop', () => {
          const wrapper = mount(
            <Card
              theme={ theme }
            />
          );

          it('does not render a header', () => {
            const elem = wrapper.find('[data-element="card-header"]');
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when a header is passed as a prop', () => {
          const headerText = 'header is passed as a prop';
          const wrapper = mount(
            <Card
              header={ headerText }
              theme={ theme }
            />
          );
          const elem = wrapper.find('[data-element="card-header"]');

          it('renders a header', () => {
            expect(elem.exists()).toEqual(true);
          });
        });

        describe('when a description is not passed as a prop', () => {
          const wrapper = mount(
            <Card
              theme={ theme }
            />
          );

          it('does not render a description', () => {
            const elem = wrapper.find('[data-element="card-description"]');
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when description is passed as a prop', () => {
          const descText = 'description is passed as a prop';
          const wrapper = mount(
            <Card
              theme={ theme }
              description={ descText }
            />
          );
          const elem = wrapper.find('[data-element="card-description"]');

          it('renders a description', () => {
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
            const elem = wrapper.find('[data-element="card-footer"]');
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when footer is passed as a prop', () => {
          const footerText = 'footer is passed as a prop';
          const wrapper = mount(
            <Card
              theme={ theme }
              footer={ footerText }
            />
          );
          const elem = wrapper.find('[data-element="card-footer"]');

          it('renders a footer', () => {
            expect(elem.exists()).toEqual(true);
          });
        });
      });
    });
  });

  // IAN move these into each section test above
  describe('default themes', () => {
    describe.each(defaultThemes)('when the Card is rendered', (name, theme) => {
      describe(`${name} theme`, () => {
        describe('when border is disabled and there is no footer', () => {
          it(`matches the expected styles for a default ${name} Card`, () => {
            const testElem = TestRenderer.create(
              <Card
                border={ false }
                description='border is disabled and there is no footer'
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              backgroundColor: theme.colors.white,
              boxShadow: theme.shadows.cards,
              marginBottom: '32px',
              position: 'relative',
              transition: 'all 0.3s ease-in-out',
              border: 'none'
            }, testElem);
          });
        });

        describe('when border is enabled and there is no footer', () => {
          it(`matches the expected styles for a default ${name} Card`, () => {
            const testElem = TestRenderer.create(
              <Card
                border
                description='border is enabled and there is no footer'
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              backgroundColor: theme.colors.white,
              boxShadow: '0 3px 3px 0 rgba(0,20,29,0.2),0 2px 4px 0 rgba(0,20,29,0.15)',
              marginBottom: '32px',
              position: 'relative',
              transition: 'all 0.3s ease-in-out',
              border: `1px solid ${theme.colors.border}`
            }, testElem);
          });
        });
      });
    });
  });
});
