import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    background-color: #f5f6f7;
    border-bottom: 2px solid #ccd6db;
    color: #003349;
    display: inline-block;
    font-weight: bold;
    height: 100%;
    margin-left: 2px;
    padding: 11px 15px 10px;

    &:first-child {
      margin-left: 0;
    }

    &:focus,
    &:hover {
      background: #004b87;
      border-bottom-color: #004b87;
      color: #fff;
      outline: none;
    }

    ${({ isTabSelected }) => !isTabSelected
      && css`
        &:hover {
          background: #fff;
          color: #003349;
        }
        &:focus {
          outline: none;
          box-shadow: 0 0 6px rgba(37, 91, 199, 0.6);
        }
      `}

    ${({ isTabSelected }) => isTabSelected
      && css`
        background-color: #fff;
        border-bottom-color: #1963f6;
      `}
  `;
