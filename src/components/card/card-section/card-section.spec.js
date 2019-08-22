import React from 'react';
import { mount, shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import CardSection from './card-section.component';
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


describe('CardSection', () => {
  describe('default themes', () => {
    describe.each(defaultThemes)('when the Card is rendered', (name, theme) => {
      describe(`${name} theme`, () => {
        describe('when section is rendered as a header', () => {
          describe('when props do not include primary text', () => {
            const wrapper = shallow(
              <CardSection
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
                <CardSection
                  positionType='header'
                  theme={ theme }
                  primary='this is primary text'
                />
              );
              const elem = wrapper.find('[data-element="header-primary"]');
              expect(elem.exists()).toEqual(true);
            });

            it('matches the style for a rendered primary text', () => {
              const wrapper = TestRenderer.create(
                <CardSection
                  positionType='header'
                  primary='this is primary text'
                  theme={ theme }
                />
              ).toJSON();
              assertStyleMatch({
                fontSize: '22px',
                fontWeight: '700',
                lineHeight: '26px',
                margin: '0'
              }, wrapper.children[0]);
            });
          });

          describe('when props do not include secondary text', () => {
            const wrapper = shallow(
              <CardSection
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
              const wrapper = shallow(
                <CardSection
                  positionType='header'
                  theme={ theme }
                  secondary='this is secondary text'
                />
              );
              const elem = wrapper.find('[data-element="header-secondary"]');
              expect(elem.exists()).toEqual(true);
            });

            it('matches the style for a rendered secondary element', () => {
              const wrapper = TestRenderer.create(
                <CardSection
                  positionType='header'
                  secondary='this is secondary text'
                  theme={ theme }
                />
              ).toJSON();
              assertStyleMatch({
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '21px'
              }, wrapper.children[0]);
            });
          });
        });

        describe('when section is rendered as a middle', () => {
          describe('when props do not include primary text', () => {
            const wrapper = shallow(
              <CardSection
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
                <CardSection
                  positionType='middle'
                  theme={ theme }
                  primary='this is primary text'
                />
              );
              const elem = wrapper.find('[data-element="middle-primary"]');
              expect(elem.exists()).toEqual(true);
            });

            it('matches the style for a rendered primary text', () => {
              const wrapper = TestRenderer.create(
                <CardSection
                  positionType='middle'
                  primary='this is primary text'
                  theme={ theme }
                />
              ).toJSON();
              assertStyleMatch({
                color: theme.card.middlePrimary,
                fontSize: '24px',
                fontWeight: '700',
                letterSpacing: '0.48px',
                marginBottom: '10px'
              }, wrapper.children[0]);
            });
          });

          describe('when props do not include secondary text', () => {
            const wrapper = shallow(
              <CardSection
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
              const wrapper = shallow(
                <CardSection
                  positionType='middle'
                  theme={ theme }
                  secondary='this is secondary text'
                />
              );
              const elem = wrapper.find('[data-element="middle-secondary"]');
              expect(elem.exists()).toEqual(true);
            });

            it('matches the style for a rendered secondary element', () => {
              const wrapper = TestRenderer.create(
                <CardSection
                  positionType='middle'
                  secondary='this is secondary text'
                  theme={ theme }
                />
              ).toJSON();
              assertStyleMatch({
                color: theme.card.middleSecondary,
                fontSize: '14px',
                fontWeight: '700',
                marginBottom: '8px'
              }, wrapper.children[0]);
            });
          });

          describe('when props do not include tertiary text', () => {
            const wrapper = shallow(
              <CardSection
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
              const wrapper = shallow(
                <CardSection
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

            it('matches the style for a rendered tertiary element', () => {
              const wrapper = TestRenderer.create(
                <CardSection
                  positionType='middle'
                  primary='this is primary text'
                  secondary='this is secondary text'
                  tertiary='this is tertiary text'
                  theme={ theme }
                />
              ).toJSON();
              assertStyleMatch({
                color: theme.card.middleTertiary,
                fontSize: '12px',
                textTransform: 'uppercase'
              }, wrapper.children[2]);
            });
          });
        });

        describe('when section is rendered as a footer', () => {
          describe('when a valid props are passed', () => {
            const wrapper = TestRenderer.create(
              <CardSection
                positionType='footer'
                theme={ theme }
                primary='this is primary text'
              />
            ).toJSON();

            it('matches the styles for rendered primary text', () => {
              assertStyleMatch({
                lineHeight: '30px',
                margin: '0',
                color: theme.card.footerText,
                fontWeight: '600',
                padding: '12px 0'
              }, wrapper.children[0]);
            });
          });
        });

        describe.each(['center', 'left', 'right'])('when props include alignment', (align) => {
          describe(`${align} align`, () => {
            const wrapper = TestRenderer.create(
              <CardSection
                positionType='header'
                theme={ theme }
                align={ align }
                primary='this is primary text'
              />
            ).toJSON();
            it('matches the aligned styles', () => {
              assertStyleMatch({
                textAlign: align
              }, wrapper);
            });
          });
        });

        describe('when props do not include alignment', () => {
          const wrapper = TestRenderer.create(
            <CardSection
              positionType='header'
              theme={ theme }
              primary='this is primary text'
            />
          ).toJSON();
          it('is left aligned', () => {
            assertStyleMatch({
              textAlign: 'left'
            }, wrapper);
          });
        });

        xdescribe('when children include an Icon', () => {
        });
      });
    });
  });
});
