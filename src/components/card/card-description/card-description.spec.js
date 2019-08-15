import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
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
        describe('when description is not passed as a prop', () => {
          const wrapper = TestRenderer.create(
            <CardDescription
              theme={ theme }
            />
          ).toJSON();
          it('matches the styles for a rendered description', () => {
            assertStyleMatch({
              textAlign: 'center',
              marginBottom: '32px'
            }, wrapper);
          });
        });

        describe('when an empty description is passed as a prop', () => {
          const descProps = [{}];
          const wrapper = TestRenderer.create(
            <CardDescription
              description={ descProps }
              theme={ theme }
            />
          ).toJSON();
          it('matches the styles for a rendered header', () => {
            assertStyleMatch({
              textAlign: 'center',
              marginBottom: '32px'
            }, wrapper);
          });
        });

        describe('when a valid description is passed as a prop', () => {
          const descProps = [{
            primary: 'primary description text',
            secondary: 'secondary description text',
            tertiary: 'tertiary description text'
          }];
          const wrapper = TestRenderer.create(
            <CardDescription
              description={ descProps }
              theme={ theme }
            />
          ).toJSON();

          it('matches the styles for a rendered description', () => {
            assertStyleMatch({
              textAlign: 'center',
              marginBottom: '32px'
            }, wrapper);
          });
        });

        describe('when description does not include primary', () => {
          const descProps = [{
            secondary: 'this is a secondary description',
            tertiary: 'this is a tertiary description'
          }];
          const wrapper = shallow(
            <CardDescription
              description={ descProps }
              theme={ theme }
            />
          );
          const elem = wrapper.find('[data-element="primary-description"]');
          it('does not render a primary description', () => {
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when description includes primary', () => {
          const descProps = [{
            primary: 'this is a primary description',
            secondary: 'this is a secondary description',
            tertiary: 'this is a tertiary description'
          }];

          it('renders a primary description', () => {
            const wrapper = shallow(
              <CardDescription
                description={ descProps }
                theme={ theme }
              />
            );
            const elem = wrapper.find('[data-element="primary-description"]');
            expect(elem.exists()).toEqual(true);
          });

          it('matches the style for a rendered primary description', () => {
            const wrapper = TestRenderer.create(
              <CardDescription
                description={ descProps }
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              color: theme.card.descriptionPrimary,
              fontSize: '24px',
              fontWeight: '700',
              letterSpacing: '0.48px',
              marginBottom: '10px',
              textAlign: 'center'
            }, wrapper, { modifier: '.primary-description' });
          });
        });

        describe('when description does not include secondary', () => {
          const descProps = [{
            primary: 'this is a primary description',
            tertiary: 'this is a tertiary description'
          }];
          const wrapper = shallow(
            <CardDescription
              description={ descProps }
              theme={ theme }
            />
          );
          const elem = wrapper.find('[data-element="secondary-description"]');
          it('does not render a seconcdary description', () => {
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when description includes secondary', () => {
          const descProps = [{
            primary: 'this is a primary description',
            secondary: 'this is a secondary description',
            tertiary: 'this is a tertiary description'
          }];

          it('renders a secondary description', () => {
            const wrapper = shallow(
              <CardDescription
                description={ descProps }
                theme={ theme }
              />
            );
            const elem = wrapper.find('[data-element="secondary-description"]');
            expect(elem.exists()).toEqual(true);
          });

          it('matches the style for a rendered secondary description', () => {
            const wrapper = TestRenderer.create(
              <CardDescription
                description={ descProps }
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              color: theme.card.descriptionSecondary,
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '8px',
              textAlign: 'center'
            }, wrapper, { modifier: '.secondary-description' });
          });
        });

        describe('when description does not include tertiary', () => {
          const descProps = [{
            primary: 'this is a primary description',
            secondary: 'this is a secondary description'
          }];
          const wrapper = shallow(
            <CardDescription
              description={ descProps }
              theme={ theme }
            />
          );
          const elem = wrapper.find('[data-element="tertiary-description"]');
          it('does not render a tertiary description', () => {
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when description includes tertiary', () => {
          const descProps = [{
            primary: 'this is a primary description',
            secondary: 'this is a secondary description',
            tertiary: 'this is a tertiary description'
          }];

          it('renders a tertiary description', () => {
            const wrapper = shallow(
              <CardDescription
                description={ descProps }
                theme={ theme }
              />
            );
            const elem = wrapper.find('[data-element="tertiary-description"]');
            expect(elem.exists()).toEqual(true);
          });

          it('matches the style for a rendered tertiary description', () => {
            const wrapper = TestRenderer.create(
              <CardDescription
                description={ descProps }
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              color: theme.card.descriptionTertiary,
              fontSize: '12px',
              textAlign: 'center',
              textTransform: 'uppercase'
            }, wrapper, { modifier: '.tertiary-description' });
          });
        });

        // TODO allow reordering of description properties
        describe('when a description is reodered', () => {
          it('renders the properties in the correct order', () => {

          });
        });
      });
    });
  });
});
