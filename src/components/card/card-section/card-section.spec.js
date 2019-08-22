import React from 'react';
import { mount, shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import CardSection from './card-section.component';
import {
  POSITION_FOOTER,
  POSITION_HEADER,
  POSITION_MIDDLE,
  TEXT_TYPE_PRIMARY,
  TEXT_TYPE_SECONDARY,
  TEXT_TYPE_TERTIARY
} from '../card.const';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import OptionsHelper from '../../../utils/helpers/options-helper';
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
                positionType={ POSITION_HEADER }
                theme={ theme }
                secondary='this is secondary text'
              />
            );
            const elem = wrapper.find(`[data-element="${POSITION_HEADER}-${TEXT_TYPE_PRIMARY}"]`);
            it('does not render a primary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props includes primary text', () => {
            it('renders a primary element', () => {
              const wrapper = mount(
                <CardSection
                  positionType={ POSITION_HEADER }
                  theme={ theme }
                  primary='this is primary text'
                />
              );
              const elem = wrapper.find(`[data-element="${POSITION_HEADER}-${TEXT_TYPE_PRIMARY}"]`);
              expect(elem.exists()).toEqual(true);
            });

            it('matches the style for a rendered primary text', () => {
              const wrapper = TestRenderer.create(
                <CardSection
                  positionType={ POSITION_HEADER }
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
                positionType={ POSITION_HEADER }
                theme={ theme }
                primary='this is primary text'
              />
            );
            const elem = wrapper.find(`[data-element="${POSITION_HEADER}-${TEXT_TYPE_SECONDARY}"]`);
            it('does not render a secondary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props include secondary text', () => {
            it('renders a secondary element', () => {
              const wrapper = shallow(
                <CardSection
                  positionType={ POSITION_HEADER }
                  theme={ theme }
                  secondary='this is secondary text'
                />
              );
              const elem = wrapper.find(`[data-element="${POSITION_HEADER}-${TEXT_TYPE_SECONDARY}"]`);
              expect(elem.exists()).toEqual(true);
            });

            it('matches the style for a rendered secondary element', () => {
              const wrapper = TestRenderer.create(
                <CardSection
                  positionType={ POSITION_HEADER }
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
                positionType={ POSITION_MIDDLE }
                theme={ theme }
                secondary='this is secondary text'
                tertiary='this is tertiary text'
              />
            );
            const elem = wrapper.find(`[data-element="${POSITION_MIDDLE}-${TEXT_TYPE_PRIMARY}"]`);
            it('does not render a primary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props includes primary text', () => {
            it('renders a primary element', () => {
              const wrapper = mount(
                <CardSection
                  positionType={ POSITION_MIDDLE }
                  theme={ theme }
                  primary='this is primary text'
                />
              );
              const elem = wrapper.find(`[data-element="${POSITION_MIDDLE}-${TEXT_TYPE_PRIMARY}"]`);
              expect(elem.exists()).toEqual(true);
            });

            it('matches the style for a rendered primary text', () => {
              const wrapper = TestRenderer.create(
                <CardSection
                  positionType={ POSITION_MIDDLE }
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
                positionType={ POSITION_MIDDLE }
                theme={ theme }
                primary='this is primary text'
              />
            );
            const elem = wrapper.find(`[data-element="${POSITION_MIDDLE}-${TEXT_TYPE_SECONDARY}"]`);
            it('does not render a secondary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props include secondary text', () => {
            it('renders a secondary element', () => {
              const wrapper = shallow(
                <CardSection
                  positionType={ POSITION_MIDDLE }
                  theme={ theme }
                  secondary='this is secondary text'
                />
              );
              const elem = wrapper.find(`[data-element="${POSITION_MIDDLE}-${TEXT_TYPE_SECONDARY}"]`);
              expect(elem.exists()).toEqual(true);
            });

            it('matches the style for a rendered secondary element', () => {
              const wrapper = TestRenderer.create(
                <CardSection
                  positionType={ POSITION_MIDDLE }
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
                positionType={ POSITION_MIDDLE }
                theme={ theme }
                primary='this is primary text'
                secondary='this is secondary text'
              />
            );
            const elem = wrapper.find(`[data-element="${POSITION_MIDDLE}-${TEXT_TYPE_TERTIARY}"]`);
            it('does not render a secondary element', () => {
              expect(elem.exists()).toEqual(false);
            });
          });

          describe('when props include tertiary text', () => {
            it('renders a tertiary element', () => {
              const wrapper = shallow(
                <CardSection
                  positionType={ POSITION_MIDDLE }
                  theme={ theme }
                  primary='this is primary text'
                  secondary='this is secondary text'
                  tertiary='this is tertiary text'
                />
              );
              const elem = wrapper.find(`[data-element="${POSITION_MIDDLE}-${TEXT_TYPE_TERTIARY}"]`);
              expect(elem.exists()).toEqual(true);
            });

            it('matches the style for a rendered tertiary element', () => {
              const wrapper = TestRenderer.create(
                <CardSection
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
                textTransform: 'uppercase'
              }, wrapper.children[2]);
            });
          });
        });

        describe('when section is rendered as a footer', () => {
          describe('when a valid props are passed', () => {
            const wrapper = TestRenderer.create(
              <CardSection
                positionType={ POSITION_FOOTER }
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

        describe.each(OptionsHelper.alignFull)('when props include alignment', (align) => {
          describe(`${align} align`, () => {
            const wrapper = TestRenderer.create(
              <CardSection
                positionType={ POSITION_HEADER }
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
              positionType={ POSITION_HEADER }
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
