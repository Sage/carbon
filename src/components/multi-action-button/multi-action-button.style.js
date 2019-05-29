import styled, { css } from 'styled-components';
import StyledButton from '../button/button.style';
import { classicColorsSet } from '../button/button-classic.style';

const StyledMultiActionButton = styled.div`
  .carbon-multi-action-button--align-right {
    .carbon-multi-action-button__additional-buttons {
      right: 0;

      ${StyledButton} {
        padding-left: 25px;
        padding-right: 25px;
        text-align: right;
      }
    }
  }

  .carbon-multi-action-button .carbon-split-button__toggle.carbon-multi-action-button__toggle--secondary{
    background-color: transparent;
    color: #255bc7;
  }

  .carbon-multi-action-button__additional-buttons {
    ${StyledButton} {
      border: none;
      border-radius: 0;
      color: #fff;
      display: block;
      margin-left: 0;
      min-width: 100%;
      padding-bottom: 5px;
      padding-top: 5px;
      text-align: left;

      &:hover {
        background-color: #163777;
      }
    }
  }

  .carbon-multi-action-button__additional-buttons--transparent {
    ${StyledButton} {
      color: #335B6D;

      &:focus {
        background-color: #fff;
        color: #335B6D;
        box-shadow: none;
        outline: 0;
      }

      &:hover,
      &:active {
        background-color: #E6EBED;
        color: #4782F7;
      }
    }
  }

  .carbon-multi-action-button--open {
    .carbon-multi-action-button__toggle {
      border-color: #1e499f;
      border-bottom-left-radius: 0;
      z-index: 13;
    }
  }

  .carbon-multi-action-button__toggle {
    width: auto;
    border: 1px solid #255bc7;
    box-sizing: border-box;
    padding: 7px 10px 7px 18px;
    position: relative;
    z-index: 11;

    &.carbon-button--disabled {
      border-color: #e6ebed;
    }

    &--primary {
      border: none;
    }
  }

  ${({ buttonType, legacyTheme }) => buttonType === 'secondary' && css`
      background-color: transparent;
      color: ${classicColorsSet[legacyTheme].default};
  `}

  .carbon-multi-action-button__additional-buttons {
    padding-top: 5px;
    top: 29px;
    z-index: 12;
  }

  .carbon-multi-action-button__toggle--transparent:not(.carbon-button--disabled) {
    background-color: transparent;
    box-shadow: none;
    border: 1px solid transparent;
    color: #335c6d;

    .carbon-multi-action-button--open & {
      background-color: transparent;
      border: 1px solid transparent;
      color: #335c6d;
    }

    &:hover,
    &:active,
    &:focus {
      background-color: transparent;
      box-shadow: none;
      border-color: transparent;
      color: #335c6d;
    }
  }

  .carbon-multi-action-button__additional-buttons--transparent {
    background-color: white;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
  }

  .carbon-icon {
    &.icon-dropdown {
      top: 0px;
    }
  }
`;

export default StyledMultiActionButton;
