import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import sizes from '../input/input-sizes.style';
import { THEMES } from '../../../style/themes';
import InputIconToggleStyle from '../input-icon-toggle/input-icon-toggle.style';

const LabelStyle = styled.label`
  color: ${({ theme }) => theme.text.color};
  cursor: pointer;
  display: block;
  font-weight: 600;
  padding-bottom: 8px;
  width: 100%;

  ${({
    align, inline, inputSize, width
  }) => inline && css`
    align-self: center;
    box-sizing: border-box;
    padding-bottom: 0;
    padding-right: ${sizes[inputSize].padding};
    text-align: ${align};
    width: ${width === 0 ? LabelStyle.defaultProps.width : width}%;
  `}

  ${({ disabled, theme }) => disabled && css`
    color: ${theme.disabled.disabled};
  `}  
  
  ${({ inline, theme }) => theme.name === THEMES.classic && css`
    color: #003349;
    padding-left: 6px;
    padding-right: 6px;

    ${inline && css`
      padding-left: 0;
      padding-right: 8px;
    `}
    
    &:hover ${InputIconToggleStyle} {
      background-color: #1e499f;
      border-color: #1e499f;
    }
  `}
`;

LabelStyle.defaultProps = {
  align: 'left',
  inputSize: 'medium',
  theme: BaseTheme,
  width: 30
};

LabelStyle.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  inline: PropTypes.bool,
  inputSize: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  width: PropTypes.number
};

export default LabelStyle;
