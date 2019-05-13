import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import sizes from '../input/input-sizes.style';
import { THEMES } from '../../../style/themes';

const InputIconToggleStyle = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-right: ${({ size }) => `-${sizes[size].padding};`}

  ${({ errorMessage, theme }) => errorMessage && css`
    color: ${theme.colors.error};
  `}
  ${({ warningMessage, theme }) => warningMessage && css`
    color: ${theme.colors.warning};
  `}
  ${({ infoMessage, theme }) => infoMessage && css`
    color: ${theme.colors.info};
  `}
  ${({ size }) => {
    if (size === 'small') return css`width: 32px;`;
    if (size === 'large') return css`width: 48px;`;
    return css`width: 40px;`;
  }}

  ${({ type, theme }) => theme.name === THEMES.classic && css`
    background-color: #e6ebed;
    border-left: 1px solid #bfccd2;
    margin-left: 6px;
    margin-right: -6px;
    
    &:hover {
      color: #fff;
    }

    ${type === 'dropdown' && css`
      width: 20px;
    `}
  `}
`;

InputIconToggleStyle.defaultProps = {
  size: 'medium',
  theme: BaseTheme
};

InputIconToggleStyle.propTypes = {
  errorMessage: PropTypes.string,
  infoMessage: PropTypes.string,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  warningMessage: PropTypes.string
};

export default InputIconToggleStyle;
