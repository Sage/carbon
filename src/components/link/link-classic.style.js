import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';
import StyledIcon from '../icon/icon.style';

function addStyle(color) {
  return `
    cursor: pointer;
    color: ${color};
    ${StyledIcon} {
      color: ${color};
    }
  `;
}

export default ({
  theme
}) => (
  isClassic(theme) && css`
    font-weight: bold;
    text-decoration: none;
    ${addStyle('#255BC7')}
  
    &:hover {
      text-decoration: underline;
      ${addStyle('#004B87')}
    }
  `
);
