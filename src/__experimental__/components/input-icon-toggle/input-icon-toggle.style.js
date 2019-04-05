import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import sizes from '../input/input-sizes.style';

const InputIconToggleStyle = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  margin-right: ${({ size }) => `-${sizes[size].padding};`}

  ${({ error, theme }) => error && css`
    color: ${theme.status.error};
  `}
  ${({ warning, theme }) => warning && css`
    color: ${theme.status.warning};
  `}
  ${({ info, theme }) => info && css`
    color: ${theme.status.info};
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
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  warning: PropTypes.string
};

export default InputIconToggleStyle;
