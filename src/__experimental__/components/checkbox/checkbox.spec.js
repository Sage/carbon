import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { css } from 'styled-components';
import Checkbox from './checkbox.component';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import { StyledLabelContainer } from '../label/label.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import guid from '../../../utils/helpers/guid';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import { baseTheme } from '../../../style/themes';

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
      const wrapper = render({ size: 'large' }).toJSON();

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
          marginLeft: '32px'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });

      it('applies the appropriate Label styles', () => {
        assertStyleMatch({
          marginLeft: '8px'
        }, wrapper, { modifier: css`${StyledLabelContainer}` });
      });
    });

    describe('when size=large and fieldHelpInline=true', () => {
      const wrapper = render({ fieldHelpInline: true, size: 'large' }).toJSON();

      it('applies the appropriate FieldHelp styles', () => {
        assertStyleMatch({
          marginTop: '0'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });


      it('applies the appropriate Label styles', () => {
        assertStyleMatch({
          marginLeft: '8px'
        }, wrapper, { modifier: css`${StyledLabelContainer}` });
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
  });
});
