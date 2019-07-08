import React from 'react';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { shallow, mount } from 'enzyme';
import Pill from './pill.component';
import styleConfig from './pill.style.config';
import { classicStyleConfig } from './pill-classic.style';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import smallTheme from '../../style/themes/small';
import mediumTheme from '../../style/themes/medium';
import largeTheme from '../../style/themes/large';
import classicTheme from '../../style/themes/classic';
import baseTheme from '../../style/themes/base';
import OptionsHelper from '../../utils/helpers/options-helper';

const classicStyleTypes = [...OptionsHelper.colors, 'disabled'];
const modernStyleTypes = [...OptionsHelper.pillColors, 'warning'];
const modernThemes = [
  ['small', smallTheme],
  ['medium', mediumTheme],
  ['large', largeTheme]
];

describe('Pill', () => {
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
  });

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

  describe('modern themes', () => {
    describe.each(modernThemes)('when the pill is rendered',
      (name, theme) => {
        describe(`${name} theme`, () => {
          describe('when pillRole is status', () => {
            const pillRole = 'status';
            const styleSet = styleConfig(theme)[pillRole];
            it(`matches the expected styles for a default ${name} pill`, () => {
              const wrapper = render({
                children: 'My Text',
                theme
              }, TestRenderer.create).toJSON();
              assertStyleMatch({
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                position: 'relative',
                top: '-1px',
                padding: '2px 8px 2px 8px',
                margin: '0px 8px 16px 0px'
              }, wrapper);
            });

            describe('when the component is deletable', () => {
              it('matches the expected styles for a deletable pill', () => {
                const wrapper = render({
                  children: 'My Text',
                  onDelete: jest.fn(),
                  theme
                }, TestRenderer.create).toJSON();
                assertStyleMatch({
                  padding: '2px 27px 2px 8px'
                }, wrapper);
              });

              describe('when the component is in a filled state', () => {
                describe('when the style is not warning', () => {
                  const style = 'neutral';
                  const fillWrapper = render({
                    children: 'My Text',
                    onDelete: jest.fn(),
                    colorVariant: style,
                    pillRole,
                    fill: true,
                    theme
                  });

                  it(`matches the expected filled styling for ${style}`, () => {
                    assertStyleMatch({
                      backgroundColor: styleSet[style].color,
                      color: theme.colors.white
                    }, fillWrapper);
                  });
                });

                describe('when the style is warning', () => {
                  const style = 'warning';
                  const fillWrapper = render({
                    children: 'My Text',
                    onDelete: jest.fn(),
                    colorVariant: style,
                    pillRole,
                    fill: true,
                    theme
                  });

                  it(`matches the expected filled styling for ${style}`, () => {
                    assertStyleMatch({
                      backgroundColor: styleSet[style].color,
                      color: theme.colors.black
                    }, fillWrapper);
                  });
                });
              });
            });

            describe.each(modernStyleTypes)(
              'when the pill style is set as "%s"',
              (style) => {
                describe('when storybook supplies the correct theme', () => {
                  const wrapper = render({
                    children: 'My Text',
                    colorVariant: style,
                    theme,
                    pillRole
                  });

                  it(`matches the expected styling for ${style}`, () => {
                    assertStyleMatch({
                      border: `2px solid ${styleSet[style].color}`
                    }, wrapper);
                  });
                });

                describe('when the component is in a filled state', () => {
                  const fillWrapper = render({
                    children: 'My Text',
                    colorVariant: style,
                    fill: true,
                    theme,
                    pillRole
                  });

                  it(`matches the expected filled styling for ${style}`, () => {
                    assertStyleMatch({
                      backgroundColor: styleSet[style].color
                    }, fillWrapper);
                  });
                });
              }
            );
          });
          describe('when pillRole is tag', () => {
            const pillRole = 'tag';
            const styleSet = styleConfig(theme)[pillRole];

            describe('when the component is deletable', () => {
              describe('when the component is in a filled state', () => {
                const style = 'primary';
                const fillWrapper = render({
                  children: 'My Text',
                  onDelete: jest.fn(),
                  pillRole,
                  fill: true,
                  theme
                });

                it(`matches the expected filled styling for ${style}`, () => {
                  assertStyleMatch({
                    backgroundColor: styleSet[style].color
                  }, fillWrapper);
                });
              });
            });
          });
        });
      });
  });

  describe('classic theme', () => {
    const renderClassic = (props, renderer = mount) => {
      return renderer(
        <ThemeProvider theme={ classicTheme }>
          <Pill { ...props } />
        </ThemeProvider>
      );
    };

    it('matches the expected styles for a default pill', () => {
      const wrapper = renderClassic({ children: 'My Text', theme: classicTheme }, TestRenderer.create).toJSON();
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

    describe('when the component is deletable', () => {
      it('matches the expected styles for a deletable pill', () => {
        const wrapper = renderClassic({
          children: 'My Text',
          onDelete: jest.fn(),
          theme: classicTheme
        }, TestRenderer.create).toJSON();
        assertStyleMatch({
          padding: '2px 19px 2px 7px'
        }, wrapper);
      });

      describe('when the component is in a filled state', () => {
        const fillWrapper = render({
          children: 'My Text',
          onDelete: jest.fn(),
          fill: true,
          theme: classicTheme
        });

        it('matches the expected filled styling', () => {
          const style = 'default';
          const colorSet = classicStyleConfig[style];
          assertStyleMatch({
            backgroundColor: colorSet.color
          }, fillWrapper);
        });
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

        const colorSet = classicStyleConfig[style];

        it(`matches the expected styling for ${style}`, () => {
          assertStyleMatch({
            border: `1px solid ${colorSet.color}`,
            color: colorSet.color
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
              backgroundColor: colorSet.color
            }, fillWrapper);
          });
        });
      }
    );
  });

  describe('base theme', () => {
    const renderBase = (props, renderer = mount) => {
      return renderer(
        <ThemeProvider theme={ baseTheme }>
          <Pill { ...props } />
        </ThemeProvider>
      );
    };

    it('switches to use the modern small theme', () => {
      const wrapper = renderBase({
        children: 'My Text',
        theme: baseTheme
      }, TestRenderer.create).toJSON();
      assertStyleMatch({
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '600',
        position: 'relative',
        top: '-1px',
        padding: '2px 8px 2px 8px',
        margin: '0px 8px 16px 0px'
      }, wrapper);
    });
  });

  describe('when storybook supplies classic theme with a modern colour variant', () => {
    const renderBase = (props, renderer = mount) => {
      return renderer(
        <ThemeProvider theme={ classicTheme }>
          <Pill { ...props } />
        </ThemeProvider>
      );
    };

    it('switches to use the modern small theme', () => {
      const wrapper = renderBase({
        children: 'My Text',
        colorVariant: 'neutral',
        theme: classicTheme
      }, TestRenderer.create).toJSON();
      assertStyleMatch({
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '600',
        position: 'relative',
        top: '-1px',
        padding: '2px 8px 2px 8px',
        margin: '0px 8px 16px 0px'
      }, wrapper);
    });
  });
});
