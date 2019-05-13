import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({
  theme
}) => (
  theme.name === THEMES.classic && css`
  a{
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
    color: #255BC7;
  
    &:hover{
      cursor: pointer;
      color: #004B87;
      text-decoration: underline;
    }
  }`
);
