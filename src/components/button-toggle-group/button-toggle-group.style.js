import styled, { css } from 'styled-components';
import { StyledButtonToggleLabel } from '../button-toggle/button-toggle.style';

const ButtonToggleGroupStyle = styled.div`
  ${({ inputWidth }) => inputWidth && css`
    width: ${`${inputWidth}%`};
  `};
  
  ${({ theme, errorMessage }) => errorMessage && css`
    ${StyledButtonToggleLabel} {
      border-color: ${theme.colors.error};
    }
  `};
`;

export default ButtonToggleGroupStyle;
