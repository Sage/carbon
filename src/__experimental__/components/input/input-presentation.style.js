import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';

const InputPresentationStyle = styled.div`
  align-items: center;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.input.borderColor};
  box-sizing: border-box;
  cursor: text;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin: 0px;
  min-height: 32px;
  width: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.input.hover.borderColor};
  }

  ${({ disabled, theme }) => disabled && css`
    background: ${theme.input.disabled.backgroundColor};
    border-color: ${theme.input.disabled.borderColor} !important;
    cursor: not-allowed;
  `}
  ${({ readOnly }) => readOnly && css`
    background: transparent !important;
    border-color: transparent !important;
  `}
  ${({ info, theme }) => info && css`
    border-color: ${theme.colors.info};
    box-shadow: inset 1px 1px 0 ${theme.colors.info},
                inset -1px -1px 0 ${theme.colors.info};
  `}
  ${({ warning, theme }) => warning && css`
    border-color: ${theme.colors.warning};
    box-shadow: inset 1px 1px 0 ${theme.colors.warning},
                inset -1px -1px 0 ${theme.colors.warning};
  `}
  ${({ error, theme }) => error && css`
    border-color: ${theme.colors.error};
    box-shadow: inset 1px 1px 0 ${theme.colors.error},
                inset -1px -1px 0 ${theme.colors.error};
  `}
  ${({ hasFocus, theme }) => hasFocus && css`
    && { ${theme.input.active.border}; }
  `}

  ${({ size, theme }) => css`
    min-height: ${theme.input[size].height};
    padding-left: ${theme.input[size].padding};
    padding-left: ${theme.input[size].padding};
  `}
`;

InputPresentationStyle.defaultProps = {
  theme: baseTheme
};

InputPresentationStyle.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hasFocus: PropTypes.bool,
  info: PropTypes.string,
  readOnly: PropTypes.bool,
  size: PropTypes.string,
  warning: PropTypes.string
};

export default InputPresentationStyle;
