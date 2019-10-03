import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';
import StyledIcon from '../icon/icon.style';

function addStyle(color) {
  return `
    color: ${color};
    ${StyledIcon} {
      color: ${color};
    }
  `;
}

export default ({
  disabled, theme
}) => (
  isClassic(theme) && css`
    font-weight: bold;
    text-decoration: none;
    ${addStyle('#255BC7')}
  
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      ${addStyle('#004B87')}
    }

    &:focus {
      outline: none;
    }

    ${disabled && css`
      pointer-events: none;

      &:hover {
        text-decoration: none;
        cursor: default;
        ${addStyle('#255BC7')}
      }
    `}
  `
);
