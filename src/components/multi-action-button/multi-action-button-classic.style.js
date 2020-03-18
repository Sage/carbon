import { css } from 'styled-components';
import StyledSplitButton from '../split-button/split-button.style';
import StyledButton from '../button/button.style';
import StyledSplitButtonChildrenContainer from '../split-button/split-button-children.style';
import { isClassic } from '../../utils/helpers/style-helper';
import StyledIcon from '../icon/icon.style';

const getMultiActionButtonClassicStyles = ({ disabled, displayed, theme }) => (isClassic(theme) ? css`
  ${StyledIcon} {
    left: 6px;
  }

  ${StyledSplitButton} > ${StyledButton},
  ${StyledSplitButton} > ${StyledButton}:focus {
    margin: 0;
    height: 31px;
    padding-left: 18px;
    padding-right: 14px;
  }

  ${StyledSplitButton} > ${StyledButton}:focus {
    border-color: #1e499f;
  }

  ${(!disabled && displayed) && css`
    ${StyledSplitButton} > ${StyledButton} {
      background-color: #1e499f;
      border-color: #1e499f;
    }
  `}

  ${StyledSplitButtonChildrenContainer} {
    max-width: none;
    width: auto;
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

      &:hover {
        background-color: #163777;
      }
    }
  }

  ${({ buttonType }) => buttonType === 'transparent' && css`
    ${StyledSplitButton} > ${StyledButton} {
      background-color: transparent;
      box-shadow: none;
      border: 1px solid transparent;
      color: #335c6d;

      &:hover,
      &:active,
      &:focus {
        background-color: transparent;
        box-shadow: none;
        border-color: transparent;
        color: #335c6d;
      }

      ${StyledIcon} {
        color: #335c6d;
      }
    }

    ${StyledSplitButtonChildrenContainer} {
      background-color: #FFF;
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);

      ${StyledButton} {
        color: #335c6d;
        background: #FFF;

        &:focus {
          background-color: #FFF;
          color: #335c6d;
          box-shadow: none;
          outline: 0;
        }

        &:hover,
        &:active {
          background-color: #e6ebed;
          color: #4782F7;
        }
      }
    }
  `}
` : '');

export default getMultiActionButtonClassicStyles;
