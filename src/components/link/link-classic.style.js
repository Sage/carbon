import { css } from 'styled-components';
import { THEMES } from '../../style/themes';
import { StyledIcon } from '../icon/icon.style';

export default ({
  theme
}) => (
  theme.name === THEMES.classic && css`
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
    color: #255BC7;

    ${StyledIcon} {
      color: #255BC7;
    }
  
    &:hover{
      cursor: pointer;
      color: #004B87;
      text-decoration: underline;
      ${StyledIcon} {
        color: #004B87;
      }
    }`
);
