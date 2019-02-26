import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';

const InputPresentationStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.input.border};
  outline: none;
  ${({
    hasFocus, theme, error, warning, readOnly
  }) => {
    if (error) return css`border: 2px solid ${theme.colors.error};`;
    if (warning) return css`border: 2px solid ${theme.colors.warning};`;
    if (hasFocus) return css`outline: 3px solid ${theme.colors.warning};`;
    if (readOnly) return css`border: none;`;
    return null;
  }}
  color: ${({ theme }) => theme.colors.text.body};
  ${({ theme, disabled }) => {
    if (disabled) return css`color: ${theme.colors.text.disabled};`;
    return '';
  }}
  background: ${({ theme, disabled, readOnly }) => {
    if (disabled) return theme.input.disabled;
    if (readOnly) return theme.input.readOnly;
    return theme.input.backgroundColor;
  }};
  cursor: text;
  ${({ disabled }) => disabled && css`cursor: not-allowed;`}
  display: flex;
  flex-wrap: wrap;
  line-height: ${({ theme }) => theme.input.lineHeight};
  margin: 0px;
  min-height: ${({ theme }) => theme.input.height};
  ${({ size, theme }) => {
    return css`height: ${theme.input.dimensions[size].height};`;
  }}

  padding: 2px 6px;
  ${({ theme: { input: { dimensions } }, size }) => {
    return css`padding-left: ${dimensions[size].paddingLeft}; 
      padding-right: ${dimensions[size].paddingRight}`;
  }}
  width: 100%;
  vertical-align: baseline;
`;

InputPresentationStyle.defaultProps = {
  theme: baseTheme,
  size: 'medium'
};

export default InputPresentationStyle;
