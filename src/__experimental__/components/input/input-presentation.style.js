import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';

const InputPresentationStyle = styled.div`
  align-items: center;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.input.borderColor};
  box-sizing: border-box;
  cursor: text;
  display: flex;
  flex: 1;
  margin: 0px;
  min-height: 32px;

  ${({ disabled, theme }) => disabled && css`
    background: ${theme.input.disabled.backgroundColor};
    border-color: ${theme.input.disabled.borderColor};
    cursor: not-allowed;
  `}
  ${({ readOnly }) => readOnly && css`
    background: transparent;
    border-color: transparent;
  `}
  ${({ error, theme }) => error && css`
    border-color: ${theme.colors.error};
    box-shadow: inset 1px 1px 0 ${theme.colors.error}, inset -1px -1px 0 ${theme.colors.error};
  `}
  ${({ warning, theme }) => warning && css`
    border-color: ${theme.colors.warning};
    box-shadow: inset 1px 1px 0 ${theme.colors.warning}, inset -1px -1px 0 ${theme.colors.warning};
  `}
  ${({ info, theme }) => info && css`
    border-color: ${theme.colors.info};
    box-shadow: inset 1px 1px 0 ${theme.colors.info}, inset -1px -1px 0 ${theme.colors.info};
  `}
  ${({ hasFocus, theme }) => hasFocus && css`
    outline: 3px solid ${theme.colors.warning};
  `}

  ${({ size, theme }) => css`
    height: ${theme.input[size].height};
    padding-left: ${theme.input[size].padding};
    padding-left: ${theme.input[size].padding};
  `}
`;

InputPresentationStyle.defaultProps = {
  theme: baseTheme
};

export default InputPresentationStyle;
