import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { css } from 'styled-components';
import Checkbox from './checkbox.component';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import StyledHelp from '../../../components/help/help.style';
import guid from '../../../utils/helpers/guid';
import { assertStyleMatch, carbonThemesJestTable } from '../../../__spec_helper__/test-utils';
import { baseTheme, classicTheme } from '../../../style/themes';

jest.mock('../../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

function render(props, renderer = TestRenderer.create, options = {}) {
  return renderer(
    <Checkbox
      name='my-checkbox'
      value='test'
      { ...props }
    />,
    options
  );
}

describe('Checkbox', () => {
  describe('base theme', () => {
    it('renders as expected', () => {
      expect(render()).toMatchSnapshot();
    });

    describe('when size=large', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = render({ size: 'large' }).toJSON();
      });

      it('applies the appropriate input display element styles', () => {
        const styles = {
          height: '24px',
          width: '24px'
        };

        assertStyleMatch(styles, wrapper, { modifier: css`${StyledCheckableInput}` });

        assertStyleMatch(styles, wrapper, { modifier: css`${HiddenCheckableInputStyle}` });

        assertStyleMatch(styles, wrapper, { modifier: 'svg' });

        assertStyleMatch({
          height: '24px'
        }, wrapper, { modifier: (css`${StyledCheckableInputSvgWrapper}`) });
      });

      it('applies the correct CheckboxSvgWrapper styles', () => {
        assertStyleMatch({
          height: '24px'
        }, wrapper, { modifier: (css`${StyledCheckableInputSvgWrapper}`) });
      });

      it('applies the appropriate FieldHelp styles', () => {
        assertStyleMatch({
          marginLeft: '24px'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });

      describe('when labelSpacing is 2', () => {
        it('should apply the correct fieldHelp styles', () => {
          wrapper = render({ labelSpacing: 2, size: 'large' }).toJSON();
          assertStyleMatch({
            paddingLeft: '16px',
            marginLeft: '24px'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });
    });

    describe('when size=large and fieldHelpInline=true', () => {
      const wrapper = render({ fieldHelpInline: true, size: 'large' }).toJSON();

      it('applies the appropriate FieldHelp styles', () => {
        assertStyleMatch({
          marginTop: '0'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('when checkbox is checked', () => {
      it('renders the correct check colour', () => {
        const wrapper = render({ checked: true }).toJSON();

        assertStyleMatch({
          fill: baseTheme.checkable.checked
        }, wrapper, {
          modifier: css`${HiddenCheckableInputStyle}:checked ~ ${StyledCheckableInputSvgWrapper} svg path`
        });
      });

      describe('and disabled=true', () => {
        const wrapper = render({ checked: true, disabled: true }).toJSON();

        it('renders the correct check colour', () => {
          assertStyleMatch({
            fill: baseTheme.disabled.border
          }, wrapper, {
            modifier: css`${HiddenCheckableInputStyle}:checked ~ ${StyledCheckableInputSvgWrapper} svg path`
          });
        });
      });
    });

    describe('when disabled=true', () => {
      const wrapper = render({ disabled: true }).toJSON();

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

        it('applies the appropriate svg hover styles', () => {
          assertStyleMatch(hoverFocusStyles, wrapper, { modifier: css`${`${StyledCheckableInputSvgWrapper}:hover`}` });
        });

        it('applies the appropriate svg focus styles', () => {
          assertStyleMatch(hoverFocusStyles, wrapper, { modifier: css`${`${StyledCheckableInputSvgWrapper}:focus`}` });
        });
      });
    });

    describe('when using validation props', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount((
          <Checkbox
            name='checkbox-warning'
            value='my-value'
          />
        ));
      });

      describe.each(['error', 'warning', 'info'])('when %s is true', (type) => {
        it('show correct border on radio', () => {
          wrapper.setProps({ [type]: true });
          const borderWidth = type === 'error' ? 2 : 1;
          assertStyleMatch({
            border: `${borderWidth}px solid ${baseTheme.colors[type]}`
          }, wrapper, { modifier: 'svg' });
        });
      });

      describe.each(['error', 'warning', 'info'])('when %s is "string', (type) => {
        it('show correct border on radio', () => {
          wrapper.setProps({ [type]: 'Message' });
          const borderWidth = type === 'error' ? 2 : 1;
          assertStyleMatch({
            border: `${borderWidth}px solid ${baseTheme.colors[type]}`
          }, wrapper, { modifier: 'svg' });
        });
      });

      describe('when error is true', () => {
        it('render correct color for errors', () => {
          wrapper.setProps({
            error: true
          });

          assertStyleMatch({
            border: `2px solid ${baseTheme.colors.error}`
          }, wrapper, { modifier: 'svg' });
        });
      });

      describe('when warning is true', () => {
        it('render correct color for warnings', () => {
          wrapper.setProps({
            warning: true
          });

          assertStyleMatch({
            border: `1px solid ${baseTheme.colors.warning}`
          }, wrapper, { modifier: 'svg' });
        });
      });

      describe('when info is true', () => {
        it('render correct color for info', () => {
          wrapper.setProps({
            info: true
          });

          assertStyleMatch({
            border: `1px solid ${baseTheme.colors.info}`
          }, wrapper, { modifier: 'svg' });
        });
      });
    });

    describe('when fieldHelpInline is true', () => {
      it('renders the correct FieldHelp styles', () => {
        const wrapper = render({ fieldHelpInline: true }).toJSON();

        assertStyleMatch({ marginLeft: '0' }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('when setting a custom inputWidth', () => {
      describe('default', () => {
        const wrapper = render({ inputWidth: 50 }).toJSON();

        it('renders the correct FieldHelp styles', () => {
          assertStyleMatch({
            marginLeft: '50% !important'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });

      describe('reversed', () => {
        it('renders the correct FieldHelp styles', () => {
          const wrapper = render({ inputWidth: 50, reverse: true }).toJSON();

          assertStyleMatch({
            marginRight: '50% !important'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });
    });

    describe('when reverse is true', () => {
      describe('default', () => {
        const wrapper = render({ reverse: true }).toJSON();

        it('renders the correct FieldHelp styles', () => {
          assertStyleMatch({
            marginLeft: '0'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });

      describe('and fieldHelpInline is true', () => {
        const wrapper = render({ reverse: true, fieldHelpInline: true }).toJSON();

        it('renders the correct CheckableInput styles', () => {
          assertStyleMatch({
            marginRight: '8px'
          }, wrapper, { modifier: css`${StyledCheckableInput}` });
        });
      });
    });

    describe('when labelSpacing is 2', () => {
      const wrapper = render({ labelSpacing: 2 }).toJSON();
      assertStyleMatch({
        paddingLeft: '16px',
        marginLeft: '16px'
      }, wrapper, { modifier: css`${FieldHelpStyle}` });
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
        }, wrapper, { modifier: 'svg' });
      });

      it('applies appropriate FieldHelp styles', () => {
        assertStyleMatch({
          marginLeft: '15px',
          paddingLeft: '5px'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });

      it('applies appropriate Label styles', () => {
        assertStyleMatch({
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
            { boxShadow: 'none' },
            wrapper,
            {
              modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledCheckableInputSvgWrapper}`}`
            }
          );
        });

        it('applies the appropriate hidden input svg wrapper focus styles', () => {
          assertStyleMatch(
            { boxShadow: 'none' },
            wrapper,
            {
              modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledCheckableInputSvgWrapper}`}`
            }
          );
        });

        it('applies the appropriate hidden input svg hover styles', () => {
          assertStyleMatch({
            border: '1px solid #1963f6',
            outline: 'none'
          },
          wrapper,
          {
            modifier: css`
              ${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledCheckableInputSvgWrapper} > svg`}
            `
          });
        });

        it('applies the appropriate hidden input svg focus styles', () => {
          assertStyleMatch({
            border: '1px solid #1963f6',
            outline: 'none'
          },
          wrapper,
          {
            modifier: css`
              ${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledCheckableInputSvgWrapper} > svg`}
            `
          });
        });
      });
    });

    describe('when checked is true', () => {
      it('renders the correct check colour', () => {
        const wrapper = render({ checked: true, ...opts }).toJSON();

        assertStyleMatch({
          fill: 'rgba(0,0,0,0.85)'
        }, wrapper, {
          modifier: css`${HiddenCheckableInputStyle}:checked ~ ${StyledCheckableInputSvgWrapper} svg path`
        });
      });

      describe('and disabled is true', () => {
        const wrapper = render({ checked: true, disabled: true, ...opts }).toJSON();

        it('renders the correct check colour', () => {
          assertStyleMatch({
            fill: '#8099a4'
          }, wrapper, {
            modifier: css`${HiddenCheckableInputStyle}:checked ~ ${StyledCheckableInputSvgWrapper} svg path`
          });
        });
      });
    });

    describe('when disabled is true', () => {
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
          backgroundColor: '#e6ebed',
          border: `1px solid ${classicTheme.disabled.border}`
        }, wrapper, { modifier: 'svg' });
      });

      it('applies the appropriate check styles', () => {
        assertStyleMatch({
          fill: '#e6ebed'
        }, wrapper, { modifier: 'svg path' });
      });
    });

    describe('when fieldHelpInline is true', () => {
      it('applies the appropriate FieldHelp style', () => {
        const wrapper = render({ fieldHelpInline: true, ...opts }).toJSON();

        assertStyleMatch({
          marginLeft: '0',
          paddingBottom: '0',
          paddingTop: '0'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe.each(carbonThemesJestTable)('when the theme is set to %s', (themeName, theme) => {
      it('sets the appropriate check colour', () => {
        const wrapper = render({ theme, checked: true }).toJSON();

        assertStyleMatch({
          fill: theme.checkable.checked
        }, wrapper, {
          modifier: css`${HiddenCheckableInputStyle}:checked ~ ${StyledCheckableInputSvgWrapper} svg path`
        });
      });
    });
  });
});
