import styled, { css } from 'styled-components';
import StyledButton from '../button/button.style';
import StyledSplitButtonChildrenContainer from '../split-button/split-button-children.style';
import { THEMES } from '../../style/themes';
import StyledSplitButtonToggle from '../split-button/split-button-toggle.style';
import baseTheme from '../../style/themes/base';

const StyledMultiActionButton = styled.div`
  ${StyledSplitButtonToggle} {
    border-left-width: 2px;
  }

  ${StyledSplitButtonToggle}:focus {
    margin: 0 -1px;
  }

  ${StyledSplitButtonChildrenContainer} {
    left: 0;
    right: auto;

    ${({ align }) => align === 'right' && css`
      left: auto;
      right: 0;

      ${StyledButton} {
        padding-left: 25px;
        padding-right: 25px;
        text-align: right;
      }
    `}
  }

  .carbon-icon {
    &.icon-dropdown {
      margin-right: 0;
      top: 0px;
    }
  }

  ${({ theme }) => theme.name === THEMES.classic && css`
    ${StyledSplitButtonToggle} {
      border-left-width: 1px;
    }

    ${StyledSplitButtonToggle},
    ${StyledSplitButtonToggle}:focus {
      margin: 0;
      padding: 7px 10px 7px 18px;
    }

    ${StyledSplitButtonChildrenContainer} {
      padding-top: 5px;
      top: 29px;
      z-index: 12;

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

    ${({ buttonType }) => buttonType === 'transparent' && css`
      background-color: white;
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);

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
    `}
  `}
`;

StyledMultiActionButton.defaultProps = {
  theme: baseTheme,
  legacyColorVariant: 'blue'
};

export default StyledMultiActionButton;
