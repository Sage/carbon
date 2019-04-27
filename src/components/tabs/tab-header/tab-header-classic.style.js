import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    background-color: #f5f6f7;
    border-bottom: 2px solid #ccd6db;
    color: #003349;

    &:focus,
    &:hover {
      background: #004b87;
      border-bottom-color: #004b87;
      color: #fff;
      outline: none;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 6px rgba(37, 91, 199, 0.6);
    }

    ${({ isTabSelected }) => isTabSelected
      && css`
        background-color: #fff;
        border-bottom-color: #1963f6;

        &:hover {
          background: #fff;
          border-bottom-color: #1963f6;
          color: #003349;
        }
      `}

      ${({ position }) => position === 'left'
        && css`
          background-color: #f5f6f7;
          border-bottom: 0px;
          border-right: 2px solid #ccd6db;

          &:hover {
            border-right-color: #004b87;
            background: #004b87;
          }

          ${({ isTabSelected }) => isTabSelected
            && css`
              border-right-color: #1963f6;
              background-color: #fff;

              &:hover {
                border-right-color: #1963f6;
                background-color: #fff;
              }
            `}
        `}
  `;
