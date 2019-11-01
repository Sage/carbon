import styled, { css } from 'styled-components';
import { StyledButtonToggleLabel } from '../button-toggle/button-toggle.style';
import ValidationIconStyle from '../validations/validation-icon.style';
import baseTheme from '../../style/themes/base';

const ButtonToggleGroupStyle = styled.div`
  ${({ inputWidth }) => inputWidth && css`
    width: ${`${inputWidth}%`};
  `};
  
  ${({ theme, errorMessage }) => errorMessage && css`
    ${StyledButtonToggleLabel} {
      border-color: ${theme.colors.error};
    }
  `};

  ${ValidationIconStyle} {
    display: inline-block;
    margin-left: 10px;
    margin-top: -4px;
    vertical-align: middle;
  }
`;

ButtonToggleGroupStyle.defaultProps = {
  theme: baseTheme
};

export default ButtonToggleGroupStyle;
