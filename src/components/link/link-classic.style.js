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
  
    &:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }`
);
