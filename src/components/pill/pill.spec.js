import React from 'react';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Pill from './pill.component';
import styleConfig from './pill.style.config';
import { classicStyleConfig } from './pill-classic.style';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import OptionsHelper from '../../utils/helpers/options-helper';
import { classicTheme, carbonThemeList } from '../../style/themes';
import StyledIcon from '../icon/icon.style';

const themesTable = carbonThemeList.map(theme => [theme.name, theme]);
const classicStyleTypes = [...OptionsHelper.colors, 'disabled'];
const modernStyleTypes = [...OptionsHelper.pillColors, 'warning'];

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
        children: 'My Text'
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
        onClick: spy
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
    describe.each(themesTable)('when the pill is rendered',
      (name, theme) => {
        describe(`${name} theme`, () => {
          describe('when the component size is small', () => {
            it('matches the expected styles for a small pill', () => {
              const wrapper = render({
                children: 'My Text',
                size: 'S'
              }, TestRenderer.create).toJSON();
              assertStyleMatch({
                fontSize: '10px',
                minHeight: '16px',
                lineHeight: '16px',
                padding: '0 7px'
              }, wrapper);
            });
          });

          describe('when the component size is medium', () => {
            it('matches the expected styles for a medium pill', () => {
              const wrapper = render({
                children: 'My Text',
                size: 'M'
              }, TestRenderer.create).toJSON();
              assertStyleMatch({
                fontSize: '12px',
                minHeight: '20px',
                lineHeight: '20px',
                padding: '0 11px'
              }, wrapper);
            });
          });

          describe('when the component size is large', () => {
            it('matches the expected styles for a large pill', () => {
              const wrapper = render({
                children: 'My Text',
                size: 'L'
              }, TestRenderer.create).toJSON();
              assertStyleMatch({
                fontSize: '14px',
                minHeight: '24px',
                lineHeight: '24px',
                padding: '0 15px'
              }, wrapper);
            });
          });

          describe('when the component size is extra large', () => {
            it('matches the expected styles for a extra large pill', () => {
              const wrapper = render({
                children: 'My Text',
                size: 'XL'
              }, TestRenderer.create).toJSON();
              assertStyleMatch({
                fontSize: '16px',
                minHeight: '26px',
                lineHeight: '26px',
                padding: '0 19px'
              }, wrapper);
            });
          });

          describe('when pillRole is status', () => {
            const pillRole = 'status';
            const styleSet = styleConfig(theme)[pillRole];
            it(`matches the expected styles for a default ${name} pill`, () => {
              const wrapper = render({
                children: 'My Text',
                theme
              }, TestRenderer.create).toJSON();
              assertStyleMatch({
                fontWeight: '600',
                position: 'relative',
                padding: '0 11px',
                textAlign: 'center'
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
                  padding: '0 32px 0 11px'
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
                      backgroundColor: styleSet[style].varietyColor,
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
                      backgroundColor: styleSet[style].varietyColor,
                      color: theme.text.color
                    }, fillWrapper);
                  });
                });
              });

              describe('when the component size is small', () => {
                it('matches the expected styles for a small deletable pill', () => {
                  const wrapper = render({
                    children: 'My Text',
                    onDelete: jest.fn(),
                    size: 'S',
                    theme
                  }, TestRenderer.create).toJSON();
                  assertStyleMatch({
                    padding: '0 24px 0 7px',
                    minHeight: '16px',
                    height: 'auto',
                    lineHeight: '16px'
                  }, wrapper);
                });
              });

              describe('when the component size is medium', () => {
                it('matches the expected styles for a medium deletable pill', () => {
                  const wrapper = render({
                    children: 'My Text',
                    onDelete: jest.fn(),
                    size: 'M',
                    theme
                  }, TestRenderer.create).toJSON();
                  assertStyleMatch({
                    fontSize: '12px',
                    padding: '0 32px 0 11px',
                    borderRadius: '12px',
                    minHeight: '20px',
                    height: 'auto',
                    lineHeight: '20px'
                  }, wrapper);
                });
              });

              describe('when the component size is large', () => {
                it('matches the expected styles for a large deletable pill', () => {
                  const wrapper = render({
                    children: 'My Text',
                    onDelete: jest.fn(),
                    size: 'L',
                    theme
                  }, TestRenderer.create).toJSON();
                  assertStyleMatch({
                    fontSize: '14px',
                    padding: '0 36px 0 15px',
                    borderRadius: '13px',
                    minHeight: '24px',
                    height: 'auto',
                    lineHeight: '24px'
                  }, wrapper);
                });
              });

              describe('when the component size is extra large', () => {
                it('matches the expected styles for a extra large deletable pill', () => {
                  const wrapper = render({
                    children: 'My Text',
                    onDelete: jest.fn(),
                    size: 'XL',
                    theme
                  }, TestRenderer.create).toJSON();
                  assertStyleMatch({
                    fontSize: '16px',
                    padding: '0 41px 0 19px',
                    borderRadius: '15px',
                    minHeight: '26px',
                    height: 'auto',
                    lineHeight: '26px'
                  }, wrapper);
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
                      border: `2px solid ${styleSet[style].varietyColor}`
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
                      backgroundColor: styleSet[style].varietyColor
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
                    backgroundColor: styleSet[style].varietyColor
                  }, fillWrapper);
                });
              });
            });
          });
        });
      });
  });

  describe('when the theme is Classic', () => {
    it('matches the expected styles for a default pill', () => {
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

    describe('when the component is deletable', () => {
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

    describe('when the pill type is a warning', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = render({ children: 'My Text', as: 'warning', theme: classicTheme }, TestRenderer.create).toJSON();
      });

      it('has no height specified', () => {
        assertStyleMatch({
          height: 'auto',
          minHeight: 'auto'
        }, wrapper);
      });

      it('has no padding in default pill button', () => {
        assertStyleMatch({
          padding: '0'
        }, wrapper, { modifier: `button ${StyledIcon}` });
      });
    });
  });
});
