import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
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
        describe('when header is not passed as a prop', () => {
          const wrapper = TestRenderer.create(
            <CardHeader
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

        describe('when an empty header is passed as a prop', () => {
          const headerProps = [{}];
          const wrapper = TestRenderer.create(
            <CardHeader
              header={ headerProps }
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

        describe('when a valid header is passed as a prop', () => {
          const headerProps = [{
            title: 'header is passed as a prop',
            subtitle: 'this is a subtitle',
            icon: '/path/to/icon.svg'
          }];
          const wrapper = TestRenderer.create(
            <CardHeader
              header={ headerProps }
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

        describe('when header does not include a title', () => {
          const headerProps = [{
            subtitle: 'this is a subtitle',
            icon: '/path/to/icon.svg'
          }];
          const wrapper = shallow(
            <CardHeader
              header={ headerProps }
              theme={ theme }
            />
          );
          const elem = wrapper.find('h2');
          it('does not render an <h2> element', () => {
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when header includes a title', () => {
          const headerProps = [{
            title: 'this is a title',
            subtitle: 'this is a subtitle',
            icon: '/path/to/icon.svg'
          }];

          it('renders an <h2> element', () => {
            const wrapper = shallow(
              <CardHeader
                header={ headerProps }
                theme={ theme }
              />
            );
            const elem = wrapper.find('h2');
            expect(elem.exists()).toEqual(true);
          });

          it('matches the style for a rendered <h2> element', () => {
            const wrapper = TestRenderer.create(
              <CardHeader
                header={ headerProps }
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              fontSize: '22px',
              fontWeight: '700',
              lineHeight: '26px',
              margin: '0'
            }, wrapper, { modifier: 'h2' });
          });
        });

        describe('when header does not includes a subtitle', () => {
          const headerProps = [{
            title: 'this is a title',
            icon: '/path/to/icon.svg'
          }];
          const wrapper = shallow(
            <CardHeader
              header={ headerProps }
              theme={ theme }
            />
          );
          const elem = wrapper.find('p');
          it('does not render a <p> element', () => {
            expect(elem.exists()).toEqual(false);
          });
        });

        describe('when header includes a subtitle', () => {
          const headerProps = [{
            title: 'this is a title',
            subtitle: 'this is a subtitle',
            icon: '/path/to/icon.svg'
          }];
          it('renders a <p> element', () => {
            const wrapper = shallow(
              <CardHeader
                header={ headerProps }
                theme={ theme }
              />
            );
            const elem = wrapper.find('p');
            expect(elem.exists()).toEqual(true);
          });

          it('matches the style for a rendered <p> element', () => {
            const wrapper = TestRenderer.create(
              <CardHeader
                header={ headerProps }
                theme={ theme }
              />
            ).toJSON();
            assertStyleMatch({
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '21px'
            }, wrapper, { modifier: 'p' });
          });
        });

        // TODO Icon
        describe('when header does not include an icon', () => {
          it('does not render an Icon component', () => {

          });
        });

        describe('when header includes an icon', () => {
          it('renders an Icon component', () => {

          });
          it('matches the style for a rendered Icon component', () => {

          });
        });
      });
    });
  });
});
