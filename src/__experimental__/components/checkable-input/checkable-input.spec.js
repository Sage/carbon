import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { css } from 'styled-components';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import CheckableInput from '.';
import FieldHelpStyle from '../field-help/field-help.style';
import FormFieldStyle from '../form-field/form-field.style';
import Label from '../label';
import HiddenCheckableInputStyle from './hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import { StyledCheckableInput, StyledCheckableInputWrapper } from './checkable-input.style';
import StyledHelp from '../../../components/help/help.style';
import baseTheme from '../../../style/themes/base';

function render(props) {
  return TestRenderer.create(<StyledCheckableInputWrapper { ...props } />);
}

describe('CheckableInput', () => {
  function mountInput(props) {
    return mount(
      <CheckableInput
        inputType='text'
        inputValue=''
        onChange={ () => null }
        { ...props }
      />
    );
  }

  describe('helpId', () => {
    describe('when inputLabel and labelHelp props are present', () => {
      it('returns an appropriate helpId property', () => {
        const labelWrapper = mountInput({ inputId: 'foo', inputLabel: 'bar', labelHelp: 'baz' })
          .find(Label)
          .find('label');

        expect(labelWrapper.prop('id')).toBe('foo-label');
      });
    });
  });
});

describe('StyledCheckableInputWrapper', () => {
  const states = ['focus', 'hover'];

  describe('default', () => {
    const wrapper = render().toJSON();

    it('applies the correct FormField styles', () => {
      assertStyleMatch(
        {
          display: 'flex',
          flexFlow: 'row wrap'
        },
        wrapper, { modifier: css`${FormFieldStyle}` }
      );
    });

    it('applies the correct Label styles', () => {
      assertStyleMatch(
        {
          textAlign: 'left',
          width: 'auto',
          whiteSpace: 'normal'
        },
        wrapper, { modifier: css`${LabelStyle}` }
      );
    });

    it('applies the correct base Help styles', () => {
      assertStyleMatch(
        {
          color: baseTheme.help.color,
          verticalAlign: 'middle'
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
