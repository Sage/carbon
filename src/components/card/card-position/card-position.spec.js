import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import CardPosition from './card-position.component';
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

describe('CardPosition', () => {
  describe('default themes', () => {
    describe.each(defaultThemes)('when the CardPosition component is rendered', (name, theme) => {
      describe(`${name} theme`, () => {
        describe('when section is rendered as a header', () => {
          describe('when props are not passed', () => {
            const wrapper = TestRenderer.create(
              <CardPosition
                positionType='header'
                theme={ theme }
              />
            ).toJSON();

            it('matches the styles for a rendered header', () => {
              assertStyleMatch({
                padding: '32px 32px',
                minHeight: '48px'
              }, wrapper);
            });
          });

          describe('when a valid props are passed', () => {
            const wrapper = TestRenderer.create(
              <CardPosition
                positionType='header'
                theme={ theme }
                primary='header is passed as a prop'
                secondary='this is a subtitle'
                icon='/path/to/icon.svg'
              />
            ).toJSON();

            it('matches the styles for a rendered header', () => {
              assertStyleMatch({
                padding: '32px 32px',
                minHeight: '48px'
              }, wrapper);
            });
          });

          describe('when props do not include primary text', () => {
            const wrapper = mount(
              <CardPosition
                positionType='header'
                theme={ theme }
                secondary='this is secondary text'
              />
            );
            const elem = wrapper.find('[data-element="header-primary"]');
            it('does not render a primary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props includes primary text', () => {
            it('renders a primary element', () => {
              const wrapper = mount(
                <CardPosition
                  positionType='header'
                  theme={ theme }
                  primary='this is primary text'
                />
              );
              const elem = wrapper.find('[data-element="header-primary"]');
              expect(elem.exists()).toEqual(true);
            });
          });

          describe('when props do not include secondary text', () => {
            const wrapper = mount(
              <CardPosition
                positionType='header'
                theme={ theme }
                primary='this is primary text'
              />
            );
            const elem = wrapper.find('[data-element="header-secondary"]');
            it('does not render a secondary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props include secondary text', () => {
            it('renders a secondary element', () => {
              const wrapper = mount(
                <CardPosition
                  positionType='header'
                  theme={ theme }
                  secondary='this is secondary text'
                />
              );
              const elem = wrapper.find('[data-element="header-secondary"]');
              expect(elem.exists()).toEqual(true);
            });
          });
        });

        describe('when section is rendered as a middle', () => {
          describe('when props are not passed', () => {
            const wrapper = TestRenderer.create(
              <CardPosition
                positionType='middle'
                theme={ theme }
              />
            ).toJSON();

            it('matches the styles for a rendered middle', () => {
              assertStyleMatch({
                padding: '0 32px',
                marginBottom: '32px'
              }, wrapper);
            });
          });

          describe('when a valid props are passed', () => {
            const wrapper = TestRenderer.create(
              <CardPosition
                positionType='middle'
                theme={ theme }
                primary='this is primary text'
                secondary='this is secondary text'
                tertiary='this is tertiary text'
              />
            ).toJSON();

            it('matches the styles for a rendered middle', () => {
              assertStyleMatch({
                padding: '0 32px',
                marginBottom: '32px'
              }, wrapper);
            });
          });

          describe('when props do not include primary text', () => {
            const wrapper = mount(
              <CardPosition
                positionType='middle'
                theme={ theme }
                secondary='this is secondary text'
                tertiary='this is tertiary text'
              />
            );
            const elem = wrapper.find('[data-element="middle-primary"]');
            it('does not render a primary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props includes primary text', () => {
            it('renders a primary element', () => {
              const wrapper = mount(
                <CardPosition
                  positionType='middle'
                  theme={ theme }
                  primary='this is primary text'
                />
              );
              const elem = wrapper.find('[data-element="middle-primary"]');
              expect(elem.exists()).toEqual(true);
            });
          });

          describe('when props do not include secondary text', () => {
            const wrapper = mount(
              <CardPosition
                positionType='middle'
                theme={ theme }
                primary='this is primary text'
              />
            );
            const elem = wrapper.find('[data-element="middle-secondary"]');
            it('does not render a secondary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props include secondary text', () => {
            it('renders a secondary element', () => {
              const wrapper = mount(
                <CardPosition
                  positionType='middle'
                  theme={ theme }
                  secondary='this is secondary text'
                />
              );
              const elem = wrapper.find('[data-element="middle-secondary"]');
              expect(elem.exists()).toEqual(true);
            });
          });

          describe('when props do not include tertiary text', () => {
            const wrapper = mount(
              <CardPosition
                positionType='middle'
                theme={ theme }
                primary='this is primary text'
                secondary='this is secondary text'
              />
            );
            const elem = wrapper.find('[data-element="middle-tertiary"]');
            it('does not render a secondary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props include tertiary text', () => {
            it('renders a tertiary element', () => {
              const wrapper = mount(
                <CardPosition
                  positionType='middle'
                  theme={ theme }
                  primary='this is primary text'
                  secondary='this is secondary text'
                  tertiary='this is tertiary text'
                />
              );
              const elem = wrapper.find('[data-element="middle-tertiary"]');
              expect(elem.exists()).toEqual(true);
            });
          });
        });

        describe('when section is rendered as a footer', () => {
          describe('when props are not passed', () => {
            const wrapper = TestRenderer.create(
              <CardPosition
                positionType='footer'
                theme={ theme }
              />
            ).toJSON();

            it('matches the styles for a rendered footer', () => {
              assertStyleMatch({
                backgroundColor: theme.card.footerBackground,
                borderTop: theme.card.footerBorder,
                height: '56px',
                lineHeight: '56px',
                padding: '0 32px'
              }, wrapper);
            });
          });

          describe('when a valid props are passed', () => {
            const wrapper = TestRenderer.create(
              <CardPosition
                positionType='footer'
                theme={ theme }
                primary='this is primary text'
              />
            ).toJSON();

            it('matches the styles for a rendered footer', () => {
              assertStyleMatch({
                backgroundColor: theme.card.footerBackground,
                borderTop: theme.card.footerBorder,
                height: '56px',
                lineHeight: '56px',
                padding: '0 32px'
              }, wrapper);
            });
          });
        });

        xdescribe('when section is aligned', () => {
        });

        xdescribe('when children include an Icon', () => {
        });
      });
    });
  });
});
