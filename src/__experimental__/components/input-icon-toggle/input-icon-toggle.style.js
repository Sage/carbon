import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import sizes from '../input/input-sizes.style';
import { isClassic } from '../../../utils/helpers/style-helper';

const InputIconToggleStyle = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${({ size }) => css`
    margin-right: -${sizes[size].horizontalPadding};
    width: ${getWidth(size)};
  `}

  ${({ type, theme }) => isClassic(theme) && css`
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

function getWidth(size) {
  switch (size) {
    case 'small':
      return '32px';
    case 'large':
      return '48px';
    default:
      return '40px';
  }
}

InputIconToggleStyle.safeProps = ['size', 'type'];

InputIconToggleStyle.defaultProps = {
  size: 'medium',
  theme: BaseTheme
};

InputIconToggleStyle.propTypes = {
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  type: PropTypes.string
};

export default InputIconToggleStyle;
