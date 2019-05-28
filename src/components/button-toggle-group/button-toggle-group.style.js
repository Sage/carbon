import styled, { css } from 'styled-components';
import { StyledButtonToggleLabel } from '../button-toggle/button-toggle.style';
import ValidationIconStyle from '../validations/validation-icon.style';

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
    vertical-align: top;
  }
`;

export default ButtonToggleGroupStyle;
