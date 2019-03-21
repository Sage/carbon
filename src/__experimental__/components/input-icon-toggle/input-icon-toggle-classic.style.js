import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({
  inputFocus, inputHover, theme, type
}) => theme.name === THEMES.classic && css`
  background-color: #e6ebed;
  border-left: 1px solid #bfccd2;
  box-sizing: border-box;
  color: #003349;
  margin-right: -6.5px;
  width: ${type === 'dropdown' ? '20px' : '31px'};

  ${(inputHover || inputFocus) ? '' : '&:hover'} { color: #fff };

  ${inputFocus ? '' : '&:hover'} {
    background-color: #004b87;
    border-color: #004b87;
  }

  ${inputHover && css`
    background-color: #1963f6;
    border-color: #1963f6;
  `}
`;
