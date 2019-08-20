import React from 'react';
import { mount, shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import CardPosition from './card-position.component';
import {
  POSITION_FOOTER,
  POSITION_HEADER,
  POSITION_MIDDLE,
  TEXT_TYPE_PRIMARY,
  TEXT_TYPE_SECONDARY,
  TEXT_TYPE_TERTIARY
} from '../card.const';
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
                positionType={ POSITION_HEADER }
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
                positionType={ POSITION_HEADER }
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
            const wrapper = shallow(
              <CardPosition
                positionType={ POSITION_HEADER }
                theme={ theme }
                secondary='this is secondary text'
              />
            );
            const elem = wrapper.find(`[data-element="${TEXT_TYPE_PRIMARY}"]`);
            it('does not render a primary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props includes primary text', () => {
            it('renders a primary element', () => {
              const wrapper = mount(
                <CardPosition
                  positionType={ POSITION_HEADER }
                  theme={ theme }
                  primary='this is primary text'
                />
              );
              const elem = wrapper.find(`[data-element="${TEXT_TYPE_PRIMARY}"]`);
              expect(elem.exists()).toEqual(true);
            });
          });

          describe('when props do not include secondary text', () => {
            const wrapper = shallow(
              <CardPosition
                positionType={ POSITION_HEADER }
                theme={ theme }
                primary='this is primary text'
              />
            );
            const elem = wrapper.find(`[data-element="${TEXT_TYPE_SECONDARY}"]`);
            it('does not render a secondary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props include secondary text', () => {
            it('renders a secondary element', () => {
              const wrapper = shallow(
                <CardPosition
                  positionType={ POSITION_HEADER }
                  theme={ theme }
                  secondary='this is secondary text'
                />
              );
              const elem = wrapper.find(`[data-element="${TEXT_TYPE_SECONDARY}"]`);
              expect(elem.exists()).toEqual(true);
            });
          });
        });

        describe('when section is rendered as a middle', () => {
          describe('when props are not passed', () => {
            const wrapper = TestRenderer.create(
              <CardPosition
                positionType={ POSITION_MIDDLE }
                theme={ theme }
              />
            ).toJSON();

            it('matches the styles for a rendered middle', () => {
              assertStyleMatch({
                textAlign: 'center',
                marginBottom: '32px'
              }, wrapper);
            });
          });

          describe('when a valid props are passed', () => {
            const wrapper = TestRenderer.create(
              <CardPosition
                positionType={ POSITION_MIDDLE }
                theme={ theme }
                primary='this is primary text'
                secondary='this is secondary text'
                tertiary='this is tertiary text'
              />
            ).toJSON();

            it('matches the styles for a rendered middle', () => {
              assertStyleMatch({
                textAlign: 'center',
                marginBottom: '32px'
              }, wrapper);
            });
          });

          describe('when props do not include primary text', () => {
            const wrapper = shallow(
              <CardPosition
                positionType={ POSITION_MIDDLE }
                theme={ theme }
                secondary='this is secondary text'
                tertiary='this is tertiary text'
              />
            );
            const elem = wrapper.find(`[data-element="${TEXT_TYPE_PRIMARY}"]`);
            it('does not render a primary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props includes primary text', () => {
            it('renders a primary element', () => {
              const wrapper = mount(
                <CardPosition
                  positionType={ POSITION_MIDDLE }
                  theme={ theme }
                  primary='this is primary text'
                />
              );
              const elem = wrapper.find(`[data-element="${TEXT_TYPE_PRIMARY}"]`);
              expect(elem.exists()).toEqual(true);
            });
          });

          describe('when props do not include secondary text', () => {
            const wrapper = shallow(
              <CardPosition
                positionType={ POSITION_MIDDLE }
                theme={ theme }
                primary='this is primary text'
              />
            );
            const elem = wrapper.find(`[data-element="${TEXT_TYPE_SECONDARY}"]`);
            it('does not render a secondary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props include secondary text', () => {
            it('renders a secondary element', () => {
              const wrapper = shallow(
                <CardPosition
                  positionType={ POSITION_MIDDLE }
                  theme={ theme }
                  secondary='this is secondary text'
                />
              );
              const elem = wrapper.find(`[data-element="${TEXT_TYPE_SECONDARY}"]`);
              expect(elem.exists()).toEqual(true);
            });
          });

          describe('when props do not include tertiary text', () => {
            const wrapper = shallow(
              <CardPosition
                positionType={ POSITION_MIDDLE }
                theme={ theme }
                primary='this is primary text'
                secondary='this is secondary text'
              />
            );
            const elem = wrapper.find(`.${TEXT_TYPE_TERTIARY}`);
            it('does not render a secondary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props include tertiary text', () => {
            it('renders a tertiary element', () => {
              const wrapper = shallow(
                <CardPosition
                  positionType={ POSITION_MIDDLE }
                  theme={ theme }
                  primary='this is primary text'
                  secondary='this is secondary text'
                  tertiary='this is tertiary text'
                />
              );
              const elem = wrapper.find(`[data-element="${TEXT_TYPE_TERTIARY}"]`);
              expect(elem.exists()).toEqual(true);
            });

            it('matches the style for a rendered tertiary element', () => {
              const wrapper = TestRenderer.create(
                <CardPosition
                  positionType={ POSITION_MIDDLE }
                  primary='this is primary text'
                  secondary='this is secondary text'
                  tertiary='this is tertiary text'
                  theme={ theme }
                />
              ).toJSON();
              assertStyleMatch({
                color: theme.card.middleTertiary,
                fontSize: '12px',
                textAlign: 'center',
                textTransform: 'uppercase'
              }, wrapper.children[2]);
            });
          });
        });

        describe('when section is rendered as a footer', () => {
          describe('when props are not passed', () => {
            const wrapper = TestRenderer.create(
              <CardPosition
                positionType={ POSITION_FOOTER }
                theme={ theme }
              />
            ).toJSON();

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

          describe('when a valid props are passed', () => {
            const wrapper = TestRenderer.create(
              <CardPosition
                positionType={ POSITION_FOOTER }
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
                padding: '0',
                textAlign: 'center'
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
