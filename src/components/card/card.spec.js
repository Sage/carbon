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
  describe('when a description is not passed as a prop', () => {
    const wrapper = mount(
      <Card />
    );

    it('does not render a description', () => {
      const elem = wrapper.find('[data-element="description"]');
      expect(elem.exists()).toEqual(false);
    });
  });

  describe('when description is passed as a prop', () => {
    const descText = 'description is passed as a prop';
    const wrapper = mount(
      <Card description={ descText } />
    );

    it('renders a description', () => {
      const elem = wrapper.find('[data-element="description"]');
      expect(elem.exists()).toEqual(true);
    });
  });

  describe('when footer is not passed as a prop', () => {
    const wrapper = mount(
      <Card />
    );

    it('does not render a footer', () => {
      const elem = wrapper.find('[data-element="footer"]');
      expect(elem.exists()).toEqual(false);
    });
  });

  describe('when footer is passed as a prop', () => {
    const footerText = 'footer is passed as a prop';
    const wrapper = mount(
      <Card footer={ footerText } />
    );

    it('renders a footer', () => {
      const elem = wrapper.find('[data-element="footer"]');
      expect(elem.exists()).toEqual(true);
    });
  });

  describe('default themes', () => {
    describe.each(defaultThemes)('when the Card is rendered', (name, theme) => {
      describe(`${name} theme`, () => {
        describe('when border is enabled and there is no footer', () => {
          const border = true;

          it(`matches the expected styles for a default ${name} Card`, () => {
            const wrapper = TestRenderer.create(
              <Card
                border={ border }
                description='border is enabled and there is no footer'
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              border: `1px solid ${theme.colors.border}`
            }, wrapper);
          });
        });

        describe('when border is disabled and there is no footer', () => {
          it(`matches the expected styles for a default ${name} Card`, () => {
            const wrapper = TestRenderer.create(
              <Card
                description='border is disabled and there is no footer'
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
            }, wrapper);
          });
        });
      });
    });
  });
});
