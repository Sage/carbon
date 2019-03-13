import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';

const InputIconToggleStyle = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  margin-right: ${({ size, theme }) => `-${theme.input[size].padding};`}

  ${({ error, theme }) => error && css`
    color: ${theme.colors.error};
  `}
  ${({ warning, theme }) => warning && css`
    color: ${theme.colors.warning};
  `}
  ${({ info, theme }) => info && css`
    color: ${theme.colors.info};
  `}
  ${({ size }) => {
    if (size === 'small') return css`width: 32px;`;
    if (size === 'large') return css`width: 48px;`;
    return css`width: 40px;`;
  }}
`;

InputIconToggleStyle.defaultProps = {
  size: 'medium',
  theme: BaseTheme
};

InputIconToggleStyle.propTypes = {
  error: PropTypes.string,
  info: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  warning: PropTypes.string
};

export default InputIconToggleStyle;
