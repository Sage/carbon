import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({
  theme,
  tabHasWarning,
  tabHasError,
  isTabSelected,
  position
}) => theme.name === THEMES.classic && css`
  background-color: #f5f6f7;
  border-bottom: 2px solid #ccd6da;
  color: #003349;

  &:hover {
    background: #004b87;
    border-bottom-color: #004b87;
    color: #fff;
    outline: none;
  }

  ${!isTabSelected && css`
    &:focus {
      background: #004b87;
      border-bottom-color: #004b87;
      color: #fff;
      outline: none;
    }
  `}

  ${isTabSelected && css`
    background-color: #fff;
    border-bottom-color: #1963f6;

    &:focus {
      outline: none;
      box-shadow: 0 0 6px rgba(37, 91, 199, 0.6);
    }

    &:hover {
      background: #fff;
      border-bottom-color: #004b87;
      
      color: #003349;
    }
  `}

  ${position === 'left' && css`
    background-color: #f5f6f7;
    border-bottom: 0px;
    border-right: 2px solid #ccd6da;

    &:hover {
      border-right-color: #1963f6;
      background: #004b87;
    }

    ${isTabSelected && css`
      border-right-color: #1963f6;
      background-color: #fff;

      &:hover {
        background-color: #fff;
      }
    `}

    ${tabHasWarning && css`
    border-right-color: #FF7D00;
    `}

    ${tabHasError && css`
      border-right-color: #D63F40;
    `}
  `}

  ${tabHasWarning && css`
    border-bottom-color: #FF7D00;
  `}

  ${tabHasError && css`
    border-bottom-color: #D63F40;
  `}
`;
