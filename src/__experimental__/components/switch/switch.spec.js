import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { css } from 'styled-components';
import Switch from '.';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import StyledSwitchSlider from './switch-slider.style';
import guid from '../../../utils/helpers/guid';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import baseTheme from '../../../style/themes/base';
import classicTheme from '../../../style/themes/classic';
import smallTheme from '../../../style/themes/small';
import mediumTheme from '../../../style/themes/medium';
import largeTheme from '../../../style/themes/large';

jest.mock('../../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

function render(props) {
  return TestRenderer.create(<Switch { ...props } />);
}

describe('Switch', () => {
  describe('base theme', () => {
    it('renders as expected', () => {
      expect(render()).toMatchSnapshot();
    });

    describe('when reverse=true', () => {
      describe('default', () => {
        const wrapper = render({ reverse: true }).toJSON();

        it('applies the correct Label styles', () => {
          assertStyleMatch({
            marginTop: '8px'
          }, wrapper, { modifier: css`${LabelStyle}` });
        });
      });

      describe('and labelInline=true', () => {
        const wrapper = render({ reverse: true, labelInline: true }).toJSON();

        it('applies the correct Label styles', () => {
          assertStyleMatch({
            marginLeft: '10px'
          }, wrapper, { modifier: css`${LabelStyle}` });
        });
      });

      describe('and labelInline=true, fieldHelpInline=false', () => {
        const wrapper = render({ fieldHelpInline: false, labelInline: true, reverse: true }).toJSON();

        it('applies the correct FieldHelp styles', () => {
          assertStyleMatch({
            marginLeft: '70px'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });
    });

    describe('when fieldHelpInline=true', () => {
      const wrapper = render({ fieldHelpInline: true }).toJSON();

      it('applies the correct FieldHelp styles', () => {
        assertStyleMatch({ marginRight: '32px' }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('when labelInline=true', () => {
      const wrapper = render({ labelInline: true }).toJSON();

      it('applies the correct Label styles', () => {
        assertStyleMatch({
          margin: '0 32px 0 0',
          padding: '3px 0',
          width: 'auto'
        }, wrapper, { modifier: css`${LabelStyle}` });
      });

      it('applies the correct FieldHelp styles', () => {
        assertStyleMatch({
          marginTop: '0'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('when fieldHelpInline=true and labelInline=true', () => {
      const wrapper = render({ fieldHelpInline: true, labelInline: true }).toJSON();

      it('applies the correct Label styles', () => {
        assertStyleMatch({
          marginRight: '10px'
        }, wrapper, { modifier: css`${LabelStyle}` });
      });

      it('applies the correct FieldHelp styles', () => {
        assertStyleMatch({
          marginTop: '0',
          padding: '3px 0'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('when setting a custom labelWidth', () => {
      it('renders the correct Label styles', () => {
        const wrapper = render({ labelWidth: 60 }).toJSON();

        assertStyleMatch({
          marginRight: '40%'
        }, wrapper, { modifier: css`${LabelStyle}` });
      });
    });

    describe('when size=large', () => {
      describe('default', () => {
        const wrapper = render({ size: 'large' }).toJSON();

        const largeSizes = {
          height: '40px',
          width: '78px'
        };

        it('applies the correct CheckableInput styles', () => {
          assertStyleMatch(largeSizes, wrapper, { modifier: css`${StyledCheckableInput}` });
        });

        it('applies the correct HiddenCheckableInput styles', () => {
          assertStyleMatch(largeSizes, wrapper, { modifier: css`${HiddenCheckableInputStyle}` });
        });

        it('applies the correct SwitchSlider styles', () => {
          assertStyleMatch(largeSizes, wrapper, { modifier: css`${StyledSwitchSlider}` });
        });
      });

      describe('and fieldHelpInline=true', () => {
        const wrapper = render({ size: 'large', fieldHelpInline: true }).toJSON();

        it('applies the correct FieldHelp styles', () => {
          assertStyleMatch({
            marginTop: '0',
            padding: '10px 0'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });

      describe('and labelInline=true', () => {
        it('applies the correct Label styles', () => {
          const wrapper = render({ size: 'large', labelInline: true }).toJSON();

          assertStyleMatch({
            marginTop: '1px',
            padding: '10px 0'
          }, wrapper, { modifier: css`${LabelStyle}` });
        });

        describe('and reverse=true', () => {
          const wrapper = render({ size: 'large', labelInline: true, reverse: true }).toJSON();

          it('applies the correct FieldHelp styles', () => {
            assertStyleMatch({
              marginLeft: '88px'
            }, wrapper, { modifier: css`${FieldHelpStyle}` });
          });
        });
      });
    });
  });

  describe('Classic theme', () => {
    const opts = { theme: classicTheme };
    const classicSize = { height: '28px', width: '55px' };

    describe('default', () => {
      const wrapper = render(opts).toJSON();

      it('applies appropriate CheckableInput styles', () => {
        assertStyleMatch({
          borderRadius: '24px',
          ...classicSize
        }, wrapper, { modifier: css`${StyledCheckableInput}` });
      });

      it('applies appropriate HiddenCheckableInput styles', () => {
        assertStyleMatch({
          borderRadius: '24px',
          ...classicSize
        }, wrapper, { modifier: css`${HiddenCheckableInputStyle}` });
      });

      it('applies appropriate SwitchSlider styles', () => {
        assertStyleMatch({
          transition: 'box-shadow .1s linear'
        }, wrapper, { modifier: css`${StyledSwitchSlider}` });
      });

      it('applies appropriate help icon', () => {
        assertStyleMatch({
          content: "'\\E943'"
        }, wrapper, { modifier: css`${`${LabelStyle} .carbon-icon::before`}` });
      });

      it('applies appropriate SwitchSlider focus styles', () => {
        assertStyleMatch(
          {
            boxShadow: '0 0 6px 2px rgba(37,91,199,0.6)',
            outline: 'none'
          },
          wrapper,
          { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledSwitchSlider}`}` }
        );
      });

      it('applies appropriate SwitchSlider hover styles', () => {
        assertStyleMatch(
          {
            outline: 'none'
          },
          wrapper,
          { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledSwitchSlider}`}` }
        );
      });
    });

    describe('and disabled=true', () => {
      it('applies the correct Label color', () => {
        const wrapper = render({ disabled: true, ...opts }).toJSON();

        assertStyleMatch(
          { color: baseTheme.text.color }, wrapper, { modifier: css`${LabelStyle}` }
        );
      });
    });

    describe('and labelInline=true', () => {
      describe('default', () => {
        const wrapper = render({ labelInline: true, ...opts }).toJSON();

        it('applies the correct Label styles', () => {
          assertStyleMatch({
            padding: '5px 0'
          }, wrapper, { modifier: css`${LabelStyle}` });
        });
      });
    });

    describe('and reverse=true', () => {
      const wrapper = render({ labelInline: true, reverse: true, ...opts }).toJSON();

      it('applies the correct FieldHelp styles', () => {
        assertStyleMatch({
          marginLeft: '66px'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('and size=large', () => {
      const largeOpts = { size: 'large', ...opts };

      describe('default', () => {
        const wrapper = render(largeOpts).toJSON();

        it('applies the correct CheckableInput styles', () => {
          assertStyleMatch(classicSize, wrapper, { modifier: css`${StyledCheckableInput}` });
        });

        it('applies the correct HiddenCheckableInput styles', () => {
          assertStyleMatch(classicSize, wrapper, { modifier: css`${HiddenCheckableInputStyle}` });
        });

        it('applies the correct SwitchSlider styles', () => {
          assertStyleMatch(classicSize, wrapper, { modifier: css`${StyledSwitchSlider}` });
        });
      });

      describe('and fieldHelpInline=true', () => {
        const wrapper = render({ fieldHelpInline: true, ...largeOpts }).toJSON();

        it('applies the correct FieldHelp styles', () => {
          assertStyleMatch({
            marginTop: '0',
            padding: '3px 0'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });

      describe('and labelInline=true', () => {
        it('applies the correct Label styles', () => {
          const wrapper = render({ labelInline: true, ...largeOpts }).toJSON();

          assertStyleMatch({
            marginTop: '0',
            padding: '5px 0'
          }, wrapper, { modifier: css`${LabelStyle}` });
        });

        describe('and reverse=true', () => {
          const wrapper = render({ labelInline: true, reverse: true, ...largeOpts }).toJSON();

          it('applies the correct FieldHelp styles', () => {
            assertStyleMatch({
              marginLeft: '66px'
            }, wrapper, { modifier: css`${FieldHelpStyle}` });
          });
        });
      });
    });
  });

  describe('Small theme', () => {
    describe('default', () => {
      const wrapper = render({ theme: smallTheme }).toJSON();

      describe('input hover / focus styles', () => {
        const hoverFocusStyles = { outline: `solid 3px ${smallTheme.colors.focus}` };

        it('applies the correct focus styles', () => {
          assertStyleMatch(
            hoverFocusStyles,
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledSwitchSlider}`}` }
          );
        });

        it('applies the correct hover styles', () => {
          assertStyleMatch(
            hoverFocusStyles,
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledSwitchSlider}`}` }
          );
        });
      });
    });
  });

  describe('Medium theme', () => {
    describe('default', () => {
      const wrapper = render({ theme: mediumTheme }).toJSON();

      describe('input hover / focus styles', () => {
        const hoverFocusStyles = { outline: `solid 3px ${mediumTheme.colors.focus}` };

        it('applies the correct focus styles', () => {
          assertStyleMatch(
            hoverFocusStyles,
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledSwitchSlider}`}` }
          );
        });

        it('applies the correct hover styles', () => {
          assertStyleMatch(
            hoverFocusStyles,
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledSwitchSlider}`}` }
          );
        });
      });
    });
  });

  describe('Large theme', () => {
    describe('default', () => {
      const wrapper = render({ theme: largeTheme }).toJSON();

      describe('input hover / focus styles', () => {
        const hoverFocusStyles = { outline: `solid 3px ${largeTheme.colors.focus}` };

        it('applies the correct focus styles', () => {
          assertStyleMatch(
            hoverFocusStyles,
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledSwitchSlider}`}` }
          );
        });

        it('applies the correct hover styles', () => {
          assertStyleMatch(
            hoverFocusStyles,
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledSwitchSlider}`}` }
          );
        });
      });
    });
  });
});
