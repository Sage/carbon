import React from 'react';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
import Pill from './pill.component';
import { classicStyleConfig } from './pill-classic.style.js';
import { modernStyleConfig } from './pill-modern.style.js';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import smallTheme from '../../style/themes/small';
import mediumTheme from '../../style/themes/medium';
import largeTheme from '../../style/themes/large';
import classicTheme from '../../style/themes/classic';

const classicStyleTypes = [
  'default',
  'disabled',
  'error',
  'help',
  'info',
  'maintenance',
  'new',
  'success',
  'warning'
];

const modernStyleTypes = [
  'neutral',
  'negative',
  'warning',
  'positive'
];

const modernThemes = [
  ['small', smallTheme], ['medium', mediumTheme], ['large', largeTheme]
];

describe('Pill', () => {
  describe('classic theme', () => {
    const render = (props, renderer = mount) => {
      return renderer(
        <Pill { ...props } />
      );
    };
    describe('when the children prop is passed to the component', () => {
      let instance, pill;
      beforeEach(() => {
        instance = render({
          children: 'My Text',
          theme: classicTheme
        });
        pill = instance.find('span').hostNodes();
      });
      it('renders a span tag with the given children', () => {
        expect(pill.length).toEqual(1);
        expect(pill.props().children[0]).toEqual('My Text');
      });

      it('does not render a close icon', () => {
        expect(pill.props().onClick).toEqual(null);
      });

      fit('matches the expected styles for a default pill', () => {
        const wrapper = render({ children: 'My Text', theme: classicTheme }, TestRenderer.create).toJSON();
        assertStyleMatch({
          borderRadius: '10px',
          display: 'inline-block',
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '0.7px',
          lineHeight: '15px',
          padding: '2px 7px',
          position: 'relative',
          textAlign: 'center'
        }, wrapper);
      });
    });

    describe('when the component is deletable', () => {
      describe('onDelete adds "close" icon to component', () => {
        let wrapper, icon;
        const spy = jest.fn();

        beforeEach(() => {
          wrapper = shallow(
            <Pill
              onDelete={ spy }
            >
              My Text
            </Pill>
          );
        });

        it('includes "close" icon when onDelete prop passed', () => {
          icon = wrapper.find('[data-element="close"]');
          expect(icon.exists()).toBeTruthy();
          expect(icon.length).toEqual(1);
        });

        it('triggers the click when the icon is clicked', () => {
          wrapper.find('[data-element="close"]').simulate('click');
          expect(spy).toHaveBeenCalled();
        });

        it('does not include "close" icon when onDelete prop not passed', () => {
          wrapper = shallow(
            <Pill>
              My Text
            </Pill>
          );
          icon = wrapper.find('[data-element="close"]');
          expect(icon.exists()).toBeFalsy();
          expect(icon.length).toEqual(0);
        });
      });
      it('adds adds a click handler to the component', () => {
        const spy = jest.fn();
        const instance = render({
          children: 'My Text',
          onClick: spy,
          theme: classicTheme
        });
        const pill = instance.find('span').hostNodes();

        pill.simulate('click');
        expect(spy).toHaveBeenCalled();
      });

      it('matches the expected styles for a deletable pill', () => {
        const wrapper = render({
          children: 'My Text',
          onDelete: jest.fn(),
          theme: classicTheme
        }, TestRenderer.create).toJSON();
        assertStyleMatch({
          padding: '2px 19px 2px 7px'
        }, wrapper);
      });
    });

    describe.each(classicStyleTypes)(
      'when the pill style is set as "%s"',
      (style) => {
        const wrapper = render({
          children: 'My Text',
          as: style,
          theme: classicTheme
        });

        const colourSet = classicStyleConfig[style];

        it(`matches the expected styling for ${style}`, () => {
          assertStyleMatch({
            border: `1px solid ${colourSet.color}`,
            color: colourSet.color
          }, wrapper);
        });

        describe('when the component is in a filled state', () => {
          const fillWrapper = render({
            children: 'My Text',
            as: style,
            fill: true,
            theme: classicTheme
          });
          it(`matches the expected filled styling for ${style}`, () => {
            assertStyleMatch({
              backgroundColor: colourSet.color
            }, fillWrapper);
          });
        });
      }
    );

    describe('when there are custom tags on the component', () => {
      const wrapper = shallow(
        <Pill
          data-element='bar'
          data-role='baz'
        >
          My Text
        </Pill>
      );

      it('includes correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'pill', 'bar', 'baz');
      });
    });
  });

  describe('modern themes', () => {
    describe.each(modernThemes)('when the pill is rendered',
      (name, theme) => {
        describe(`when the theme is ${name}`, () => {
          const styleSet = modernStyleConfig[name];
          it(`matches the expected styles for a default ${name} pill`, () => {
            const wrapper = render({
              children: 'My Text',
              theme
            }, TestRenderer.create).toJSON();
            assertStyleMatch({
              borderRadius: '14px',
              fontSize: '14px',
              fontWeight: '700'
            }, wrapper);
          });
          describe.each(modernStyleTypes)(
            'when the pill style is set as "%s"',
            (style) => {
              const wrapper = render({
                children: 'My Text',
                as: style,
                theme
              });

              it(`matches the expected styling for ${style}`, () => {
                assertStyleMatch({
                  border: `2px solid ${styleSet.colors[style]}`
                }, wrapper);
              });
            }
          );
        });
      });
  });
});
