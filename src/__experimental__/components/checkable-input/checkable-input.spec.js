import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { css } from 'styled-components';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import FieldHelpStyle from '../field-help/field-help.style';
import FormFieldStyle from '../form-field/form-field.style';
import HiddenCheckableInputStyle from './hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import { StyledCheckableInput, StyledCheckableInputWrapper } from './checkable-input.style';
import StyledHelp from '../../../components/help/help.style';
import baseTheme from '../../../style/themes/base';

function render(props) {
  return TestRenderer.create(<StyledCheckableInputWrapper { ...props } />);
}

describe('StyledCheckableInputWrapper', () => {
  const states = ['focus', 'hover'];

  describe('default', () => {
    const wrapper = render().toJSON();

    it('applies the correct FormField styles', () => {
      assertStyleMatch(
        {
          display: 'flex',
          flexWrap: 'wrap'
        },
        wrapper, { modifier: css`${FormFieldStyle}` }
      );
    });

    it('applies the correct Label styles', () => {
      assertStyleMatch(
        {
          textAlign: 'left',
          width: 'auto',
          whiteSpace: 'nowrap'
        },
        wrapper, { modifier: css`${LabelStyle}` }
      );
    });

    it('applies the correct base Help styles', () => {
      assertStyleMatch(
        {
          color: baseTheme.help.color,
          verticalAlign: 'bottom'
        },
        wrapper, { modifier: css`${`${LabelStyle} ${StyledHelp}`}` }
      );
    });

    it.each(states)('applies the correct Help %s styles', (state) => {
      assertStyleMatch(
        { color: baseTheme.text.color },
        wrapper, { modifier: css`${`${LabelStyle} ${StyledHelp}:${state}`}` }
      );
    });
  });

  describe('when disabled = true', () => {
    const wrapper = render({ disabled: true }).toJSON();

    it('applies the correct Label styles', () => {
      assertStyleMatch(
        { color: baseTheme.disabled.disabled },
        wrapper, { modifier: css`${LabelStyle}` }
      );
    });

    it.each(states)('applies the correct Label %s styles', (state) => {
      assertStyleMatch(
        {
          outline: 'none',
          cursor: 'not-allowed'
        },
        wrapper, { modifier: css`${`${LabelStyle}:${state}`}` }
      );
    });

    it('applies the correct Help styles', () => {
      assertStyleMatch(
        { color: baseTheme.disabled.disabled },
        wrapper, { modifier: css`${`${LabelStyle} ${StyledHelp}`}` }
      );
    });

    it.each(states)('applies the correct HiddenCheckableInput %s styles', (state) => {
      assertStyleMatch(
        {
          outline: 'none',
          cursor: 'not-allowed'
        },
        wrapper, { modifier: css`${`${HiddenCheckableInputStyle}:${state}`}` }
      );
    });
  });

  describe('when fieldHelpInline === true', () => {
    it('applies the correct Label styles', () => {
      const wrapper = render({ fieldHelpInline: true }).toJSON();

      assertStyleMatch(
        {
          display: 'inline',
          paddingLeft: '0',
          width: 'auto'
        },
        wrapper, { modifier: css`${FieldHelpStyle}` }
      );
    });
  });

  describe('when setting a custom inputWidth', () => {
    describe('default', () => {
      const wrapper = render({ inputWidth: 50 }).toJSON();

      it('renders the correct CheckableInput styles', () => {
        assertStyleMatch({
          width: '50% !important'
        }, wrapper, { modifier: css`${StyledCheckableInput}` });
      });
    });
  });

  describe('when setting a custom labelWidth', () => {
    it('renders the correct Label styles', () => {
      const wrapper = render({ labelWidth: 50 }).toJSON();

      assertStyleMatch({
        width: '50% !important'
      }, wrapper, { modifier: css`${LabelStyle}` });
    });
  });
});
