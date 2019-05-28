import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { css } from 'styled-components';
import Checkbox from './checkbox.component';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import StyledCheckboxSvgWrapper from './checkbox-svg-wrapper.style';
import StyledHelp from '../help/help.style';
import guid from '../../../utils/helpers/guid';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import classicTheme from '../../../style/themes/classic';
import smallTheme from '../../../style/themes/small';
import mediumTheme from '../../../style/themes/medium';
import largeTheme from '../../../style/themes/large';
import baseTheme from '../../../style/themes/base';

jest.mock('../../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

function render(props) {
  return TestRenderer.create(<Checkbox { ...props } />);
}

describe('Checkbox', () => {
  describe('base theme', () => {
    it('renders as expected', () => {
      expect(render()).toMatchSnapshot();
    });

    describe('when size=large', () => {
      const wrapper = render({ size: 'large' }).toJSON();

      it('applies the appropriate input display element styles', () => {
        const styles = {
          height: '24px',
          padding: '2px',
          width: '24px'
        };

        assertStyleMatch(styles, wrapper, { modifier: css`${StyledCheckableInput}` });

        assertStyleMatch(styles, wrapper, { modifier: css`${HiddenCheckableInputStyle}` });

        assertStyleMatch(styles, wrapper, { modifier: css`${`${StyledCheckboxSvgWrapper} > svg`}` });

        assertStyleMatch({
          height: '24px'
        }, wrapper, { modifier: (css`${StyledCheckboxSvgWrapper}`) });
      });

      it('applies the correct CheckboxSvgWrapper styles', () => {
        assertStyleMatch({
          height: '24px'
        }, wrapper, { modifier: (css`${StyledCheckboxSvgWrapper}`) });
      });

      it('applies the appropriate FieldHelp styles', () => {
        assertStyleMatch({
          marginLeft: '24px',
          paddingLeft: '8px'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });

      it('applies the appropriate Label styles', () => {
        assertStyleMatch({
          paddingBottom: '4px',
          paddingLeft: '8px',
          paddingTop: '4px'
        }, wrapper, { modifier: css`${LabelStyle}` });
      });
    });

    describe('when size=large and fieldHelpInline=true', () => {
      const wrapper = render({ fieldHelpInline: true, size: 'large' }).toJSON();

      it('applies the appropriate FieldHelp styles', () => {
        assertStyleMatch({
          paddingBottom: '4px',
          paddingTop: '4px'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('when checked=true', () => {
      it('renders the correct check colour', () => {
        const wrapper = render({ checked: true }).toJSON();

        assertStyleMatch({
          fill: baseTheme.colors.primary
        }, wrapper, { modifier: 'svg path' });
      });

      describe('and disabled=true', () => {
        const wrapper = render({ checked: true, disabled: true }).toJSON();

        it('renders the correct check colour', () => {
          assertStyleMatch({
            fill: baseTheme.disabled.border
          }, wrapper, { modifier: 'svg path' });
        });
      });
    });

    describe('when disabled=true', () => {
      const wrapper = render({ disabled: true }).toJSON();

      it('applies the appropriate Label styles', () => {
        assertStyleMatch({
          color: baseTheme.disabled.disabled
        }, wrapper, { modifier: css`${LabelStyle}` });
      });

      it('applies the appropriate Help styles', () => {
        assertStyleMatch({
          color: baseTheme.disabled.disabled
        }, wrapper, { modifier: css`${LabelStyle} ${StyledHelp}` });
      });

      it('applies the appropriate svg wrapper styles', () => {
        assertStyleMatch({
          backgroundColor: baseTheme.disabled.input,
          border: `1px solid ${baseTheme.disabled.border}`
        }, wrapper, { modifier: 'svg' });
      });

      it('applies the appropriate check styles', () => {
        assertStyleMatch({
          fill: baseTheme.disabled.input
        }, wrapper, { modifier: 'svg path' });
      });

      describe('and hover / focus is applied', () => {
        const hoverFocusStyles = {
          outline: 'none',
          cursor: 'not-allowed'
        };

        it('applies the appropriate hidden input hover styles', () => {
          assertStyleMatch(hoverFocusStyles, wrapper, { modifier: css`${`${HiddenCheckableInputStyle}:hover`}` });
        });

        it('applies the appropriate hidden input focus styles', () => {
          assertStyleMatch(hoverFocusStyles, wrapper, { modifier: css`${`${HiddenCheckableInputStyle}:focus`}` });
        });

        it('applies the appropriate svg hover styles', () => {
          assertStyleMatch(hoverFocusStyles, wrapper, { modifier: css`${`${StyledCheckboxSvgWrapper}:hover`}` });
        });

        it('applies the appropriate svg focus styles', () => {
          assertStyleMatch(hoverFocusStyles, wrapper, { modifier: css`${`${StyledCheckboxSvgWrapper}:focus`}` });
        });

        it('applies the appropriate label hover styles', () => {
          assertStyleMatch(hoverFocusStyles, wrapper, { modifier: css`${`${LabelStyle}:hover`}` });
        });

        it('applies the appropriate label focus styles', () => {
          assertStyleMatch(hoverFocusStyles, wrapper, { modifier: css`${`${LabelStyle}:focus`}` });
        });
      });
    });

    describe('when error=true', () => {
      it('renders the correct svg styles', () => {
        const wrapper = render({ error: true }).toJSON();

        assertStyleMatch({
          border: `1px solid ${baseTheme.colors.error}`
        }, wrapper, { modifier: 'svg' });
      });
    });

    describe('when fieldHelpInline=true', () => {
      it('renders the correct FieldHelp styles', () => {
        const wrapper = render({ fieldHelpInline: true }).toJSON();

        assertStyleMatch({
          display: 'inline',
          margin: '0',
          paddingLeft: '0',
          width: 'auto'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('when setting a custom inputWidth', () => {
      describe('default', () => {
        const wrapper = render({ inputWidth: 50 }).toJSON();

        it('renders the correct CheckableInput styles', () => {
          assertStyleMatch({
            width: '50%'
          }, wrapper, { modifier: css`${StyledCheckableInput}` });
        });

        it('renders the correct FieldHelp styles', () => {
          assertStyleMatch({
            marginLeft: '50%'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });

      describe('reversed', () => {
        it('renders the correct FieldHelp styles', () => {
          const wrapper = render({ inputWidth: 50, reverse: true }).toJSON();

          assertStyleMatch({
            marginRight: '50%'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });
    });

    describe('when setting a custom labelWidth', () => {
      it('renders the correct Label styles', () => {
        const wrapper = render({ labelWidth: 50 }).toJSON();

        assertStyleMatch({
          width: '50%'
        }, wrapper, { modifier: css`${LabelStyle}` });
      });
    });

    describe('when reverse=true', () => {
      describe('default', () => {
        const wrapper = render({ reverse: true }).toJSON();

        it('renders the correct FieldHelp styles', () => {
          assertStyleMatch({
            marginLeft: '0'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });

      describe('and fieldHelpInline=true', () => {
        const wrapper = render({ reverse: true, fieldHelpInline: true }).toJSON();

        it('renders the correct CheckableInput styles', () => {
          assertStyleMatch({
            marginRight: '8px'
          }, wrapper, { modifier: css`${StyledCheckableInput}` });
        });
      });
    });
  });

  describe('Classic theme', () => {
    const opts = { theme: classicTheme };

    describe('default', () => {
      const wrapper = render(opts).toJSON();

      it('applies appropriate CheckableInput styles', () => {
        assertStyleMatch({
          height: '15px',
          padding: '1px 0 0 0',
          width: '15px'
        }, wrapper, { modifier: css`${StyledCheckableInput}` });
      });

      it('applies appropriate hidden input styles', () => {
        assertStyleMatch({
          height: '15px',
          padding: '1px',
          width: '15px'
        }, wrapper, { modifier: css`${HiddenCheckableInputStyle}` });
      });

      it('applies appropriate svg styles', () => {
        assertStyleMatch({
          height: '15px',
          width: '15px'
        }, wrapper, { modifier: css`${`${StyledCheckboxSvgWrapper} > svg`}` });
      });

      it('applies appropriate FieldHelp styles', () => {
        assertStyleMatch({
          marginLeft: '15px',
          paddingLeft: '6px'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });

      it('applies appropriate Icon styles', () => {
        assertStyleMatch({
          content: "'\\E943'"
        }, wrapper, { modifier: css`${`${LabelStyle} .carbon-icon::before`}` });
      });

      it('applies appropriate Label styles', () => {
        assertStyleMatch({
          paddingLeft: '6px',
          paddingBottom: '0',
          paddingTop: '0'
        }, wrapper, { modifier: css`${LabelStyle}` });
      });

      describe('Help styles', () => {
        it('applies correct default style', () => {
          assertStyleMatch({
            color: '#8099a4'
          }, wrapper, { modifier: css`${LabelStyle} ${StyledHelp}` });
        });

        it('applies correct hover style', () => {
          assertStyleMatch({
            color: '#8099a4'
          }, wrapper, { modifier: css`${`${LabelStyle} ${StyledHelp}:hover`}` });
        });

        it('applies correct focus style', () => {
          assertStyleMatch({
            color: '#8099a4'
          }, wrapper, { modifier: css`${`${LabelStyle} ${StyledHelp}:focus`}` });
        });
      });

      describe('when hover / focus is applied', () => {
        it('applies the appropriate hidden input svg wrapper hover styles', () => {
          assertStyleMatch(
            { outline: 'none' },
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledCheckboxSvgWrapper}`}` }
          );
        });

        it('applies the appropriate hidden input svg wrapper focus styles', () => {
          assertStyleMatch(
            { outline: 'none' },
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledCheckboxSvgWrapper}`}` }
          );
        });

        it('applies the appropriate hidden input svg hover styles', () => {
          assertStyleMatch({
            border: '1px solid #1963f6',
            outline: 'none'
          },
          wrapper,
          {
            modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledCheckboxSvgWrapper} > svg`}`
          });
        });

        it('applies the appropriate hidden input svg focus styles', () => {
          assertStyleMatch({
            border: '1px solid #1963f6',
            outline: 'none'
          },
          wrapper,
          {
            modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledCheckboxSvgWrapper} > svg`}`
          });
        });
      });
    });

    describe('when checked=true', () => {
      it('renders the correct check colour', () => {
        const wrapper = render({ checked: true, ...opts }).toJSON();

        assertStyleMatch({
          fill: 'rgba(0,0,0,0.85)'
        }, wrapper, { modifier: 'svg path' });
      });

      describe('and disabled=true', () => {
        const wrapper = render({ checked: true, disabled: true, ...opts }).toJSON();

        it('renders the correct check colour', () => {
          assertStyleMatch({
            fill: classicTheme.disabled.border
          }, wrapper, { modifier: 'svg path' });
        });
      });
    });

    describe('when disabled=true', () => {
      const wrapper = render({ disabled: true, ...opts }).toJSON();

      it('applies the appropriate Label styles', () => {
        assertStyleMatch({
          color: classicTheme.disabled.text
        }, wrapper, { modifier: css`${LabelStyle}` });
      });

      it('applies the appropriate Help styles', () => {
        assertStyleMatch({
          color: '#8099a4'
        }, wrapper, { modifier: css`${LabelStyle} ${StyledHelp}` });
      });

      it('applies the appropriate svg wrapper styles', () => {
        assertStyleMatch({
          backgroundColor: classicTheme.disabled.disabled,
          border: `1px solid ${classicTheme.disabled.border}`
        }, wrapper, { modifier: 'svg' });
      });

      it('applies the appropriate check styles', () => {
        assertStyleMatch({
          fill: classicTheme.disabled.disabled
        }, wrapper, { modifier: 'svg path' });
      });
    });

    describe('when fieldHelpInline=true', () => {
      it('applies the appropriate FieldHelp style', () => {
        const wrapper = render({ fieldHelpInline: true, ...opts }).toJSON();

        assertStyleMatch({
          marginLeft: '0',
          paddingBottom: '0',
          paddingTop: '0'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('Small theme', () => {
      it('sets the appropriate check colour', () => {
        const wrapper = render({ theme: smallTheme, checked: true }).toJSON();

        assertStyleMatch({
          fill: smallTheme.colors.primary
        }, wrapper, { modifier: 'svg path' });
      });
    });

    describe('Medium theme', () => {
      it('sets the appropriate check colour', () => {
        const wrapper = render({ theme: mediumTheme, checked: true }).toJSON();

        assertStyleMatch({
          fill: mediumTheme.colors.primary
        }, wrapper, { modifier: 'svg path' });
      });
    });

    describe('Large theme', () => {
      it('sets the appropriate check colour', () => {
        const wrapper = render({ theme: largeTheme, checked: true }).toJSON();

        assertStyleMatch({
          fill: largeTheme.colors.primary
        }, wrapper, { modifier: 'svg path' });
      });
    });
  });
});
